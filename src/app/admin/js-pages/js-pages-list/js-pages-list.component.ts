import { HttpParams, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-js-pages-list',
  templateUrl: './js-pages-list.component.html',
  styleUrls: ['./js-pages-list.component.css']
})
export class JsPagesListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.JS_PAGES_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public adminFilter : AdminFilter;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  public jsPagesData = {
    pageSize : Number(AppConstant.pageSize),
    content: [],
    totalElements: 0,
    pageIndex : 0
  };

  jsPagesForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  constructor(public fb: FormBuilder,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = AppUtility.forceParamToBoolean(params['force']);
    });

    this.adminFilter = AppUtility.checkForAdminFilter('jsPageList');
    this.getJSPageList();
    this.getJsPageCount();
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.jsPageList.formValue);
    this.search(this.adminFilter.jsPageList.page, this.force, false);
  }

  addJsPages(): any {
    this.router.navigate(['/admin/jsPages/jsPagesEdit']);
  }

  goToEditJsPages(event: any): any {
    this.router.navigate(['/admin/jsPages/jsPagesEdit'], { queryParams: { id: event.jsPageId } });
  }

  setUpForm(event: any) {
    this.jsPagesForm = this.fb.group({
      code: [event !== undefined && event !== null ? event.code : ''],
      pageName: [event !== undefined && event !== null ? event.pageName : ''],
    });
  }

  loadJsPagesList(force: boolean, filter: any): void {
    this.dynamicViewService.loadJavaScriptPageList(force, filter);
  }

  getJSPageList(){
    this.subscriptions.add(this.dynamicViewService.getJavaScriptPageList().pipe(skipWhile((item: any) => !item))
    .subscribe((jsPagesList: any) => {
      this.jsPagesData.content = jsPagesList;
      this.dataSource =  this.jsPagesData.content.map(data =>{
        const modifiedObject = {...data};
        
        if(modifiedObject.showInMenu)
          modifiedObject.showInMenu = '*';
        else
          modifiedObject.showInMenu = '';

        return modifiedObject;
      })
      AppUtility.scrollToTableTop(this.tableScrollPoint);
    }));
  }

  loadJsPagesCount(force : boolean, params : HttpParams) : void{
    this.dynamicViewService.loadJavaScriptPageCount(force,params);
  }

  getJsPageCount() : void {
    this.subscriptions.add(
      this.dynamicViewService.getJavaScriptPageCount()
      .subscribe((data) =>{
        this.jsPagesData.totalElements = data;
      }));
  } 

  search(event: any, isSearch: boolean, pageChange : boolean = false): void {

    if(!event) this.jsPagesData.pageIndex = 0;
    this.adminFilter.jsPageList = { page : event, formValue : this.jsPagesForm.value};
    AppUtility.saveAdminFilter(this.adminFilter);

    const countParams = new HttpParams()
      .set('code', (this.jsPagesForm.value.code !== null ? this.jsPagesForm.value.code : ''))
      .set('name', (this.jsPagesForm.value.pageName !== null ? this.jsPagesForm.value.pageName : ''))
      .set('useLikeSearch','true');

    const listParams = countParams
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.jsPagesData.pageSize.toString())
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      // .set('jsPageId', '')
    
    this.loadJsPagesList(isSearch,listParams);
    this.loadJsPagesCount(!pageChange,countParams);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

