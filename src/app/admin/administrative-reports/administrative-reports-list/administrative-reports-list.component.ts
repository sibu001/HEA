import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
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
  public totalElement = 0;
  public reportData = {
    content: [],
    totalElements: 1,
  };
  public pageIndex: any;
  administrativeForm: FormGroup;
  public force = false;
  public reportTypeList: any;
  public adminFilter: AdminFilter;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly router: Router,
    private readonly systemService:SystemService,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.administrativeFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.loadReportType();
    this.setUpForm(this.adminFilter.administrativeFilter.formValue);
    this.search(this.adminFilter.administrativeFilter.page, false);
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
    this.router.navigate(['admin/administrativeReport/administrativeReportCall'], { queryParams: { id: event.row.reportId } });
  }

  setUpForm(event: any) {
    this.administrativeForm = this.fb.group({
      reportName: [event !== undefined && event !== null ? event.reportName : ''],
      reportLabel: [event !== undefined && event !== null ? event.reportLabel : ''],
      reportType: [event !== undefined && event !== null ? event.reportType : ''],
    });
  }

  findAdministrativeReport(force: boolean, filter: any): void {
    this.adminFilter.administrativeFilter.formValue = this.administrativeForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(this.administrativeService.loadAdministrativeReportCount(filter).pipe(skipWhile((item: any) => !item))
      .subscribe((administrativeReportListCount: any) => {
        this.reportData.totalElements = administrativeReportListCount.administrativeManagement.administrativeReportCount;
        this.totalElement = administrativeReportListCount.administrativeManagement.administrativeReportCount;
        this.administrativeService.loadAdministrativeReportList(force, filter);
        this.subscriptions.add(this.administrativeService.getAdministrativeReportList().pipe(skipWhile((item: any) => !item))
          .subscribe((reportList: any) => {
            this.reportData.content = reportList;
            this.dataSource = [...this.reportData.content];
          }));
      }));
  }


  search(event: any, isSearch: boolean): void {
    this.adminFilter.administrativeFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('reportName', (this.administrativeForm.value.reportName !== null ? this.administrativeForm.value.reportName : ''))
      .set('reportLabel', (this.administrativeForm.value.reportLabel !== null ? this.administrativeForm.value.reportLabel : ''))
      .set('reportType', (this.administrativeForm.value.reportType !== null ? this.administrativeForm.value.reportType : ''));
    this.findAdministrativeReport(true, params);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
