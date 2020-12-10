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

  setUpForm(event: any) {
    this.degreeDayForm = this.fb.group({
      fileBody: [event !== undefined && event !== null ? event.fileBody : ''],
      stationId: [event !== undefined && event !== null ? event.stationId : ''],
      valueDateFrom: [event !== undefined && event !== null ? event.valueDateFrom : ''],
      type: [event !== undefined && event !== null ? event.type : ''],
      valueDateTo: [event !== undefined && event !== null ? event.valueDateTo : ''],
      base: [event !== undefined && event !== null ? event.base : ''],
    });
  }

  findDegreeDays(force: boolean, filter: any): void {
    this.adminFilter.degreeDaysFilter.formValue = this.degreeDayForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemUtilityService.loadDegreeDaysList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getDegreeDaysList().pipe(skipWhile((item: any) => !item))
      .subscribe((degreeDaysList: any) => {
        this.degreeDayData.content = degreeDaysList.list;
        this.degreeDayData.totalElements = degreeDaysList.totalSize;
        this.dataSource = [...this.degreeDayData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.degreeDaysFilter.page = event;
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('degreeDaysId', '')
      .set('filter.stationId', (this.degreeDayForm.value.stationId !== null ? this.degreeDayForm.value.stationId : ''))
      .set('filter.valueDateFrom', (this.degreeDayForm.value.valueDateFrom !== null ? this.degreeDayForm.value.valueDateFrom : ''))
      .set('filter.type', (this.degreeDayForm.value.type !== null ? this.degreeDayForm.value.type : ''))
      .set('filter.valueDateTo', (this.degreeDayForm.value.valueDateTo !== null ? this.degreeDayForm.value.valueDateTo : ''))
      .set('filter.base', (this.degreeDayForm.value.base !== null ? this.degreeDayForm.value.base : ''));
    this.findDegreeDays(true, params);
  }
  upload(): any {

  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
