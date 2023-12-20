import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { Users } from 'src/app/models/user';
import { AdminFilter, UsageHistoryFilter } from 'src/app/models/filter-object';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.GAS_KEYS;
  public dataSource: any;
  users: Users = new Users();
  public totalElement = 0;
  dataListForSuggestions = [];
  adminFilter : UsageHistoryFilter;
  pageIndex : any;
  public data = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  totalElements : any;
  selectedCustomer = null;
  disableNextButton = false
  currentIndex = 0
  selectionPrivilege : boolean  = false;
  public force = false;
  pageSize = AppConstant.pageSize;
  private readonly subscriptions: Subscription = new Subscription();
  waterForm: FormGroup;
  newFilterSearch = false;
  subject$ = new Subject();
  constructor(public router: Router, public fb: FormBuilder,
     public usageHistoryService: UsageHistoryService,
     private loginService: LoginService
     ){
      this.users = this.loginService.getUser();
      this.adminFilter = JSON.parse(localStorage.getItem('usageHistoryFilter'));
      if (this.adminFilter === undefined || this.adminFilter === null ) {
        this.adminFilter = new UsageHistoryFilter();
      }

      if(this.adminFilter.recentUsageHistory != AppConstant.waterList){
        this.sessionUtility(this.adminFilter.formValue);
        this.adminFilter.recentUsageHistory = AppConstant.waterList;
        this.adminFilter.page = undefined;
      }
    }

    sessionUtility(event){
      if(event)
        this.adminFilter.formValue = { "auditId" : event.auditId , "customerName" : event.customerName };
    }

  ngOnInit() {
    this.setSelectionPrivilege();
    this.setUpForm(this.adminFilter.formValue);
    this.search(this.adminFilter.page,false);
    this.getDataFromStore();
    this.newFilterSearch = false;
    this.scrollTop();
    this.findCustomer();
  }

  setSelectionPrivilege(){
    this.selectionPrivilege = this.users.role != 'USERS';
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setUpForm(event: any) {
    this.waterForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
    });
    if (this.selectionPrivilege) {
      this.waterForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.waterForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }

  findCustomerByAuditIdOrCustomerName(calledBy){
    let filters =  this.filterForCustomer();
    
    if(filters.get('auditId').length < 5 && filters.get('customerName').length < 5)
      return null;
    
    if(calledBy == 'auditId'){
      filters = filters.delete('customerName');
    }else{
      filters = filters.delete('auditId');
    }

    filters = AppUtility.addNoLoaderParam(filters);
    this.subject$.next(filters);
    }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.waterForm.value.auditId !== undefined ? this.waterForm.value.auditId : '')
      .set('customerName',this.waterForm.value.customerName !== undefined ? this.waterForm.value.customerName :'')
      .set('useLike','true')
  }

  findCustomer(){
    this.subscriptions.add(this.subject$
      .pipe(
       debounceTime(AppConstant.debounceTime)  
      , distinctUntilChanged())
      .switchMap((filters : HttpParams) => this.loginService.customerSuggestionListRequest(filters))
      .subscribe(
        (response) =>{
          this.dataListForSuggestions = response;
        }, error =>{
           console.log(error);
        }
      ));
    }

  findSelectedCustomer(force,filter){
    document.getElementById('loader').classList.add('loading');
    const params = this.filterForCustomer();
    this.subscriptions.add(
      this.loginService.performGetWithParams('findCustomers.do',params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
          if(response.length != 0){
          var userId = response[0].userId;
          this.selectedCustomer = response[0];
          // this.getWaterList(force, userId, filter);  
          }
            if(this.selectedCustomer != null){
              this.getWaterList(force, this.selectedCustomer.userId, filter);
              this.setUpForm( this.waterForm.value);
              this.adminFilter.formValue = this.waterForm.value;
              this.waterForm.value.auditId = this.selectedCustomer.auditId;
              this.waterForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm(this.waterForm.value);
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
            }

            if(this.selectedCustomer == null){
              this.waterForm.value.auditId = "";
              this.waterForm.value.customerName = "";
              this.setUpForm(this.waterForm.value);
              document.getElementById('loader').classList.remove('loading');
            }
            
        }, error =>{
           console.log(error);
           document.getElementById('loader').classList.remove('loading');
        } 
      )
    );
  }

  findWaterList(force: boolean, filter: any): void {
    this.adminFilter.formValue = this.waterForm.value;
    // localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    let userId = null;
    if(this.selectionPrivilege){
      if(this.waterForm.value.auditId != '' || this.waterForm.value.customerName != '' || this.selectedCustomer != null )
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getWaterList(force, userId, filter);
    }
  }

  getWaterList(force: boolean,userId : string, filter: any): any {
    this.usageHistoryService.loadWaterList(force , userId, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(this.usageHistoryService.getWaterList().pipe(skipWhile((item: any) => !item))
    .subscribe( (waterList: any) => {
      if(waterList.data.length == AppConstant.pageSize){
        this.data.content = waterList.data;
        this.totalElements = this.data.totalElements
        this.dataSource = [...this.data.content];  
        this.pageIndex = this.currentIndex;
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
        if(waterList.data.length > 0){
          this.data.content = waterList.data;
          this.dataSource = [...this.data.content];  
        } else {
          if(this.newFilterSearch)
            this.dataSource = [...waterList.data];
          this.pageIndex = this.currentIndex -1;
        }}
        this.newFilterSearch = false;
    }));
  }

  search(event: any, isSearch: boolean, forced ?: boolean): void {
    this.adminFilter.page = event;
    if(event)
      this.currentIndex = event.pageIndex;

      if(forced){
          this.currentIndex = 0;
          this.adminFilter.page = undefined;
          event = undefined;
          this.newFilterSearch = true;
        }

    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    let params = new HttpParams()
      .set('type','water  ')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
        .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
        .set('sortOrders[0].asc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
        .set('year', (this.waterForm.value.year !== null ? this.waterForm.value.year : ''))
      .set('month', (this.waterForm.value.month !== null ? this.waterForm.value.month : ''));
    if (this.selectionPrivilege) {
     params =  params.set('auditId', this.waterForm.value.auditId !== null ? this.waterForm.value.auditId : '')
      .set('customerName', this.waterForm.value.customerName !== null ? this.waterForm.value.customerName : '');
    }
    this.findWaterList(isSearch,params);
  }
  goToEditWater(): any { }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.waterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.waterForm.get('auditId').setValue(event.option.value);
      this.waterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }

  validateYearInput(event: Event) {
    AppUtility.validateInput(event,1,2100);
  }
  
  validateYearChange(event: Event) {
    AppUtility.validateChange(event, this.waterForm.controls['year'], 1, 2100);
  }
  validateMonthInput(event: Event) {
    AppUtility.validateInput(event,1,12);
  }
  
  validateMonthChange(event: Event) {
    AppUtility.validateChange(event, this.waterForm.controls['month'], 1, 12);
  }
}
