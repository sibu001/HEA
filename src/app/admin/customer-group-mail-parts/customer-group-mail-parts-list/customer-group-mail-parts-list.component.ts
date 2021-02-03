import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-group-mail-parts-list',
  templateUrl: './customer-group-mail-parts-list.component.html',
  styleUrls: ['./customer-group-mail-parts-list.component.css']
})
export class CustomerGroupMailPartsListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_GROUP_MAIL_PART_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public pageIndex: any;
  public mailData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  customerGroupData: any[];
  mailForm: FormGroup;
  public force = false;
  public adminFilter: AdminFilter;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly router: Router,
    private readonly mailService: MailService,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.customerGroupMailPartFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
    this.findCustomerGroup(false, '');
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.customerGroupMailPartFilter.formValue);
    this.search(this.adminFilter.customerGroupMailPartFilter.page, false);
  }

  setUpForm(event: any) {
    this.mailForm = this.fb.group({
      customerGroup: [event !== undefined && event !== null ? event.customerGroup : ''],
    });
  }

  findCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData = customerGroupList;
      }));
  }


  findCustomerGroupMailPart(force: boolean, filter: any): void {
    this.adminFilter.customerGroupMailPartFilter.formValue = this.mailForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    // this.subscriptions.add(this.mailService.loadCustomerGroupMailPartCount(filter).pipe(skipWhile((item: any) => !item))
    //   .subscribe((administrativeReportListCount: any) => {
    //     this.mailData.totalElements = administrativeReportListCount.administrativeManagement.administrativeReportCount;
    //     this.totalElement = administrativeReportListCount.administrativeManagement.administrativeReportCount;
    this.mailService.loadCustomerGroupMailPartList(force, filter);
    this.subscriptions.add(this.mailService.getCustomerGroupMailPartList().pipe(skipWhile((item: any) => !item))
      .subscribe((reportList: any) => {
        this.mailData.content = reportList;
        this.dataSource = [...this.mailData.content];
      }));
    // }));
  }


  search(event: any, isSearch: boolean): void {
    this.adminFilter.customerGroupMailPartFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      // .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      // .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      //   (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', 'customerGroup.groupName')
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('customerGroupId', (this.mailForm.value.customerGroup !== null ? this.mailForm.value.customerGroup : ''));
    this.findCustomerGroupMailPart(true, params);
  }

  addMailParts(): any {
    this.router.navigate(['/admin/customerGroupMailParts/customerGroupMailPartsEdit']);
  }

  goToEditMailParts(event: any): any {
    const id = event.col.key === 'header' ? event.headerId : event.footerId;
    this.router.navigate(['/admin/customerGroupMailParts/customerGroupMailPartsEdit'], { queryParams: { id: id } });
  }


  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

