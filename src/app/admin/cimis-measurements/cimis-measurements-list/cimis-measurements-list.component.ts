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
  selector: 'app-cimis-measurements-list',
  templateUrl: './cimis-measurements-list.component.html',
  styleUrls: ['./cimis-measurements-list.component.css']
})
export class CimisMeasurementsListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN> = TableColumnData.CIMIS_MEASUREMENTS_KEY;
  public dataSource: any;
  public measurementsData = {
    content: [],
    totalElements: 0,
  };
  cimisStation: Array<any> = TableColumnData.CIMIS_STATION_DATA;
  measurementsForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  public stationIds: Array<any> = TableColumnData.PLACE_STATION_ID;
  public baseTemp: Array<any> = TableColumnData.BASE_TEMPERATURE;
  constructor(public fb: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
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
    this.setUpForm(this.adminFilter.cimisMeasurementFilter.formValue);
    this.search(this.adminFilter.cimisMeasurementFilter.page, false);
  }

  setUpForm(event: any) {
    this.measurementsForm = this.fb.group({
      stationNbr: [event !== undefined && event !== null ? event.stationNbr : ''],
      cmDateTimeFrom: [event !== undefined && event !== null ? event.cmDateTimeFrom : ''],
      cmDateTimeTo: [event !== undefined && event !== null ? event.cmDateTimeTo : ''],
    });
  }

  findCimisMeasurement(force: boolean, filter: any): void {
    this.adminFilter.cimisMeasurementFilter.formValue = this.measurementsForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemMeasurementService.loadCimisMeasurementList(force, filter);
    this.subscriptions.add(this.systemMeasurementService.getCimisMeasurementList().pipe(skipWhile((item: any) => !item))
      .subscribe((cimisMeasurementList: any) => {
        this.measurementsData.content = cimisMeasurementList.list;
        this.measurementsData.totalElements = cimisMeasurementList.totalSize;
        this.dataSource = [...this.measurementsData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.cimisMeasurementFilter.page = event;
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('filter.stationNbr', (this.measurementsForm.value.stationNbr !== null ? this.measurementsForm.value.stationNbr : ''))
      .set('filter.cmDateTimeFrom', (this.measurementsForm.value.cmDateTimeFrom !== null ? this.measurementsForm.value.cmDateTimeFrom : ''))
      .set('filter.cmDateTimeTo', (this.measurementsForm.value.cmDateTimeTo !== null ? this.measurementsForm.value.cmDateTimeTo : ''));
    this.findCimisMeasurement(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
