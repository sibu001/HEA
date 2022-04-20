import { Users } from './../../../models/user';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
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
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { LoginService } from 'src/app/services/login.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { UtilityService } from 'src/app/services/utility.service';

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
  public filter = false;
  public cache = false;
  topicForm: FormGroup;
  public force = false;
  public adminFilter: AdminFilter;
  public customerGroupList = new Array();
  public customerPlaces = new Array();
  private users : Users = new Users();
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly loginService: LoginService,
    private readonly utilityService: UtilityService
  ) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null || this.adminFilter.topicFilter === undefined) {
      this.adminFilter = new AdminFilter();
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  
    this.users = this.loginService.getUser();
    this.checkDisableCacheValue();
    this.checkTopicListFilter();
  }

  ngOnInit() {
    this.loadcustomerGroups();
    this.loadCustomerPlaces();

    this.setUpForm(this.adminFilter.topicFilter.formValue);
    this.search(this.adminFilter.topicFilter.page, false);
  }

  checkTopicListFilter() {
    this.loginService.performGet(AppConstant.topic + '/disabledFilter')
      .toPromise()
      .then((data) => {
        console.log(data);
        if (data.data == "YES")
          this.filter = false;
        else
          this.filter = true;
      }).catch(
        (error) => {
          console.log(error);
        }
      );
  }

  checkDisableCacheValue() {
    this.loginService.performGet(AppConstant.topic + '/disabledValueCache')
      .toPromise().
      then((data) => {
        console.log(data);
        if (data.data == "YES")
          this.cache = false;
        else
          this.cache = true;
      }).catch(
        (error) => { console.log(error); }
      )
  }

  enableDisableFilter(): any {
    
    document.getElementById('loader').classList.add('loading');
    this.loginService.performPost( {},AppConstant.topic + (!this.filter? '/enableFilter' : '/disableFilter'))
    .toPromise().then((data) => {
      document.getElementById('loader').classList.remove('loading');
        if(data.data == "OK")
          this.filter = !this.filter;
        else
          this.utilityService.showErrorMessage(data.errorMessage);
      }).catch((err) => { 
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showErrorMessage(err);   });
  }

  enableDisableCacheValue() {

    document.getElementById('loader').classList.add('loading');
    this.loginService.performPost( {},AppConstant.topic + (!this.cache ? '/enableValueCache' : '/disableValueCache'))    
    .toPromise().then((data) => {
      document.getElementById('loader').classList.remove('loading');
        if(data.data == "OK")
          this.cache = !this.cache;
        else
          this.utilityService.showErrorMessage(data.errorMessage);
      }).catch((err) => { 
        document.getElementById('loader').classList.remove('loading');
        this.utilityService.showErrorMessage(err);   });

  }

  setUpForm(event: any) {
    this.topicForm = this.fb.group({
      label: [event !== undefined && event !== null ? event.label : ''],
      user: [event !== undefined && event !== null ? event.user : ''],
      customerGroup: [event !== undefined && event !== null ? event.customerGroup : ''],
      customerPlace: [event !== undefined && event !== null ? event.customerPlace : '']
    });
  }

  private loadcustomerGroups() {
    this.systemService.loadCustomerGroupList(false, '');
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupList = customerGroupList;
      }));
  }

  private loadCustomerPlaces() {
    this.systemUtilityService.loadPlaceList(true, '');
    this.subscriptions.add(this.systemUtilityService.getPlaceList().pipe(skipWhile((item: any) => !item))
      .subscribe((placeList: any) => {
        this.customerPlaces = placeList;
      }));
  }

  findTopic(force: boolean, filter: any): void {
    this.adminFilter.topicFilter.formValue = this.topicForm.value;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    this.administrativeService.loadTopicList(force, filter);
    this.subscriptions.add(this.administrativeService.getTopicList().pipe(skipWhile((item: any) => !item))
      .subscribe((topicList: any) => {
        this.topicData.content = topicList.list;
        this.topicData.totalElements = topicList.totalSize;
        this.totalElement = topicList.total = topicList.totalSize;
        this.dataSource = this.topicData.content;
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.topicFilter.page = event;
    const params = new HttpParams()
      .set('disableTotalSize', 'false')
      .set('homeowner', 'false')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('label', (this.topicForm.value.label !== null ? this.topicForm.value.label : ''))
      .set('CustomerName', (this.topicForm.value.CustomerName !== null ? this.topicForm.value.user : ''))
      .set('customerGroupIds', (this.topicForm.value.customerGroup !== null ? this.topicForm.value.customerGroup : ''))
      .set('customerPlace', (this.topicForm.value.customerPlace !== null ? this.topicForm.value.customerPlace : ''));

    this.findTopic(true, params);
  }

  showSurveys(event: any) {
    console.log(event);
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + event.customer.customerId + '/surveys/' + event.surveyDescription.surveyCode + '/' + event.surveyId).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.users.paneNumber = 0;
        this.users.currentPaneNumber = response.data;
        this.users.isDashboard = true;
        this.users.outhMeResponse = { user: this.users.userData };
        this.users.outhMeResponse.customerId =  event.customer.customerId;
        this.loginService.setUser(this.users);
        this.router.navigate(['/surveyView']);
        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
