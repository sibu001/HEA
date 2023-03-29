import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-comparison-groups-list',
  templateUrl: './customer-comparison-groups-list.component.html',
  styleUrls: ['./customer-comparison-groups-list.component.css']
})
export class CustomerComparisonGroupsListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_COMPARISON_GROUP_COLUMN_DATA;
  public dataSource: any;
  public pageIndex: any;
  public weatherStationIds: Array<any>;
  public houseSizeData: Array<any>;
  public comparisonCodeDropdownData: Array<any>;
  public pageSize : number = Number(AppConstant.pageSize);
  public customerComparisonGroupData = {
    content: [],
    totalElements: 0,
  };
  public adminFilter: AdminFilter;
  public force = false;
  customerComparisonGroupForm = this.fb.group({
    comparisonCode: [''],
    groupName: [''],
    weatherStationId: [''],
    homeSize: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter || this.adminFilter.customerComparisonGroup) {
      this.adminFilter = new AdminFilter();
    }
  }

  ngOnInit() {
    this.scrollTop();
    this.loadHomeSize();
    this.loadComparisonCode();
    this.findWeatherStation(false, '');
    this.getComparisionGroupData();
    this.getCustomerComparisonGroupCount();
    this.setUpForm(this.adminFilter.customerComparisonGroup.formValue);
    this.search(this.adminFilter.customerComparisonGroup.page, true);
  }
  scrollTop() {
    window.scroll(0, 0);
  }

  loadHomeSize() {
    this.systemService.loadHomeSizeList();
    this.subscriptions.add(this.systemService.getHomeSizeList().pipe(skipWhile((item: any) => !item))
      .subscribe((homeSize: any) => {
        this.houseSizeData = homeSize.data;
      }));
  }

  loadComparisonCode() {
    this.systemService.loadComparisonCodeList();
    this.subscriptions.add(this.systemService.getComparisonCodeList().pipe(skipWhile((item: any) => !item))
      .subscribe((comparisonCode: any) => {
        this.comparisonCodeDropdownData = comparisonCode.data;
      }));
  }

  setUpForm(event: any) {
    this.customerComparisonGroupForm = this.fb.group({
      comparisonCode: [event !== undefined && event !== null ? event.comparisonCode : ''],
      groupName: [event !== undefined && event !== null ? event.groupName : ''],
      weatherStationId: [event !== undefined && event !== null ? event.weatherStationId : ''],
      homeSize: [event !== undefined && event !== null ? event.homeSize : '']
    });
  }

  // findCustomerComparisonGroup(force: boolean, filter: HttpParams): void {
  //   this.adminFilter.customerComparisonGroup.formValue = this.customerComparisonGroupForm.value;
  //   localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
  //   this.subscriptions.add(this.systemUtilityService.loadCustomerComparisonGroupCount(filter).pipe(skipWhile((item: any) => !item))
  //     .subscribe((customerComparisonGroupCount: any) => {
  //       this.customerComparisonGroupData.totalElements = customerComparisonGroupCount.systemUtilityManagement.customerComparisonGroupCount;
  //     }));
  // }

  loadCustomerComparisionGroupCount(filter){
    this.systemUtilityService.loadCustomerComparisonGroupCount(filter);
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
  }

  getCustomerComparisonGroupCount(){
    this.subscriptions.add(
      this.systemUtilityService.getCustomerComparisonGroupCount()
      .subscribe(
        data =>{
          this.customerComparisonGroupData.totalElements = data;
        }));
  }


  loadComparisonGroupData(force : boolean, filter : any){
    this.systemUtilityService.loadCustomerComparisonGroupList(force, filter);
  }

  getComparisionGroupData(){
    this.subscriptions.add(this.systemUtilityService.getCustomerComparisonGroupList()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((customerComparisonGroupList: any) => {
      this.customerComparisonGroupData.content = customerComparisonGroupList;
      this.dataSource = [...this.customerComparisonGroupData.content];

      if(this.dataSource.length == 0) {
        this.customerComparisonGroupData.totalElements = 0;
      }
    }));
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.weatherStationIds = weatherStationList;
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.customerComparisonGroup.page = event;
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('useLikeSearch', 'true')
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : ''))
      .set('comparisonCode', (this.customerComparisonGroupForm.value.comparisonCode !== null ? this.customerComparisonGroupForm.value.comparisonCode : ''))
      .set('groupName', (this.customerComparisonGroupForm.value.groupName !== null ? this.customerComparisonGroupForm.value.groupName : ''))
      .set('weatherStationId', (this.customerComparisonGroupForm.value.weatherStationId !== null ? this.customerComparisonGroupForm.value.weatherStationId : ''))
      .set('homeSize', (this.customerComparisonGroupForm.value.homeSize !== null ? this.customerComparisonGroupForm.value.homeSize : ''));
    // this.findCustomerComparisonGroup(true, params);

    if(isSearch){
      this.loadCustomerComparisionGroupCount(params);
    }
    this.loadComparisonGroupData(true,params);
  }


  gotoEditCustomerComparisonGroup(event: any) {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupAdd'], { queryParams: { 'id': event.id } });
  }

  addCustomerComparisonGroup() {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupAdd']);
  }

  goToBatchAdd() {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupBatchAdd']);
  }

  goToBatchRemove() {
    this.router.navigate(['admin/customerComparisonGroup/comparisonGroupBatchRemove']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
