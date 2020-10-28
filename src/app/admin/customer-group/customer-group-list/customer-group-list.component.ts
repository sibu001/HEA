import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    private readonly router: Router) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CUSTOMER_GROUP_COLUMN_DATA;
    this.findCustomerGroup();
  }

  findCustomerGroup() {
    this.systemService.loadCustomerGroupList(false, '');
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData.content = customerGroupList;
        this.dataSource = [...this.customerGroupData.content];
      }));

  }

  gotoEditCustomerGroup(event: any) {
    this.router.navigate(['admin/customer-group/customerGroupEdit'], { queryParams: { 'id': event.id } });
  }

  addCustomerGroup() {
    this.router.navigate(['admin/customer-group/customerGroupEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
