import { LoadLookUpValueByType } from './../../../store/topic-state-management/state/topic.action';
import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { HttpParams } from '@angular/common/http';
import { AppUtility } from 'src/app/utility/app.utility';

@Component({
  selector: 'app-topic-pane-data-field-edit',
  templateUrl: './topic-pane-data-field-edit.component.html',
  styleUrls: ['./topic-pane-data-field-edit.component.css']
})
export class TopicPaneDataFieldEditComponent implements OnInit, OnDestroy {

  id: any;
  requestFrom: string;
  requestFromPane : string = AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE;
  requestFromDataBlock : string = AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK;
  dataFieldForm: FormGroup;
  paneId : any;
  force : boolean = false;
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
      this.requestFrom = params[AppConstant.DATA_FIELD_EDIT_REQUEST];
      this.paneId = params['paneId'];
      this.topicDescriptionId = params['topicDescriptionId']
    });
    
  }

  ngOnInit() {
    this.setForm(undefined);
    this.getLookUpDataType();
    this.getLookUpInputType();
    this.getLookUpSource();
    this.getCalculationTypeList();
    this.getLookUpCalculationEvent();

    this.loadLookUpInputType();
    this.loadLookUpDataType();
    this.loadLookUpSource();
    this.loadLookUpCalculationEvent();

    this.loadCalculationTypeList();

    if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE){
      this.getPanesForTopicDescripition();
      this.loadPanesForTopicDescription();
    }


    if(this.id){
      if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE){
        this.loadDataFieldById();
        this.getDataFieldById();
        this.getAllFieldValues();
        this.loadAllFieldValues();
      }


      if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK){
        this.loadDataBlockDataField();
        this.getDataBlockDataField();
        this.loadDataBlockDataFieldFieldValues();
      }
    }
  }

  loadDataBlockDataField(){
    this.topicService.loadDataBlockDataFieldsById(this.paneId,this.dataBlockId,this.id);
  }

  getDataBlockDataField(){
    this.subscriptions.add(
      this.topicService.getDataBlockDataFieldsById()
      .pipe(filter(data => data && data.id == this.id))
      .subscribe(
        (response) =>{
          this.dataFieldDataValue = response;
          this.setForm(response);
      }));
  }

  loadCalculationTypeList(): any {
    this.systemService.loadCalculationTypeList();
  }

  getCalculationTypeList(){
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
    .subscribe((calculationTypeList: any) => {
      this.calculationTypeList = calculationTypeList.data;
      if(!this.dataFieldDataValue) 
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
        if(!this.dataFieldDataValue) 
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
        if(!this.dataFieldDataValue)
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
        if(!this.dataFieldDataValue)
          this.dataFieldForm.patchValue({source : this.sourceTypeList[0].lookupValue});
        AppUtility.scrollTop();
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
          if(!this.dataFieldDataValue)
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
      paneId: [event !== undefined ? event.paneId : this.paneId],
      orderNumber: [event !== undefined ? event.orderNumber : '10'],
      label: [event !== undefined ? event.label : ''],
      reportLabel: [event !== undefined ? event.reportLabel : ''],
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
      userDisplay: [event !== undefined ? event.userDisplay : 'true'],
      paneBlockDisplay: [event !== undefined ? event.paneBlockDisplay : ''],
      required: [event !== undefined ? event.required : ''],
      onChangeRefresh: [event !== undefined ? event.onChangeRefresh : ''],
      nextRowAnswer: [event !== undefined ? event.nextRowAnswer : ''],
      rowsBefore: [event !== undefined ? event.rowsBefore : ''], 
      rowsAfter: [event !== undefined ? event.rowsAfter : ''],
      rowsBetween: [event !== undefined ? event.rowsBetween : ''],
      updatedBy: [event !== undefined ? (event.updatedBy ? event.updatedBy : event.createdBy ) : '']
    });
  }

  addDataField() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataFieldEdit']);
  }
  goToEditDataField() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataFieldEdit'], { queryParams: {} });
  }
  back(): any {
    if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE){
      this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'],{queryParams : { id : this.paneId, topicDescriptionId : this.topicDescriptionId, force : this.force }});
    }else if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK){
      this.router.navigate(['/admin/topicDescription/topicPaneDataBlockEdit'],{queryParams : { id : this.dataBlockId, paneId : this.paneId, topicDescriptionId : this.topicDescriptionId,force : this.force}});
    }
  }

  loadDataFieldById(){
   this.topicService.loadDataFieldById(this.id,this.paneId); 
  }

  getDataFieldById(){
    this.subscriptions.add(
      this.topicService.getDataFieldById()
      .pipe(filter((item: any) => item && this.id == item.id))
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

    if(!AppUtility.validateAndHighlightReactiveFrom(this.dataFieldForm)) return;

    // const body = {...this.dataFieldDataValue,...this.dataFieldForm.value,};
    const body = Object.assign(this.dataFieldDataValue ? this.dataFieldDataValue : {}, this.dataFieldForm.value);

    if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK){

      if(this.id){
        this.topicService.updateDataBlockDataFieldById(this.paneId,this.dataBlockId,this.id,body);
        return;
      }

      body.createdDate = undefined;
      body.updatedDate = undefined;
  
      this.subscriptions.add(
        this.topicService.saveDataBlockDataField(this.paneId,this.dataBlockId,body)
        .pipe(take(1))
        .subscribe(
          (response) =>{
            this.id = response.topicManagement.dataBlockDataField.id;
            this.force = true;
            this.router.navigate([],{
              relativeTo: this.activateRoute,
              queryParams: {id : this.id},
              queryParamsHandling : 'merge'
            });
            this.getDataBlockDataField();
        }));

      return;
    }

    if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE){

      if(this.id){
        this.topicService.updateDataFieldByPaneId(this.paneId,this.id,body);
        return;
      }

      body.createdDate = undefined;
      body.updatedDate = undefined;  

      this.subscriptions.add(
        this.topicService.saveDataFiedlByPaneId(this.paneId,body)
        .pipe(take(1))
        .subscribe(
          (response) =>{
            this.force = true;
            this.id = response.topicManagement.dataBlockDataField.id;
            this.router.navigate([],{
              relativeTo: this.activateRoute,
              queryParams: {id : this.id},
              queryParamsHandling : 'merge'
            });
          this.getDataFieldById();
        }));

      return;
    }

  }

  delete(): any {

    if(!AppUtility.deleteConfirmatonBox()) return;

    if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE){
      this.subscriptions.add(
        this.topicService.deleteDataFieldById(this.paneId,this.id)
        .pipe(take(1))
        .subscribe( (response) => { this.force = true; this.back(); }));
    }else if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK){
      this.subscriptions.add(
        this.topicService.deleteDataBlockDataFieldById(this.paneId,this.dataBlockId,this.id)
        .pipe(take(1))
        .subscribe( (response) => { this.force = true; this.back();}));
    }
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

  loadDataBlockDataFieldFieldValues(){
    this.topicService.loadDataBlockDataFieldFieldValues(this.paneId,this.dataBlockId,this.id);
    this.subscriptions.add(
      this.topicService.getDataBlockDataFieldFieldValues()
      .pipe(filter(data => data))
      .subscribe( (response) =>{
        response.forEach((data,index) =>{
          data.disabled = true;
          data.index = index;
        })
        this.dataFieldData.content = [...response];
      }));
  }

  saveRow() {

  }

  deleteRow(event){
    if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE){
      this.topicService.deleteFieldValuesForDataField(this.paneId,this.id,event.id);
    }else if( this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK){
      this.topicService.deleteDataBlockDataFieldFieldValues(this.paneId,this.dataBlockId,this.id,event.id); 
    }
  }

  addRowEvent(event){
    if(this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE){
      this.topicService.saveDataFieldValue(event,this.paneId,this.id);
    }else if( this.requestFrom == AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK){
      this.topicService.saveDataBlockDataFieldFieldValues(this.paneId,this.dataBlockId,this.id,event);
    }
  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
  }

  get f() { return this.dataFieldForm.controls; }


  highlightErrorField(formControlName : string) : boolean {
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
