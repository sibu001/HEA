import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { StackTraceComponent } from '../stack-trace/stack-trace.component';

@Component({
  selector: 'app-mail-description-edit',
  templateUrl: './mail-description-edit.component.html',
  styleUrls: ['./mail-description-edit.component.css']
})
export class MailDescriptionEditComponent implements OnInit, OnDestroy {

  id: any;
  topicForm: FormGroup;
  public customerGroupKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  contentPartsKeys = TableColumnData.CONTENT_PART_KEYS;
  variableKeys = TableColumnData.VARIABLE_KEYS;
  periodData: any[] = TableColumnData.PERIOD_DATA;
  public customerGroupDataSource: any;
  public contentPartsDataSource: any;
  public variableDataSource: any;
  public totalElement = 0;
  public customerGroupData = {
    content: [],
    totalElements: 0,
  };
  public contentPartsData = {
    content: [],
    totalElements: 0,
  };
  public variableData = {
    content: [],
    totalElements: 0,
  };
  isForce = false;
  userId: any;
  customerGroupCheckBox: any;
  selectedCustomerGroup: any;
  customerGroupList: any = [];
  public customerGroupSelectionList: any = [];
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly activateRoute: ActivatedRoute,
    private readonly customerService: CustomerService,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.loadCustomerGroup(false, '');
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.mailService.loadMailDescriptionById(this.id);
      this.loadMailDescriptionById();
    }
  }

  setForm(event: any) {
    this.topicForm = this.fb.group({
      sourceType: [event !== undefined ? event.sourceType : ''],
      mailName: [event !== undefined ? event.mailName : ''],
      mailFilter: [event !== undefined ? event.mailFilter : ''],
      period: [event !== undefined ? event.period : '', Validators.required],
      periodDayRule: [event !== undefined ? event.periodDayRule : '', Validators.required],
      stopDays: [event !== undefined ? event.stopDays : ''],
      stopNumber: [event !== undefined ? event.stopNumber : ''],
      resetPeriod: [event !== undefined ? event.resetPeriod : '', Validators.required],
      stopDateRule: [event !== undefined ? event.stopDateRule : '', Validators.required],
      subjectTemplate: [event !== undefined ? event.subjectTemplate : '', Validators.required],
      contentType: [event !== undefined ? event.contentType : ''],
      includeHeader: [event !== undefined ? event.includeHeader : ''],
      includeFooter: [event !== undefined ? event.includeFooter : ''],
      ccCoachUser: [event !== undefined ? event.ccCoachUser : ''],
      isActive: [event !== undefined ? event.isActive : ''],
      allowAdminForce: [event !== undefined ? event.allowAdminForce : ''],
      ignoreOptOutMail: [event !== undefined ? event.ignoreOptOutMail : '']
    });
  }

  copy(): any { }

  addContentParts(): any {
    this.router.navigate(['/admin/mailDescription/mailContentParts']);
  }

  addVariable(): any {
    this.router.navigate(['/admin/mailDescription/mailContextVariables']);
  }

  goToEditContentParts(): any {
    this.router.navigate(['/admin/mailDescription/mailContentParts'], { queryParams: { id: this.id } });
  }

  goToEditVariable(): any {
    this.router.navigate(['/admin/mailDescription/mailContextVariables'], { queryParams: { id: this.id } });
  }

  Preview() {
    this.router.navigate(['/admin/mailDescription/mailDescriptionPreview'], { queryParams: { id: this.id } });
  }

  showStackTrace(): any {
    const dialogRef = this.dialog.open(StackTraceComponent, {
      width: '550px',
      height: '300px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  callMailReminder(): any { }


  loadMailDescriptionById() {
    this.subscriptions.add(this.mailService.getMailDescriptionById().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescription: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': mailDescription.id } });
        }
        this.setForm(mailDescription);
      }));
  }

  loadMailContentPartList() {
    this.mailService.loadMailContentPartList();
    this.subscriptions.add(this.mailService.getMailContentPartList().pipe(skipWhile((item: any) => !item))
      .subscribe((mailContentPartList: any) => {

      }));
  }

  loadContextVariableList() {
    this.mailService.loadContextVariableList();
    this.subscriptions.add(this.mailService.getContextVariableList().pipe(skipWhile((item: any) => !item))
      .subscribe((contextVariableList: any) => {

      }));
  }


  back() {
    this.router.navigate(['admin/mailDescription/mailDescriptionList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.mailService.deleteMailDescriptionById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/mailDescription/mailDescriptionList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.topicForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.mailService.updateMailDescription(this.id, this.topicForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadMailDescriptionById();
          }));
      } else {
        this.subscriptions.add(this.mailService.saveMailDescription(this.topicForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadMailDescriptionById();
          }));
      }
    } else {
      this.validateForm();
    }
  }

  findUserCustomerGroup(mailDescriptionId: any) {
    this.subscriptions.add(this.customerService.loadUserCustomerGroupList(mailDescriptionId).pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupList = customerGroupList.customerManagement.userCustomerGroupList.data.list;
        customerGroupList.customerManagement.userCustomerGroupList.data.list.forEach(element => {
          this.customerGroupSelectionList.push(element.groupCode);
        });
        this.loadCustomerGroup(false, '');
      }));
  }

  loadCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData.content = customerGroupList;
        this.customerGroupDataSource = [...this.customerGroupData.content];
      }));
  }
  checkCustomerGroup() {
    for (let index = 0; index < this.customerGroupCheckBox.length; index++) {
      const element = this.customerGroupCheckBox[index];
      const i = this.customerGroupList.findIndex((item: any) => item.customerGroupId === element.customerGroupId);
      if (i !== -1) {
        this.customerGroupList.splice(i, 1);
        const j = this.selectedCustomerGroup.findIndex((item2: any) => item2.customerGroupId === element.customerGroupId);
        if (j !== -1) {
          this.selectedCustomerGroup.splice(j, 1);
        }
      }
    }
    this.deleteCustomerGroupOfMailDescription(this.customerGroupList);
    this.assignCustomerGroupToMailDescription(this.selectedCustomerGroup);
    this.findUserCustomerGroup(this.id);
  }
  assignCustomerGroupToMailDescription(customerGroupList: any) {
    customerGroupList.forEach(element => {
      this.mailService.loadCustomerGroupListByMailDescriptionId(this.id, element.customerGroupId);
    });
  }

  deleteCustomerGroupOfMailDescription(deleteList: any) {
    deleteList.forEach(element => {
      this.mailService.deleteCustomerGroupByMailDescriptionId(this.id, element.customerGroupId);
    });
  }

  customerGroupCheckBoxChangeEvent(event: any) {
    this.selectedCustomerGroup = [...event];
    this.customerGroupCheckBox = event;
  }


  validateForm() {
    for (const key of Object.keys(this.topicForm.controls)) {
      if (this.topicForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.topicForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
