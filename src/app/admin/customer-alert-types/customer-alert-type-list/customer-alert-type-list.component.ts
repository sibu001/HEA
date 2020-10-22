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
  selector: 'app-customer-alert-type-list',
  templateUrl: './customer-alert-type-list.component.html',
  styleUrls: ['./customer-alert-type-list.component.css']
})
export class CustomerAlertTypeListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
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
    private readonly router: Router) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CUSTOMER_ALERT_TYPE_COLUMN_DATA;
    this.findCustomerAlertType();
  }

  findCustomerAlertType(): void {
    this.systemService.loadGetCustomerAlertTypeList(false);
    this.subscriptions.add(this.systemService.getCustomerAlertTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerAlertTypeList: any) => {
        this.customerAlertTypeData.content = customerAlertTypeList;
        this.dataSource = [...this.customerAlertTypeData.content];
      }));

  }

  gotoEditCustomerAlertType(event: any): any {
    this.router.navigate(['admin/customer-alert/customerAlertTypeEdit'], { queryParams: { 'id': event.id } });
  }

  addCustomerAlertType() {
    this.router.navigate(['admin/customer-alert/customerAlertTypeEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

