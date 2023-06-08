import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
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
  public mailData = {
    pageIndex : 0,
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  pageSize : number = Number(AppConstant.pageSize );
  customerGroupData: any[];
  mailForm: FormGroup;
  public force = false;
  public adminFilter: AdminFilter;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
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
      this.force = AppUtility.forceParamToBoolean(params['force']);
    });
    this.getCustomerGroupMailPart();
    this.getCustomerGroupList();
    this.getCustomerGroupCount();
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.customerGroupMailPartFilter.formValue);
    this.search(this.adminFilter.customerGroupMailPartFilter.page, this.force);
  }

  setUpForm(event: any) {
    this.mailForm = this.fb.group({
      customerGroup: [event !== undefined && event !== null ? event.customerGroup : ''],
    });
  }

  loadCustomerGroupMailPart(force: boolean, mailPartParams: any, customerGroupParams : any): void {
    this.adminFilter.customerGroupMailPartFilter.formValue = this.mailForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.mailService.loadCustomerGroupMailPartList(force, mailPartParams, customerGroupParams);
  }

  getCustomerGroupMailPart(){
    this.subscriptions.add(this.mailService.getCustomerGroupMailPartListTableData()
    .pipe(filter((item: any) => item instanceof Array))
    .subscribe((reportList: any) => {
      this.mailData.content = reportList;
      this.dataSource = [...this.mailData.content];
      AppUtility.scrollToTableTop(this.tableScrollPoint);
    }));
  }

  getCustomerGroupList(){
    this.systemService.loadCustomerGroupList(false, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList()
      .pipe(filter((item: any) => item && item.length),take(1))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData = customerGroupList;
      }));
  }

  getCustomerGroupCount(){
    this.subscriptions.add(
      this.systemService.getCustomerGroupCount()
      .subscribe(data =>{
        this.mailData.totalElements = data;
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.customerGroupMailPartFilter.page = event;
    if(!event) this.mailData.pageIndex = 0;

    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize  ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', 'groupName')
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('customerGroupId', (this.mailForm.value.customerGroup !== null ? this.mailForm.value.customerGroup : ''));

    const paramsForMailPartGroup = params
        .delete('sortField').delete('pageSize')
        .append('sortField','customerGroup.groupName')
        .append('pageSize',(4 * Number(params.get('pageSize'))).toString());

    this.systemService.loadCustomerGroupCount(isSearch,params);
    this.loadCustomerGroupMailPart(isSearch, paramsForMailPartGroup, params);
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

