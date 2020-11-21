import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-event-list',
  templateUrl: './customer-event-list.component.html',
  styleUrls: ['./customer-event-list.component.css']
})
export class CustomerEventListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_EVENT_TYPE_COLUMN_DATA;
  public dataSource: any;
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
    this.findCustomerEventType(this.force, '');
  }

  findCustomerEventType(force: boolean, filter: string): void {
    this.systemUtilityService.loadCustomerEventTypeList(filter);
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

  search(event: any): void {
    const filter = '?filter.startRow=0&formAction='
      + (event !== undefined && event.active !== undefined ? 'sort' : '') + '&sortField='
      + (event !== undefined && event.sort.active !== undefined ? event.sort.active : '') + '&sortOrder='
      + (event !== undefined && event.sort.direction !== undefined ? event.sort.direction : 'ASC')
      + '&customerEventTypeId=&filter.eventCode='
      + this.customerGroupForm.value.eventCode + '&filter.eventName='
      + this.customerGroupForm.value.eventName;
    this.findCustomerEventType(true, filter);
  }
}
