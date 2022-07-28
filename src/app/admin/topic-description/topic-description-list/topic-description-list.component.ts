import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-description-list',
  templateUrl: './topic-description-list.component.html',
  styleUrls: ['./topic-description-list.component.css']
})
export class TopicDescriptionListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.TOPIC_DESCRIPTION_KEY;
  public dataSource = [];
  public force = false;
  public adminFilter: AdminFilter;
  public totalElement = 0;
  public topicData = {
    content: [],
    totalElements: 0,
  };
  topicForm: FormGroup;
  customerGroupList: any;

  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly topicService: TopicService,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter || this.adminFilter.topicDescriptionFilter || this.adminFilter.topicDescriptionFilter.formValue) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.findCustomerGroup();
    this.setUpForm(this.adminFilter.topicDescriptionFilter.formValue);
    this.search(this.adminFilter.topicDescriptionFilter.page, false);
    this.getDataFromStore();
  }


  setUpForm(event: any) {
    this.topicForm = this.fb.group({
      topicLabel: [event !== undefined && event !== null ? event.topicLabel : ''],
      isActive: [event !== undefined && event !== null ? event.isActive : true],
      customerGroupId: [event !== undefined && event !== null ? event.customerGroupId : ''],
      searchContextVariable: [event !== undefined && event !== null ? event.searchContextVariable : '']
    });
  }

  findTopicDescription(force: boolean, filter: any): void {
    this.adminFilter.topicDescriptionFilter.formValue = this.topicForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.topicService.loadTopicDescriptionList(force, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(this.topicService.getTopicDescriptionList()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((topicDescriptionList: any) => {
      this.topicData.content = topicDescriptionList;
      this.dataSource = [...this.topicData.content];
    }));
  }

  findCustomerGroup() {
    this.systemService.loadCustomerGroupList(true, '');
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupList = customerGroupList;
      }));
  }

  goToEditTopicDescription(event: any): void {
    this.router.navigate(['admin/topicDescription/topicDescriptionEdit'], { queryParams: { 'id': event.id } });
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.topicDescriptionFilter.page = event;
    // .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
    // .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
    //   (event.pageIndex * event.pageSize) + '' : '0'))
    const params = new HttpParams()
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('label', (this.topicForm.value.topicLabel !== null ? this.topicForm.value.topicLabel : ''))
      .set('active', (this.topicForm.value.isActive !== null ? this.topicForm.value.isActive : ''))
      .set('customerGroupId', (this.topicForm.value.customerGroupId !== null ? this.topicForm.value.customerGroupId : ''))
      .set('field', (this.topicForm.value.searchContextVariable !== null ? this.topicForm.value.searchContextVariable : ''));
    this.findTopicDescription(true, params);
  }

  addTopicDescription() {
    this.router.navigate(['admin/topicDescription/topicDescriptionEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
