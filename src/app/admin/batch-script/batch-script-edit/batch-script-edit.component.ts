import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { ScriptDebugConsoleData } from 'src/app/models/filter-object';
import { LoginService } from 'src/app/services/login.service';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-batch-script-edit',
  templateUrl: './batch-script-edit.component.html',
  styleUrls: ['./batch-script-edit.component.css']
})
export class BatchScriptEditComponent implements OnInit, OnDestroy {

  public batchScriptForm: FormGroup;
  public id: any;
  public topicGroupCheckBox: any = [];
  public topicGroupSelectionList: any = [];
  public topicDataSource: any;
  public topicGroupData = {
    content: [],
    totalElements: 0,
  };
  selectedTopicGroup: any;
  topicGroupList: any = [];
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
  topicGroupKey: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_GROUP_KEY;
  periodData: any[];
  calculationTypeList: any[];
  isForce = false;
  topicData: any;
  liveOrNot: string;
  private readonly subscriptions: Subscription = new Subscription();
  scriptDebugConsoleData : ScriptDebugConsoleData;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly topicService: TopicService,
    private readonly loginService: LoginService,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  
    this.scriptDebugConsoleData = AppUtility.getScriptDebugConsoleData();
  }

  ngOnInit() {
    this.loadBatchPeriodList();
    this.loadCalculationTypeList();
    this.getCustomerGroupTableData();
    this.loadCustomerGroup(false,'');
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.loadTopicDescription();
      this.loadBatchScriptGroup(this.id);
      this.systemMeasurementService.loadScriptBatchById(Number(this.id));
      this.loadBatchScriptById();
    }
    AppUtility.scrollTop();
    this.checkLiveServer();
  }

  loadBatchPeriodList(): any {
    this.systemService.loadBatchPeriodList();
    this.subscriptions.add(this.systemService.getBatchPeriodList().pipe(skipWhile((item: any) => !item))
      .subscribe((batchPeriodList: any) => {
        this.periodData = batchPeriodList.data;
      }));
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
        this.topicData = topicDescriptionList;
      }));
  }

  loadBatchScriptById() {
    this.subscriptions.add(this.systemMeasurementService.getScriptBatchById()
    .pipe(filter((item: any) => item && (this.id == item.id || this.isForce)))
      .subscribe((response: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/batchScript/batchScriptEdit'], { queryParams: { 'id': response.id } });
        }
        this.setForm(response);
        this.id = response.id;
        AppUtility.scrollTop();
      }));
  }

  setForm(event: any) {
    this.batchScriptForm = this.formBuilder.group({
      batchName: [event !== undefined ? event.batchName : ''],
      batchPeriod: [event !== undefined ? event.batchPeriod : 'D', Validators.required],
      periodDay: [event !== undefined ? event.periodDay : '', Validators.required],
      forEachCustomer: [event !== undefined ? event.forEachCustomer : ''],
      calculationType: [event !== undefined ? event.calculationType : 'javascript'],
      batchFilter: [event !== undefined ? event.batchFilter : ''],
      surveyDescriptionId: [event !== undefined ? event.surveyDescriptionId : ''],
      calculation: [event !== undefined ? event.calculation : ''],
      mailAddress: [event !== undefined ? event.mailAddress : ''],
      comments: [event !== undefined ? event.comments : ''],
      resultHeader: [event !== undefined ? event.resultHeader : ''],
    });
  }

  back() {
    this.router.navigate(['admin/batchScript/batchScriptList'], { queryParams: { 'force': this.isForce } });
  }

  goToDebug() {

    // https://xp-dev.com/trac/HEA/ticket/2063#comment:478 see for understanding
    this.setScriptDebugConsoleData();
    const queryParams : any = { batchScriptId: this.id };
    if(this.batchScriptForm.value.surveyDescriptionId){
      queryParams.key= AppConstant.contextTypeSurvey;
    }else{
      queryParams.key=AppConstant.contextTypeBatch;
    }
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: queryParams });
  }

  setScriptDebugConsoleData(){
    this.scriptDebugConsoleData.batchScriptId = this.id;
    this.scriptDebugConsoleData.script = this.batchScriptForm.value.calculation;
    this.scriptDebugConsoleData.scriptType = this.batchScriptForm.value.calculationType;
    this.scriptDebugConsoleData.surveyDescriptionId = this.batchScriptForm.value.surveyDescriptionId;
    AppUtility.setScriptDebugConsoleData(this.scriptDebugConsoleData); 
  }
  
//for better understanding check-https://xp-dev.com/trac/HEA/ticket/1204#comment:16
  runNow() {
    if (this.liveOrNot === 'live') {
      const confirmed = AppUtility.liveServerAlertText();
      if (confirmed) {
        this.processScriptBatch();
      }
    } else if (this.liveOrNot === 'sandbox') {
      this.processScriptBatch();
    }
  }

  processScriptBatch(){
      this.subscriptions.add(
      this.systemMeasurementService.processScriptBatch(this.id)
      .pipe(take(1))
      .subscribe((data) =>{ AppUtility.scrollTop();}));
}

  delete() {
    if(AppUtility.deleteConfirmatonBox()){
      this.subscriptions.add(this.systemMeasurementService.deleteScriptBatchById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/batchScript/batchScriptList'], { queryParams: { 'force': true } });
      }));
    }
    
  }

  save() {
    if (this.batchScriptForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.checkTopicGroup();
          this.systemMeasurementService.updateScriptBatch(this.id, this.batchScriptForm.value)
          // this.isForce = true;
      } else {
        this.subscriptions.add(this.systemMeasurementService.saveScriptBatch(this.batchScriptForm.value)
          .pipe(take(1))
          .subscribe((response: any) => {
            this.isForce = true;
            this.id = response.systemMeasurement.scriptBatch.id;
            this.loadBatchScriptById();
            this.loadTopicDescription();
          }));
      }
    } else {
      AppUtility.validateAndHighlightReactiveFrom(this.batchScriptForm);
      // this.validateForm();
    }
  }

  validateForm() {
    for (const key of Object.keys(this.batchScriptForm.controls)) {
      if (this.batchScriptForm.controls[key].invalid) {
        this.batchScriptForm.controls[key].markAsTouched();
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }


  changeTheme(event: any): any {
    this.codeMirrorOptions.theme = event.target.value;
  }

  loadCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
  }
 
  loadBatchScriptGroup(batchId : any){
   this.systemMeasurementService.loadScriptBatchGroup(batchId);
  }

  getCustomerGroupTableData(){
    const batchScriptGroup$ : Observable<any> = this.systemMeasurementService.getScriptBatchGroup().filter((data) => ( data instanceof Array) && (data[0]? data[0].batchScriptId == this.id : true));
    const customerGroupList$ : Observable<any> = this.systemService.getCustomerGroupList().filter(data => data != undefined);

    this.subscriptions.add(
      combineLatest([batchScriptGroup$,customerGroupList$ ])
      .subscribe( ([scriptBatchGroup, customerGroupList ]) =>{

        const seletedBatchScriptList : Array<any> = [];
        this.topicGroupList = [...scriptBatchGroup];
        scriptBatchGroup.forEach(element => {

          if(!element.customerGroup){
            const customerGroupIndex = this.topicDataSource.findIndex((data) => data.customerGroupId == element.customerGroupId);
            element.customerGroup = this.topicDataSource[customerGroupIndex];
            scriptBatchGroup = element.customerGroup;
          }

          seletedBatchScriptList.push(element.customerGroup.groupCode);
        });

        this.topicGroupSelectionList = seletedBatchScriptList;

        this.topicGroupData.content = customerGroupList;
        this.topicDataSource = [...this.topicGroupData.content];
      }));

  }
 
  checkTopicGroup() {
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

    this.deleteTopicGroupOfBatch(this.topicGroupList);
    this.assignTopicGroupToBatchScript(this.selectedTopicGroup);
  }
  assignTopicGroupToBatchScript(topicGroupList: any) {
    if (topicGroupList) {
      topicGroupList.forEach(element => {
        this.systemMeasurementService.saveScriptBatchGroup(this.id, element.customerGroupId);
      });
    }
  }

  deleteTopicGroupOfBatch(deleteList: any) {
    if (deleteList) {
      deleteList.forEach(element => {
        this.systemMeasurementService.deleteScriptBatchGroup(this.id, element.customerGroupId);
      });
    }
  }

  topicCheckBoxChangeEvent(event: any) {
    this.selectedTopicGroup = [...event];
    this.topicGroupCheckBox = event;
  }

  get f() { return this.batchScriptForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  checkLiveServer(){

    this.loginService.performGet('conf/'+'server').subscribe(
      (data) => {
       this.liveOrNot = data.data;
       console.log(data);
      }
    )
  }
}

