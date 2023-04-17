import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-degree-days-list',
  templateUrl: './degree-days-list.component.html',
  styleUrls: ['./degree-days-list.component.css']
})
export class DegreeDaysListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.DEGREE_DAY_KEY;
  public dateFormat : string = AppConstant.DATE_SELECTION_FORMAT;

  public dataSource: any;
  public fileObject: any;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  public pageIndex: number = 0;
  public totalElement = 0;
  public degreeDayData = {
    content: [],
    totalElements: 0,
  };
  degreeDayForm: FormGroup;
  public force : boolean = false;
  public adminFilter: AdminFilter;
  public stationIds: Array<any>;
  public pageSize : number = Number(AppConstant.pageSize);
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
      this.force = AppUtility.forceParamToBoolean( params['force']);
    });
  }


  ngOnInit() {
    this.findWeatherStation(this.force, '');
    this.getDegreeDaysList();
    this.getDegressDaysCount();
    this.setUpForm(this.adminFilter.degreeDaysFilter.formValue);
    this.search(this.adminFilter.degreeDaysFilter.page, true);
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

  loadDegreeDaysCount(force: boolean, filter: any): void {
    this.adminFilter.degreeDaysFilter.formValue = this.degreeDayForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemUtilityService.loadDegreeDaysCount(force, filter)
  }

  getDegressDaysCount(){
    this.subscriptions.add(
      this.systemUtilityService.getDegreeDaysCount()
      .subscribe(
        (degreeDaysCount) =>{
          this.degreeDayData.totalElements = degreeDaysCount;
          this.totalElement = degreeDaysCount;
      }));

  }

  loadDegreeDaysList(force: boolean, filter: any): void {
    this.systemUtilityService.loadDegreeDaysList(force, filter);
  }

  getDegreeDaysList(){
    this.subscriptions.add(this.systemUtilityService.getDegreeDaysList()
    .pipe(filter((item: any) => item))
    .subscribe((degreeDaysList: any) => {
      this.degreeDayData.content = degreeDaysList;
      this.dataSource = [...this.degreeDayData.content];
      setTimeout(()=> AppUtility.scrollToTableTop(this.tableScrollPoint));
    }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.degreeDaysFilter.page = event;
    if(event) this.pageIndex = event.pageIndex;
    else this.pageIndex = 0;

    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('stationId', (this.degreeDayForm.value.stationId !== null ? this.degreeDayForm.value.stationId : ''))
      .set('valueDateFrom', (this.degreeDayForm.value.valueDateFrom ? this.datePipe.transform(this.degreeDayForm.value.valueDateFrom, 'MM/dd/yyyy') : ''))
      .set('type', (this.degreeDayForm.value.type !== null ? this.degreeDayForm.value.type : ''))
      .set('valueDateTo', (this.degreeDayForm.value.valueDateTo ? this.datePipe.transform(this.degreeDayForm.value.valueDateTo, 'MM/dd/yyyy') : ''))
      .set('base', (this.degreeDayForm.value.base !== null ? this.degreeDayForm.value.base : ''));
   
    this.loadDegreeDaysCount(!isSearch ? true : this.force, params);
    this.loadDegreeDaysList(!isSearch ? true : this.force,params);
  }

  handleFileInput(file: any): void {
    this.fileObject = file[0];
  }

  upload(): void {
    if (this.degreeDayForm.value.degreeDaysFile && this.fileObject) {
      const formData = new FormData();
      formData.append('fileBody',this.fileObject);
      this.systemUtilityService.saveDegreeDaysUsingFile(formData);
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
