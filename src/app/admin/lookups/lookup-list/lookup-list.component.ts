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
  selector: 'app-lookup-list',
  templateUrl: './lookup-list.component.html',
  styleUrls: ['./lookup-list.component.css']
})
export class LookupListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.LOOKUP_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public lookupData = {
    content: [],
    totalElements: 0,
  };
  lookupForm: FormGroup;
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
    this.setUpForm(this.adminFilter.lookupFilter.formValue);
    this.search(this.adminFilter.lookupFilter.page, false);
  }

  goToEditLookup(event: any): any {
    this.router.navigate(['/admin/lookup/lookupEdit'], { queryParams: { 'id': event.id } });
  }

  addLookup(): any {
    this.router.navigate(['/admin/lookup/lookupEdit']);
  }

  setUpForm(event: any) {
    this.lookupForm = this.fb.group({
      defaultValue: [event !== undefined && event !== null ? event.defaultValue : ''],
      lookupName: [event !== undefined && event !== null ? event.lookupName : ''],
    });
  }

  findLookup(force: boolean, filter: any): void {
    this.adminFilter.lookupFilter.formValue = this.lookupForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(this.systemUtilityService.loadLookupCount().pipe(skipWhile((item: any) => !item))
      .subscribe((systemParameterCount: any) => {
        this.lookupData.totalElements = systemParameterCount.systemUtilityManagement.lookupCount;

        this.systemUtilityService.loadLookupList(force, filter);
        this.subscriptions.add(this.systemUtilityService.getLookupList().pipe(skipWhile((item: any) => !item))
          .subscribe((lookupList: any) => {
            this.lookupData.content = lookupList;
            // this.lookupData.totalElements = lookupList.totalSize;
            this.dataSource = [...this.lookupData.content];
          }));
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.lookupFilter.page = event;
    const params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('lookupCode', '')
      .set('defaultValue', (this.lookupForm.value.defaultValue !== null ? this.lookupForm.value.defaultValue : ''))
      .set('lookupName', (this.lookupForm.value.lookupName !== null ? this.lookupForm.value.lookupName : ''));
    this.findLookup(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
