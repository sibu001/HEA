import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.STAFF_TABLE_COLUMN;
  public dataSource: any;
  public force = false;
  public pageIndex: any;
  public adminFilter: AdminFilter;
  public staffData = {
    content: [],
    totalElements: 0,
  };
  staffForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly customerService: CustomerService,
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
    this.setUpForm(this.adminFilter.staffFilter.formValue);
    this.search(this.adminFilter.staffFilter.page, false);
  }

  setUpForm(event: any) {
    this.staffForm = this.fb.group({
      userName: [event !== undefined && event !== null ? event.userName : ''],
      name: [event !== undefined && event !== null ? event.name : ''],
      status: [event !== undefined && event !== null ? event.status : '0']
    });
  }

  findStaff(force: boolean, filter: any): void {
    this.adminFilter.staffFilter.formValue = this.staffForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.customerService.loadStaffList(force, filter);
    this.subscriptions.add(this.customerService.getStaffList().pipe(skipWhile((item: any) => !item))
      .subscribe((staffList: any) => {
        this.staffData.content = staffList.list;
        this.staffData.totalElements = staffList.totalSize;
        this.dataSource = [...this.staffData.content];
      }));
  }

  goToEditStaff(event: any): void {
    this.router.navigate(['admin/staff/staffEdit'], { queryParams: { 'id': event.id } });
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.staffFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('filter.name', (this.staffForm.value.name !== null ? this.staffForm.value.name : ''))
      .set('filter.username', (this.staffForm.value.userName !== null ? this.staffForm.value.userName : ''))
      .set('filter.status', (this.staffForm.value.status !== null ? this.staffForm.value.status : ''));
    this.findStaff(true, params);
  }

  addStaff() {
    this.router.navigate(['admin/staff/staffEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
