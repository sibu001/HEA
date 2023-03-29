import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-alert-type-list',
  templateUrl: './customer-alert-type-list.component.html',
  styleUrls: ['./customer-alert-type-list.component.css']
})
export class CustomerAlertTypeListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_ALERT_TYPE_COLUMN_DATA;
  public dataSource: any;
  public force = false;
  public pageSize : number = Number(AppConstant.pageSize);

  @ViewChild('customerAlertTable') public customerAlertTable : ElementRef;


  public customerAlertTypeData = {
    content: [],
    totalElements: 0,
  };
  customerAlertTypeForm = this.fb.group({
    alertCode: [''],
    alertName: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.search(undefined, true);
    this.combineCustomerAlertTypeListAndCount();
  }

  scrollTop() {
    window.scroll(0, 0);
  }


  loadCustomerEventCount(force: boolean, filter: any){
    this.systemService.loadGetCustomerAlertTypeListCount(force,filter);
  }


  combineCustomerAlertTypeListAndCount(){

    const customerAlertTypeListData$ : Observable<any> =  this.systemService.getCustomerAlertTypeList().pipe(filter(data => data));
    const customerAlertTypeListCount$ : Observable<any> = this.systemService.getGetCustomerAlertTypeListCount().pipe(filter(data => data!=undefined));

    combineLatest([customerAlertTypeListCount$, customerAlertTypeListData$])
    .subscribe(
      ([customerAlertTypeCount, customerAlertTypeList] : Array<any> ) =>{
        this.customerAlertTable.nativeElement.scrollIntoView({behavior: 'smooth', inline : 'start'});
        this.customerAlertTypeData.totalElements = customerAlertTypeCount;
        this.customerAlertTypeData.content = customerAlertTypeList;
        this.dataSource = [...this.customerAlertTypeData.content];

        if(this.dataSource.length == 0){
          this.customerAlertTypeData.totalElements = 0;
        }
      });

  }

  loadCustomerAlertType(force: boolean, filter: any){
    this.systemService.loadGetCustomerAlertTypeList(force, filter);
  }
  
  // getCustomerAlertType(): void {
  //   this.subscriptions.add(this.systemService.getCustomerAlertTypeList().pipe(skipWhile((item: any) => !item))
  //     .subscribe((customerAlertTypeList: any) => {
  //       this.customerAlertTypeData.content = customerAlertTypeList;
  //       this.dataSource = [...this.customerAlertTypeData.content];
  //     }));
  // }

  search(event: any, isSearched: boolean): void {
    const params = new HttpParams()
      .set('startRow', event ? (event.pageIndex * this.pageSize).toString() : '0')
      .set('pageSize', this.pageSize.toString())
      .set('useLikeSearch', 'true')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('alertCode', (this.customerAlertTypeForm.value.alertCode !== null ? this.customerAlertTypeForm.value.alertCode : ''))
      .set('alertName', (this.customerAlertTypeForm.value.alertName !== null ? this.customerAlertTypeForm.value.alertName : ''));
    
    if(isSearched){
      this.loadCustomerEventCount(true,params)
    }  
    this.loadCustomerAlertType(true, params);
  }


  goToEditEventAlertType(event: any): any {
    this.router.navigate(['admin/customer-alert/customerAlertTypeEdit'], { queryParams: { 'id': event.id } });
  }

  addCustomerAlertType() {
    this.router.navigate(['admin/customer-alert/customerAlertTypeEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

