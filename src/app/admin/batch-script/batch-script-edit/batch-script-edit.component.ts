import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { ScriptDebugConsoleData } from 'src/app/models/filter-object';
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
  private readonly subscriptions: Subscription = new Subscription();
  scriptDebugConsoleData : ScriptDebugConsoleData;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly topicService: TopicService,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  
    this.scriptDebugConsoleData = AppUtility.getScriptDebugConsoleData();
  }

  ngOnInit() {
    this.loadBatchPeriodList();
    this.loadCalculationTypeList();
    this.loadTopicDescription();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.findBatchCustomerGroup(this.id);
      this.systemMeasurementService.loadScriptBatchById(Number(this.id));
      this.loadBatchScriptById();
    }
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
    this.topicService.loadTopicDescriptionList(true, '');
    this.subscriptions.add(this.topicService.getTopicDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((topicDescriptionList: any) => {
        this.topicData = topicDescriptionList;
      }));
  }

  loadBatchScriptById() {
    this.subscriptions.add(this.systemMeasurementService.getScriptBatchById().pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/batchScript/batchScriptEdit'], { queryParams: { 'id': response.id } });
        }
        this.setForm(response);
      }));
  }
  setForm(event: any) {
    this.batchScriptForm = this.formBuilder.group({
      batchName: [event !== undefined ? event.batchName : ''],
      batchPeriod: [event !== undefined ? event.batchPeriod : '', Validators.required],
      periodDay: [event !== undefined ? event.periodDay : '', Validators.required],
      forEachCustomer: [event !== undefined ? event.forEachCustomer : ''],
      calculationType: [event !== undefined ? event.calculationType : ''],
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

  runNow() {

  }

  delete() {
    this.subscriptions.add(this.systemMeasurementService.deleteScriptBatchById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/batchScript/batchScriptList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.batchScriptForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.checkTopicGroup();
        this.subscriptions.add(this.systemMeasurementService.updateScriptBatch(this.id, this.batchScriptForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadBatchScriptById();
          }));
      } else {
        this.subscriptions.add(this.systemMeasurementService.saveScriptBatch(this.batchScriptForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadBatchScriptById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.batchScriptForm.controls)) {
      if (this.batchScriptForm.controls[key].invalid) {
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
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.topicGroupData.content = customerGroupList;
        this.topicDataSource = [...this.topicGroupData.content];
      }));
  }

  findBatchCustomerGroup(batchId: any) {
    this.subscriptions.add(this.systemMeasurementService.getScriptBatchGroup(batchId).pipe(skipWhile((item: any) => !item))
      .subscribe((groupList: any) => {
        this.topicGroupList = groupList.systemMeasurement.scriptBatchGroup;
        groupList.systemMeasurement.scriptBatchGroup.forEach(element => {
          this.topicGroupSelectionList.push(element.customerGroup.groupCode);
        });
        this.loadCustomerGroup(false, '');
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
    this.findBatchCustomerGroup(this.id);
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
}

