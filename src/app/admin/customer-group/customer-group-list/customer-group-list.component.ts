import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-group-list',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.css']
})
export class CustomerGroupListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public force = false;
  public customerGroupData = {
    content: [],
    totalElements: 0,
  };
  customerGroupForm = this.fb.group({
    groupCode: [''],
    groupName: ['']
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
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CUSTOMER_GROUP_COLUMN_DATA;
    this.findCustomerGroup(this.force, '');
  }

  findCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData.content = customerGroupList;
        this.dataSource = [...this.customerGroupData.content];
      }));
  }

  search(event: any): void {
    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('customerGroupId', '')
      .set('groupCode', (this.customerGroupForm.value.groupCode !== null ? this.customerGroupForm.value.groupCode : ''))
      .set('groupName', (this.customerGroupForm.value.groupName !== null ? this.customerGroupForm.value.groupName : ''));
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
