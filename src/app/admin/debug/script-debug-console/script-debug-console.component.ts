import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, skip, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { ScriptDebugConsoleData } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-script-debug-console',
  templateUrl: './script-debug-console.component.html',
  styleUrls: ['./script-debug-console.component.css']
})
export class ScriptDebugConsoleComponent implements OnInit, OnDestroy {

  // id: any;
  key: any;
  isTrue = true;
  debugForm: FormGroup;
  customerList: any = [];
  // customerData: any;
  users: Users = new Users();
  calculationTypeList: any[] = [];
  scriptDebugEventList: any[] = TableColumnData.SCRIPT_DEBUG_EVENT;
  codeMirrorOptions: any = {
    theme: 'idea',
    mode: 'application/ld+json',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
  };
  topicDescriptionData: Array<any>;
  scriptDebugConsoleData : ScriptDebugConsoleData;
  private subject$ : Subject<any>  = new Subject();
  private readonly subscriptions: Subscription = new Subscription();
  dataListForSuggestions = [];
  constructor(private readonly formBuilder: FormBuilder,
    private readonly topicService: TopicService,
    private readonly loginService: LoginService,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly administrativeService: AdministrativeService,
    private readonly el: ElementRef,
    private readonly location: Location) {
    this.users = this.loginService.getUser();
    // this.customerList = this.users.searchUserList;
    // if (this.customerList.length > 0) {
    //   this.customerData = this.customerList[0];
    // }
    this.activateRoute.queryParams.subscribe(params => {
      this.key = params['key'];
      if (this.key == AppConstant.contextTypeFactor) {
        this.isTrue = false;
      }
    });

    this.scriptDebugConsoleData =  AppUtility.getScriptDebugConsoleData();
    this.findCustomer();
  }

  ngOnInit() {
    this.scrollTop();
    this.loadCalculationTypeList();
    this.getScriptResult();
    this.setForm(undefined);
    // if (this.id !== undefined) {
    //   this.loadBatchScriptById();
    // }

    if(this.isTrue){
      // this.loadPaidServices();
      // this.getPaidServices();
      this.loadTopicDescription();
    }
  }

  setScriptDebugConsoleData(){
    this.debugForm.patchValue(
      {'script' : this.scriptDebugConsoleData.script ,
       'scriptType' : this.scriptDebugConsoleData.scriptType,
       'surveyDescriptionId' : this.scriptDebugConsoleData.surveyDescriptionId
      });
  }

  getCustomerList(url: any) {
    this.subscriptions.add(this.administrativeService.loadCustomerList(url).pipe(skipWhile((item: any) => !item))
      .subscribe((customerList: any) => {
        this.customerList = customerList.administrativeManagement.customerList.list;
      }));
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  loadCalculationTypeList(): any {
    this.systemService.loadCalculationTypeList();
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((calculationTypeList: any) => {
        this.calculationTypeList = calculationTypeList.data;
      }));
  }

  loadTopicDescription() {
    this.topicService.loadAllPossibleTopicDescriptionList(false);
    this.subscriptions.add(this.topicService.getAllPossibletopicDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((topicDescriptionList: any) => {
        this.topicDescriptionData = topicDescriptionList;
      }));
  }

  // loadBatchScriptById() {
  //   this.systemMeasurementService.loadScriptBatchById(Number(this.id));
  //   this.subscriptions.add(this.systemMeasurementService.getScriptBatchById().pipe(skipWhile((item: any) => !item))
  //     .subscribe((response: any) => {
  //       this.setForm(response);
  //     }));
  // }


  //  check comment 'https://xp-dev.com/trac/HEA/ticket/2063#comment:478' to understand the working of the componenet.
  setForm(event: any) {
    this.debugForm = this.formBuilder.group({
      auditId: [this.key ? this.scriptDebugConsoleData.auditId : ''],
      customerName: [this.key ? this.scriptDebugConsoleData.customerName : ''],
      userId: [this.key ? this.scriptDebugConsoleData.userId : ''],
      contextType : [this.key ? this.key : AppConstant.contextTypeSurvey],
      surveyDescriptionId: [this.key ?  this.scriptDebugConsoleData.surveyDescriptionId : ''],
      scriptType: [this.key ? this.scriptDebugConsoleData.scriptType : ''],
      script: [this.key ? this.scriptDebugConsoleData.script: ''],
      batchScriptId: [this.key ? this.scriptDebugConsoleData.batchScriptId: ''],
      // paidServiceId: [this.scriptDebugConsoleData.paidServiceId],
      billingDate: [''],
      factorId: [this.key ? this.scriptDebugConsoleData.factorId: ''],
      event: ['VALIDATE'],
      disableValueCache: [false],
      result: [''],
      executionTime: [''],
      resultType: [''],
      contextPreparationTime: ['']
    });
    if (this.isTrue) {
      this.debugForm.controls.auditId.setValidators([Validators.required]);
      this.debugForm.controls.surveyDescriptionId.setValidators([Validators.required]);
      this.debugForm.updateValueAndValidity();
    }
  }

  changeTheme(event: any): any {
    this.codeMirrorOptions.theme = event.target.value;
  }

  // loadPaidServices() {
  //  this.topicService.loadPaidServiceList();
  // }

  // getPaidServices(){
  //   this.topicService.getPaidServiceList()
  //   .pipe(filter(data => data))
  //   .subscribe(
  //     data =>{
  //       console.log(data);
  //     }
  //   )
  // }

  executeDebug() {

    if ((this.key == AppConstant.contextTypeSurvey || !this.key) && !this.debugForm.valid) {
      this.validateForm();
      return;
    }

    this.saveScriptConsoleDataToLocalStorage();
    this.topicService.scriptDebug(this.debugFromValue);
  }

  saveScriptConsoleDataToLocalStorage(){
    this.scriptDebugConsoleData.customerName = this.debugFromValue.customerName;
    this.scriptDebugConsoleData.auditId = this.debugFromValue.auditId;
    this.scriptDebugConsoleData.script = this.debugFromValue.script;
    this.scriptDebugConsoleData.scriptType = this.debugFromValue.scriptType;
    this.scriptDebugConsoleData.event = this.debugFromValue.event;
    this.scriptDebugConsoleData.userId = this.debugFromValue.userId;

    AppUtility.setScriptDebugConsoleData(this.scriptDebugConsoleData);
  }

  get debugFromValue(){
    return this.debugForm.value;
  }


  getScriptResult(){
    this.subscriptions.add(
      this.topicService.getScriptDebug()
      .pipe(skip(1),filter((data) => data))
      .subscribe(
        scriptDebug =>{
          this.debugForm.controls['result'].setValue( scriptDebug.result);
          this.debugForm.controls['executionTime'].setValue( scriptDebug.executionTime);
          this.debugForm.controls['resultType'].setValue( scriptDebug.resultType);
          this.debugForm.controls['contextPreparationTime'].setValue( scriptDebug.contextPreparationTime);
          AppUtility.scrollTop();
        }
      )
    )
  }

  validateForm() {
    for (const key of Object.keys(this.debugForm.controls)) {
      if (this.debugForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  back() {
    this.location.back();
  }
  get f() { return this.debugForm.controls; }


  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.debugForm.value.auditId !== undefined ? this.debugForm.value.auditId : '')
      .set('customerName',this.debugForm.value.customerName !== undefined ? this.debugForm.value.customerName :'')
      .set('useLike','true')
  }

  findCustomerByAuditIdOrCustomerName(calledBy){
    let filters =  this.filterForCustomer();

    if(calledBy == 'auditId'){
      this.debugForm.patchValue({'customerName' : ''});
      filters = filters.delete('customerName');
    }else{
      this.debugForm.patchValue({'auditId' : ''});
      filters = filters.delete('auditId');
    }
    
    filters = filters.set('useLike','true');
    filters = AppUtility.addNoLoaderParam(filters);
    this.subject$.next(filters);
  }

  findCustomer(){
    this.subscriptions.add(this.subject$
      .pipe(
       debounceTime(600)  
      , distinctUntilChanged())
      .switchMap((filters : HttpParams) => this.loginService.customerSuggestionListRequest(filters))
      .filter(data => data)
      .subscribe(
        (response) =>{
          this.dataListForSuggestions = response.slice(0,100);
          if(this.dataListForSuggestions.length == 1){
            this.selectedSuggestion(this.dataListForSuggestions[0]);
            this.dataListForSuggestions = [];
          }
        }, error =>{
           console.log(error);
        }
      ));
  }

  selectedSuggestion(event){
    this.debugForm.patchValue({ auditId : event.auditId , customerName : event.user.name});
    this.debugForm.patchValue({'userId' : event.userId });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
