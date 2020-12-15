import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
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
  selector: 'app-electricity-daily-smart-meter-list',
  templateUrl: './electricity-daily-smart-meter-list.component.html',
  styleUrls: ['./electricity-daily-smart-meter-list.component.css']
})
export class ElectricityDailySmartMeterListComponent implements OnInit {
  users: Users = new Users();
  electricityDailySmartMeterForm: FormGroup;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  keys = TableColumnData.SMART_METER_DAILY_KEYS;
  constructor(private loginService: LoginService,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('electricityDailySmartMeterFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
  }
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: AdminFilter;

  ngOnInit() {
    this.setUpForm(this.adminFilter.electricityDailySmartMeterFilter.formValue);
    this.search(this.adminFilter.electricityDailySmartMeterFilter.page, false);
  }

  setUpForm(event: any) {
    this.electricityDailySmartMeterForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
      day: [event !== undefined && event !== null ? event.day : ''],
    });
    if (this.users.role === 'ADMIN') {
      this.electricityDailySmartMeterForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.electricityDailySmartMeterForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }

  findGasList(force: boolean, filter: any): void {
    this.adminFilter.electricityDailySmartMeterFilter.formValue = this.electricityDailySmartMeterForm.value;
    localStorage.setItem('electricityDailySmartMeterFilter', JSON.stringify(this.adminFilter));
    this.usageHistoryService.loadElectricityDailySmartMeterList(force, this.users.outhMeResponse.user.id, filter);
    this.subscriptions.add(this.usageHistoryService.getElectricityDailySmartMeterList().pipe(skipWhile((item: any) => !item))
      .subscribe((gasList: any) => {
        this.usageHistoryData.content = gasList.data;
        this.dataSource = [...this.usageHistoryData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.electricityDailySmartMeterFilter.page = event;
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('year', (this.electricityDailySmartMeterForm.value.year !== null ? this.electricityDailySmartMeterForm.value.year : ''))
      .set('day', (this.electricityDailySmartMeterForm.value.day !== null ? this.electricityDailySmartMeterForm.value.day : ''))
      .set('month', (this.electricityDailySmartMeterForm.value.month !== null ? this.electricityDailySmartMeterForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
      params.set('auditId', this.electricityDailySmartMeterForm.value.auditId !== null ? this.electricityDailySmartMeterForm.value.auditId : '');
      params.set('customerName', this.electricityDailySmartMeterForm.value.customerName !== null ? this.electricityDailySmartMeterForm.value.customerName : '');
    }
    this.findGasList(true, params);
  }

  get f() { return this.electricityDailySmartMeterForm.controls; }

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
