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
  public pageIndex: any;
  public stationData = {
    content: [],
    totalElements: 0,
  };
  stationForm: FormGroup;
  public errorMessage: any;
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: AdminFilter;
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
      isActive: [event !== undefined && event !== null ? event.isActive : true],
    });
  }

  findCimisStation(force: boolean, filter: any): void {
    this.adminFilter.cimisStationFilter.formValue = this.stationForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(this.systemMeasurementService.loadCimisStationCount(filter).pipe(skipWhile((item: any) => !item))
      .subscribe((cimisListCount: any) => {
        this.stationData.totalElements = cimisListCount.systemMeasurement.cimisStationCount;
        this.systemMeasurementService.loadCimisStationList(force, filter);
        this.subscriptions.add(this.systemMeasurementService.getCimisStationList().pipe(skipWhile((item: any) => !item))
          .subscribe((cimisStationList: any) => {
            this.stationData.content = cimisStationList;
            this.dataSource = [...this.stationData.content];
          },
          error => {
            this.errorMessage = error;
          }));
      },
      error => {
        this.errorMessage = error;
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.cimisStationFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('useLikeSearch', 'true')
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('stationNbr', (this.stationForm.value.stationNbr !== null ? this.stationForm.value.stationNbr : ''))
      .set('name', (this.stationForm.value.name !== null ? this.stationForm.value.name : ''))
      .set('isActive', (this.stationForm.value.isActive !== null ? this.stationForm.value.isActive : ''));
    this.findCimisStation(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
