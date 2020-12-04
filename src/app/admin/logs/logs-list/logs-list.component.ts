import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.LOGS_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public logsData = {
    content: [],
    totalElements: 0,
  };
  logsForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  constructor(public fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.logFilter.formValue);
    this.search(this.adminFilter.logFilter.page, false);
  }

  setUpForm(event: any) {
    this.logsForm = this.fb.group({
      username: [event !== undefined && event !== null ? event.username : ''],
      recordType: [event !== undefined && event !== null ? event.recordType : ''],
      entity: [event !== undefined && event !== null ? event.entity : ''],
      entityReference: [event !== undefined && event !== null ? event.entityReference : ''],
      comment: [event !== undefined && event !== null ? event.comment : ''],
    });
  }

  findLogs(force: boolean, filter: any): void {
    this.adminFilter.logFilter.formValue = this.logsForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemUtilityService.loadLogsList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getLogsList().pipe(skipWhile((item: any) => !item))
      .subscribe((logsList: any) => {
        this.logsData.content = logsList.list;
        this.logsData.totalElements = logsList.totalSize;
        this.dataSource = [...this.logsData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.logFilter.page = event;
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('logId', '')
      .set('filter.username', (this.logsForm.value.username !== null ? this.logsForm.value.username : ''))
      .set('filter.recordType', (this.logsForm.value.recordType !== null ? this.logsForm.value.recordType : ''))
      .set('filter.entity', (this.logsForm.value.entity !== null ? this.logsForm.value.entity : ''))
      .set('filter.entityReference', (this.logsForm.value.entityReference !== null ? this.logsForm.value.entityReference : ''))
      .set('filter.comment', (this.logsForm.value.recordType !== null ? this.logsForm.value.comment : ''));
    this.findLogs(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
