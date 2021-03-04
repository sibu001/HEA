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
  selector: 'app-electricity-charge-list',
  templateUrl: './electricity-charge-list.component.html',
  styleUrls: ['./electricity-charge-list.component.css']
})
export class ElectricityChargeListComponent implements OnInit {
  users: Users = new Users();
  electricityForm: FormGroup;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  keys = TableColumnData.GAS_KEYS; 4;
  constructor(private loginService: LoginService,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('electricityChargeFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
  }
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: AdminFilter;

  ngOnInit() {
    this.setUpForm(this.adminFilter.electricityChargeFilter.formValue);
    this.search(this.adminFilter.electricityChargeFilter.page, false);
  }

  setUpForm(event: any) {
    this.electricityForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
    });
    if (this.users.role === 'ADMIN') {
      this.electricityForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.electricityForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }

  findGasList(force: boolean, filter: any): void {
    this.adminFilter.electricityChargeFilter.formValue = this.electricityForm.value;
    localStorage.setItem('electricityChargeFilter', JSON.stringify(this.adminFilter));
    this.usageHistoryService.loadElectricityChargeList(force, this.users.outhMeResponse.user.id, filter);
    this.subscriptions.add(this.usageHistoryService.getElectricityChargeList().pipe(skipWhile((item: any) => !item))
      .subscribe((gasList: any) => {
        this.usageHistoryData.content = gasList.data;
        this.dataSource = [...this.usageHistoryData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.electricityChargeFilter.page = event;
    const params = new HttpParams()
      .set('type', 'electricityCharge')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('year', (this.electricityForm.value.year !== null ? this.electricityForm.value.year : ''))
      .set('month', (this.electricityForm.value.month !== null ? this.electricityForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
      params.set('auditId', this.electricityForm.value.auditId !== null ? this.electricityForm.value.auditId : '');
      params.set('customerName', this.electricityForm.value.customerName !== null ? this.electricityForm.value.customerName : '');
    }
    this.findGasList(true, params);
  }

  get f() { return this.electricityForm.controls; }

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
