import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-system-parameter-list',
  templateUrl: './system-parameter-list.component.html',
  styleUrls: ['./system-parameter-list.component.css']
})
export class SystemParameterListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.SYSTEM_PARAMETER_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public systemParameterData = {
    content: [],
    totalElements: 0,
  };
  systemParameterForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
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
    this.setUpForm(this.adminFilter.systemParameterFilter.formValue);
    this.search(this.adminFilter.systemParameterFilter.page, false);
  }

  goToEditSystemParameter(event: any): any {
    this.router.navigate(['/admin/systemParameter/systemParameterEdit'], { queryParams: { 'id': event.id } });
  }

  addSystemParameter(): any {
    this.router.navigate(['/admin/systemParameter/systemParameterEdit']);
  }

  setUpForm(event: any) {
    this.systemParameterForm = this.fb.group({
      paramValue: [event !== undefined && event !== null ? event.paramValue : ''],
      description: [event !== undefined && event !== null ? event.description : ''],
    });
  }

  findSystemParameter(force: boolean, filter: any): void {
    this.adminFilter.systemParameterFilter.formValue = this.systemParameterForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(this.systemUtilityService.loadSystemParameterCount(filter).pipe(skipWhile((item: any) => !item))
      .subscribe((systemParameterCount: any) => {
        this.systemParameterData.totalElements = systemParameterCount.systemUtilityManagement.systemParameterCount;
        this.totalElement = systemParameterCount.systemUtilityManagement.systemParameterCount;
        this.systemUtilityService.loadSystemParameterList(force, filter);
        this.subscriptions.add(this.systemUtilityService.getSystemParameterList().pipe(skipWhile((item: any) => !item))
          .subscribe((systemParameterList: any) => {
            this.systemParameterData.content = systemParameterList;
            this.dataSource = [...this.systemParameterData.content];
          }));
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.systemParameterFilter.page = event;
    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('paramCode', '')
      .set('paramValue', (this.systemParameterForm.value.paramValue !== null && this.systemParameterForm.value.paramValue !== undefined ? this.systemParameterForm.value.paramValue : ''))
      .set('description', (this.systemParameterForm.value.description !== null ? this.systemParameterForm.value.description : ''));
    this.findSystemParameter(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

