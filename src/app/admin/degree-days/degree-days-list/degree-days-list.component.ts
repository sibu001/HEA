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
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-degree-days-list',
  templateUrl: './degree-days-list.component.html',
  styleUrls: ['./degree-days-list.component.css']
})
export class DegreeDaysListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.DEGREE_DAY_KEY;
  public dataSource: any;
  public fileObject: any;
  public pageIndex: any;
  public totalElement = 0;
  public degreeDayData = {
    content: [],
    totalElements: 0,
  };
  degreeDayForm: FormGroup;
  public force = false;
  public adminFilter: AdminFilter;
  public stationIds: Array<any>;
  public baseTemp: Array<any> = TableColumnData.BASE_TEMPERATURE;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly datePipe: DatePipe,
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
    this.findWeatherStation(true, '');
    this.setUpForm(this.adminFilter.degreeDaysFilter.formValue);
    this.search(this.adminFilter.degreeDaysFilter.page, false);
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.stationIds = weatherStationList;
      }));
  }

  setUpForm(event: any): void {
    this.degreeDayForm = this.fb.group({
      degreeDaysFile: [event !== undefined && event !== null ? event.degreeDaysFile : ''],
      stationId: [event !== undefined && event !== null ? event.stationId : ''],
      valueDateFrom: [event && event.valueDateFrom ? new Date(event.valueDateFrom) : ''],
      type: [event !== undefined && event !== null ? event.type : ''],
      valueDateTo: [event && event.valueDateTo ? new Date(event.valueDateTo) : ''],
      base: [event !== undefined && event !== null ? event.base : ''],
    });
  }

  findDegreeDays(force: boolean, filter: any): void {
    this.adminFilter.degreeDaysFilter.formValue = this.degreeDayForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(this.systemUtilityService.loadDegreeDaysCount(filter).pipe(skipWhile((item: any) => !item))
      .subscribe((degreeDaysListCount: any) => {
        this.degreeDayData.totalElements = degreeDaysListCount.systemUtilityManagement.degreeDaysCount;
        this.totalElement = degreeDaysListCount.systemUtilityManagement.degreeDaysCount;
        this.systemUtilityService.loadDegreeDaysList(force, filter);
        this.subscriptions.add(this.systemUtilityService.getDegreeDaysList().pipe(skipWhile((item: any) => !item))
          .subscribe((degreeDaysList: any) => {
            this.degreeDayData.content = degreeDaysList;
            this.dataSource = [...this.degreeDayData.content];
          }));
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.degreeDaysFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('stationId', (this.degreeDayForm.value.stationId !== null ? this.degreeDayForm.value.stationId : ''))
      .set('valueDateFrom', (this.degreeDayForm.value.valueDateFrom ? this.datePipe.transform(this.degreeDayForm.value.valueDateFrom, 'MM/dd/yyyy') : ''))
      .set('type', (this.degreeDayForm.value.type !== null ? this.degreeDayForm.value.type : ''))
      .set('valueDateTo', (this.degreeDayForm.value.valueDateTo ? this.datePipe.transform(this.degreeDayForm.value.valueDateTo, 'MM/dd/yyyy') : ''))
      .set('base', (this.degreeDayForm.value.base !== null ? this.degreeDayForm.value.base : ''));
    this.findDegreeDays(true, params);
  }

  handleFileInput(file: any): void {
    this.fileObject = file[0];
  }

  upload(): void {
    if (this.degreeDayForm.value.degreeDaysFile) {
      this.systemUtilityService.saveDegreeDaysUsingFile(this.fileObject);
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
