import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-pane-data-block-edit',
  templateUrl: './topic-pane-data-block-edit.component.html',
  styleUrls: ['./topic-pane-data-block-edit.component.css']
})
export class TopicPaneDataBlockEditComponent implements OnInit, OnDestroy {
  id: any;
  paneId : any;
  topicDescriptionId : any;
  force : boolean = false;
  dataBlockData: any;
  variableForm: FormGroup;
  dataFieldKeys: TABLECOLUMN[];
  dataFieldData = {
    content: [],
    totalElements: 0
  };
  dataFieldDataSource: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly topicService : TopicService,
    private readonly activateRoute: ActivatedRoute,
    private readonly utilityService : UtilityService,
    private readonly loginService: LoginService,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = AppUtility.forceParamToBoolean(params['force']);
      this.id = params['id'];
      this.paneId = params['paneId'];
      this.topicDescriptionId = params['topicDescriptionId'];
    });
    this.setForm(undefined);

  }


  ngOnInit() {
    this.scrollTop();
    this.dataFieldKeys = TableColumnData.PANE_DATA_FIELD_KEY;
    if(this.id){
      this.getDataBlockById();
      this.loadDataBlockById();
      this.loadDataFieldsofDataBlock();
      this.getDataFieldsofDataBlock();
    }
  }

  scrollTop() {
    window.scroll(0,0);
  }

  setForm(event: any): any {
    this.variableForm = this.formBuilder.group({
      blockCode: [event !== undefined ? event.blockCode : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : '10'],
      label: [event !== undefined ? event.label : '', Validators.required],
      reportLabel: [event !== undefined ? event.reportLabel : '', Validators.required],
      array: [event !== undefined ? event.array : ''],
      minRows: [event !== undefined ? event.minRows : ''],
      maxRows: [event !== undefined ? event.maxRows : ''],
      showFirstRows: [event !== undefined ? event.showFirstRows : ''],
      allowTotalRemoving: [event !== undefined ? event.allowTotalRemoving : ''],
    });
  }


  loadDataBlockById(){
    this.topicService.loadDataBlockById(this.id,this.paneId);
  }

  getDataBlockById(){
    this.subscriptions.add(
      this.topicService.getDataBlockByPaneId()
      .pipe(filter(data => data && data.id == this.id))
      .subscribe(
        dataBlock => {
          this.dataBlockData = dataBlock;
          this.setForm(dataBlock);
          AppUtility.scrollTop();
        }, error =>{
          console.error(error);
        }     
        ))
  }

  back(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'],{queryParams : { id : this.paneId, topicDescriptionId : this.topicDescriptionId }})
  }

  save(): any {

    if(!AppUtility.validateAndHighlightReactiveFrom(this.variableForm)) return;

    const body = Object.assign(this.dataBlockData ? this.dataBlockData : {},this.variableForm.value)

    if(this.id){
      this.topicService.updateDataBlockById(body,this.paneId,this.id);
      return ;
    }

    this.subscriptions.add(
      this.topicService.saveDataBlockByPaneId(body,this.paneId)
      .pipe(take(1))
      .subscribe(
        (response) =>{
          this.id =  response.topicManagement.dataBlock.id;
          this.router.navigate([],
            {
              relativeTo: this.activateRoute,
              queryParams: {id : this.id},
              queryParamsHandling : 'merge'
            });
          this.getDataBlockById();
        }
    ));    

  }

  delete(): any {

    if(!AppUtility.deleteConfirmatonBox())
      return;

    this.subscriptions.add(
      this.topicService.deleteDataBlockById(this.paneId,this.id)
      .pipe(take(1))
      .subscribe(
        (response) =>{
          this.back();
        }));
  }

loadDataFieldsofDataBlock(){
    this.topicService.loadDataFieldsByDataBlock(false,this.paneId,this.id);
}

getDataFieldsofDataBlock(){
  this.subscriptions.add(
    this.topicService.getDataBlockDataFields()
    .pipe(filter(data => true))
    .subscribe(
      (response: any) => {
        this.dataFieldDataSource = response;
      }
    ));
}

highlightErrorField(formControlName : string) : boolean{
  return AppUtility.showErrorMessageOnErrorField(this.f, formControlName);  
}

  addDataField(){
    const queryParams = {dataBlockId : this.id, paneId : this.paneId, topicDescriptionId : this.topicDescriptionId}
    queryParams[AppConstant.DATA_FIELD_EDIT_REQUEST] = AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK;
    this.router.navigate(['admin/topicDescription/topicPaneDataFieldEdit'],
     {queryParams : queryParams})

  }

  goToEditDataField($event : any){
    const queryParams = {id : $event.id, dataBlockId : this.id, paneId : this.paneId, topicDescriptionId : this.topicDescriptionId};
    queryParams[AppConstant.DATA_FIELD_EDIT_REQUEST] = AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_DATA_BLOCK;
    this.router.navigate(['admin/topicDescription/topicPaneDataFieldEdit']
    , {queryParams : queryParams });
  }

  get f() { return this.variableForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
