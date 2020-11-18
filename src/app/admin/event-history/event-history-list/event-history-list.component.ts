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

  goToEditEventHistory(event): any {
    this.router.navigate(['admin/eventHistory/eventHistoryEdit'], { queryParams: { id: event.id } });
  }

  setUpForm(event: any) {
    this.topicForm = this.fb.group({
      periodStart: [event !== undefined && event !== null ? event.periodStart : ''],
      auditId: [event !== undefined && event !== null ? event.auditId : ''],
      eventCode: [event !== undefined && event !== null ? event.eventCode : ''],
      periodEnd: [event !== undefined && event !== null ? event.periodEnd : ''],
      customerName: [event !== undefined && event !== null ? event.customerName : ''],
      eventName: [event !== undefined && event !== null ? event.eventName : ''],
      eventFile: [event !== undefined && event !== null ? event.eventFile : ''],
    });
  }

  findEventHistory(force: boolean, filter: any): void {
    this.adminFilter.eventHistoryFilter.formValue = this.topicForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.administrativeService.loadTopicList(force, filter);
    this.subscriptions.add(this.administrativeService.getTopicList().pipe(skipWhile((item: any) => !item))
      .subscribe((topicList: any) => {
        this.reportData.content = topicList.list;
        this.reportData.totalElements = topicList.totalSize;
        this.dataSource = [...this.reportData.content];
      }));
  }


  search(event: any, isSearch: boolean): void {
    this.adminFilter.eventHistoryFilter.page = event;
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('filter.periodStart', (this.topicForm.value.periodStart !== null ? this.topicForm.value.periodStart : ''))
      .set('filter.auditId', (this.topicForm.value.auditId !== null ? this.topicForm.value.auditId : ''))
      .set('filter.eventCode', (this.topicForm.value.eventCode !== null ? this.topicForm.value.eventCode : ''))
      .set('filter.periodEnd', (this.topicForm.value.periodEnd !== null ? this.topicForm.value.periodEnd : ''))
      .set('filter.customerName', (this.topicForm.value.customerName !== null ? this.topicForm.value.customerName : ''))
      .set('filter.eventName', (this.topicForm.value.eventName !== null ? this.topicForm.value.eventName : ''))
      .set('filter.eventFile', (this.topicForm.value.eventFile !== null ? this.topicForm.value.eventFile : ''));
    this.findEventHistory(true, params);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

