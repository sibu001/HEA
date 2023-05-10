import { LoadLookUpValueByType } from './../../../store/topic-state-management/state/topic.action';
import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-topic-pane-data-field-edit',
  templateUrl: './topic-pane-data-field-edit.component.html',
  styleUrls: ['./topic-pane-data-field-edit.component.css']
})
export class TopicPaneDataFieldEditComponent implements OnInit, OnDestroy {

  id: any;
  isBlockField: false;
  dataFieldForm: FormGroup;
  paneId : any;
  dataBlockId : any;
  topicDescriptionId : any;
  dataFieldKeys = TableColumnData.PANE_DATA_FIELD_VALUES_KEY;
  dataFieldDataValue : any;
  dataFieldData = {
    content: [],
    totalElements: 0
  };
  calculationTypeList: any[] = [];
  dataFieldDataSource: any;
  paneData =[];
  inputTypeList = [];
  sourceTypeList = [];
  dataTypeList = [];
  calculationEventList = [];
  calculationPeriodList: any[] = TableColumnData.CALCULATION_PERIOD;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly topicService: TopicService,
    private readonly location: Location,
    private readonly datePipe : DatePipe,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.dataBlockId = params['dataBlockId'];
      this.isBlockField = params['isBlockField'] !== undefined ? JSON.parse(params['isBlockField']) : false;
      this.paneId = params['paneId'];
      this.topicDescriptionId = params['topicDescriptionId']
    });
    
    this.setForm(undefined);
    this.getLookUpDataType();
    this.getLookUpInputType();
    this.getLookUpSource();
    this.getCalculationTypeList();
    this.getLookUpCalculationEvent();
    this.getPanesForTopicDescripition();

    this.loadLookUpInputType();
    this.loadLookUpDataType();
    this.loadLookUpSource();
    this.loadLookUpCalculationEvent();
  }

  ngOnInit() {
    this.loadPanesForTopicDescription();
    this.loadCalculationTypeList();
    this.getDataFieldById();

    if(this.id){
      this.getAllFieldValues();
      this.loadDataFieldById();
      this.loadAllFieldValues();
    }
  }

  loadDataBlockDataField(){
    this.topicService.loadDataBlockDataFieldsById(this.paneId,this.dataBlockId,this.id);
  }

  getDataBlockDataField(){
    this.subscriptions.add(
      this.topicService.getDataBlockDataFieldsById()
      .pipe()
      .subscribe(
        (response) =>{
          console.log(response);
        }));
  }

  loadCalculationTypeList(): any {
    this.systemService.loadCalculationTypeList();
  }

  getCalculationTypeList(){
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
    .subscribe((calculationTypeList: any) => {
      this.calculationTypeList = calculationTypeList.data;
      this.dataFieldForm.patchValue({calculationType : this.calculationTypeList[1].lookupValue})
    }));
  }

  loadPanesForTopicDescription(){
    this.topicService.loadPaneListByTopicDescriptionId(this.topicDescriptionId, new HttpParams());
  }

  getPanesForTopicDescripition(){
    this.subscriptions.add(
    this.topicService.getPaneListByTopicDescriptionId()
    .pipe(skipWhile((item: any) => !item))
    .subscribe(
      response =>{
        this.paneData = response;
      }, error =>{
        console.error(error);
      }
    ));
  }

  loadLookUpDataType(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeDataType);
  }

  getLookUpDataType(){
    this.subscriptions.add(
    this.topicService.getLookValueForDataType()
    .pipe(skipWhile((item: any) => !item))
    .subscribe(
      response =>{
        this.dataTypeList = response;
        this.dataFieldForm.patchValue({dataType : this.dataTypeList[0].lookupValue})
      }, error =>{
        console.error(error);
      }
    ))
  }

  loadLookUpInputType(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeInputType);
  }

  getLookUpInputType(){
    this.subscriptions.add(
    this.topicService.getLookValueForInputType()
    .pipe(skipWhile((item: any) => !item))
    .subscribe(
      response =>{
        this.inputTypeList = response;
        this.dataFieldForm.patchValue({inputType : this.inputTypeList[0].lookupValue})
      }, error =>{
        console.error(error);
      }
    ))
  }

  loadLookUpSource(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeSource);
  }

  getLookUpSource(){
    this.subscriptions.add(
    this.topicService.getLookValueForSource()
    .pipe(skipWhile((item: any) => !item))
    .subscribe(
      response =>{
        this.sourceTypeList = response;
        this.dataFieldForm.patchValue({source : this.sourceTypeList[0].lookupValue})
      }, error =>{
        console.error(error);
      }
    ))
  }

  loadLookUpCalculationEvent(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUPCalcutaionEvent);
  }

  getLookUpCalculationEvent(){
    this.subscriptions.add(
      this.topicService.getLookValueForCalculationEvent()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        response =>{
          this.calculationEventList = response;
          this.dataFieldForm.patchValue({calculationEvent : this.calculationEventList[0].lookupValue})
        }, error =>{
          console.error(error);
        }
      )
    )
  }

  setForm(event: any): any {
    this.dataFieldForm = this.formBuilder.group({
      field: [event !== undefined ? event.field : '', Validators.required],
      paneId: [event !== undefined ? event.paneId : this.paneId, Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      label: [event !== undefined ? event.label : '', Validators.required],
      reportLabel: [event !== undefined ? event.reportLabel : '', Validators.required],
      source: [event !== undefined ? event.source : ''],
      dataType: [event !== undefined ? event.dataType : ''],
      inputType: [event !== undefined ? event.inputType : ''],
      viewCondition: [event !== undefined ? event.viewCondition : ''],
      validation: [event !== undefined ? event.validation : ''],
      skipFieldValuesValidation : [event !== undefined ? event.skipFieldValuesValidation : ''],
      validationErrorMessage: [event !== undefined ? event.validationErrorMessage : ''],
      calculationType: [event !== undefined ? event.calculationType : ''],
      calculationPeriod : [event !== undefined ? event.calculationPeriod : ''],
      calculation: [event !== undefined ? event.calculation : ''],
      calculationEvent: [event !== undefined ? event.calculationEvent : ''],
      displayPattern: [event !== undefined ? event.displayPattern : ''],
      inputMask: [event !== undefined ? event.inputMask : ''],
      readOnly: [event !== undefined ? event.readOnly : ''],
      unit: [event !== undefined ? event.unit : ''],
      helpText: [event !== undefined ? event.helpText : ''],
      comments: [event !== undefined ? event.comments : ''],
      userDisplay: [event !== undefined ? event.userDisplay : ''],
      required: [event !== undefined ? event.required : ''],
      onChangeRefresh: [event !== undefined ? event.onChangeRefresh : ''],
      nextRowAnswer: [event !== undefined ? event.nextRowAnswer : ''],
      rowsBefore: [event !== undefined ? event.rowsBefore : ''], 
      rowsAfter: [event !== undefined ? event.rowsAfter : ''],
      rowsBetween: [event !== undefined ? event.rowsBetween : ''],
      updatedBy: [event !== undefined ? (event.updatedBy ? event.updatedBy : event.createdBy ) : ''],
      updatedDate: [event !== undefined ? this.datePipe.transform((event.updatedDate ? event.updatedDate : event.createdDate),'MM/dd/yyyy HH:mm:ss'): '']
    });
  }

  addDataField() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataFieldEdit']);
  }
  goToEditDataField() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataFieldEdit'], { queryParams: {} });
  }
  back(): any {
    try{
      this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'],{queryParams : { id : this.paneId, topicDescriptionId : this.topicDescriptionId }})
    }catch(err){
      history.back();
    }
  }

  loadDataFieldById(){
   this.topicService.loadDataFieldById(this.id,this.paneId); 
  }

  getDataFieldById(){
    this.subscriptions.add(
      this.topicService.getDataFieldById()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        response =>{
          if(!this.id){
            this.id = response.id;
            this.router.navigate([],{
              relativeTo: this.activateRoute,
              queryParams: {id : this.id},
              queryParamsHandling : 'merge'
            })
          }
          this.dataFieldDataValue = response;
          this.setForm(response);
        } , error =>{
          console.error(error);
        }
      )
    )
  }

  save(): any {
    const body = {...this.dataFieldForm.value, ...this.dataFieldDataValue};
    body.createdDate = undefined;
    body.updatedDate = undefined;
    this.topicService.saveDataFiedlById(this.paneId,body);

  }

  delete(): any {
    this.topicService.deleteDataFieldById(this.paneId,this.id);
    this.back();
  }

  loadAllFieldValues(){
    this.topicService.loadAllFieldValuesForDataField(this.paneId,this.id);
  }

  getAllFieldValues(){
    this.topicService.getFieldValuesForDataField()
    .pipe(skipWhile((item: any) => !item))
    .subscribe(
      response =>{
        response.forEach((data,index) =>{
          data.disabled = true;
          data.index = index;
        })
        this.dataFieldData.content = [...response];
      }, error =>{
        console.error(error);
      }
    )
  }

  saveRow() {

  }

  deleteRow(event){
    console.log(event);
    this.topicService.deleteFieldValuesForDataField(this.paneId,this.id,event.id);
  }

  addRowEvent(event){
    this.topicService.saveDataFieldValue(event,this.paneId,this.id);
  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
  }

  get f() { return this.dataFieldForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
