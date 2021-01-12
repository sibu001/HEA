import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { ElectricityUsagePopupComponent } from '../electricity-usage-popup/electricity-usage-popup.component';
declare var $: any;
@Component({
  selector: 'app-electricity-smart-meter-list',
  templateUrl: './electricity-smart-meter-list.component.html',
  styleUrls: ['./electricity-smart-meter-list.component.css']
})
export class ElectricitySmartMeterListComponent implements OnInit {
  users: Users = new Users();
  electricitySmartMeterForm: FormGroup;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  keys = TableColumnData.SMART_METER_KEYS;
  constructor(private loginService: LoginService,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('electricitySmartMeterFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
  }
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: AdminFilter;

  ngOnInit() {
    this.setUpForm(this.adminFilter.electricitySmartMeterFilter.formValue);
    this.search(this.adminFilter.electricitySmartMeterFilter.page, false);
  }

  setUpForm(event: any) {
    this.electricitySmartMeterForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
      day: [event !== undefined && event !== null ? event.day : ''],
      hour: [event !== undefined && event !== null ? event.hour : ''],
    });
    if (this.users.role === 'ADMIN') {
      this.electricitySmartMeterForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.electricitySmartMeterForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }

  findGasList(force: boolean, filter: any): void {
    this.adminFilter.electricitySmartMeterFilter.formValue = this.electricitySmartMeterForm.value;
    localStorage.setItem('electricitySmartMeterFilter', JSON.stringify(this.adminFilter));
    this.usageHistoryService.loadElectricitySmartMeterList(force, this.users.outhMeResponse.user.id, filter);
    this.subscriptions.add(this.usageHistoryService.getElectricitySmartMeterList().pipe(skipWhile((item: any) => !item))
      .subscribe((gasList: any) => {
        this.usageHistoryData.content = gasList.data;
        this.dataSource = [...this.usageHistoryData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.electricitySmartMeterFilter.page = event;
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('year', (this.electricitySmartMeterForm.value.year !== null ? this.electricitySmartMeterForm.value.year : ''))
      .set('hour', (this.electricitySmartMeterForm.value.hour !== null ? this.electricitySmartMeterForm.value.hour : ''))
      .set('day', (this.electricitySmartMeterForm.value.day !== null ? this.electricitySmartMeterForm.value.day : ''))
      .set('month', (this.electricitySmartMeterForm.value.month !== null ? this.electricitySmartMeterForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
      params.set('auditId', this.electricitySmartMeterForm.value.auditId !== null ? this.electricitySmartMeterForm.value.auditId : '');
      params.set('customerName', this.electricitySmartMeterForm.value.customerName !== null ? this.electricitySmartMeterForm.value.customerName : '');
    }
    this.findGasList(true, params);
  }

  get f() { return this.electricitySmartMeterForm.controls; }

  showPopUp(): any {
    const dialogRef = this.dialog.open(ElectricityUsagePopupComponent, {
      width: '70vw',
      height: '70vh',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
}
