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
  selector: 'app-cimis-station-list',
  templateUrl: './cimis-station-list.component.html',
  styleUrls: ['./cimis-station-list.component.css']
})
export class CimisStationListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN> = TableColumnData.CIMIS_STATION_KEY;
  public dataSource: any;
  public force = false;
  public stationData = {
    content: [],
    totalElements: 0,
  };
  stationForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: AdminFilter;
  public stationIds: Array<any> = TableColumnData.PLACE_STATION_ID;
  public baseTemp: Array<any> = TableColumnData.BASE_TEMPERATURE;
  constructor(public fb: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.cimisStationFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.cimisStationFilter.formValue);
    this.search(this.adminFilter.cimisStationFilter.page, false);
  }

  goToEditCimisStation(event: any) {
    this.router.navigate(['admin/cimisStation/cimisStationEdit'], { queryParams: { 'id': event.id } });
  }

  addCimisStation() {
    this.router.navigate(['admin/cimisStation/cimisStationEdit']);
  }

  setUpForm(event: any) {
    this.stationForm = this.fb.group({
      stationNbr: [event !== undefined && event !== null ? event.stationNbr : ''],
      name: [event !== undefined && event !== null ? event.name : ''],
      isActive: [event !== undefined && event !== null ? event.isActive : ''],
    });
  }

  findCimisStation(force: boolean, filter: any): void {
    this.adminFilter.cimisStationFilter.formValue = this.stationForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemMeasurementService.loadCimisStationList(force, filter);
    this.subscriptions.add(this.systemMeasurementService.getCimisStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((cimisStationList: any) => {
        this.stationData.content = cimisStationList.list;
        this.stationData.totalElements = cimisStationList.totalSize;
        this.dataSource = [...this.stationData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.cimisStationFilter.page = event;
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('stationNbr', '')
      .set('filter.stationNbr', (this.stationForm.value.stationNbr !== null ? this.stationForm.value.stationNbr : ''))
      .set('filter.name', (this.stationForm.value.name !== null ? this.stationForm.value.name : ''))
      .set('filter.isActive', (this.stationForm.value.isActive !== null ? this.stationForm.value.isActive : ''));
    this.findCimisStation(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
