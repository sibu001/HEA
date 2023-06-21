import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
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
  @ViewChild('tableScrollPoint') public tableScrollPoint : ElementRef;
  public totalElement = 0;
  public viewData = {
    pageIndex : 0,
    content: [],
    totalElements: 0,
    pageSize : Number(AppConstant.pageSize)
  };
  filter = false;
  cache = false;
  viewConfiguration: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter : AdminFilter;
  constructor(public fb: FormBuilder,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = AppUtility.forceParamToBoolean(params['force']);
    });

    this.adminFilter = AppUtility.checkForAdminFilter('dynamicViews');
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.dynamicViews.form);
    this.search(this.adminFilter.dynamicViews.page, this.force);
    this.getViewConfigurationCount();
    this.getViewConfigurationList();
  }

  addViewConfigurations(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationEdit']);
  }

  goToEditViewConfigurations(event : any): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationEdit'], { queryParams: { id: event.id } });
  }

  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }

  handleLink(event){
    this.router.navigate([event.routeLink],{queryParams : { viewConfigurationId : event.value.id }});
  }

  setUpForm(event: any) {
    this.viewConfiguration = this.fb.group({
      configurationName: [event !== undefined && event !== null ? event.configurationName : ''],
      userName: [event !== undefined && event !== null ? event.userName : ''],
    });
  }

  loadViewConfigurationList(force: boolean, filter: any): void {
    this.dynamicViewService.loadDynamicViewList(force, filter);
  }

  getViewConfigurationList() : void{
    this.subscriptions.add(this.dynamicViewService.getDynamicViewList()
    .pipe(filter((item: any) => item))
    .subscribe((dynamicViewList: any) => {
      this.viewData.content = dynamicViewList;
      this.dataSource = this.viewData.content.map(data =>{
        const viewData = {...data};
        viewData.createdBy = viewData.user.name;
        viewData.sharedShow = viewData.shared ? '*' : '';
        return viewData;
      })
      setTimeout(() => AppUtility.scrollToTableTop(this.tableScrollPoint));
    }));
  }

  loadViewConfigurationCount(force : boolean , params : HttpParams) : void {
      this.dynamicViewService.loadDynamicViewCount(force,params);
  }

  getViewConfigurationCount(): void {
    this.subscriptions.add(
      this.dynamicViewService.getDynamicViewCount()
      .subscribe(response =>{
        this.viewData.totalElements = response;
      }));
  }

  search(event: any, isSearch: boolean): void {

    if(event) this.viewData.pageIndex = event.pageIndex;
    else this.viewData.pageIndex = 0; 

    const params = new HttpParams()
      .set('disableTotalSize', 'false')
      .set('homeowner', 'false')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.viewData.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      // .set('viewConfigurationId', '')
      .set('useLikeSearch', 'true')
      .set('configurationName', (this.viewConfiguration.value.configurationName !== null ? this.viewConfiguration.value.configurationName : ''))
      .set('user.name', (this.viewConfiguration.value.userName !== null ? this.viewConfiguration.value.userName : ''));
    
      this.loadViewConfigurationList(isSearch, params);
      this.loadViewConfigurationCount(isSearch,params);

      AppUtility.saveAdminFilter(this.adminFilter);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
