import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-group-list',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.css']
})
export class CustomerGroupListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_GROUP_COLUMN_DATA;
  public dataSource: any;
  public force = false;
  public customerGroupData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER
  };
  customerGroupForm = this.fb.group({
    groupCode: [''],
    groupName: ['']
  });

  public pageSize : number = Number(AppConstant.pageSize);
  public pageIndex : number = 0;
  public currentIndex : number = 0;
  public disableNextButton : boolean = false;
  public newFilterSearch : boolean = true;

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
    this.scrollTop();
    this.search(undefined);
    // this.findCustomerGroup(this.force, '');
  }
  scrollTop() {
    window.scroll(0, 0);
  }
  findCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.performPagination(customerGroupList);

      }));
  }

  performPagination(dataList: any){

    const obj = AppUtility.paginateData(
       { dataList : dataList ,
        dataSource : this.dataSource,
        pageSize :this.pageSize, 
        pageIndex : this.pageIndex, 
        currentIndex : this.currentIndex,
        disableNextButton : this.disableNextButton,
        newFilterSearch :this.newFilterSearch}, this);
  }

  search(event: any): void {

    if(event)
      this.currentIndex = event.pageIndex;
    else{
      this.currentIndex = 0;
      this.newFilterSearch = true;
    }

    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('useLikeSearch', 'true')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('groupCode', (this.customerGroupForm.value.groupCode !== null ? this.customerGroupForm.value.groupCode : ''))
      .set('groupName', (this.customerGroupForm.value.groupName !== null ? this.customerGroupForm.value.groupName : ''))
      .set ('pageSize', this.pageSize.toString())
    this.findCustomerGroup(true, params);
  }


  goToEditEventGroup(event: any) {
    this.router.navigate(['admin/customer-group/customerGroupEdit'], { queryParams: { 'id': event.id } });
  }

  addCustomerGroup() {
    this.router.navigate(['admin/customer-group/customerGroupEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
