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
  selector: 'app-js-pages-list',
  templateUrl: './js-pages-list.component.html',
  styleUrls: ['./js-pages-list.component.css']
})
export class JsPagesListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.JS_PAGES_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public jsPagesData = {
    content: [],
    totalElements: 0,
  };

  periodData: any[] = TableColumnData.PERIOD_DATA;
  jsPagesForm: FormGroup;
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

  findJsPages(force: boolean, filter: any): void {
    this.dynamicViewService.loadJavaScriptPageList(force, filter);
    this.subscriptions.add(this.dynamicViewService.getJavaScriptPageList().pipe(skipWhile((item: any) => !item))
      .subscribe((jsPagesList: any) => {
        this.jsPagesData.content = jsPagesList;
        this.dataSource = [...this.jsPagesData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    // .set('filter.disableTotalSize', 'false')
    // .set('filter.homeowner', 'false')
    // .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
    const params = new HttpParams()
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('jsPageId', '')
      .set('code', (this.jsPagesForm.value.code !== null ? this.jsPagesForm.value.code : ''))
      .set('name', (this.jsPagesForm.value.pageName !== null ? this.jsPagesForm.value.pageName : ''));
    this.findJsPages(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

