import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, pipe, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-key-indicator-edit',
  templateUrl: './key-indicator-edit.component.html',
  styleUrls: ['./key-indicator-edit.component.css']
})
export class KeyIndicatorEditComponent implements OnInit, OnDestroy {
  id: any;
  keyIndicatorForm: FormGroup;
  public popStateEvent : any;
  public forceReloadListScreen : boolean = false;
  public forceReload : boolean = false;
  public customerGroupKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  variableKeys = TableColumnData.VARIABLE_KEYS;
  public customerGroupDataSource: any;
  public variableDataSource: any;
  public keyIndicatorData : any;
  public totalElement = 0;
  public customerGroupData = {
    content: [],
    totalElements: 0,
    selectedContent : [],
    NewSelectedContent : []
  };

  public variableData = {
    content: [],
    totalElements: 0,
    pageIndex : 0,
    pageSize : AppConstant.pageSize
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    public dialog: MatDialog,
    private readonly trendingDefinationService : TrendingDefinitionService,
    private readonly systemService : SystemService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.forceReload = AppUtility.forceParamToBoolean(params['force']);
    });

  }


  ngOnInit() {
    AppUtility.scrollTop();
    this.setForm(undefined);
    this.getCombineResponseOfCustomerGroups();
    this.loadCustomerGroup(true,new HttpParams());
    this.getKeyIndicatorVariables();

    if(this.id) {
      this.loadKeyIndicatorById();
      this.getKeyIndicatorById();
      this.loadKeyIndicatorCustomerGroups(true,new HttpParams());
      this.keyIndicatorPageChangeEvent(undefined);
    }

    this.popStateEvent = this.back.bind(this);
  }

  setForm(event: any) {
    this.keyIndicatorForm = this.formBuilder.group({
      keyIndicatorCode: [event !== undefined ? event.keyIndicatorCode : ''],
      keyIndicatorName: [event !== undefined ? event.keyIndicatorName : ''],
      filterRule: [event !== undefined ? event.filterRule : ''],
      indicatorPartTemplate: [event !== undefined ? event.indicatorPartTemplate : '', Validators.required],
      trendingPartTemplate: [event !== undefined ? event.trendingPartTemplate : '', Validators.required],
      explainPartTemplate: [event !== undefined ? event.explainPartTemplate : ''],
      hideOnKIPage: [event !== undefined ? event.hideOnKIPage : ''],
      hideOnTrendingPage: [event !== undefined ? event.hideOnTrendingPage : '', Validators.required],
    });
  }


  getKeyIndicatorById(){
    this.subscriptions.add(
      this.trendingDefinationService.getKeyIndicatorById()
      .pipe(filter((keyIndicator : any) => keyIndicator && keyIndicator.id == this.id ))
      .subscribe((keyIndicator : any) =>{
        this.keyIndicatorData = keyIndicator;
        this.setForm({...keyIndicator});
        AppUtility.scrollTop();
      })
    )
  }

  loadKeyIndicatorById(){
    this.trendingDefinationService.loadKeyIndicatorById(this.id);
  }

  back(event ?: any) {
    if(event) event.stopImmediatePropagation();
    this.router.navigate(['/admin/keyIndicator/keyIndicatorList'], 
      { queryParams: { force : this.forceReloadListScreen }});
  }

  save(): any {

    AppUtility.removeErrorFieldMessagesFromForm();

    this.forceReloadListScreen = true;
    if(this.id){
      const requestBody = {...this.keyIndicatorData, ...this.keyIndicatorForm.value};
      this.subscriptions.add(
        this.trendingDefinationService.updateKeyIndicator(this.id,requestBody)
        .pipe(take(1))
        .subscribe(() =>{},
        AppUtility.errorFieldHighlighterCallBack)
      );

      this.updateCustomerGroupsForKeyIndicators();

      return;
    }

    const requestBody = this.keyIndicatorForm.value;
    this.subscriptions.add(
      this.trendingDefinationService.saveKeyIndicator(requestBody)
      .pipe(take(1))
      .subscribe((state : any) =>{
          this.id = state.trendingDefinationManagement.keyIndicator.id;
          AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
          this.getKeyIndicatorById();
          this.loadKeyIndicatorCustomerGroups(true,new HttpParams());
      },AppUtility.errorFieldHighlighterCallBack)
    );

  }

  delete(): any {

    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(
      this.trendingDefinationService.deleteKeyIndicatorById(this.id)
      .pipe(take(1))
      .subscribe((response : any ) =>{
        this.forceReloadListScreen = true;
        this.back();
      })
    );
   }

   
  loadCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
  }

  loadKeyIndicatorCustomerGroups(force : boolean, filter : any){
    this.trendingDefinationService.loadKeyIndicatorCustomerGroupList(true,this.id, filter);
  }

  getCombineResponseOfCustomerGroups(){

    const customerGroupList$ : Observable<any> = this.systemService.getCustomerGroupList()
      .pipe(filter((data : any) => data instanceof Array));

    const keyIndicatorCustomerGroupList$ : Observable<any> = this.trendingDefinationService
      .getKeyIndicatorCustomerGroupList()
      .pipe(filter((data : any) => data instanceof Array));

    combineLatest([customerGroupList$,keyIndicatorCustomerGroupList$])
    .subscribe((([ customerGroupList, keyIndicatorCustomerGroupList] : any) =>{
      this.customerGroupData.content = [...customerGroupList];
      this.customerGroupData.selectedContent = keyIndicatorCustomerGroupList
        .map(customerGroup => customerGroup.customerGroupId);
    }));

  }

  updateCustomerGroupsForKeyIndicators(){

    const {newlySelected, newlyRemoved } = AppUtility.getNewlySelectedAndRemovedList
    (this.customerGroupData.NewSelectedContent,this.customerGroupData.selectedContent,'customerGroupId');

    console.log({newlySelected, newlyRemoved });
    this.saveKeyIndicatorCustomerGroup(newlySelected);
    this.removeKeyIndicatorCustomerGroup(newlyRemoved);

  }

  saveKeyIndicatorCustomerGroup(customerGroupList : Array<any >){
    customerGroupList.forEach((customerGroupId : any) =>{
      this.trendingDefinationService.addIndicatorCustomerGroup(this.id,customerGroupId);
    });
  }

  removeKeyIndicatorCustomerGroup(customerGroupList : Array<any >){
    customerGroupList.forEach((customerGroupId : any) =>{
      this.trendingDefinationService.removeKeyIndicatorCustomerGroupById(this.id,customerGroupId);
    });
  }


  keyIndicatorPageChangeEvent(event : any){
    const params : HttpParams = new HttpParams()
      .append('startRow', event && event.pageIndex ? (event.pageIndex *  event.pageSize) + '' : '0')
      .append('pageSize', event && event.pageSize ? event.pageSize : this.variableData.pageSize) 
      .append('disableTotalSize','false');
     
    this.loadKeyIndicatorVariables(params);
  } 

  loadKeyIndicatorVariables(params : HttpParams) : void {
    this.trendingDefinationService.loadKeyIndicatorVariableList(this.forceReload,this.id,params);
  }

  getKeyIndicatorVariables(){
    this.subscriptions.add(
      this.trendingDefinationService.getKeyIndicatorVariableList()
      .pipe(filter((variables : any) => variables))
      .subscribe((variables : any) =>{
          this.variableData.content = [...variables.list];
          this.variableData.totalElements = variables.totalSize;
      })
    );
  }


  addVariable(): any {
    this.router.navigate(['/admin/keyIndicator/keyIndicatorVariable'], { queryParams: {keyIndicatorId: this.id}});
  }

  goToEditVariable(event : any): any {
    this.router.navigate(['/admin/keyIndicator/keyIndicatorVariable'],
       { queryParams: { keyIndicatorId: this.id, id : event.id } });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
