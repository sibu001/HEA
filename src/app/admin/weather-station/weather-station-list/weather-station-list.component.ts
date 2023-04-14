import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { E } from '@angular/core/src/render3';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableComponent } from 'src/app/common/table/table.component';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
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
  public currentIndex : number = 0;
  public newFilterSearch : boolean ;
  public weatherStationData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  weatherStationForm: FormGroup;
  disableNextButton : boolean = false;
  private readonly subscriptions: Subscription = new Subscription();
  public force = true;
  public adminFilter: AdminFilter;
  public pageSize : number = Number(AppConstant.pageSize);
  public pageIndex : number = 0;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  constructor(public fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.weatherStationFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'] == "true";
    });
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.weatherStationFilter.formValue);
    this.search(this.adminFilter.weatherStationFilter.page, false);
    this.getWeatherStationList();
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
  }

  getWeatherStationList(){
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((weatherStationList: any) => {
      this.performPagination(weatherStationList);
      AppUtility.scrollToTableTop(this.tableScrollPoint);
    }));
  }

  performPagination(dataList: any){

    const obj = AppUtility.paginateData(
       { dataList : dataList ,
        dataSource : this.dataSource,
        pageSize :this.pageSize, 
        pageIndex : this.pageIndex, 
        currentIndex : this.currentIndex,
        disableNextButton : this.disableNextButton,
        newFilterSearch :this.newFilterSearch}, this);
  }


  search(event: any, isSearch: boolean): void {
    this.adminFilter.weatherStationFilter.page = event;

    if(event)
      this.currentIndex = event.pageIndex;
    else{
      this.currentIndex = 0;
      this.newFilterSearch = true;
    }


    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('pageSize',this.pageSize.toString())
      .set('useLikeSearch','true')
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('stationId', '')
      .set('stationId', (this.weatherStationForm.value.stationId !== null ? this.weatherStationForm.value.stationId : ''))
      .set('stationName', (this.weatherStationForm.value.stationName !== null ? this.weatherStationForm.value.stationName : ''));
    this.findWeatherStation(this.force, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

