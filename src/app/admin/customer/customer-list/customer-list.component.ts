import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter } from 'src/app/models/filter-object';
import { Page } from 'src/app/models/page';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { Transformer } from 'src/app/store/customer-state-management/transformer/transformer';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { AddFileComponent } from '../add-file/add-file.component';
import { CustomerEventTypeComponent } from '../customer-event-type/customer-event-type.component';
import { StaffNoteComponent } from '../staff-note/staff-note.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  public keys: any;
  public customerGroupList: any = [];
  public viewConfigurationList: any = [];
  public programGroupList: any = [];
  public customerAlertTypeList: any = [];
  public credentialTypeList: any = [];
  public coachUserList: any = [];
  public dataSource: any;
  public customerView = -1;
  public adminFilter: AdminFilter;
  public users: Users = new Users();
  public checkBoxValue: any;
  public showCSVExportButton = false;
  public statusData: any[] = TableColumnData.STATUS_DATA;
  public CustomerData = {
    content: [],
    totalElements: 0,
  };
  pageIndex: any;
  isCheckBox: boolean = false;
  public fileObject: any;

  pageSize = AppConstant.pageSize;
  private readonly subscriptions: Subscription = new Subscription();

  public searchForm: FormGroup;
  public fileUploadForm: FormGroup = this.fb.group({
    customerFile: ['', Validators.required]
  });
  public viewAttributes;
  public sqlOrder;
  public placeList: any = [];
  @ViewChild('tableheadingScroll') public tableheading: ElementRef;
  constructor(private fb: FormBuilder,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly customerService: CustomerService,
    private loginService: LoginService,
    public dialog: MatDialog,
    private datePipe: DatePipe) {
    const tableValue = Transformer.transformCustomerTableKey(-1, '');
    this.keys = tableValue.key;
    this.loginService.updateUser();
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
    this.setUpForm(this.adminFilter.customerFilter.formValue);
    this.findPlace(true, '');
    this.systemService.loadCustomerGroupList(true, '');
    this.systemService.loadViewConfigurationList(true);
    this.systemService.loadProgramGroupsList(true, '');
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
    this.sqlOrder = this.adminFilter.customerFilter.sqlOrder;
    if(!this.sqlOrder){
      this.sqlOrder = "false";
    }
    this.findCustomer(this.adminFilter.customerFilter.page, false);
  }


  ngOnInit() {
    this.scrollTop();
  }

  findPlace(force: boolean, filter: string): any {
    this.systemUtilityService.loadPlaceList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getPlaceList().pipe(skipWhile((item: any) => !item))
      .subscribe((placeList: any) => {
        this.placeList = placeList;
      }));
  }
  findCustomer(event: Page, isSearch: boolean) {
    this.adminFilter.customerFilter.formValue = this.searchForm.value;
    this.adminFilter.customerFilter.page = event;
    this.adminFilter.customerFilter.sqlOrder = this.checkForSQLOrder(event);
    localStorage.setItem('adminFilter', JSON.stringify(this.adminFilter));
    if (isSearch) {
      event = JSON.parse(localStorage.getItem('customerFilterEvent'));
    }
    const url = this.getFilterUrl(event, isSearch);
    if (Number(this.searchForm.controls['customerView'].value) === -1) {
      this.showCSVExportButton = false;
      this.getCustomerList(url);
    } else {
      this.showCSVExportButton = true;
      this.getViewConfigurationList(url);
    }

  }
  getViewConfigurationList(url: any) {
    this.subscriptions.add(this.customerService.loadCustomerViewConfigurationList(Number(this.searchForm.controls['customerView'].value), url).pipe(skipWhile((item: any) => !item))
      .subscribe((customerList1: any) => {
        this.viewAttributes = customerList1.customerManagement.customerViewConfigurationList.data.viewAttributes;
        const tableValue = Transformer.transformCustomerTableKey(Number(this.searchForm.controls['customerView'].value), customerList1.customerManagement.customerViewConfigurationList);
        this.keys = tableValue.key;
        const customerValue = Transformer.transformCustomerTableData(customerList1.customerManagement.customerViewConfigurationList, Number(this.searchForm.controls['customerView'].value), tableValue.dataKey);
        if (this.searchForm.controls['customerView'].value === '11') {
          customerValue.list.forEach((elements: any, index: any) => {
            let i = 0;
            this.subscriptions.add(this.customerService.loadCustomerEventList(elements.customerId).pipe(skipWhile((item: any) => !item)).subscribe((eventList: any) => {
              eventList.customerManagement.customerEventList.forEach(element => {
                customerValue.list[index][element.customerEventType.eventCode] = this.datePipe.transform(element.eventDatetime, 'MM/dd/yyyy') + ' ' + element.description +
                  (customerValue.list[index][element.customerEventType.eventCode] ? ' ...' : '');
                i++;
              });
            }));
            this.subscriptions.add(this.customerService.loadStaffNoteList(elements.customerId).pipe(skipWhile((item: any) => !item)).subscribe((staffNoteList: any) => {
              staffNoteList.customerManagement.staffNoteList.forEach(element => {
                customerValue.list[index].staffNote = this.datePipe.transform(element.noteDate, 'MM/dd/yyyy') + ' ' + element.note +
                  (customerValue.list[index].staffNote ? ' ...' : '');
              });
            }));

            this.subscriptions.add(this.customerService.loadCustomerFileList(elements.customerId).pipe(skipWhile((item: any) => !item)).subscribe((customerFileList: any) => {
              customerFileList.customerManagement.customerFileList.list.forEach(element => {
                customerValue.list[index].files = element.name + ' ' + this.datePipe.transform(element.timestamp, 'MM/dd/yyyy') + ' ' + element.description +
                  (customerValue.list[index].files ? ' ...' : '');
              });
            }));
            this.CustomerData.content = customerValue.list;
            this.CustomerData.totalElements = customerValue.totalSize;
            this.dataSource = [...this.CustomerData.content];
          });
        }
        this.CustomerData.content = customerValue.list;
        this.CustomerData.totalElements = customerValue.totalSize;
        this.dataSource = [...this.CustomerData.content];
        this.tableheading.nativeElement.scrollIntoView({behavior: 'smooth', inline : 'start'})
      }));
  }

  getCustomerList(url: any) {
    this.subscriptions.add(this.customerService.loadCustomerList(true, url, Number(this.searchForm.controls['customerView'].value)).pipe(skipWhile((item: any) => !item))
      .subscribe((customerList1: any) => {
        const tableValue = Transformer.transformCustomerTableKey(Number(this.searchForm.controls['customerView'].value), customerList1.customerManagement.customerList);
        this.keys = tableValue.key;
        const customerValue = Transformer.transformCustomerTableData(customerList1.customerManagement.customerList, Number(this.searchForm.controls['customerView'].value), tableValue.dataKey);
        this.CustomerData.content = customerValue.list;
        this.CustomerData.totalElements = customerValue.totalSize;
        this.dataSource = [...this.CustomerData.content];
        this.tableheading.nativeElement.scrollIntoView({behavior: 'smooth', inline : 'start'})
      }));
  }

  checkForSQLOrder(event) : String{
    if(event && event.sort.active && this.viewAttributes){
      const attributeConfiguration =  this.viewAttributes.find((data)=>{
        if(data.definition == event.sort.active){
            return true;
        }
        return false;
      });
      if(attributeConfiguration.attributeType == "V"){
        this.sqlOrder = "true";
      }else if(attributeConfiguration.attributeType == "C"){
        this.sqlOrder = "false";
      }
      
    }
    return this.sqlOrder;
  }

  getFilterUrl(event: any, isSearch: boolean, isForExportAsCSV?: boolean): any {
    this.customerView = this.searchForm.controls.customerView.value !== undefined && this.searchForm.controls.customerView.value !== null ? this.searchForm.controls.customerView.value : '-1';
    let params: HttpParams;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    if (event && event.sort) {
      switch (event.sort.active) {
        case 'name':
          event.sort.active = 'user.name';
          break;
        case 'joinDate':
          event.sort.active = 'createdDate';
          break;
        case 'group':
          event.sort.active = 'customerGroup.groupName'
        default:
          break;
      }
    }
    if (((Number(this.searchForm.controls['customerView'].value)) === null || (Number(this.searchForm.controls['customerView'].value)) === -1)
          || isForExportAsCSV) {
      // this.isCheckBox = true;
      if(this.users.role == "ADMIN"){
        this.isCheckBox = true;
      }
      params = new HttpParams()
        .set('filter.disableTotalSize', 'false')
        .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
        .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
          (event.pageIndex * event.pageSize) + '' : '0'))
        .set('loadCustomers', 'true')
        .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
        .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
        .set('filter.setupReportKey', 'true')
        .set('filter.auditId', (this.searchForm.controls['auditId'].value !== null ? this.searchForm.controls['auditId'].value : ''))
        .set('filter.customerGroupId', (this.searchForm.controls['customerGroup'].value !== null ? this.searchForm.controls['customerGroup'].value : ''))
        .set('filter.customerName', (this.searchForm.controls['customerName'].value !== null ? this.searchForm.controls['customerName'].value : ''))
        .set('filter.placeCode', (this.searchForm.controls['customerPlace'].value !== null ? this.searchForm.controls['customerPlace'].value : ''))
        .set('filter.customerEmail', (this.searchForm.controls['customerEmail'].value !== null ? this.searchForm.controls['customerEmail'].value : ''))
        .set('filter.programGroupId', (this.searchForm.controls['program'].value !== null ? this.searchForm.controls['program'].value : ''))
        .set('customerViewConfigurationId', (this.searchForm.controls['customerView'].value !== null ? this.searchForm.controls['customerView'].value : ''))
        .set('filter.user.status', (this.searchForm.controls['status'].value !== null ? this.searchForm.controls['status'].value : ''))
        .set('filter.eventOrAlertCode', (this.searchForm.controls['alertCode'].value !== null ? this.searchForm.controls['alertCode'].value : ''))
        .set('filter.notEventOrAlertCode', (this.searchForm.controls['notEventOrAlertCode'].value !== null ? this.searchForm.controls['notEventOrAlertCode'].value : ''))
        .set('filter.credentialTypeCode', (this.searchForm.controls['credentialTypeCode'].value !== null ? this.searchForm.controls['credentialTypeCode'].value : ''))
        .set('filter.credentialSubscriptionId', (this.searchForm.controls['credentialSubscriptionId'].value !== null ? this.searchForm.controls['credentialSubscriptionId'].value : ''))
        .set('filter.coachUserId', (this.searchForm.controls['energyCoach'].value !== null ? this.searchForm.controls['energyCoach'].value : ''))
        .set('filter.credentialAccount', (this.searchForm.controls['credentialAccount'].value !== null ? this.searchForm.controls['credentialAccount'].value : ''))
        .set('filter.Notes', (this.searchForm.controls['Notes'].value !== null ? this.searchForm.controls['Notes'].value : ''));

        if(isForExportAsCSV){
          params = params.delete('filter.pageSize');
        }
    } else {
      this.isCheckBox = false;
      params = new HttpParams()
        .set('disableTotalSize', 'false')
        .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
        .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
          (event.pageIndex * event.pageSize) + '' : '0'))
        .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
        .set('sqlOrder', this.sqlOrder)
        .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
        .set('auditId', (this.searchForm.controls['auditId'].value !== null ? this.searchForm.controls['auditId'].value : ''))
        .set('customerGroupId', (this.searchForm.controls['customerGroup'].value !== null ? this.searchForm.controls['customerGroup'].value : ''))
        .set('customerName', (this.searchForm.controls['customerName'].value !== null ? this.searchForm.controls['customerName'].value : ''))
        .set('placeCode', (this.searchForm.controls['customerPlace'].value !== null ? this.searchForm.controls['customerPlace'].value : ''))
        .set('customerEmail', (this.searchForm.controls['customerEmail'].value !== null ? this.searchForm.controls['customerEmail'].value : ''))
        .set('programGroupId', (this.searchForm.controls['program'].value !== null ? this.searchForm.controls['program'].value : ''))
        .set('customerViewConfigurationId', (this.searchForm.controls['customerView'].value !== null ? this.searchForm.controls['customerView'].value : ''))
        .set('user.status', (this.searchForm.controls['status'].value !== null ? this.searchForm.controls['status'].value : ''))
        .set('eventOrAlertCode', (this.searchForm.controls['alertCode'].value !== null ? this.searchForm.controls['alertCode'].value : ''))
        .set('credentialTypeCode', (this.searchForm.controls['credentialTypeCode'].value !== null ? this.searchForm.controls['credentialTypeCode'].value : ''))
        .set('credentialSubscriptionId', (this.searchForm.controls['credentialSubscriptionId'].value !== null ? this.searchForm.controls['credentialSubscriptionId'].value : ''))
        .set('coachUserId', (this.searchForm.controls['energyCoach'].value !== null ? this.searchForm.controls['energyCoach'].value : ''))
        .set('credentialAccount', (this.searchForm.controls['credentialAccount'].value !== null ? this.searchForm.controls['credentialAccount'].value : ''))
        .set('filter.Notes', (this.searchForm.controls['Notes'].value !== null ? this.searchForm.controls['Notes'].value : ''));
      // if (event && event.sort.active !== undefined) {
      //   const index = this.keys.findIndex((item: any) => (item.definition === event.sort.active && item.attributeType === 'V'));
      //   if (index !== -1) {
      //     params = params.append('sqlOrder', 'true');
      //   } else {
      //     params = params.append('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'));
      //   }
      // }
    }

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
      notEventOrAlertCode: [event !== undefined && event !== null ? event.notEventOrAlertCode : ''],
      credentialTypeCode: [event !== undefined && event !== null ? event.credentialTypeCode : ''],
      credentialSubscriptionId: [event !== undefined && event !== null ? event.credentialSubscriptionId : ''],
      energyCoach: [event !== undefined && event !== null ? event.energyCoach : ''],
      credentialAccount: [event !== undefined && event !== null ? event.credentialAccount : ''],
      Notes: [event !== undefined && event !== null ? event.Notes : ''],
    });
  }

  goToEditCustomer(event: any): void {
    this.router.navigate(['admin/customer/customerEdit'], { queryParams: { id: event.customerId } });
  }

  addNewCustomer() {
    this.router.navigate(['admin/customer/customerEdit']);
  }

  delete(id: any, length: any, i: any) {
    this.subscriptions.add(this.customerService.deleteCustomerById(id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        if (length === i) {
          this.findCustomer(this.adminFilter.customerFilter.page, false);
        }
      }));
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  addEditCustomerEvent(event: any) {
    event.customerId = event.row.customerId;
    event.isList = true;
    const dialogRef = this.dialog.open(CustomerEventTypeComponent, {
      width: '50vw',
      height: '50vh',
      data: event,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.findCustomer(this.adminFilter.customerFilter.page, false);
      }
    });
  }

  addStaffNote(event: any) {
    event.customerId = event.row.customerId;
    event.isList = true;
    const dialogRef = this.dialog.open(StaffNoteComponent, {
      width: '50vw',
      height: '50vh',
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.findCustomer(this.adminFilter.customerFilter.page, false);
      }
    });
  }

  addFile(event: any) {
    event.isList = true;
    event.customerId = event.row.customerId;
    const dialogRef = this.dialog.open(AddFileComponent, {
      width: '50vw',
      height: '60vh',
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.findCustomer(this.adminFilter.customerFilter.page, false);
      }
    });
  }
  handleLink(event: any) {
    if (event.routeLink === 'userReportLink.do') {
      window.open(window.location.origin + '/hea-web/' + event.routeLink + '?reportKey=' + event.value.reportKey + '&userReportType=userHistory', '_blank');
    } else {
      this.subscriptions.add(this.customerService.loadCustomerById(event.value.customerId).pipe(skipWhile((item: any) => !item))
        .subscribe((customer: any) => {
          this.users.outhMeResponse = customer.customerManagement.customer;
          this.users.theme = customer.customerManagement.customer.customerGroup.theme;
          this.users.recommendationStatusChange = true;
          this.loginService.setUser(this.users);
          
          const customerUIVersion = this.users.outhMeResponse.uiVersion;
          const userUIBehaviour = this.users.userData.uiVersionBehavior;

          // condition added for opening user screen on the behalf of 'customerUIVersion' and 'userUIBehaviour'
          // for more detail check out, https://xp-dev.com/trac/HEA/ticket/2402#comment:15
          if(customerUIVersion==AppConstant.classicVersionSelectionValue && userUIBehaviour != AppConstant.UI_VERSION_BEHAVIOR_ALWAYS_CUI ){

            const openNewTab = AppConstant.UI_VERSION_BEHAVIOR_NEW_TAB == userUIBehaviour;

            if(event.routeLink == '/topicshistory'){
              this.redirectToclassicTopicHitory(this.users.outhMeResponse.user.userId,openNewTab);     
            }else if(event.routeLink == '/dashboard'){
              this.redirectToclassicDashboard(this.users.outhMeResponse.user.userId,openNewTab);           
            }
            
            return;
          }

          this.router.navigate([event.routeLink], { queryParams: event.queryParam });
        }));
    }
  }

  private redirectToclassicTopicHitory(userId : number, openInNewTab : boolean){
    const redirectionURL = `${window.location.origin}/hea-web/surveyHistoryList.do`;
    this.sendDataToClassicCUI( redirectionURL, userId, openInNewTab);
  }

  private redirectToclassicDashboard(userId : number, openInNewTab : boolean){
    const redirectionURL = `${window.location.origin}/hea-web/trendingHome.do`;
    this.sendDataToClassicCUI( redirectionURL, userId, openInNewTab);
  }


  private sendDataToClassicCUI(redirectionURL : string , userId : number, openInNewTab : boolean){

    let workingDocument = document;

    if(openInNewTab){
      const newWindow = window.open('', '_blank');
      workingDocument = newWindow.document;
    }

    const form = workingDocument.createElement('form') as HTMLFormElement;
    form.action = redirectionURL; 
    form.method = 'post';

    const userIdInput = workingDocument.createElement('input') as HTMLInputElement;
    userIdInput.type = 'hidden';
    userIdInput.name = 'userId';
    userIdInput.value = userId.toString();
    form.appendChild(userIdInput);

    workingDocument.body.appendChild(form);
    form.submit();

  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  onImageClickEvent(event: any): void {
    if (event.col.attributeType === 'N') {
      this.addStaffNote(event);
    } else if (event.col.attributeType === 'E') {
      this.addEditCustomerEvent(event);
    } else if (event.col.attributeType === 'D') {
      this.addFile(event);
    }
  }

  checkBoxChangeEvent(event: any) {
    this.checkBoxValue = event;
  }

  batchDelete() {
    let i = 0;
    this.checkBoxValue.forEach(element => {
      i++;
      this.delete(element.customerId, this.checkBoxValue.length, i);
    });
  }
  handleFileInput(file: any) {
    this.fileObject = file[0];
  }

  uploadNewCustomerFile() {
    if (this.fileUploadForm.valid) {
      this.customerService.saveCustomerUsingFile(this.fileObject);
    }
  }

  exportDataAsCSV(event){
    event.preventDefault();
    document.getElementById('loader').classList.add('loading');
    AppUtility.scrollTop();
    const params = this.getFilterUrl(this.adminFilter.customerFilter.page, false, true);
    this.loginService.performPostWithParam({},'downloadCustomersCSV.do',params,true)
    .subscribe(
      response =>{
        document.getElementById('loader').classList.remove('loading');
      }, error =>{
        document.getElementById('loader').classList.remove('loading');
        const fileData =  error.error.text;
        AppUtility.createAndDownlodCSVFile([fileData]);
      }
    )
  }

  showDeletButton() : boolean{
      return this.users.role == "ADMIN" && (Number(this.searchForm.controls['customerView'].value)) == -1;
  }
}
