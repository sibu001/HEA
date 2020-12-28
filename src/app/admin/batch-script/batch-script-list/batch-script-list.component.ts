import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-batch-script-list',
  templateUrl: './batch-script-list.component.html',
  styleUrls: ['./batch-script-list.component.css']
})
export class BatchScriptListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.BATCH_SCRIPT_KEY;
  public dataSource: any;
  public pageIndex: any;
  public totalElement = 0;
  public batchScriptData = {
    content: [],
    totalElements: 0,
  };
  batchScriptForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  // periodData = TableColumnData.PERIOD_DATA;
  periodData: any;
  constructor(public fb: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.batchScriptFilter === null) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.loadBatchPeriodList();
    this.setUpForm(this.adminFilter.batchScriptFilter.formValue);
    this.search(this.adminFilter.batchScriptFilter.page, false);
  }

  gotoEditBatchScript(event: any): any {
    this.router.navigate(['/admin/batchScript/batchScriptEdit'], { queryParams: { id: event.id } });
  }

  addBatchScript(): any {
    this.router.navigate(['/admin/batchScript/batchScriptEdit']);
  }

  setUpForm(event: any) {
    this.batchScriptForm = this.fb.group({
      batchName: [event !== undefined && event !== null ? event.batchName : ''],
      batchPeriod: [event !== undefined && event !== null ? event.batchPeriod : ''],
    });
  }

  loadBatchPeriodList(): any {
    this.systemService.loadBatchPeriodList();
    this.subscriptions.add(this.systemService.getBatchPeriodList().pipe(skipWhile((item: any) => !item))
      .subscribe((batchPeriodList: any) => {
        this.periodData = batchPeriodList.data;
      }));
  }


  findBatchScript(force: boolean, filter: any): void {
    this.adminFilter.batchScriptFilter.formValue = this.batchScriptForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(this.systemMeasurementService.loadScriptBatchCount(filter).pipe(skipWhile((item: any) => !item))
      .subscribe((scriptBatchListCount: any) => {
        this.batchScriptData.totalElements = scriptBatchListCount.systemMeasurement.scriptBatchCount;
        this.totalElement = scriptBatchListCount.systemMeasurement.scriptBatchCount;
        this.systemMeasurementService.loadScriptBatchList(force, filter);
        this.subscriptions.add(this.systemMeasurementService.getScriptBatchList().pipe(skipWhile((item: any) => !item))
          .subscribe((factorList: any) => {
            this.batchScriptData.content = factorList;
            this.dataSource = [...this.batchScriptData.content];
          }));
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.batchScriptFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('batchName', (this.batchScriptForm.value.batchName !== null ? this.batchScriptForm.value.batchName : ''))
      .set('batchPeriod', (this.batchScriptForm.value.batchPeriod !== null ? this.batchScriptForm.value.batchPeriod : ''));
    this.findBatchScript(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
