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

@Component({
  selector: 'app-electricity-usage-list',
  templateUrl: './electricity-usage-list.component.html',
  styleUrls: ['./electricity-usage-list.component.css']
})
export class ElectricityUsageListComponent implements OnInit {
  users: Users = new Users();

  electricityForm: FormGroup;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: 0,
  };
  keys = TableColumnData.GAS_KEYS;
  constructor(private loginService: LoginService,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('electricityFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
  }
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: AdminFilter;

  ngOnInit() {
    this.setUpForm(this.adminFilter.electricityFilter.formValue);
    this.search(this.adminFilter.electricityFilter.page, false);
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
    this.adminFilter.electricityFilter.formValue = this.electricityForm.value;
    localStorage.setItem('electricityFilter', JSON.stringify(this.adminFilter));
    this.usageHistoryService.loadElectricityList(force, this.users.outhMeResponse.user.id, filter);
    this.subscriptions.add(this.usageHistoryService.getElectricityList().pipe(skipWhile((item: any) => !item))
      .subscribe((gasList: any) => {
        this.usageHistoryData.content = gasList.data;
        this.dataSource = [...this.usageHistoryData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.electricityFilter.page = event;
    const params = new HttpParams()
      .set('type', 'electricity')
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
