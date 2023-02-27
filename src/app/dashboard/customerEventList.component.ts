import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { Users } from '../models/user';
import { LoginService } from '../services/login.service';
import { AppConstant } from '../utility/app.constant';

@Component({
  selector: 'customerEventList',
  templateUrl: './customerEventList.component.html',
  styleUrls: ['./customerEventList.component.css']
})
export class customerEventListComponent implements OnInit, OnDestroy {


  id: any;
  public keys: Array<TABLECOLUMN> = [];
  public dataSource: any;
  public totalElement = 0;
  public fileObject: any;
  public reportData = {
    content: [{ 'test': 'test' }],
    totalElements: 1,
  };

  topicForm: FormGroup;
  public force = false;
  public users : Users;
  public adminFilter: AdminFilter;
  private readonly subscriptions: Subscription = new Subscription();
  filter : any;
  constructor(public fb: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly router: Router,
    private readonly datePipe: DatePipe,
    private readonly loginService: LoginService,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.eventHistoryFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    let keys = [...TableColumnData.EVENT_HISTORY_KEYS];
    keys.shift();
    this.keys = keys;
    this.setUpForm(this.adminFilter.eventHistoryFilter.formValue);
    this.search(this.adminFilter.eventHistoryFilter.page, true);
    this.getEventHistoryListFromStore();
    this.getEventHistoryDataCountFromStore();
    this.users = this.loginService.getUser();
    this.scrollTop();
  }

  scrollTop(){
    window.scroll(0,0);
  }

  addEventHistory(): any {
    this.router.navigate(['customerEventView'],{ queryParams: { customerId: this.users.outhMeResponse.customerId, addRequest : true } });
  }

  goToEditEventHistory(event: any): any {
    this.router.navigate(['customerEventView'], { queryParams: { customerEventId: event.id, customerId: event.customerId } });
  }

  setUpForm(event: any) {
    this.topicForm = this.fb.group({
      periodStart: [event && event.periodStart ? new Date(event.periodStart) : ''],
      auditId: [event !== undefined && event !== null ? event.auditId : ''],
      eventCode: [event !== undefined && event !== null ? event.eventCode : ''],
      periodEnd: [event && event.periodEnd ? new Date(event.periodEnd) : ''],
      customerName: [event !== undefined && event !== null ? event.customerName : ''],
      eventName: [event !== undefined && event !== null ? event.eventName : ''],
      eventFile: [event !== undefined && event !== null ? event.eventFile : ''],
    });
  }

  findEventHistory(force: boolean, filter: any): void {
    this.adminFilter.eventHistoryFilter.formValue = this.topicForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.administrativeService.getEventHistoryCount(filter);
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.eventHistoryFilter.page = event;
    let sortFiled = '';
    if (event && event.sort.active === 'eventCode') {
      sortFiled = 'customerEventType.eventCode';
    } else if (event && event.sort.active === 'eventName') {
      sortFiled = 'customerEventType.eventName';
    } else if (event && event.sort.active) {
      sortFiled = event.sort.active;
    }
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && sortFiled !== undefined ? (sortFiled === 'customerName' ? 'customer.user.name' : sortFiled) : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('dateFrom', (this.topicForm.value.periodStart ? this.datePipe.transform(this.topicForm.value.periodStart, 'MM/dd/yyyy') : ''))
      .set('customer.auditId', (this.topicForm.value.auditId !== null ? this.topicForm.value.auditId : ''))
      .set('customerEventType.eventCode', (this.topicForm.value.eventCode !== null ? this.topicForm.value.eventCode : ''))
      .set('dateTo', (this.topicForm.value.periodEnd ? this.datePipe.transform(this.topicForm.value.periodEnd, 'MM/dd/yyyy') : ''))
      .set('customer.user.name', (this.topicForm.value.customerName !== null ? this.topicForm.value.customerName : ''))
      .set('customerEventType.eventName', (this.topicForm.value.eventName !== null ? this.topicForm.value.eventName : ''))
      .set('eventFile', (this.topicForm.value.eventFile !== null ? this.topicForm.value.eventFile : ''));

      this.force = true;
      this.filter = params;
      if(isSearch) this.administrativeService.getEventHistoryCount(this.filter);
      this.administrativeService.loadEventHistoryList(this.force, this.filter);
  }

  getEventHistoryDataCountFromStore(){
    this.subscriptions.add( this.administrativeService.getEventHistoryCountSeletor()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((eventHistoryCount: any) => {
        this.reportData.totalElements = eventHistoryCount;
        this.totalElement = eventHistoryCount;
      }));
  }

  getEventHistoryListFromStore(){
    this.subscriptions.add(this.administrativeService.getEventHistoryList()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((eventHistoryList: any) => {
      this.reportData.content = eventHistoryList;
      this.dataSource = [...this.reportData.content];
    }));
  }

  handleFileInput(file: any) {
    this.fileObject = file[0];
  }

  uploadEventHistoryFile() {
    if (this.fileObject) {
      this.administrativeService.uploadEventHistoryFile(this.fileObject);
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

