import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-user-report-definitions',
  templateUrl: './user-report-definitions.component.html',
  styleUrls: ['./user-report-definitions.component.css']
})
export class UserReportDefinitionsComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public adminFilter : AdminFilter;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  private readonly subscriptions: Subscription = new Subscription();
  public userReportsData = {
    content: [],
    totalElements: 0,
    pageIndex : 0,
    pageSize: Number(AppConstant.pageSize)
  };

  public force : boolean = false;
  userReportsForm: FormGroup;

  constructor(public router: Router, public fb: FormBuilder,
  public readonly activatedRoute : ActivatedRoute,
  public readonly systemService : SystemService) {

    this.adminFilter = AppUtility.checkForAdminFilter('userReportList');
    this.activatedRoute.queryParams.subscribe((params : any) =>{
      this.force = AppUtility.forceParamToBoolean(params['force']);
    });
    this.setForm(undefined);

   }

  ngOnInit() {
    AppUtility.scrollTop();
    this.keys = TableColumnData.USER_REPORTS_KEYS;
    this.search(this.adminFilter.userReportList.page,this.force);
    this.getUserReporCount();
    this.getUserReports();
  }

  setForm(event : any) : void {
    this.userReportsForm = this.fb.group({
      labelTemplate: [event ? event.labelTemplate : ''],
    });
  }

  loadUserReports(params: any,force : boolean): void {
    this.systemService.loadUserReportList(params,force);
  }

  getUserReports() : void {
    this.subscriptions.add(
      this.systemService.getUserReportList()
      .pipe(filter(data => data instanceof Array))
      .subscribe( response =>{
          this.userReportsData.content = response.map(data => {return {...data}});
          AppUtility.scrollToTableTop(this.tableScrollPoint);
      }));
  }

  loadUserReporCount(params : HttpParams,force : boolean): void {
    this.systemService.loadUserReportCount(params,force);
  }

  getUserReporCount() : void {
    this.subscriptions.add(
      this.systemService.getUserReportCount()
      .pipe(filter(data => data != undefined ))
      .subscribe((response) =>{
        this.userReportsData.totalElements = response;
      })
    )
  }

  addUserReports(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportDefinitionsEdit']);
  }

  goToEditUserReports($event : any): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportDefinitionsEdit'], { queryParams: { id: $event.id } });
  }

  search(event : any, isSearch: boolean): void {

    if(event) this.userReportsData.pageIndex = event.pageIndex;
    else this.userReportsData.pageIndex = 0; 

    const params = new HttpParams()
      .set('disableTotalSize', 'false')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.userReportsData.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('useLikeSearch', 'true')
      .set('labelTemplate', (this.userReportsForm.value.labelTemplate ? this.userReportsForm.value.labelTemplate : ''))

      this.loadUserReports(params,isSearch);
      this.loadUserReporCount(params,isSearch);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
