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
  selector: 'app-weather-station-list',
  templateUrl: './weather-station-list.component.html',
  styleUrls: ['./weather-station-list.component.css']
})
export class WeatherStationListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.WEATHER_STATION_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public weatherStationData = {
    content: [],
    totalElements: 0,
  };
  weatherStationForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  constructor(public fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.weatherStationFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.weatherStationFilter.formValue);
    this.search(this.adminFilter.weatherStationFilter.page, false);
  }

  goToEditWeatherStation(event: any): any {
    this.router.navigate(['/admin/weatherStation/weatherStationEdit'], { queryParams: { 'id': event.id } });
  }

  addWeatherStation(): any {
    this.router.navigate(['/admin/weatherStation/weatherStationEdit']);
  }

  setUpForm(event: any) {
    this.weatherStationForm = this.fb.group({
      stationId: [event !== undefined && event !== null ? event.stationId : ''],
      stationName: [event !== undefined && event !== null ? event.stationName : ''],
    });
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.adminFilter.weatherStationFilter.formValue = this.weatherStationForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.weatherStationData.content = weatherStationList;
        this.weatherStationData.totalElements = weatherStationList.totalSize;
        this.dataSource = [...this.weatherStationData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.weatherStationFilter.page = event;
    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('stationId', '')
      .set('stationId', (this.weatherStationForm.value.stationId !== null ? this.weatherStationForm.value.stationId : ''))
      .set('stationName', (this.weatherStationForm.value.stationName !== null ? this.weatherStationForm.value.stationName : ''));
    this.findWeatherStation(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

