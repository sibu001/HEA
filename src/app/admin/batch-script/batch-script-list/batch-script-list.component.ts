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
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-batch-script-list',
  templateUrl: './batch-script-list.component.html',
  styleUrls: ['./batch-script-list.component.css']
})
export class BatchScriptListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.BATCH_SCRIPT_KEY;
  public dataSource: any;
  public batchScriptData = {
    content: [],
    totalElements: 0,
  };
  batchScriptForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  constructor(public fb: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly router: Router,
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
    this.setUpForm(this.adminFilter.factorFilter.formValue);
    this.search(this.adminFilter.factorFilter.page);
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

  findBatchScript(force: boolean, filter: any): void {
    this.adminFilter.batchScriptFilter.formValue = this.batchScriptForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemMeasurementService.loadScriptBatchList(force, filter);
    this.subscriptions.add(this.systemMeasurementService.getScriptBatchList().pipe(skipWhile((item: any) => !item))
      .subscribe((factorList: any) => {
        this.batchScriptData.content = factorList.list;
        this.batchScriptData.totalElements = factorList.totalSize;
        this.dataSource = [...this.batchScriptData.content];
      }));
  }

  search(event: any): void {
    this.adminFilter.factorFilter.page = event;
    const params = new HttpParams()
      .set('filter.startRow', '0')
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('batchScriptId', '')
      .set('filter.batchName', (this.batchScriptForm.value.batchName !== null ? this.batchScriptForm.value.batchName : ''))
      .set('filter.batchPeriod', (this.batchScriptForm.value.batchPeriod !== null ? this.batchScriptForm.value.batchPeriod : ''));
    this.findBatchScript(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
