import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-administrative-reports-list',
  templateUrl: './administrative-reports-list.component.html',
  styleUrls: ['./administrative-reports-list.component.css']
})
export class AdministrativeReportsListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.ADMIN_REPORT_KEYS;
  public dataSource: any;
  public liveOrNot : string;
  public totalElement = 0;
  public reportData = {
    content: [],
    totalElements: 1,
  };
  public pageIndex: any;
  public pageSize: number = Number(AppConstant.pageSize);
  administrativeForm: FormGroup;
  public force = false;
  public reportTypeList: any;
  public adminFilter: AdminFilter;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.administrativeFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = AppUtility.forceParamToBoolean(params['force']);
    });
  }

  ngOnInit() {
    this.loadReportType();
    this.setUpForm(this.adminFilter.administrativeFilter.formValue);
    this.search(this.adminFilter.administrativeFilter.page, this.force);

    this.getAdministrativeReportCount();
    this.getAdminstrativeReportData();
    this.checkLiveServer();
  }

  loadReportType() {
    this.systemService.loadReportTypeList();
    this.subscriptions.add(this.systemService.getReportTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((reportType: any) => {
        this.reportTypeList = reportType.data;
      }));
  }

  addReport(): any {
    this.router.navigate(['admin/administrativeReport/administrativeReportEdit']);
  }

  goToEditReport(event: any): any {
    this.router.navigate(['admin/administrativeReport/administrativeReportEdit'], { queryParams: { id: event.id } });
  }

  callReport(event: any): any {
    if(this.liveOrNot === "live" && (event.row.reportId == 48 || event.row.reportId == 50)){
      const cnf = AppUtility.liveServerAlertText();
      if(cnf){
        this.router.navigate(['admin/administrativeReport/administrativeReportCall'], { queryParams: { id: event.row.reportId } });
      }
    }else{
    this.router.navigate(['admin/administrativeReport/administrativeReportCall'], { queryParams: { id: event.row.reportId } });
    }
  }

  setUpForm(event: any) {
    this.administrativeForm = this.fb.group({
      reportName: [event !== undefined && event !== null ? event.reportName : ''],
      reportLabel: [event !== undefined && event !== null ? event.reportLabel : ''],
      reportType: [event !== undefined && event !== null ? event.reportType : ''],
    });
  }

  loadAdministrativeReportCount(force: boolean, filter: any): void {
    this.adminFilter.administrativeFilter.formValue = this.administrativeForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
      this.administrativeService.loadAdministrativeReportCount(force,filter)
  }

  getAdministrativeReportCount(){
    this.subscriptions.add(
      this.administrativeService.getAdministrativeReportCount()
      .subscribe((data : number) =>{
        this.reportData.totalElements = data;
        this.totalElement = data;
      }));
  }


  loadAdminstrativeReportData(force,filter){
    this.administrativeService.loadAdministrativeReportList(force, filter);
  }

  getAdminstrativeReportData(){
    this.subscriptions.add(
      this.administrativeService.getAdministrativeReportList()
      .pipe(filter((item: any) => item))
      .subscribe((reportList: any) => {
        this.reportData.content = reportList;
        this.dataSource = [...this.reportData.content];
        AppUtility.scrollToTableTop(this.tableScrollPoint);
    }));
  }

  search(event: any, isSearch: boolean): void {

    if(event){
      this.adminFilter.administrativeFilter = event;
      this.pageIndex = event.pageIndex;
    }else{
      this.pageIndex = 0;
    }

    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('useLikeSearch', 'true')
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('reportName', (this.administrativeForm.value.reportName !== null ? this.administrativeForm.value.reportName : ''))
      .set('reportLabel', (this.administrativeForm.value.reportLabel !== null ? this.administrativeForm.value.reportLabel : ''))
      .set('reportType', (this.administrativeForm.value.reportType !== null ? this.administrativeForm.value.reportType : ''));
    
    this.loadAdministrativeReportCount(isSearch, params);
    this.loadAdminstrativeReportData(isSearch,params);
  }

  checkLiveServer(){

    this.loginService.performGet('conf/'+'server').subscribe(
      (data) => {
       this.liveOrNot = data.data;
       console.log(data);
      }
    )
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
