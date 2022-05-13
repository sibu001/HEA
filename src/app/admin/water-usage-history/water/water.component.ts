import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { Users } from 'src/app/models/user';
import { AdminFilter, UsageHistoryFilter } from 'src/app/models/filter-object';

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
    totalElements: 0,
  };
  selectedCustomer = null;
  public force = false;
  private readonly subscriptions: Subscription = new Subscription();
  waterForm: FormGroup;

  constructor(public router: Router, public fb: FormBuilder,
     public usageHistoryService: UsageHistoryService,
     private loginService: LoginService
     ){
      this.users = this.loginService.getUser();
      this.adminFilter = JSON.parse(localStorage.getItem('usageHistoryFilter'));
      if (this.adminFilter === undefined || this.adminFilter === null ) {
        this.adminFilter = new UsageHistoryFilter();
      }
      }

  ngOnInit() {
    // document.getElementById('loader').classList.remove('loading');
    this.setUpForm(this.adminFilter.formValue);
    this.search(this.adminFilter.page,false);
    this.scrollTop();
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setUpForm(event: any) {
    this.waterForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
    });
    if (this.users.role === 'ADMIN') {
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
    this.findCustomer(filters);
  }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.waterForm.value.auditId !== undefined ? this.waterForm.value.auditId : '')
      .set('customerName',this.waterForm.value.customerName !== undefined ? this.waterForm.value.customerName :'')
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
    localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(
      this.loginService.performGetWithParams('findCustomers.do', this.filterForCustomer())
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
          if(response.length != 0){
          var userId = response[0].userId;
          this.selectedCustomer = response[0] ;
          this.getWaterList(force, userId, filter);
          }else{
            if(this.selectedCustomer != null){
              this.getWaterList(force, this.selectedCustomer.userId, filter);
              this.waterForm.value.auditId = this.selectedCustomer.auditId;
              this.waterForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm( this.waterForm.value);
              this.adminFilter.formValue = this.waterForm.value;
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));

            }
          }
        }, error =>{
           console.log(error);  
        } 
      )
    );
  }

  findWaterList(force: boolean, filter: any): void {
    this.adminFilter.formValue = this.waterForm.value;
    // localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    let userId = null;
    if(this.users.role == 'ADMIN'){
      if(this.waterForm.value.auditId !== '')
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getWaterList(force, userId, filter);
    }
  }

  getWaterList(force: boolean,userId : string, filter: any): any {
    this.usageHistoryService.loadWaterList(force , userId, filter);
    this.subscriptions.add(this.usageHistoryService.getWaterList().pipe(skipWhile((item: any) => !item))
      .subscribe((waterList: any) => {
        this.data.content = waterList.data;
        this.dataSource = [...this.data.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    let params = new HttpParams()
      .set('type','water  ')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
        .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
        .set('sortOrders[0].asc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
        .set('year', (this.waterForm.value.year !== null ? this.waterForm.value.year : ''))
      .set('month', (this.waterForm.value.month !== null ? this.waterForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
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
}
