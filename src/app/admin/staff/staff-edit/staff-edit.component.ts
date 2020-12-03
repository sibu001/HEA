import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { MustMatch } from 'src/app/common/password.validator';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.ROLE_KEY;
  public roleSelectionList: any = [];
  public topicKeys: Array<TableColumnData> = TableColumnData.TOPIC_GROUP_COLUMN_DATA;
  public surveyVersionSettingList: Array<any> = TableColumnData.SURVEY_VERSION_SETTING_DATA;
  public viewConfigurationList: any;
  public dataSource: any;
  public rolesData = {
    content: [],
    totalElements: 0,
  };
  public topicDataSource: any;
  public topicGroupData = {
    content: [],
    totalElements: 0,
  };

  staffForm: FormGroup;
  isForce = false;
  userId: any;
  roleCheckBox: any;
  topicGroupCheckBox: any;
  roleList: any = [];
  selectedRole: any;
  selectedTopicGroup: any;
  topicGroupList: any = [];
  minLength = 12;
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
    private readonly el: ElementRef) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.userId = users.userId;
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getRoleListByUserId();
    });
  }

  ngOnInit() {
    this.loadCustomerViewConfiguration();
    this.getAllRole();
    this.getPasswordValidationRule();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.findUserCustomerGroup(this.id);
      this.customerService.loadStaffById(this.id);
      this.loadStaffById();
    }
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
            this.charactersCount = passwordValidationRule.data[1].rules[0].numberOfCharacters;
          }
          this.regex = '^.*(?=(?:.*?[' + this.pattern
            .replace(']', '').concat('\\\]')
            + ']){' + this.charactersCount + ',}).*$';
          this.p.password.setValidators([Validators.pattern(new RegExp(this.regex))]);
          this.p.password.updateValueAndValidity();
          // this.setPasswordForm();
        }
        console.log(passwordValidationRule);
      }));
  }

  loadCustomerViewConfiguration() {
    this.systemService.loadViewConfigurationList(true);
    this.subscriptions.add(this.systemService.getViewConfigurationList().pipe(skipWhile((item: any) => !item))
      .subscribe((viewConfigurationList: any) => {
        this.viewConfigurationList = viewConfigurationList;
      }));
  }

  findUserCustomerGroup(userId: any) {
    this.customerService.loadUserCustomerGroupList(userId);
    this.subscriptions.add(this.customerService.getUserCustomerGroupsList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.topicGroupData.content = customerGroupList.data.list;
        this.topicDataSource = [...this.topicGroupData.content];
      }));
  }

  loadStaffById() {
    this.subscriptions.add(this.customerService.getStaffById().pipe(skipWhile((item: any) => !item))
      .subscribe((staff: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/staff/staffEdit'], { queryParams: { 'id': staff.id } });
        }
        this.setForm(staff);
      }));
  }

  getRoleListByUserId() {
    this.subscriptions.add(this.customerService.loadRoleListByUserId(true, this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((roleList: any) => {
        this.roleList = roleList.customerManagement.roleListByUserId;
        roleList.customerManagement.roleListByUserId.forEach(element => {
          this.roleSelectionList.push(element.roleCode);
        });
      }));
  }

  getAllRole(): any {
    this.systemService.loadRoleList(true, this.userId);
    this.subscriptions.add(this.systemService.getRoleList().pipe(skipWhile((item: any) => !item))
      .subscribe((roleList: any) => {
        this.rolesData.content = roleList.list;
        this.dataSource = [...this.rolesData.content];
      }));
  }

  setForm(event: any) {
    this.staffForm = this.fb.group({
      id: [this.id !== undefined ? this.id : ''],
      username: [event !== undefined ? event.username : '', Validators.required],
      email: [event !== undefined ? event.email : '', Validators.required],
      staffPhoneNumber: [event !== undefined ? event.staffPhoneNumber : ''],
      name: [event !== undefined ? event.name : ''],
      status: [event !== undefined ? event.status : '0'],
      passwordForm: this.fb.group({
        password: [event !== undefined ? event.password1 : '',
        ],
        confirmPassword: [event !== undefined ? event.password2 : ''],
      }, { validator: MustMatch('password', 'confirmPassword') }),
      passwordNeedChange: [event !== undefined ? event.passwordNeedChange : ''],
      passwordStrengthLevel: [event !== undefined ? event.passwordStrengthLevel : ''],
      passwordChangeDate: [event !== undefined ? event.passwordChangeDate : ''],
      sendEmail: [event !== undefined ? event.sendEmail : ''],
      surveyVersionSetting: [event !== undefined ? event.surveyVersionSetting : ''],
      comments: [event !== undefined ? event.comments : ''],
      customerViewConfigurationId: [event !== undefined ? event.customerViewConfigurationId : ''],
      accessToUserPassword: [event !== undefined ? event.accessToUserPassword : ''],
    });
  }

  back() {
    this.router.navigate(['admin/staff/staffList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.customerService.deleteStaffById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/staff/staffList'], { queryParams: { 'force': true } });
      }));
  }

  save() {

    if (this.p.password) {
      this.p.password.setValidators([Validators.required,
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength)]);
      this.p.confirmPassword.setValidators([Validators.required]);
    }
    if (this.staffForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.checkRole();
        this.subscriptions.add(this.customerService.updateStaff(this.id, this.staffForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadStaffById();
          }));
      } else {
        this.subscriptions.add(this.customerService.saveStaff(this.staffForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadStaffById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.staffForm.controls)) {
      if (this.staffForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  checkRole() {
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
    this.getAllRole();
    this.getRoleListByUserId();
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
  checkTopicGroup() {
    for (let index = 0; index < this.topicGroupCheckBox.length; index++) {
      const element = this.topicGroupCheckBox[index];
      const i = this.roleList.findIndex((item: any) => item.customerGroupId === element.customerGroupId);
      if (i !== -1) {
        this.roleList.splice(i, 1);
        const j = this.selectedTopicGroup.findIndex((item2: any) => item2.customerGroupId === element.customerGroupId);
        if (j !== -1) {
          this.selectedTopicGroup.splice(j, 1);
        }
      }
    }
    this.deleteTopicGroupOfStaff(this.roleList);
    this.assignTopicGroupToStaff(this.selectedRole);
    this.findUserCustomerGroup(this.id);
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

  roleCheckBoxChangeEvent(event: any) {
    this.selectedRole = [...event];
    this.roleCheckBox = event;
  }

  topicCheckBoxChangeEvent(event: any) {
    this.selectedTopicGroup = [...event];
    this.topicGroupCheckBox = event;
  }
  get f() { return this.staffForm.controls; }
  get p() {
    const passwordForm = this.staffForm.controls.passwordForm as FormGroup;
    return passwordForm.controls;
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  passwordValid(event) {
    this.passwordIsValid = event;
  }

}
