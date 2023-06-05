import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
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
export class MailDescriptionEditComponent implements OnInit, OnDestroy ,AfterViewChecked{

  id: any;
  helpHide: boolean;
  hideHelp: any[] = [false, false, false, false, false, false, false, false, false];
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
  updateCustomerGroup: any[] = [];
  customerGroupList: any = [];
  maxProcessedStack: any;
  public customerGroupSelectionList: any = [];
  public mailConfigurationList: any[];
  private readonly subscriptions: Subscription = new Subscription();
  errorMessage: any;
  constructor(
    private readonly fb: FormBuilder,
    private readonly mailService: MailService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngAfterViewChecked(): void {
    
  }

  ngOnInit() {
    this.scrollTop();
    this.getMailPeriodList();
    this.loadMailPeriodList();
    this.loadContentTypeList();
    this.loadMailConfigurationList();
    this.setForm(undefined);
    this.getCustomerGroup();
    this.loadCustomerGroup(false, '');
    if (this.id !== undefined) {
      this.mailService.loadMailDescriptionById(this.id);
      this.getMailDescriptionById();
      this.getUserCustomerGroup();
      this.loadMailContentPartList();
      this.loadContextVariableList();
    } 
  }


  scrollTop() {
    window.scroll(0, 0);
  }

  loadMailPeriodList(): any {
    this.systemService.loadMailPeriodList();
  }

  getMailPeriodList(){
    this.subscriptions.add(this.systemService.getMailPeriod()
    .pipe(filter((item: any) => item))
    .subscribe((mailPeriodList: any) => {
      this.periodData = mailPeriodList.data;
    },
      error => {
        this.errorMessage = error;
      }));
  }

  loadContentTypeList(): any {
    this.systemService.loadContentTypeList();
    this.subscriptions.add(this.systemService.getContentType().pipe(skipWhile((item: any) => !item))
      .subscribe((contentTypeList: any) => {
        this.contentTypeList = contentTypeList.data;
      },
        error => {
          this.errorMessage = error;
        }));
  }

  loadMailConfigurationList() {
    this.mailService.loadMailConfigurationList();
    this.subscriptions.add(this.mailService.getMailConfigurationList().pipe(skipWhile((item: any) => !item))
      .subscribe((mailConfigurationList: any) => {
        this.mailConfigurationList = mailConfigurationList.data;
      },
        error => {
          this.errorMessage = error;
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
      systemMessage: [event !== undefined ? event.systemMessage : ''],
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
      mailConfiguration: [event !== undefined && event.mailConfiguration ? event.mailConfiguration : ''],
    });
  }

  copy(): any { }

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

  callMailSender(): any {
    this.mailService.mailDescriptionProcess(this.id);
  }

  getMailDescriptionById() {
    this.subscriptions.add(this.mailService.getMailDescriptionById().pipe(filter((item: any) => item))
      .subscribe((mailDescription: any) => {
        this.scrollTop();
        this.findUserCustomerGroup(mailDescription.data.id);
        if (this.isForce) {
          this.router.navigate(['admin/mailDescription/mailDescriptionEdit'], { queryParams: { 'id': mailDescription.data.id } });
        }
        this.maxProcessedStack = mailDescription.data ? mailDescription.data.maxProcessedStack : null;
        this.setForm(mailDescription.data);
      },
        error => {
          this.errorMessage = error;
        }));
  }

  back() {
    this.router.navigate(['admin/mailDescription/mailDescriptionList'], { queryParams: { 'force': this.isForce } });
  }

  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.mailService.deleteMailDescriptionById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/mailDescription/mailDescriptionList'], { queryParams: { 'force': true } });
        },
          error => {
            this.errorMessage = error;
          }));
    }
  }

  save() {
    if (this.topicForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.checkCustomerGroup();
        this.subscriptions.add(this.mailService.updateMailDescription(this.id, this.topicForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
          },
            error => {
              this.errorMessage = error;
            }));
      } else {
        this.topicForm.value.totalProcessedTime = '';
        this.topicForm.value.maxProcessedTime = '';
        this.topicForm.value.lastProcessedTime = '';
        this.topicForm.value.lastMaxProcessedTime = '';
        this.getUserCustomerGroup();
        this.subscriptions.add(this.mailService.saveMailDescription(this.topicForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
          },
            error => {
              this.errorMessage = error;
            }));
      }
    } else {
      this.validateAllFormFields(this.topicForm);
      this.validateForm();
    }
  }

  findUserCustomerGroup(mailDescriptionId: any) {
     this.mailService.loadCustomerGroupListByMailDescriptionId(mailDescriptionId);
  }

  getUserCustomerGroup(){
    this.subscriptions.add(
      this.mailService.getCustomerGroupListByMailDescriptionId()
      .pipe(filter(item => item))
      .subscribe(
        response =>{
          this.customerGroupList = [...response];
          this.setTopicGroupData();
        }
      )
    )
  }

  loadCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
  }

  getCustomerGroup(){
    this.subscriptions.add(
      this.systemService.getCustomerGroupList()
      .pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
      this.customerGroupData.content = [...customerGroupList];
      this.setTopicGroupData();
    },
      error => {
        this.errorMessage = error;
      }));
  }

  setTopicGroupData(){

    this.customerGroupSelectionList = [];
    this.customerGroupList.forEach(element => {
      this.customerGroupSelectionList.push(element.customerGroup.groupCode);
    });

    // for making the optional field checked in table
    this.customerGroupList.forEach(element => {
      const i = this.customerGroupData.content.findIndex((item: any) => item.groupCode === element.customerGroup.groupCode);
      if (i !== -1) {
        this.customerGroupData.content[i].optional = element.optional;
      }
    });

    this.customerGroupDataSource = [...this.customerGroupData.content];
  }

  checkCustomerGroup() {
    
    let removeCustomerGroup = [];
    let addCustomerGroup = [];

    // to get only newly selected customer group from the customer group list
    let addCustomerGroupMap = new Map();
    this.customerGroupList.forEach((item) =>{ addCustomerGroupMap.set(item.customerGroupId,item);});

    for (let index = 0; index < this.customerGroupCheckBox.length; index++) {
      if(this.customerGroupList.length  == 0){
        addCustomerGroup = [...this.customerGroupCheckBox];
        break;
      }else{
        const exists = addCustomerGroupMap.get(this.customerGroupCheckBox[index].customerGroupId); 
        if(!exists 
          || (exists.optional != this.customerGroupCheckBox[index].optional)){  // condition to check weather the optional checkbox has changed or not.
          addCustomerGroup.push({...this.customerGroupCheckBox[index]});
        }
      }
    }

    // to get only removed un-checked customer group from the seleceted-customer group list
    let removeCustomerGroupMap = new Map();
    this.customerGroupCheckBox.forEach((item) =>{ removeCustomerGroupMap.set(item.customerGroupId,item);});

    for (let index = 0; index < this.customerGroupList.length; index++) {
      if(this.customerGroupCheckBox.length == 0){
        removeCustomerGroup = [...this.customerGroupList]
        break;
      }else{
        const exists = removeCustomerGroupMap.get(this.customerGroupList[index].customerGroupId);
          if(!exists){
            removeCustomerGroup.push(this.customerGroupList[index]);
            const ind = this.customerGroupDataSource.findIndex((data) => data.customerGroupId == this.customerGroupList[index].customerGroupId);
            this.customerGroupDataSource[ind].optional = false;
          }
      }
    }

    this.customerGroupDataSource = 
      this.customerGroupDataSource.map((data) => {
        data.optional = false;
        return data;
    });

    this.deleteCustomerGroupOfMailDescription(removeCustomerGroup);
    this.assignCustomerGroupToMailDescription(addCustomerGroup);

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
    },
      error => {
        this.errorMessage = error;
      });
  }

  customerGroupCheckBoxChangeEvent(event: any) {

    if (!(event instanceof Array)){
      return;
    }
    this.customerGroupCheckBox = event;
  }

  loadMailContentPartList() {
    this.mailService.loadMailContentPartList(this.id);
    this.subscriptions.add(this.mailService.getMailContentPartList().pipe(skipWhile((item: any) => !item))
      .subscribe((mailContentPartList: any) => {
        this.contentPartsDataSource = mailContentPartList.data;
      },
        error => {
          this.errorMessage = error;
        }));
  }

  addContentParts(): any {
    this.router.navigate(['/admin/mailDescription/mailContentParts'], { queryParams: { id: this.id } });
  }

  goToEditContentParts(event: any): any {
    this.router.navigate(['/admin/mailDescription/mailContentParts'], { queryParams: { id: this.id, contentId: event.id } });
  }

  loadContextVariableList() {
    this.mailService.loadContextVariableList(this.id);
    this.subscriptions.add(this.mailService.getContextVariableList().pipe(skipWhile((item: any) => !item))
      .subscribe((contextVariableList: any) => {
        this.variableDataSource = contextVariableList.data;
      },
        error => {
          this.errorMessage = error;
        }));
  }

  addVariable(): any {
    this.router.navigate(['/admin/mailDescription/mailContextVariables'], { queryParams: { id: this.id } });
  }

  goToEditVariable(event: any): any {
    this.router.navigate(['/admin/mailDescription/mailContextVariables'], { queryParams: { id: this.id, variableId: event.id } });
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
