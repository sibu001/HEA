import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-event-list',
  templateUrl: './customer-event-list.component.html',
  styleUrls: ['./customer-event-list.component.css']
})
export class CustomerEventListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_EVENT_TYPE_COLUMN_DATA;
  public dataSource: any;
  public pageSize : number = Number(AppConstant.pageSize);
  force = false;
  public customerEventTypeData = {
    content: [],
    totalElements: 0,
  };
  customerGroupForm = this.fb.group({
    eventCode: [''],
    eventName: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.search(undefined, true);
    this.GetCustomerEventTypeList();  
  }
  scrollTop() {
    window.scroll(0, 0);
  }

  findCustomerEventTypeCount(force: boolean, filter: any): void {
    this.subscriptions.add(this.systemUtilityService.loadCustomerEventTypeCount(filter).pipe(skipWhile((item: any) => !item))
      .subscribe((customerEventTypeCount: any) => {
        this.customerEventTypeData.totalElements = customerEventTypeCount.systemUtilityManagement.customerEventTypeCount;
      }));
  }

  loadCustomerEventTypeList(force: boolean, filter: any){
    this.systemUtilityService.loadCustomerEventTypeList(force, filter);
  }

  GetCustomerEventTypeList(){
    this.subscriptions.add(this.systemUtilityService.getCustomerEventTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialTypeList: any) => {
        this.customerEventTypeData.content = credentialTypeList;
        this.dataSource = [...this.customerEventTypeData.content];
      }));
  }

  goToEditEventEventType(event: any) {
    this.router.navigate(['admin/customerEvent/customerEventTypeEdit'], { queryParams: { 'id': event.id } });
  }

  addCustomerEventType() {
    this.router.navigate(['admin/customerEvent/customerEventTypeEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  search(event: any, isSearch: boolean): void {
    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.pageSize.toString())
      .set('useLikeSearch', 'true')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('eventCode', (this.customerGroupForm.value.eventCode !== null ? this.customerGroupForm.value.eventCode : ''))
      .set('eventName', (this.customerGroupForm.value.eventName !== null ? this.customerGroupForm.value.eventName : ''));
   
    if(isSearch) this.findCustomerEventTypeCount(true, params);

    this.loadCustomerEventTypeList(true,params);
  }
}
