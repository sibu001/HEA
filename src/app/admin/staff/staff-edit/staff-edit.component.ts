import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
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
    });
  }

  ngOnInit() {
    this.loadCustomerViewConfiguration();
    this.findCustomerGroup(true, '');
    this.getAllRole();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.customerService.loadStaffById(this.id);
      this.loadStaffById();
    }
  }

  loadCustomerViewConfiguration() {
    this.systemService.loadViewConfigurationList(true);
    this.subscriptions.add(this.systemService.getViewConfigurationList().pipe(skipWhile((item: any) => !item))
      .subscribe((viewConfigurationList: any) => {
        this.viewConfigurationList = viewConfigurationList;
      }));
  }

  findCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.topicGroupData.content = customerGroupList;
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

  getAllRole(): any {
    this.systemService.loadRoleList(false, this.userId);
    this.subscriptions.add(this.systemService.getRoleList().pipe(skipWhile((item: any) => !item))
      .subscribe((roleList: any) => {
        this.roleList = roleList;
        this.rolesData.content = roleList;
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
      password1: [event !== undefined ? event.password1 : ''],
      password2: [event !== undefined ? event.password2 : ''],
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
    const assignList: any = [];
    this.roleCheckBox.forEach(element => {
      let isAvailable = false;
      let i = 0;
      this.roleList.forEach(roleValue => {
        if (element.roleCode === roleValue.roleCode) {
          isAvailable = true;
          this.roleList.splice(i, 1);
        }
        i++;
      });
      if (!isAvailable) {
        assignList.push(element);
      }
    });
    this.deleteRoleOfStaff(this.roleList);
    this.assignRoleToStaff(assignList);
    this.getAllRole();
  }
  assignRoleToStaff(roleList: any) {
    roleList.array.forEach(element => {
      this.systemService.saveRole(element.roleCode, this.id);
    });
  }

  deleteRoleOfStaff(deleteList: any) {
    deleteList.array.forEach(element => {
      this.systemService.deleteRoleById(element.roleCode, this.id);
    });
  }
  checkTopicGroup() {
  }
  assignTopicGroupToStaff(topicGroupList: any) {

  }

  roleCheckBoxChangeEvent(event: any) {
    this.roleCheckBox = event;
  }

  topicCheckBoxChangeEvent(event: any) {
    this.topicGroupCheckBox = event;
  }
  get f() { return this.staffForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
