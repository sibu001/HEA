import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { LogsEditComponent } from '../logs-edit/logs-edit.component';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.LOGS_KEYS;
  public recordTypeList: any[] = TableColumnData.RECORD_TYPE;
  public dataSource: any;
  public totalElement = 0;
  public pageIndex: any;
  public logsData = {
    content: [],
    totalElements: 0,
  };
  logsForm: FormGroup;
  public pageSize : number = Number(AppConstant.pageSize);
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
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
    this.getLogList();
    this.getLogListCout();
  }

  setUpForm(event: any) {
    this.logsForm = this.fb.group({
      username: [event !== undefined && event !== null ? event.username : ''],
      recordType: [event !== undefined && event !== null ? event.recordType : ''],
      entity: [event !== undefined && event !== null ? event.entity : ''],
      entityReference: [event !== undefined && event !== null ? event.entityReference : ''],
      comment: [event !== undefined && event !== null ? event.comment : ''],
      auditId: ['']
    });
  }

  loadLogListCount(force: boolean, filter: any): void {
    this.adminFilter.logFilter.formValue = this.logsForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemUtilityService.loadLogsCount(filter);
  }

  getLogListCout(){
    this.subscriptions.add(
      this.systemUtilityService.getLogListCount()
      .subscribe(
          (logListCount) =>{
            this.logsData.totalElements = logListCount;
            this.totalElement = logListCount;
          }
      )
    )
  }

  loadLogList(force: boolean, filter: any){
    this.systemUtilityService.loadLogsList(force, filter);
  }
  
  getLogList(){
    this.subscriptions.add(this.systemUtilityService.getLogsList().pipe(skipWhile((item: any) => !item))
    .subscribe((logsList: any) => {
      this.logsData.content = logsList;
      this.dataSource = [...this.logsData.content];
      setTimeout(()=> AppUtility.scrollToTableTop(this.tableScrollPoint));
    }));
  }

  editLogs(event: any){
    const dialogRef = this.dialog.open(LogsEditComponent, {
      width: '60vw',
      height: '60vh',
      data: event,
      disableClose: false
    });

    dialogRef.afterClosed()
    .subscribe(result => {
    
    });
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.logFilter.page = event;
    if(event) this.pageIndex = event.pageIndex;
    else this.pageIndex = 0;

    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('username', (this.logsForm.value.username !== null ? this.logsForm.value.username : ''))
      .set('auditId', (this.logsForm.value.auditId !== null ? this.logsForm.value.auditId : ''))
      .set('recordType', (this.logsForm.value.recordType !== null ? this.logsForm.value.recordType : ''))
      .set('entity', (this.logsForm.value.entity !== null ? this.logsForm.value.entity : ''))
      .set('useLikeSearch', AppUtility.isAddIsLikeSearchParam(this.logsForm.value))
      .set('entityReference', (this.logsForm.value.entityReference !== null ? this.logsForm.value.entityReference : ''))
      .set('comment', (this.logsForm.value.recordType !== null ? this.logsForm.value.comment : ''));
    this.loadLogListCount(true, params);
    this.loadLogList(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
