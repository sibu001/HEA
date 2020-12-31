import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-view-configuration-list',
  templateUrl: './view-configuration-list.component.html',
  styleUrls: ['./view-configuration-list.component.css']
})
export class ViewConfigurationListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.VIEW_CONF_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public viewData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  periodData: any[] = TableColumnData.PERIOD_DATA;
  viewConfiguration: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  constructor(public fb: FormBuilder,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.setUpForm(undefined);
    this.search(undefined, false);
  }

  addViewConfigurations(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationEdit']);
  }

  goToEditViewConfigurations(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationEdit'], { queryParams: { id: this.id } });
  }

  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }

  setUpForm(event: any) {
    this.viewConfiguration = this.fb.group({
      configurationName: [event !== undefined && event !== null ? event.configurationName : ''],
      userName: [event !== undefined && event !== null ? event.userName : ''],
    });
  }

  findViewConfiguration(force: boolean, filter: any): void {
    this.dynamicViewService.loadDynamicViewList(force, filter);
    this.subscriptions.add(this.dynamicViewService.getDynamicViewList().pipe(skipWhile((item: any) => !item))
      .subscribe((dynamicViewList: any) => {
        this.viewData.content = dynamicViewList.list;
        this.viewData.totalElements = dynamicViewList.totalSize;
        this.dataSource = [...this.viewData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('viewConfigurationId', '')
      .set('filter.configurationName', (this.viewConfiguration.value.configurationName !== null ? this.viewConfiguration.value.configurationName : ''))
      .set('filter.user.name', (this.viewConfiguration.value.userName !== null ? this.viewConfiguration.value.userName : ''));
    this.findViewConfiguration(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
