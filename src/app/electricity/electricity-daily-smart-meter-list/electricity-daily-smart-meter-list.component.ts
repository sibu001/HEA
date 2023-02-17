import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import {  UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { ElectricityUsagePopupComponent } from '../electricity-usage-popup/electricity-usage-popup.component';
declare var $: any;

@Component({
  selector: 'app-electricity-daily-smart-meter-list',
  templateUrl: './electricity-daily-smart-meter-list.component.html',
  styleUrls: ['./electricity-daily-smart-meter-list.component.css']
})
export class ElectricityDailySmartMeterListComponent implements OnInit ,OnDestroy{
  users: Users = new Users();
  public pageIndex: any;
  electricityDailySmartMeterForm: FormGroup;
  dataSource: any;
  public dataListForSuggestions : any;
  selectedCustomer = null;
  selectionPrivilege : boolean  = false;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  totalElements : any;
  keys = TableColumnData.SMART_METER_DAILY_KEYS;
  disableNextButton = false;
  currentIndex = 0;
  newFilterSearch = false;
  pageSize = AppConstant.pageSize;
  subject$ = new Subject();
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

    if(this.adminFilter.recentUsageHistory != AppConstant.electricityDailySmartMeterList){
      this.sessionUtility(this.adminFilter.formValue);
      this.adminFilter.recentUsageHistory = AppConstant.electricityDailySmartMeterList;
      this.adminFilter.page = undefined;
    }
  }

  sessionUtility(event){
    if(event)
      this.adminFilter.formValue = { "auditId" : event.auditId , "customerName" : event.customerName };
  }
  
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: UsageHistoryFilter;

  ngOnInit() {
    this.setSelectionPrivilege();
    this.setUpForm(this.adminFilter.formValue);
    this.search(this.adminFilter.page, false);
    this.getDataFromStore();
    this.newFilterSearch = false;
    window.scroll(0, 0);
    this.findCustomer();
  }

  setSelectionPrivilege(){
    this.selectionPrivilege = this.users.role != 'USERS';
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setUpForm(event: any) {
    this.electricityDailySmartMeterForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
      day: [event !== undefined && event !== null ? event.day : ''],
    });
    if (this.selectionPrivilege) {
      this.electricityDailySmartMeterForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.electricityDailySmartMeterForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }
  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.electricityDailySmartMeterForm.value.auditId !== undefined ? this.electricityDailySmartMeterForm.value.auditId : '')
      .set('customerName',this.electricityDailySmartMeterForm.value.customerName !== undefined ? this.electricityDailySmartMeterForm.value.customerName :'')
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
          // this.getElectricityDailySmartMeterList(force, userId, filter);  
          }
            if(this.selectedCustomer != null){
              this.getElectricityDailySmartMeterList(force, this.selectedCustomer.userId, filter);
              this.setUpForm( this.electricityDailySmartMeterForm.value);
              this.adminFilter.formValue = this.electricityDailySmartMeterForm.value;
              this.electricityDailySmartMeterForm.value.auditId = this.selectedCustomer.auditId;
              this.electricityDailySmartMeterForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm(this.electricityDailySmartMeterForm.value);
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
            }

            if(this.selectedCustomer == null){
              this.electricityDailySmartMeterForm.value.auditId = "";
              this.electricityDailySmartMeterForm.value.customerName = "";
              this.setUpForm(this.electricityDailySmartMeterForm.value);
              document.getElementById('loader').classList.remove('loading');
            }
        }, error =>{
           console.log(error);
           document.getElementById('loader').classList.remove('loading');
        } 
      )
    );
  }



  findGasList(force: boolean, filter: any): void {
    this.adminFilter.formValue = this.electricityDailySmartMeterForm.value;
    let userId = null;
    if(this.selectionPrivilege){
      if(this.electricityDailySmartMeterForm.value.auditId != '' || this.electricityDailySmartMeterForm.value.customerName != '' || this.selectedCustomer != null )
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getElectricityDailySmartMeterList(force, userId, filter);
    }
  }
  getElectricityDailySmartMeterList(force, userId, filter){
    this.usageHistoryService.loadElectricityDailySmartMeterList(force, userId, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(this.usageHistoryService.getElectricityDailySmartMeterList().pipe(skipWhile((item: any) => !item))
    .subscribe(
    (gasList: any) => {
      if(gasList.data.length == AppConstant.pageSize){
        this.usageHistoryData.content = gasList.data;
        this.totalElements = this.usageHistoryData.totalElements;
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
        this.checkForDisplayingUtilityAndSolarColumn();
      }));
  }

  checkForDisplayingUtilityAndSolarColumn(){
    const displayExtraColumn = this.dataSource.find(data =>{
       if(data.pv)
         return true;
     });
 
     if(displayExtraColumn){
       this.dataSource = this.dataSource.map(data =>{
         if(data.pv && data.value){
           data.total = data.pv + data.value;
         }else{
           data.total = data.value;
         }
         data.total = data.total.toFixed(4);
         return data;
       });
 
       this.keys = [...this.keys];
       this.keys.pop();
       this.keys.push({ key: 'total', isEdit: true, displayName: 'Total' });
       this.keys.push({ key: 'value', isEdit: true, displayName: 'Utility' });
       this.keys.push({ key: 'pv', isEdit: true, displayName: 'Solar' });
     }else{
       this.keys = TableColumnData.SMART_METER_DAILY_KEYS;
     }
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
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
      .set('sortOrders[0].asc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
      .set('year', (this.electricityDailySmartMeterForm.value.year !== null ? this.electricityDailySmartMeterForm.value.year : ''))
      .set('day', (this.electricityDailySmartMeterForm.value.day !== null ? this.electricityDailySmartMeterForm.value.day : ''))
      .set('month', (this.electricityDailySmartMeterForm.value.month !== null ? this.electricityDailySmartMeterForm.value.month : ''));
    if (this.selectionPrivilege) {
      params = params.set('auditId', this.electricityDailySmartMeterForm.value.auditId !== null ? this.electricityDailySmartMeterForm.value.auditId : '')
      .set('customerName', this.electricityDailySmartMeterForm.value.customerName !== null ? this.electricityDailySmartMeterForm.value.customerName : '');
    }
    this.findGasList(true, params);
  }

  get f() { return this.electricityDailySmartMeterForm.controls; }

  showPopUp(): any {
    if (this.users.role !== 'USERS') {
      const dialogRef = this.dialog.open(ElectricityUsagePopupComponent, {
        width: '70vw',
        height: '70vh',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed' + result);
      });
    }
  }
  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.electricityDailySmartMeterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.electricityDailySmartMeterForm.get('auditId').setValue(event.option.value);
      this.electricityDailySmartMeterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}