import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-factor-list',
  templateUrl: './factor-list.component.html',
  styleUrls: ['./factor-list.component.css']
})
export class FactorListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.FACTOR_KEY;
  public dataSource: any;
  public pageIndex: any;
  public totalElement = 0;
  public factorData = {
    content: [],
    totalElements: 0,
  };
  public placeData: Array<any>;
  public pageSize : number = Number(AppConstant.pageSize);
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  factorForm: FormGroup;

  constructor(public fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
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
    AppUtility.scrollTop();
    this.findPlace(true, '');
    this.getFactorCount();
    this.getFactorListData();
    this.setUpForm(this.adminFilter.factorFilter.formValue);
    this.search(this.adminFilter.factorFilter.page, false);
  }

  goToEditFactor(event: any): any {
    this.router.navigate(['/admin/factor/factorEdit'], { queryParams: { 'id': event.id } });
  }

  addFactor(): any {
    this.router.navigate(['/admin/factor/factorEdit']);
  }

  findPlace(force: boolean, filter: string): any {
    this.systemUtilityService.loadPlaceList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getPlaceList().pipe(skipWhile((item: any) => !item))
      .subscribe((placeList: any) => {
        this.placeData = placeList;
      }));
  }


  setUpForm(event: any) {
    this.factorForm = this.fb.group({
      factorCode: [event !== undefined && event !== null ? event.factorCode : ''],
      place: [event !== undefined && event !== null ? event.place : ''],
      isActive: [event !== undefined && event !== null ? event.isActive : true],
      year: [event !== undefined && event !== null ? event.year : ''],
      factorName: [event !== undefined && event !== null ? event.factorName : '']
    });
  }

  loadFactorsCount(force: boolean, filter: any): void {
    this.adminFilter.factorFilter.formValue = this.factorForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.systemUtilityService.loadFactorCount(filter);
  }

  getFactorCount(){
    this.subscriptions.add(this.systemUtilityService.getFactorCount()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((factorListCount: number) => {
      this.factorData.totalElements = factorListCount;
      this.totalElement = factorListCount;
      if(factorListCount <= this.pageSize){
        this.pageIndex = 0;
      }
    }));
  }

  loadFactorListData(force: boolean, filter: any){
    this.systemUtilityService.loadFactorList(force, filter);
  }

  getFactorListData(){
    this.subscriptions.add(this.systemUtilityService.getFactorList().pipe(skipWhile((item: any) => !item))
      .subscribe((factorList: any) => {
        this.factorData.content = factorList;
        this.dataSource = [...this.factorData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.factorFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('factorId', '')
      .set('factorCode', (this.factorForm.value.factorCode !== null ? this.factorForm.value.factorCode : ''))
      .set('place', (this.factorForm.value.place !== null ? this.factorForm.value.place : ''))
      .set('active', (this.factorForm.value.isActive !== null ? this.factorForm.value.isActive : ''))
      .set('year', (this.factorForm.value.year !== null ? this.factorForm.value.year : ''))
      .set('factorName', (this.factorForm.value.factorName !== null ? this.factorForm.value.factorName : ''));

      this.loadFactorListData(true,params);
      this.loadFactorsCount(isSearch,params);
    }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
