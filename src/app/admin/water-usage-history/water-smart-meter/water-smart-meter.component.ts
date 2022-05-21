import { UtilityService } from './../../../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { AppConstant } from 'src/app/utility/app.constant';

@Component({
  selector: 'app-water-smart-meter',
  templateUrl: './water-smart-meter.component.html',
  styleUrls: ['./water-smart-meter.component.css']
})
export class WaterSmartMeterComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.SMART_METER_KEYS;
  public dataSource: any;
  public totalElement = 0;
  users: Users = new Users();
  dataListForSuggestions = [];
  adminFilter : UsageHistoryFilter;
  pageIndex : any;
  currentIndex = 0;
  disableNextButton = false;
  public data = {
    content: [],
    totalElements: 0,
  };
  totalElements : any;
  selectedCustomer = null;
  private readonly subscriptions: Subscription = new Subscription();
  waterSmartMeterForm: FormGroup;
  newFilterSearch = false;
  constructor(public router: Router, public fb: FormBuilder,
    public usageHistoryService: UsageHistoryService,
    private loginService: LoginService, 
    private UtilityService : UtilityService
    ){
     this.users = this.loginService.getUser();
     this.adminFilter = JSON.parse(localStorage.getItem('usageHistoryFilter'));
     if (this.adminFilter === undefined || this.adminFilter === null ) {
       this.adminFilter = new UsageHistoryFilter();
     }

     if(this.adminFilter.recentUsageHistory != AppConstant.waterSmartMeterList){
      this.sessionUtility(this.adminFilter.formValue);
      this.adminFilter.recentUsageHistory = AppConstant.waterSmartMeterList;
      this.adminFilter.page = undefined;
    }

     }

     ngOnInit() {
      // document.getElementById('loader').classList.remove('loading');
      this.setUpForm(this.adminFilter.formValue);
      this.search(this.adminFilter.page,false);
      this.getDataFromStore();
      this.scrollTop();
    }
    
    sessionUtility(event){
      if(event)
        this.adminFilter.formValue = { "auditId" : event.auditId , "customerName" : event.customerName };
    }

    scrollTop() {
      window.scroll(0, 0);
    }
    setUpForm(event: any) {
      this.waterSmartMeterForm = this.fb.group({
        year: [event !== undefined && event !== null ? event.year : ''],
        month: [event !== undefined && event !== null ? event.month : ''],
      });
      if (this.users.role === 'ADMIN') {
        this.waterSmartMeterForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
        this.waterSmartMeterForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
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
      this.findCustomer(filters);
    }
  
    filterForCustomer(){
      return new HttpParams()
        .set('auditId',this.waterSmartMeterForm.value.auditId !== undefined ? this.waterSmartMeterForm.value.auditId : '')
        .set('customerName',this.waterSmartMeterForm.value.customerName !== undefined ? this.waterSmartMeterForm.value.customerName :'')
        .set('useLike','true')
    }
  
    findCustomer(filters, calledFor ?: string){
      this.subscriptions.add(
        this.loginService.performGetWithParams('findCustomers.do',filters)
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          (response) =>{
            this.dataListForSuggestions = response;
          }, error =>{
             console.log(error);
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
          this.getWaterSmartMeter(force, userId, filter);  
          }else{
            if(this.selectedCustomer != null){
              this.getWaterSmartMeter(force, this.selectedCustomer.userId, filter);
              this.setUpForm( this.waterSmartMeterForm.value);
              this.adminFilter.formValue = this.waterSmartMeterForm.value;
            }
          }
          this.waterSmartMeterForm.value.auditId = this.selectedCustomer.auditId;
          this.waterSmartMeterForm.value.customerName = this.selectedCustomer.user.name;
          this.setUpForm(this.waterSmartMeterForm.value);
          localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
          // document.getElementById('loader').classList.remove('loading');
        }, error =>{
           console.log(error);
        } 
      )
    );
  }

    findWater(force: boolean, filter: any): void {
      this.adminFilter.formValue = this.waterSmartMeterForm.value;
      // localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
      let userId = null;
      if(this.users.role == 'ADMIN'){
        if(this.waterSmartMeterForm.value.auditId !== '')
          this.findSelectedCustomer(force, filter);
      } else {
        userId = this.users.outhMeResponse.user.userId;
        this.getWaterSmartMeter(force, userId, filter);
      }
    }
  
    getWaterSmartMeter(force: boolean,userId : string, filter: any): any {
      this.usageHistoryService.loadWaterSmartMeterList(force , userId, filter);
    }

    getDataFromStore(){
      this.subscriptions.add(this.usageHistoryService.getWaterSmartMeterList()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
      (waterList: any) => {
        if(waterList.data.length == 10){
          this.data.totalElements = Number.MAX_SAFE_INTEGER;
          this.data.content = waterList.data;
          this.totalElements = this.data.totalElements;
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
            this.newFilterSearch = false;
          }}
        this.newFilterSearch = false;
        }));
    }

    search(event: any, isSearch: boolean , forced ?: boolean ): void {
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
        .set('type','smartMeterWater')
        .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
        .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
          (event.pageIndex * event.pageSize) + '' : '0'))
          .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
          .set('sortOrders[0].asc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
          .set('year', (this.waterSmartMeterForm.value.year !== null ? this.waterSmartMeterForm.value.year : ''))
        .set('month', (this.waterSmartMeterForm.value.month !== null ? this.waterSmartMeterForm.value.month : ''));
      if (this.users.role === 'ADMIN') {
       params =  params.set('auditId', this.waterSmartMeterForm.value.auditId !== null ? this.waterSmartMeterForm.value.auditId : '')
        .set('customerName', this.waterSmartMeterForm.value.customerName !== null ? this.waterSmartMeterForm.value.customerName : '');
      }
      this.findWater(isSearch,params);
    }

  // findWater(event?: any): any { }

  goToEditWater(event: any): any { }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.waterSmartMeterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.waterSmartMeterForm.get('auditId').setValue(event.option.value);
      this.waterSmartMeterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }

}
