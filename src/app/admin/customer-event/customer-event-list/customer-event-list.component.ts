import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
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
  public currentPageIndex = 0;
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
      if(params['listIndex'])
      this.currentPageIndex = params['listIndex'];
    });
  }

  ngOnInit() {
    this.search({ pageIndex : this.currentPageIndex}, true);  
    this.combineEventTypeDataAndCountResponse();
  }

  combineEventTypeDataAndCountResponse(){
      const eventTypeCount$ : Observable<any> = this.systemUtilityService.getCustomerEventTypeCount().pipe(filter(data => data));
      const eventTypeData$ : Observable<any>= this.systemUtilityService.getCustomerEventTypeList().pipe(filter((item: any) => item));


      this.subscriptions.add(
        combineLatest([eventTypeData$, eventTypeCount$])
        .subscribe(([credentialTypeList,customerEventTypeCount] : Array<any>) =>{

          this.scrollTop();

          this.customerEventTypeData.totalElements = customerEventTypeCount;
          this.customerEventTypeData.content = credentialTypeList;
          this.customerEventTypeData.content.forEach((data,index) =>{
            data.indexCode = ((this.currentPageIndex*this.pageSize + 1 + index)) + ' : ' + data.id;
          });
          this.dataSource = [...this.customerEventTypeData.content];
        }));
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  findCustomerEventTypeCount(force: boolean, filter: any): void {
    this.systemUtilityService.loadCustomerEventTypeCount(filter);
  }

  loadCustomerEventTypeList(force: boolean, filter: any){
    this.systemUtilityService.loadCustomerEventTypeList(force, filter);
  }

  goToEditEventEventType(event: any) {
    this.router.navigate(['admin/customerEvent/customerEventTypeEdit'], { queryParams: { 'id': event.id, 'listIndex' : this.currentPageIndex } });
  }

  addCustomerEventType() {
    this.router.navigate(['admin/customerEvent/customerEventTypeEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  search(event: any, isSearch: boolean): void {

    if(event) {
      this.currentPageIndex = event.pageIndex;

    }

    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined ?
        (event.pageIndex * this.pageSize) + '' : '0'))
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.pageSize.toString())
      .set('useLikeSearch', 'true')
      .set('sortField', (event && event.sort && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('eventCode', (this.customerGroupForm.value.eventCode !== null ? this.customerGroupForm.value.eventCode : ''))
      .set('eventName', (this.customerGroupForm.value.eventName !== null ? this.customerGroupForm.value.eventName : ''));
   
    if(isSearch) this.findCustomerEventTypeCount(true, params);

    this.loadCustomerEventTypeList(true,params);
  }
}
