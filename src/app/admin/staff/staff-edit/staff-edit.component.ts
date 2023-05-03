import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { MustMatch } from 'src/app/common/password.validator';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.ROLE_KEY_FOR_STAFF;
  public roleSelectionList: any = [];
  public statusList: any[] = TableColumnData.STATUS_DATA_FOR_STAFF;
  public topicKeys: Array<TableColumnData> = TableColumnData.TOPIC_GROUP_COLUMN_DATA;
  public surveyVersionSettingList: Array<any> = TableColumnData.SURVEY_VERSION_SETTING_DATA;
  public viewConfigurationList: any;
  public permanentDelete : boolean = false;
  public dataSource: any;
  public rolesData = {
    content: [],
    totalElements: 0,
  };
  public topicGroupSelectionList: any = [];
  public topicDataSource: any;
  public topicGroupData = {
    content: [],
    totalElements: 0,
  };

  public customerEventTypeData = {
    tableKey : TableColumnData.EVENT_TYPE_RESTRICTION,
    content : [],
    totalElements : 0,
    selectedElements : [],
    newlySelectedElements : [] 
  }

  staffForm: FormGroup;
  isForce = false;
  public forcePreviousPageList : boolean = false;
  userId: any;
  roleCheckBox: Array<any> = [];
  topicGroupCheckBox: Array<any> = [];
  roleList: Array<any> = [];
  selectedRole: Array<any> = [];
  selectedTopicGroup: Array<any> = [];
  topicGroupList: Array<any> = [];
  minLength = 8;
  maxLength = 100;
  pattern = '';
  regex = '';
  charactersCount = 0;
  passwordIsValid = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly fb: FormBuilder,
    private readonly systemService: SystemService,
    private readonly customerService: CustomerService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly systemUtilityService : SystemUtilityService,
    private readonly el: ElementRef) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.userId = users.userId;
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getRoleListByUserId();
        this.findUserCustomerGroup(this.id);
      }
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    this.combineLatestCustomerEventTypeList();
    this.combineLatestResponseofRole();
    this.combineLatestResponseOfCustomerGroup();
    this.loadCustomerViewConfiguration();
    this.getPasswordValidationRule();
    if (this.id !== undefined) {
      this.loadEventTypeRestrictionsForUserById();
      this.loadCustomerEventTypeList();
      this.customerService.loadStaffById(this.id);
      this.loadStaffById();
    }
    this.getAllRole();
    this.loadCustomerGroup(false, '');
    AppUtility.scrollTop();
  }

  getPasswordValidationRule() {
    this.customerService.loadPasswordValidationRule();
    this.subscriptions.add(this.customerService.getPasswordValidationRule().pipe(skipWhile((item: any) => !item))
      .subscribe((passwordValidationRule: any) => {
        if (passwordValidationRule.data && passwordValidationRule.data.length > 0) {
          this.maxLength = passwordValidationRule.data[0].maximumLength;
          this.minLength = passwordValidationRule.data[0].minimumLength;
          if (passwordValidationRule.data.length > 1 && passwordValidationRule.data[1].rules.length > 0) {
            this.pattern = passwordValidationRule.data[1].rules[0].validCharacters;
            this.charactersCount = passwordValidationRule.data[1].rules[0].numberOftopicGroupListCharacters;
          }
          this.regex = '^.*(?=(?:.*?[' + this.pattern
            .replace(']', '').concat('\\\]')
            + ']){' + this.charactersCount + ',}).*$';
          this.p.password.setValidators([Validators.pattern(new RegExp(this.regex))]);
          this.p.password.updateValueAndValidity();
          // this.setPasswordForm();
        }
      }));
  }

  loadCustomerViewConfiguration() {
    this.systemService.loadViewConfigurationList(false);
    this.subscriptions.add(this.systemService.getViewConfigurationList().pipe(skipWhile((item: any) => !item))
      .subscribe((viewConfigurationList: any) => {
        this.viewConfigurationList = viewConfigurationList;
      }));
  }

  loadCustomerGroup(force: boolean, filter: any) {
      if(this.userId != this.id)
        this.customerService.loadUserCustomerGroupListOfLoggedInUser(this.userId)
      else
      this.systemService.loadCustomerGroupList(force, filter);    
  }

  findUserCustomerGroup(userId: any) {
      this.customerService.loadUserCustomerGroupList(userId);
  }

  combineLatestResponseOfCustomerGroup(){
    const customerGroup$ : Observable<any> = this.userId != this.id ? this.customerService.getUserCustomerGroupListOfLoggedInUser().pipe(filter((item: any) => item)) 
        : this.systemService.getCustomerGroupList().pipe(filter((item: any) => item));

    const usercustomerGroup$ : Observable<any> = this.customerService.getUserCustomerGroupsList();

    this.subscriptions.add(
      combineLatest([customerGroup$, usercustomerGroup$])
      .subscribe(
        ([customerGroupList, userCustomerGroupList]) =>{

          const topicGroupSelectionList = [];

          if(userCustomerGroupList && this.id){
            this.topicGroupList = [...userCustomerGroupList.list];
            this.topicGroupList.forEach(element => {
              topicGroupSelectionList.push(element.groupCode);
            });

            this.topicGroupSelectionList = topicGroupSelectionList;
          }

          if(customerGroupList){

            if(this.userId == this.id){
              this.topicGroupData.content = customerGroupList;
              this.topicDataSource = [...this.topicGroupData.content];
            }else{
              this.topicGroupData.content = customerGroupList.list;
              this.topicDataSource = [...this.topicGroupData.content];
            }

          }

        })
    );
  }

  loadStaffById() {
    this.subscriptions.add(this.customerService.getStaffById()
    .pipe(filter((item: any) => item && (this.isForce || this.id == item.id)))
      .subscribe((staff: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/staff/staffEdit'], { queryParams: { 'id': staff.id } });
          this.combineLatestCustomerEventTypeList();
          this.isForce = false;
        }
        this.setForm(staff);
        AppUtility.scrollTop();
      }));
  }

  getRoleListByUserId() {
    this.customerService.loadRoleListByUserId(true, this.id)
  }

  getAllRole(): any {
    this.systemService.loadRoleList(false, this.userId);
  }

  combineLatestResponseofRole(){
    const roleListObservable$ : Observable<any> = this.systemService.getRoleList().pipe(filter((item: any) => item));
    const userRoleListObservable$ : Observable<any> = this.customerService.getRoleListByUserId();

    this.subscriptions.add(
      combineLatest([roleListObservable$,userRoleListObservable$])
      .subscribe(
        ([roleList,userRoleList]) =>{

          if(userRoleList && this.id){
            this.roleSelectionList = [];
            this.roleList = [...userRoleList];
            this.roleList.forEach(element => {
              this.roleSelectionList.push(element.roleCode);
            });
          }

          if(roleList){
            this.rolesData.content = roleList.list;
            this.dataSource = [...this.rolesData.content];
          }
        }
      )
    )
    
  }

  setForm(event: any) {
    this.staffForm = this.fb.group({
      id: [this.id !== undefined ? this.id : ''],
      username: [event !== undefined ? event.username : '', Validators.required],
      email: [event !== undefined ? event.email : '', Validators.required],
      staffPhoneNumber: [event !== undefined ? event.staffPhoneNumber : ''],
      name: [event !== undefined ? event.name : ''],
      status: [event !== undefined ? event.status : 0],
      passwordForm: this.fb.group({
        password: [event !== undefined && event.password1 ? event.password1 : '' ],
        confirmPassword: [event !== undefined && event.password2 ? event.password2 : ''],
      }, { validator: MustMatch('password', 'confirmPassword') }),
      passwordNeedChange: [event !== undefined ? event.passwordNeedChange : ''],
      passwordStrengthLevel: [event !== undefined ? event.passwordStrengthLevel : ''],
      passwordChangeDate: [event !== undefined ? AppUtility.getDateFromMilllis(event.passwordChangeDate) : ''],
      sendEmail: [event !== undefined ? event.sendEmail : ''],
      surveyVersionSetting: [event !== undefined ? event.surveyVersionSetting : ''],
      comments: [event !== undefined ? event.comments : ''],
      customerViewConfigurationId: [event !== undefined ? event.customerViewConfigurationId : ''],
      accessToUserPassword: [event !== undefined ? event.accessToUserPassword : ''],
    });

  }

  back() {
    this.router.navigate(['admin/staff/staffList'], { queryParams: { 'force': this.forcePreviousPageList } });
  }

  delete() {
    if (confirm('Are you sure you want to delete?')) {
      const params : HttpParams = new HttpParams().append('permanentDelete',this.permanentDelete.toString());
      this.subscriptions.add(this.customerService.deleteStaffById(this.id,params).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/staff/staffList'], { queryParams: { 'force': true } });
        }));
    }
  }

  save() {
    if (this.p.password.value) {
      this.p.password.setValidators([Validators.required,
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength)]);
      this.p.confirmPassword.setValidators({ validator: MustMatch('password', 'confirmPassword') });
    }else{
      this.p.password.clearValidators();
      this.p.password.updateValueAndValidity();
    }


    if (this.p.password.value && this.p1.valid) {
      this.getValidateNewPassword(this.p.password.value);
    }
    if (this.staffForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.saveAndUpdateNewRole();
        this.saveAndUpdateNewTopicGroup();
        this.getNewlySelectedAndRemovedCustomerEventTypeList();
        this.subscriptions.add(this.customerService.updateStaff(this.id, this.staffForm.value)
        .pipe(take(1))
          .subscribe((response: any) => {
            this.forcePreviousPageList = true;
          }));
      } else {
        this.subscriptions.add(this.customerService.saveStaff(this.staffForm.value)
        .pipe(take(1))
          .subscribe((response: any) => {
            this.isForce = true;
            this.forcePreviousPageList = true;
            this.id = response.customerManagement.staff.id;
            this.saveAndUpdateNewRole();
            this.saveAndUpdateNewTopicGroup();
            this.loadEventTypeRestrictionsForUserById();
            this.loadStaffById();
          }));
      }
    } else {
      // this.validateForm();
      AppUtility.validateAndHighlightReactiveFrom(this.staffForm);
    }
  }


  getValidateNewPassword(password: any) {
    this.customerService.loadValidateNewPassword(password);
    this.subscriptions.add(this.customerService.getValidateNewPassword().pipe(skipWhile((item: any) => !item))
      .subscribe((passwordValidation: any) => {
        this.saveNewPassword(password);
      }));
  }

  saveNewPassword(password: any) {
    this.subscriptions.add(this.customerService.setNewPassword(this.id, password).pipe(skipWhile((item: any) => !item))
      .subscribe((passwordValidation: any) => {
        console.log(passwordValidation);
      }));
  }
  validateForm() {
    for (const key of Object.keys(this.staffForm.controls)) {
      if (this.staffForm.controls[key].invalid && key === 'passwordForm') {
        const passwordForm: any = this.staffForm.controls.passwordForm;
        for (const keys of Object.keys(passwordForm.controls)) {
          if (passwordForm.controls[keys].invalid) {
            const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + keys + '"]');
            invalidControl.focus();
            break;
          }
        }
      }
      if (this.staffForm.controls[key].invalid && key !== 'passwordForm') {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  roleCheckBoxChangeEvent(event: any) {
    this.selectedRole = [...event];
    this.roleCheckBox = event;
  }

  saveAndUpdateNewRole() {
    for (let index = 0; index < this.roleCheckBox.length; index++) {
      const element = this.roleCheckBox[index];
      const i = this.roleList.findIndex((item: any) => item.roleCode === element.roleCode);
      if (i !== -1) {
        this.roleList.splice(i, 1);
        const j = this.selectedRole.findIndex((item2: any) => item2.roleCode === element.roleCode);
        if (j !== -1) {
          this.selectedRole.splice(j, 1);
        }
      }
    }
    this.deleteRoleOfStaff(this.roleList);
    this.assignRoleToStaff(this.selectedRole);
  }
  assignRoleToStaff(roleList: any) {
    roleList.forEach(element => {
      this.customerService.assignRoleToUser(this.id, element.roleCode);
    });
  }

  deleteRoleOfStaff(deleteList: any) {
    deleteList.forEach(element => {
      this.customerService.deleteRoleById(this.id, element.roleCode);
    });
  }

  saveAndUpdateNewTopicGroup() {
    for (let index = 0; index < this.topicGroupCheckBox.length; index++) {
      const element = this.topicGroupCheckBox[index];
      const i = this.topicGroupList.findIndex((item: any) => item.customerGroupId === element.customerGroupId);
      if (i !== -1) {
        this.topicGroupList.splice(i, 1);
        const j = this.selectedTopicGroup.findIndex((item2: any) => item2.customerGroupId === element.customerGroupId);
        if (j !== -1) {
          this.selectedTopicGroup.splice(j, 1);
        }
      }
    }
    this.deleteTopicGroupOfStaff(this.topicGroupList);
    this.assignTopicGroupToStaff(this.selectedTopicGroup);
  }
  
  assignTopicGroupToStaff(topicGroupList: any) {
    topicGroupList.forEach(element => {
      this.customerService.saveUserCustomerGroup(this.id, element.customerGroupId);
    });
  }

  deleteTopicGroupOfStaff(deleteList: any) {
    deleteList.forEach(element => {
      this.customerService.deleteUserCustomerGroup(this.id, element.customerGroupId);
    });
  }

  topicCheckBoxChangeEvent(event: any) {
    this.selectedTopicGroup = [...event];
    this.topicGroupCheckBox = event;
  }

  loadCustomerEventTypeList(){
    this.systemUtilityService.loadCustomerEventTypeList(false, '');
  }

  loadEventTypeRestrictionsForUserById(){
    this.systemUtilityService.loadEventTypeRestrictionsForUserById(false,this.id);
  }

  combineLatestCustomerEventTypeList(){

    const eventTypeData$ : Observable<any>= this.systemUtilityService.getCustomerEventTypeList().pipe(filter((item: any) => item));
    const eventTypeRestrictionOfUserById$ : Observable<any> = this.systemUtilityService.getCustoemerEventTypeResctrictionForUserId();

    this.subscriptions.add(
      combineLatest([eventTypeData$,eventTypeRestrictionOfUserById$])
      .pipe(filter(data => this.id))
      .subscribe(
        ([eventTypeData, eventTypeRestrictionOfUser]) =>{

          if(eventTypeRestrictionOfUser && this.id){
            console.log(eventTypeRestrictionOfUser);
            let selectedCustomerEventTypesList : Array<any> = [...eventTypeRestrictionOfUser];
            selectedCustomerEventTypesList = selectedCustomerEventTypesList.map(data => data.customerEventTypeId);
            this.customerEventTypeData.selectedElements = selectedCustomerEventTypesList;
          }

          if(eventTypeData){
            this.customerEventTypeData.content = [...eventTypeData];
            this.customerEventTypeData.totalElements = this.customerEventTypeData.content.length;
          }

      }));

  }

  customerEventTypeChangeEvent($event : any){
    this.customerEventTypeData.newlySelectedElements = [...$event];
  }

  getNewlySelectedAndRemovedCustomerEventTypeList(){
  
    const {newlySelected, newlyRemoved } = AppUtility.getNewlySelectedAndRemovedList(this.customerEventTypeData.newlySelectedElements,
      this.customerEventTypeData.selectedElements,'customerEventTypeId');

    console.log('selected ' + newlySelected);
    console.log('removed ' + newlyRemoved);

    this.saveNewlySelectedCustomerEventGroups(newlySelected);
    this.removeCustomerEventTypes(newlyRemoved);

  }

  saveNewlySelectedCustomerEventGroups(customerEventTypeList: Array<any>){
    customerEventTypeList.forEach((customerEventTypeId) =>{
      this.addEventTypeRestrictionsToUserById(customerEventTypeId);
    })
  }

  removeCustomerEventTypes(customerEventTypeList : Array<any>){
    customerEventTypeList.forEach((customerEventTypeId) =>{
      this.deleteEventTypeRestrictionsFromUserById(customerEventTypeId);
    })
  }
  
  addEventTypeRestrictionsToUserById(customerEventTypeId : number){
    this.systemUtilityService.addEventTypeRestrictionsToUserById(customerEventTypeId,this.id);
  }

  deleteEventTypeRestrictionsFromUserById(customerEventTypeId : number){
    this.systemUtilityService.deleteEventTypeRestrictionsFromUserById(customerEventTypeId,this.id);
  }

  get f() { return this.staffForm.controls; }

  get p() {
    const passwordForm: any = this.staffForm.controls.passwordForm;
    return passwordForm.controls;
  }
  get p1() {
    const passwordForm: any = this.staffForm.controls.passwordForm;
    return passwordForm;
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  passwordValid(event) {
    this.passwordIsValid = event;
  }
}
