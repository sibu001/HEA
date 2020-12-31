import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public pageIndex: any;
  public totalElement = 0;
  public measurementsData = {
    content: [],
    totalElements: 0,
  };
  cimisStation: Array<any>;
  measurementsForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  public baseTemp: Array<any> = TableColumnData.BASE_TEMPERATURE;
  constructor(public fb: FormBuilder,
    private readonly datePipe: DatePipe,
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
    this.loadCimisStation();
    this.setUpForm(this.adminFilter.cimisMeasurementFilter.formValue);
    this.search(this.adminFilter.cimisMeasurementFilter.page, false);
  }

  setUpForm(event: any): void {
    this.measurementsForm = this.fb.group({
      stationNbr: [event !== undefined && event !== null ? event.stationNbr : ''],
      cmDateTimeFrom: [event && event.cmDateTimeFrom ? new Date(event.cmDateTimeFrom) : ''],
      cmDateTimeTo: [event && event.cmDateTimeTo ? new Date(event.cmDateTimeTo) : ''],
    });
  }

  loadCimisStation(): void {
    const params = new HttpParams()
      .set('isActive', 'true');
    this.systemMeasurementService.loadCimisStationList(true, params);
    this.subscriptions.add(this.systemMeasurementService.getCimisStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((cimisStationList: any) => {
        this.cimisStation = cimisStationList;
      }));
  }

  findCimisMeasurement(force: boolean, filter: any): void {
    this.adminFilter.cimisMeasurementFilter.formValue = this.measurementsForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(this.systemMeasurementService.loadCimisMeasurementCount(filter).pipe(skipWhile((item: any) => !item))
      .subscribe((cimisMeasurementCount: any) => {
        this.measurementsData.totalElements = cimisMeasurementCount.systemMeasurement.cimisMeasurementCount;
        this.totalElement = cimisMeasurementCount.systemMeasurement.cimisMeasurementCount;
        this.systemMeasurementService.loadCimisMeasurementList(force, filter);
        this.subscriptions.add(this.systemMeasurementService.getCimisMeasurementList().pipe(skipWhile((item: any) => !item))
          .subscribe((cimisMeasurementList: any) => {
            this.measurementsData.content = cimisMeasurementList;
            this.dataSource = [...this.measurementsData.content];
          }));
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.cimisMeasurementFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('stationNbr', (this.measurementsForm.value.stationNbr !== null ? this.measurementsForm.value.stationNbr : ''))
      .set('cmDateTimeFrom', (this.measurementsForm.value.cmDateTimeFrom ? this.datePipe.transform(this.measurementsForm.value.cmDateTimeFrom, 'MM/dd/yyyy') : ''))
      .set('cmDateTimeTo', (this.measurementsForm.value.cmDateTimeTo ? this.datePipe.transform(this.measurementsForm.value.cmDateTimeTo, 'MM/dd/yyyy') : ''));
    this.findCimisMeasurement(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
