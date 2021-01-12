import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.TOPIC_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public topicData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  topicForm: FormGroup;
  public force = false;
  public adminFilter: AdminFilter;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.topicFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.setUpForm(this.adminFilter.topicFilter.formValue);
    this.search(this.adminFilter.topicFilter.page, false);
  }

  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }

  setUpForm(event: any) {
    this.topicForm = this.fb.group({
      label: [event !== undefined && event !== null ? event.label : ''],
      user: [event !== undefined && event !== null ? event.user : ''],
      customerGroup: [event !== undefined && event !== null ? event.customerGroup : ''],
      customerPlace: [event !== undefined && event !== null ? event.customerPlace : '']
    });
  }

  findTopicDescription(force: boolean, filter: any): void {
    this.adminFilter.topicFilter.formValue = this.topicForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.administrativeService.loadTopicList(force, filter);
    this.subscriptions.add(this.administrativeService.getTopicList().pipe(skipWhile((item: any) => !item))
      .subscribe((topicList: any) => {
        this.topicData.content = topicList.list;
        this.topicData.totalElements = topicList.totalSize;
        this.dataSource = [...this.topicData.content];
      }));
  }


  search(event: any, isSearch: boolean): void {
    this.adminFilter.topicFilter.page = event;
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('filter.label', (this.topicForm.value.label !== null ? this.topicForm.value.label : ''))
      .set('filter.user', (this.topicForm.value.user !== null ? this.topicForm.value.user : ''))
      .set('filter.customerGroup', (this.topicForm.value.customerGroup !== null ? this.topicForm.value.customerGroup : ''))
      .set('filter.customerPlace', (this.topicForm.value.customerPlace !== null ? this.topicForm.value.customerPlace : ''));
    this.findTopicDescription(true, params);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
