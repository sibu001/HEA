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

@Component({
  selector: 'app-event-history-list',
  templateUrl: './event-history-list.component.html',
  styleUrls: ['./event-history-list.component.css']
})
export class EventHistoryListComponent implements OnInit, OnDestroy {


  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.EVENT_HISTORY_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public fileObject: any;
  public reportData = {
    content: [{ 'test': 'test' }],
    totalElements: 1,
  };

  topicForm: FormGroup;
  public force = false;
  public adminFilter: AdminFilter;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly router: Router,
    private readonly datePipe: DatePipe,
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
    this.setUpForm(this.adminFilter.eventHistoryFilter.formValue);
    this.search(this.adminFilter.eventHistoryFilter.page, false);
  }

  addEventHistory(): any {
    this.router.navigate(['admin/eventHistory/eventHistoryEdit']);
  }

  goToEditEventHistory(event: any): any {
    this.router.navigate(['admin/eventHistory/eventHistoryEdit'], { queryParams: { customerEventId: event.id, customerId: event.customerId } });
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
    this.subscriptions.add(this.administrativeService.getEventHistoryCount(filter).pipe(skipWhile((item: any) => !item))
      .subscribe((eventHistoryCount: any) => {
        this.reportData.totalElements = eventHistoryCount.administrativeManagement.eventHistoryCount;
        this.totalElement = eventHistoryCount.administrativeManagement.eventHistoryCount;
        this.administrativeService.loadEventHistoryList(force, filter);
        this.subscriptions.add(this.administrativeService.getEventHistoryList().pipe(skipWhile((item: any) => !item))
          .subscribe((eventHistoryList: any) => {
            this.reportData.content = eventHistoryList;
            this.dataSource = [...this.reportData.content];
          }));
      }));
  }


  search(event: any, isSearch: boolean): void {
    this.adminFilter.eventHistoryFilter.page = event;
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? (event.sort.active === 'customerName' ? 'customer.user.name' : event.sort.active) : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('dateFrom', (this.topicForm.value.periodStart ? this.datePipe.transform(this.topicForm.value.periodStart, 'MM/dd/yyyy') : ''))
      .set('customer.auditId', (this.topicForm.value.auditId !== null ? this.topicForm.value.auditId : ''))
      .set('customerEventType.eventCode', (this.topicForm.value.eventCode !== null ? this.topicForm.value.eventCode : ''))
      .set('dateTo', (this.topicForm.value.periodEnd ? this.datePipe.transform(this.topicForm.value.periodEnd, 'MM/dd/yyyy') : ''))
      .set('customer.user.name', (this.topicForm.value.customerName !== null ? this.topicForm.value.customerName : ''))
      .set('customerEventType.eventName', (this.topicForm.value.eventName !== null ? this.topicForm.value.eventName : ''))
      .set('eventFile', (this.topicForm.value.eventFile !== null ? this.topicForm.value.eventFile : ''));
    this.findEventHistory(true, params);

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

