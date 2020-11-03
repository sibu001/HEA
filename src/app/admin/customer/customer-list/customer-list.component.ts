import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableComponent } from 'src/app/common/table/table.component';
import { AdminFilter } from 'src/app/models/filter-object';
import { Page } from 'src/app/models/page';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { Transformer } from 'src/app/store/customer-state-management/transformer/transformer';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { CustomerEventComponent } from '../customer-event/customer-event.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  public keys: any;
  public customerGroupList: any;
  public viewConfigurationList: any;
  public programGroupList: any;
  public customerAlertTypeList: any;
  public credentialTypeList: any;
  public coachUserList: any;
  public dataSource: any;
  public adminFilter: AdminFilter;
  public CustomerData = {
    content: [],
    totalElements: 0,
  };

  private readonly subscriptions: Subscription = new Subscription();

  public searchForm: FormGroup;
  public fileUploadForm: FormGroup = this.fb.group({
    customerFile: ['']
  });
  constructor(private fb: FormBuilder,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly customerService: CustomerService,
    public dialog: MatDialog) {
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
    this.setUpForm(this.adminFilter.customerFilter.formValue);
    this.systemService.loadCustomerGroupList(true, '');
    this.systemService.loadViewConfigurationList(true);
    this.systemService.loadProgramGroupsList(true);
    this.systemService.loadGetCustomerAlertTypeList(true, '');
    this.systemService.loadCredentialTypeList(true, '');
    this.systemService.loadCoachUserList(true, '?filter.withRole=COACH');
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupList = customerGroupList;
      }));
    this.subscriptions.add(this.systemService.getViewConfigurationList().pipe(skipWhile((item: any) => !item))
      .subscribe((viewConfigurationList: any) => {
        this.viewConfigurationList = viewConfigurationList;
      }));
    this.subscriptions.add(this.systemService.getProgramGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((programGroupList: any) => {
        this.programGroupList = programGroupList;
      }));
    this.subscriptions.add(this.systemService.getCustomerAlertTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerAlertTypeList: any) => {
        this.customerAlertTypeList = customerAlertTypeList;
      }));
    this.subscriptions.add(this.systemService.getCredentialTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialTypeList: any) => {
        this.credentialTypeList = credentialTypeList;
      }));
    this.subscriptions.add(this.systemService.getCoachUserList().pipe(skipWhile((item: any) => !item))
      .subscribe((coachUserList: any) => {
        this.coachUserList = coachUserList.list;
      }));
    this.findCustomer(this.adminFilter.customerFilter.page, false);
  }


  ngOnInit() {
  }
  findCustomer(event: Page, isSearch: boolean) {
    this.adminFilter.customerFilter.formValue = this.searchForm.value;
    this.adminFilter.customerFilter.page = event;
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    if (isSearch) {
      event = JSON.parse(localStorage.getItem('customerFilterEvent'));
    }
    this.keys = Transformer.transformCustomerTableKey(Number(this.searchForm.controls['customerView'].value));
    const url = this.getFilterUrl(event, isSearch);
    this.customerService.loadCustomerList(true, url, Number(this.searchForm.controls['customerView'].value));
    this.subscriptions.add(this.customerService.getCustomerDataSource().pipe(skipWhile((item: any) => !item))
      .subscribe((customerList: any) => {
        this.CustomerData.content = customerList.list;
        this.CustomerData.totalElements = customerList.totalSize;
        this.dataSource = [...this.CustomerData.content];
      }));
  }

  getFilterUrl(event: any, isSearch: boolean): any {
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction : 'ASC'))
      .set('filter.auditId', (this.searchForm.controls['auditId'].value !== null ? this.searchForm.controls['auditId'].value : ''))
      .set('filter.customerGroupId', (this.searchForm.controls['customerGroup'].value !== null ? this.searchForm.controls['customerGroup'].value : ''))
      .set('filter.customerName', (this.searchForm.controls['customerName'].value !== null ? this.searchForm.controls['customerName'].value : ''))
      .set('filter.place.place', (this.searchForm.controls['customerPlace'].value !== null ? this.searchForm.controls['customerPlace'].value : ''))
      .set('filter.customerEmail', (this.searchForm.controls['customerEmail'].value !== null ? this.searchForm.controls['customerEmail'].value : ''))
      .set('filter.programGroup.programGroupId', (this.searchForm.controls['program'].value !== null ? this.searchForm.controls['program'].value : ''))
      .set('customerViewConfigurationId', (this.searchForm.controls['customerView'].value !== null ? this.searchForm.controls['customerView'].value : ''))
      .set('filter.user.status', (this.searchForm.controls['status'].value !== null ? this.searchForm.controls['status'].value : ''))
      .set('filter.eventOrAlertCode', (this.searchForm.controls['alertCode'].value !== null ? this.searchForm.controls['alertCode'].value : ''))
      .set('filter.credentialTypeCode', (this.searchForm.controls['credentialTypeCode'].value !== null ? this.searchForm.controls['credentialTypeCode'].value : ''))
      .set('filter.credentialSubscriptionId', (this.searchForm.controls['credentialSubscriptionId'].value !== null ? this.searchForm.controls['credentialSubscriptionId'].value : ''))
      .set('filter.coachUserId', (this.searchForm.controls['energyCoach'].value !== null ? this.searchForm.controls['energyCoach'].value : ''))
      .set('filter.credentialAccount', (this.searchForm.controls['credentialAccount'].value !== null ? this.searchForm.controls['credentialAccount'].value : ''));
    return params;
  }
  setUpForm(event: any) {
    this.searchForm = this.fb.group({
      auditId: [event !== undefined && event !== null ? event.auditId : ''],
      customerGroup: [event !== undefined && event !== null ? event.customerGroup : ''],
      customerName: [event !== undefined && event !== null ? event.customerName : ''],
      customerPlace: [event !== undefined && event !== null ? event.customerPlace : ''],
      customerEmail: [event !== undefined && event !== null ? event.customerEmail : ''],
      program: [event !== undefined && event !== null ? event.program : ''],
      customerView: [event !== undefined && event !== null ? event.customerView : '-1'],
      status: [event !== undefined && event !== null ? event.status : ''],
      alertCode: [event !== undefined && event !== null ? event.alertCode : ''],
      credentialTypeCode: [event !== undefined && event !== null ? event.credentialTypeCode : ''],
      credentialSubscriptionId: [event !== undefined && event !== null ? event.credentialSubscriptionId : ''],
      energyCoach: [event !== undefined && event !== null ? event.energyCoach : ''],
      credentialAccount: [event !== undefined && event !== null ? event.credentialAccount : ''],
    });
  }

  searchFilter() { }
  goToEditCustomer(event: any): void {
    this.router.navigate(['admin/customer/customerEdit'], { queryParams: { id: event.customerId } });
  }

  addNewCustomer() {
    this.router.navigate(['admin/customer/customerEdit']);
  }

  addEditCustomerEvent() {
    const dialogRef = this.dialog.open(CustomerEventComponent, {
      width: '70vw',
      height: '70vh',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  onImageClickEvent(event) {
    console.log(event);
    if (event.eventType === 'addEditLog') {
      this.addEditCustomerEvent();
    }

  }
}
