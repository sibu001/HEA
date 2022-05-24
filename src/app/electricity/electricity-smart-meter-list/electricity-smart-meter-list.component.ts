import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter, UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { ElectricityUsagePopupComponent } from '../electricity-usage-popup/electricity-usage-popup.component';
declare var $: any;
@Component({
  selector: 'app-electricity-smart-meter-list',
  templateUrl: './electricity-smart-meter-list.component.html',
  styleUrls: ['./electricity-smart-meter-list.component.css']
})
export class ElectricitySmartMeterListComponent implements OnInit , OnDestroy{
  users: Users = new Users();
  public pageIndex: any;
  electricitySmartMeterForm: FormGroup;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  totalElements : any;
  disableNextButton  = false
  currentIndex = 0;
  dataListForSuggestions = [];
  selectedCustomer = null;
  keys = TableColumnData.SMART_METER_KEYS;
  newFilterSearch = false;
  pageSize = AppConstant.pageSize;
  constructor(private loginService: LoginService,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('usageHistoryFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null ) {
      this.adminFilter = new UsageHistoryFilter();
    }

    if(this.adminFilter.recentUsageHistory != AppConstant.electricitySmartMeter){
      this.sessionUtility(this.adminFilter.formValue);
      this.adminFilter.recentUsageHistory = AppConstant.electricitySmartMeter;
      this.adminFilter.page = undefined;
    }
  }

  sessionUtility(event){
    if(event)
      this.adminFilter.formValue = { "auditId" : event.auditId , "customerName" : event.customerName };
  }

  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: UsageHistoryFilter;
  subject$ = new Subject();
  ngOnInit() {
    this.setUpForm(this.adminFilter.formValue);
    this.search(this.adminFilter.page, false);
    this.getDataFromStore();
    this.newFilterSearch = true;
    this.scrollTop();
    this.findCustomer();
  }
   scrollTop() {
     window.scrollTo(0,0)
   }

  setUpForm(event: any) {
    this.electricitySmartMeterForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
      day: [event !== undefined && event !== null ? event.day : ''],
      hour: [event !== undefined && event !== null ? event.hour : ''],
    });
    if (this.users.role === 'ADMIN') {
      this.electricitySmartMeterForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.electricitySmartMeterForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }

  getSmartElectricityList(force: boolean, userId  : string, filter: any): void {
    this.adminFilter.formValue = this.electricitySmartMeterForm.value;
    this.usageHistoryService.loadElectricitySmartMeterList(force, userId, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(this.usageHistoryService.getElectricitySmartMeterList().pipe(skipWhile((item: any) => !item))
    .subscribe(  (gasList: any) => {
      if(gasList.data.length == AppConstant.pageSize){
        this.totalElements = this.usageHistoryData.totalElements;
        this.usageHistoryData.content = gasList.data;
        this.dataSource = [...this.usageHistoryData.content];
        this.pageIndex = this.currentIndex;
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
        if(gasList.data.length > 0){
          this.usageHistoryData.content = gasList.data;
          this.dataSource = [...this.usageHistoryData.content];
        } else {
          if(this.newFilterSearch)
            this.dataSource = [...gasList.data];
          this.pageIndex = this.currentIndex -1;
        }}
        this.newFilterSearch = false;
  }));

  }

  findSmartElectricityList(force: boolean, filter: any): void {
    this.adminFilter.formValue = this.electricitySmartMeterForm.value;
    localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    let userId = null;
    if(this.users.role == 'ADMIN'){
      if(this.electricitySmartMeterForm.value.auditId != '' || this.electricitySmartMeterForm.value.customerName != '' || this.selectedCustomer != null )
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getSmartElectricityList(force, userId, filter);
    }
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
          // this.getSmartElectricityList(force, userId, filter);  
          }
            if(this.selectedCustomer != null){
              this.getSmartElectricityList(force, this.selectedCustomer.userId, filter);
              this.setUpForm( this.electricitySmartMeterForm.value);
              this.adminFilter.formValue = this.electricitySmartMeterForm.value;
              this.electricitySmartMeterForm.value.auditId = this.selectedCustomer.auditId;
              this.electricitySmartMeterForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm(this.electricitySmartMeterForm.value);
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
            }

            if(this.selectedCustomer == null){
              this.electricitySmartMeterForm.value.auditId = "";
              this.electricitySmartMeterForm.value.customerName = "";
              this.setUpForm(this.electricitySmartMeterForm.value);
              document.getElementById('loader').classList.remove('loading');
            }
        }, error =>{
           console.log(error);
        document.getElementById('loader').classList.remove('loading');
        } 
      )
    );
  }

  search(event: any, isSearch: boolean , forced ?: boolean): void {
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
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : AppConstant.pageSize))
        .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
        .set('sortOrders[0].asc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
      .set('year', (this.electricitySmartMeterForm.value.year !== null ? this.electricitySmartMeterForm.value.year : ''))
      .set('hour', (this.electricitySmartMeterForm.value.hour !== null ? this.electricitySmartMeterForm.value.hour : ''))
      .set('day', (this.electricitySmartMeterForm.value.day !== null ? this.electricitySmartMeterForm.value.day : ''))
      .set('month', (this.electricitySmartMeterForm.value.month !== null ? this.electricitySmartMeterForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
      params = params.set('auditId', this.electricitySmartMeterForm.value.auditId !== null ? this.electricitySmartMeterForm.value.auditId : '')
      .set('customerName', this.electricitySmartMeterForm.value.customerName !== null ? this.electricitySmartMeterForm.value.customerName : '');
    }
    this.findSmartElectricityList(true, params);
  }

  get f() { return this.electricitySmartMeterForm.controls; }

  showPopUp(event : any): any {
    if (this.users.role !== 'USERS') {
      const dialogRef = this.dialog.open(ElectricityUsagePopupComponent, {
        width: '70vw',
        height: '70vh',
        data: {event}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed' + result);
      });
    }
  }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.electricitySmartMeterForm.value.auditId !== undefined ? this.electricitySmartMeterForm.value.auditId : '')
      .set('customerName',this.electricitySmartMeterForm.value.customerName !== undefined ? this.electricitySmartMeterForm.value.customerName :'')
      .set('useLike','true')
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
    this.subject$.next(filters);
  }

  findCustomer(){
    this.subscriptions.add(this.subject$
      .pipe(
       debounceTime(AppConstant.debounceTime)  
      , distinctUntilChanged())
      .subscribe(
    (filters : any) =>{
      this.loginService.performGetWithParams('findCustomers.do',filters)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
          this.dataListForSuggestions = response;
        }, error =>{
           console.log(error);
        }
      )
    }
    )
  );
}

  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.electricitySmartMeterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.electricitySmartMeterForm.get('auditId').setValue(event.option.value);
      this.electricitySmartMeterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
