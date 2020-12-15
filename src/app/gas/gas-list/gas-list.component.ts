import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { GasUsagePopupComponent } from '../gas-usage-popup/gas-usage-popup.component';
declare var $: any;

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css']
})
export class GasListComponent implements OnInit {
  users: Users = new Users();
  gasForm: FormGroup;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  keys = TableColumnData.GAS_KEYS;
  constructor(private loginService: LoginService,
    private router: Router,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('gasFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
  }
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: AdminFilter;

  ngOnInit() {
    this.setUpForm(this.adminFilter.gasFilter.formValue);
    this.search(this.adminFilter.gasFilter.page, false);
  }

  setUpForm(event: any) {
    this.gasForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
    });
    if (this.users.role === 'ADMIN') {
      this.gasForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.gasForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }

  findGasList(force: boolean, filter: any): void {
    this.adminFilter.gasFilter.formValue = this.gasForm.value;
    localStorage.setItem('gasFilter', JSON.stringify(this.adminFilter));
    this.usageHistoryService.loadGasList(force, this.users.outhMeResponse.user.id, filter);
    this.subscriptions.add(this.usageHistoryService.getGasList().pipe(skipWhile((item: any) => !item))
      .subscribe((gasList: any) => {
        this.usageHistoryData.content = gasList.data;
        this.dataSource = [...this.usageHistoryData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.gasFilter.page = event;
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('year', (this.gasForm.value.year !== null ? this.gasForm.value.year : ''))
      .set('month', (this.gasForm.value.month !== null ? this.gasForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
      params.set('auditId', this.gasForm.value.auditId !== null ? this.gasForm.value.auditId : '');
      params.set('customerName', this.gasForm.value.customerName !== null ? this.gasForm.value.customerName : '');
    }
    this.findGasList(true, params);
  }

  get f() { return this.gasForm.controls; }

  showPopUp(): any {
    const dialogRef = this.dialog.open(GasUsagePopupComponent, {
      width: '70vw',
      height: '70vh',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

}
