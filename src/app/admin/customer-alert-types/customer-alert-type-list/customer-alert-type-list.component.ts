import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockableUI } from 'primeng/primeng';
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
  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_ALERT_TYPE_COLUMN_DATA;
  public dataSource: any;
  public force = false;
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
    this.scrollTop();
    this.findCustomerAlertType(this.force, '');
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  findCustomerAlertType(force: boolean, filter: any): void {
    this.systemService.loadGetCustomerAlertTypeList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerAlertTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerAlertTypeList: any) => {
        this.customerAlertTypeData.content = customerAlertTypeList;
        this.dataSource = [...this.customerAlertTypeData.content];
      }));
  }

  search(event: any): void {
    const params = new HttpParams()
      .set('startRow', '0')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('alertCode', (this.customerAlertTypeForm.value.alertCode !== null ? this.customerAlertTypeForm.value.alertCode : ''))
      .set('alertName', (this.customerAlertTypeForm.value.alertName !== null ? this.customerAlertTypeForm.value.alertName : ''));
    this.findCustomerAlertType(true, params);
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

