import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableComponent } from 'src/app/common/table/table.component';
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
  public CustomerData = {
    content: [],
    totalElements: 0,
  };

  private readonly subscriptions: Subscription = new Subscription();

  public searchForm: FormGroup = this.fb.group({
    auditId: [''],
    customerGroup: [''],
    customerName: [''],
    customerPlace: [''],
    customerEmail: [''],
    program: [''],
    customerView: ['-1', Validators.required],
    status: [''],
    alertCode: [''],
    credentialTypeCode: [''],
    credentialSubscriptionId: [''],
    energyCoach: [''],
    credentialAccount: [''],
  });
  public fileUploadForm: FormGroup = this.fb.group({
    customerFile: ['']
  });
  constructor(private fb: FormBuilder,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly customerService: CustomerService,
    public dialog: MatDialog) {
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
    this.findCustomer(null);
  }


  ngOnInit() {
  }
  findCustomer(page: Page) {
    document.getElementById('loader').classList.add('loading');
    this.keys = Transformer.transformCustomerTableKey(Number(this.searchForm.controls['customerView'].value));
    let url = '?filter.disableTotalSize=false&filter.pageSize=10' + this.getFilterUrl();
    if (page !== null) {
      if (page.pageSize !== undefined) {
        url =
          '?filter.disableTotalSize=false&filter.pageSize=' +
          page.pageSize +
          '&filter.startRow=' +
          page.pageIndex * page.pageSize + this.getFilterUrl();
      }
      if (page.sort !== null && page.sort.active.length !== 0) {
        url += '&formAction=sort&sortField=' + page.sort.active + '&sortOrder=' + page.sort.direction.toUpperCase();
      }
    }

    this.customerService.loadCustomerList(true, url, Number(this.searchForm.controls['customerView'].value));
    this.subscriptions.add(this.customerService.getCustomerDataSource().pipe(skipWhile((item: any) => !item))
      .subscribe((customerList: any) => {
        document.getElementById('loader').classList.remove('loading');
        this.CustomerData.content = customerList.list;
        this.CustomerData.totalElements = customerList.totalSize;
        this.dataSource = [...this.CustomerData.content];
        document.getElementById('loader').classList.remove('loading');
      }));
  }


  getFilterUrl(): string {
    let url = '';
    url = '&filter.auditId=' + this.searchForm.controls['auditId'].value
      + '&filter.customerGroupId=' + this.searchForm.controls['customerGroup'].value
      + '&filter.customerName=' + this.searchForm.controls['customerName'].value
      + '&filter.place.place=' + this.searchForm.controls['customerPlace'].value
      + '&filter.customerEmail=' + this.searchForm.controls['customerEmail'].value
      + '&filter.programGroup.programGroupId=' + this.searchForm.controls['program'].value
      + '&customerViewConfigurationId=' + this.searchForm.controls['customerView'].value
      + '&filter.user.status' + this.searchForm.controls['status'].value
      + '&filter.eventOrAlertCode=' + this.searchForm.controls['alertCode'].value
      + '&filter.credentialTypeCode=' + this.searchForm.controls['credentialTypeCode'].value
      + '&filter.credentialSubscriptionId=' + this.searchForm.controls['credentialSubscriptionId'].value
      + '&filter.coachUserId=' + this.searchForm.controls['energyCoach'].value
      + '&filter.credentialAccount=' + this.searchForm.controls['credentialAccount'].value;
    return url;
  }

  searchFilter() { }
  goToEditEvent(event: any): void {
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
