import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';
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
  contentTypeList: any = [];
  public customerGroupKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  contentPartsKeys = TableColumnData.CONTENT_PART_KEYS;
  variableKeys = TableColumnData.VARIABLE_KEYS;
  sourceTypeList: any[] = TableColumnData.SOURCE_TYPE;
  periodData: any[];
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
  updateCustomerGroup: any[] = [];
  customerGroupList: any = [];
  maxProcessedStack: any;
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
    this.scrollTop();
    this.loadMailPeriodList();
    this.loadContentTypeList();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.mailService.loadMailDescriptionById(this.id);
      this.loadMailDescriptionById();
      this.findUserCustomerGroup(this.id);
    } else {
      this.loadCustomerGroup(false, '');
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  loadMailPeriodList(): any {
    this.systemService.loadMailPeriodList();
    this.subscriptions.add(this.systemService.getMailPeriod().pipe(skipWhile((item: any) => !item))
      .subscribe((mailPeriodList: any) => {
        this.periodData = mailPeriodList.data;
      }));
  }

  loadContentTypeList(): any {
    this.systemService.loadContentTypeList();
    this.subscriptions.add(this.systemService.getContentType().pipe(skipWhile((item: any) => !item))
      .subscribe((contentTypeList: any) => {
        this.contentTypeList = contentTypeList.data;
      }));
  }

  setForm(event: any) {
    this.topicForm = this.fb.group({
      sourceType: [event !== undefined ? event.sourceType : 'CUST'],
      mailName: [event !== undefined ? event.mailName : ''],
      mailFilter: [event !== undefined ? event.mailFilter : ''],
      mailPeriod: [event !== undefined ? event.mailPeriod : 'M', Validators.required],
      periodDayRule: [event !== undefined ? event.periodDayRule : '', Validators.required],
      stopDays: [event !== undefined ? event.stopDays : ''],
      stopNumber: [event !== undefined ? event.stopNumber : ''],
      stopPeriod: [event !== undefined ? event.stopPeriod : 'D', Validators.required],
      stopDateRule: [event !== undefined ? event.stopDateRule : ''],
      subjectTemplate: [event !== undefined ? event.subjectTemplate : '', Validators.required],
      contentType: [event !== undefined ? event.contentType : 'H'],
      includeHeader: [event !== undefined ? event.includeHeader : false],
      includeFooter: [event !== undefined ? event.includeFooter : false],
      ccCoachUser: [event !== undefined ? event.ccCoachUser : false],
      active: [event !== undefined ? event.active : false],
      allowAdminForce: [event !== undefined ? event.allowAdminForce : false],
      ignoreOptOutMail: [event !== undefined ? event.ignoreOptOutMail : false],
      totalCalls: [event !== undefined ? event.totalCalls : ''],
      totalProcessedTimeShow: [event !== undefined ? AppUtility.convertMillisecondToTime(event.totalProcessedTime) : '00:00:00'],
      maxProcessedTimeShow: [event !== undefined ? AppUtility.convertMillisecondToTime(event.maxProcessedTime) : '00:00:00'],
      maxProcessedId: [event !== undefined ? event.maxProcessedId : ''],
      maxProcessedIdShow: [event !== undefined && event.maxProcessedId ? '(' + event.maxProcessedId + ')' : ''],
      lastCalls: [event !== undefined ? event.lastCalls : ''],
      lastProcessedTimeShow: [event !== undefined ? AppUtility.convertMillisecondToTime(event.lastProcessedTime) : '00:00:00'],
      lastMaxProcessedTimeShow: [event !== undefined ? AppUtility.convertMillisecondToTime(event.lastMaxProcessedTime) : '00:00:00'],
      lastMaxProcessedId: [event !== undefined ? event.lastMaxProcessedId : ''],
      lastMaxProcessedIdShow: [event !== undefined && event.lastMaxProcessedId ? '(' + event.lastMaxProcessedId + ')' : ''],
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
      data: { 'maxProcessedStack': this.maxProcessedStack }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  callMailReminder(): any { }


  loadMailDescriptionById() {
    this.subscriptions.add(this.mailService.getMailDescriptionById().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescription: any) => {
        this.scrollTop();
        if (this.isForce) {
          this.findUserCustomerGroup(this.id);
          this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': mailDescription.data.id } });
        }
        this.maxProcessedStack = mailDescription.data ? mailDescription.data.maxProcessedStack : null;
        this.setForm(mailDescription.data);
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
        this.checkCustomerGroup();
        this.subscriptions.add(this.mailService.updateMailDescription(this.id, this.topicForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadMailDescriptionById();
          }));
      } else {
        this.topicForm.value.totalProcessedTime = '';
        this.topicForm.value.maxProcessedTime = '';
        this.topicForm.value.lastProcessedTime = '';
        this.topicForm.value.lastMaxProcessedTime = '';
        this.subscriptions.add(this.mailService.saveMailDescription(this.topicForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadMailDescriptionById();
          }));
      }
    } else {
      this.validateAllFormFields(this.topicForm);
      this.validateForm();
    }
  }

  findUserCustomerGroup(mailDescriptionId: any) {
    this.subscriptions.add(this.mailService.loadCustomerGroupListByMailDescriptionId(mailDescriptionId).pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupList = customerGroupList.mailManagement.mailDescriptionCustomerGroupList.data;
        customerGroupList.mailManagement.mailDescriptionCustomerGroupList.data.forEach(element => {
          this.customerGroupSelectionList.push(element.customerGroup.groupCode);
        });
        this.loadCustomerGroup(false, '');
      }));
  }

  loadCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData.content = [...customerGroupList];
        this.customerGroupList.forEach(element => {
          const i = this.customerGroupData.content.findIndex((item: any) => item.groupCode === element.customerGroup.groupCode);
          if (i !== -1) {
            this.customerGroupData.content[i].optional = element.optional;
          }
        });
        this.customerGroupDataSource = [...this.customerGroupData.content];
      }));
  }
  checkCustomerGroup() {
    for (let index = 0; index < this.customerGroupList.length; index++) {
      const i = this.customerGroupCheckBox.findIndex((item: any) => (item.customerGroupId === this.customerGroupList[index].customerGroupId && item.optional !== this.customerGroupList[index].optional));
      if (i !== -1) {
        this.updateCustomerGroup.push(this.customerGroupCheckBox[i]);
      }
    }
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
    this.assignCustomerGroupToMailDescription(this.updateCustomerGroup);
    // this.findUserCustomerGroup(this.id);
  }
  assignCustomerGroupToMailDescription(customerGroupList: any) {
    customerGroupList.forEach(element => {
      const params = new HttpParams()
        .set('optional', element.optional ? element.optional : false);
      this.mailService.assignCustomerGroupToMailDescription(this.id, element.customerGroupId, params);
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

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  get f() { return this.topicForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
