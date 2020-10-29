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
  selector: 'app-customer-event-list',
  templateUrl: './customer-event-list.component.html',
  styleUrls: ['./customer-event-list.component.css']
})
export class CustomerEventListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
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
    private readonly systemService: SystemService,
    private readonly router: Router) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CUSTOMER_EVENT_TYPE_COLUMN_DATA;
    this.findCustomerEventType();
  }

  findCustomerEventType() {

  }

  gotoEditCustomerEventType(event: any) {
    this.router.navigate(['admin/customerEvent/customerEventTypeEdit'], { queryParams: { 'id': event.id } });
  }

  addCustomerEventType() {
    this.router.navigate(['admin/customerEvent/customerEventTypeEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
