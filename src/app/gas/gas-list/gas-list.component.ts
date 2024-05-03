import { UtilityService } from './../../services/utility.service';
import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter, UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { GasUsagePopupComponent } from '../gas-usage-popup/gas-usage-popup.component';
import { AppUtility } from 'src/app/utility/app.utility';
declare var $: any;

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css']
})
export class GasListComponent implements OnInit ,OnDestroy{
  users: Users = new Users();
  gasForm: FormGroup;
  public pageIndex: any;
  dataSource = [];
  selectedCustomer : any;
  totalElements = 0;
  disableNextButton = false;
  isValueNull:boolean = false;
  currentIndex : number;
  @ViewChild('tableScrollPoint') public tableScrollPoint : ElementRef; 
  selectionPrivilege : boolean  = false;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  keys = TableColumnData.GAS_KEYS;
  subject$ = new Subject();
    newFilterSearch = false;
  pageSize = AppConstant.pageSize;
  constructor(private loginService: LoginService,
    private router: Router,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    public readonly administrativeService : AdministrativeService,
    public readonly UtilityService : UtilityService
  ) {
    this.dataListForSuggestions = [];
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('usageHistoryFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null ) {
      this.adminFilter = new UsageHistoryFilter();
    }

    if(this.adminFilter.recentUsageHistory != AppConstant.gas){
      this.sessionUtility(this.adminFilter.formValue);
      this.adminFilter.recentUsageHistory = AppConstant.gas;
      this.adminFilter.page = undefined;
    }
  }
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: UsageHistoryFilter;
  public dataListForSuggestions : any;

  ngOnInit() {
    this.setSelectionPrivilege();
    this.setUpForm(this.adminFilter.formValue);
    this.search(this.adminFilter.page, false);
    this.getDataFromStore();
    this.newFilterSearch = true;
    this.scrollTop();
    this.findCustomer();
  }

  setSelectionPrivilege(){
    this.selectionPrivilege = this.users.role != 'USERS';
  }
  
  sessionUtility(event){
    if(event)
      this.adminFilter.formValue = { "auditId" : event.auditId , "customerName" : event.customerName };
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setUpForm(event: any) {
    this.gasForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
    });
    if (this.selectionPrivilege) {
      this.gasForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.gasForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.gasForm.value.auditId !== undefined ? this.gasForm.value.auditId : '')
      .set('customerName',this.gasForm.value.customerName !== undefined ? this.gasForm.value.customerName :'')
      .set('useLike','true')
  }

  findCustomerByAuditIdOrCustomerName(calledBy){
    let filters =  this.filterForCustomer();
    
    if(filters.get('auditId').length < 5 && filters.get('customerName').length < 5)
      return null;
    
    if(calledBy == 'auditId'){
      filters = filters.delete('customerName');
    }else{
      filters = filters.delete('auditId');
    }
    
    filters = AppUtility.addNoLoaderParam(filters);
    this.subject$.next(filters);
  }


    findCustomer(){
      this.subscriptions.add(this.subject$
        .pipe(
         debounceTime(AppConstant.debounceTime)  
        , distinctUntilChanged())
        .switchMap((filters : HttpParams) => this.loginService.customerSuggestionListRequest(filters))
        .subscribe(
          (response) =>{
            this.dataListForSuggestions = response;
          }, error =>{
             console.log(error);
          }
        ))
    }
  


  findSelectedCustomer(force,filter){
    document.getElementById('loader').classList.add('loading');
    const params = this.filterForCustomer();
    this.subscriptions.add(
      this.loginService.performGetWithParams('findCustomers.do',params)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
          if(response.length != 0){
          var userId = response[0].userId;
          this.selectedCustomer = response[0];
          // this.getGasList(force, userId, filter);  
          }
            if(this.selectedCustomer != null){
              this.getGasList(force, this.selectedCustomer.userId, filter);
              this.setUpForm( this.gasForm.value);
              this.adminFilter.formValue = this.gasForm.value;
              this.gasForm.value.auditId = this.selectedCustomer.auditId;
              this.gasForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm(this.gasForm.value);
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
            }

            if(this.selectedCustomer == null){
              this.gasForm.value.auditId = "";
              this.gasForm.value.customerName = "";
              this.setUpForm(this.gasForm.value);
              document.getElementById('loader').classList.remove('loading');
            }
        }, error =>{
           console.log(error);
           document.getElementById('loader').classList.remove('loading');
        } 
      )
    );
  }

  findGasList(force: boolean, filter: any): void {
    this.adminFilter.formValue = this.gasForm.value;
    let userId = null;
    if(this.selectionPrivilege){
      if(this.gasForm.value.auditId != '' || this.gasForm.value.customerName != '' || this.selectedCustomer != null )
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getGasList(force, userId, filter);
    }
  }

  getGasList(force, userId, filter){
    this.usageHistoryService.loadGasList(force, userId, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(
    this.usageHistoryService.getGasList().pipe(
      skipWhile((item: any) => !item),
      ).subscribe((gasList: any) => {

          gasList.data = gasList.data.map((data)=>{
            if(data.dummy || data.merge || data.split)
                data[AppConstant.ASTRIC] = "*";
            return data;
          });
           //ticket- 2441 comment 13/21
          gasList.data.forEach(data=>{
            if((data.value==null && data.id==null && data.dummy && data.billingDate==null) && (data.prevId!=null && data.nextId!=null)){
               this.isValueNull = true;
            }
          })

          if(gasList.data.length == AppConstant.pageSize){
            this.totalElements = this.usageHistoryData.totalElements;
            this.usageHistoryData.content = gasList.data;
            this.dataSource = [...this.usageHistoryData.content];
            this.pageIndex = this.currentIndex;
            this.disableNextButton = false;
          } else {
            this.disableNextButton = true;
            if(gasList.data.length > 0){
              this.usageHistoryData.content = gasList.data;
              this.dataSource = [...this.usageHistoryData.content];
            } else {
            if(this.newFilterSearch)
                this.dataSource = [...gasList.data]; 
            this.pageIndex = this.currentIndex -1;
          }}  
          this.newFilterSearch = false;
          AppUtility.scrollToTableTop(this.tableScrollPoint);
        }));
  } 
// ticket- 2441 comment 13/21
  fixGap(event:any){
    let userId: any = null;
    this.dataSource.forEach(data => {
        if (data.userId) {
            userId = data.userId;
            return; // Exit the loop once a userId is found
        }
    });
    
     const params = new HttpParams()
    .set('prevUsageHistoryId',event.prevId)
    .set('nextUsageHistoryId',event.nextId);

    this.loginService.performPostWithParam('',`users/${userId}/fixUsageHistoryGap/${event.type}`,params).subscribe(
      data=>{
          this.getDataFromStore();
      }
    )
}
  search(event: any, isSearch: boolean,forced ?: boolean): void {
    this.isValueNull = false;
    this.adminFilter.page = event;
    if(event)
      this.currentIndex = event.pageIndex;


    if(forced){
        this.currentIndex = 0;
        this.adminFilter.page = undefined;
        event = undefined;
        this.newFilterSearch = true;
    }  

    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    let params = new HttpParams()
      .set('type','gas')
      .set('addDummyGaps','true')  // ticket- 2441 comment 13/21
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
        .set('sortOrders[0].propertyName', ((event && event.sort && event.sort.active) ? event.sort.active : 'startDate'))
        .set('sortOrders[0].asc', (event && event.sort && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
        .set('year', (this.gasForm.value.year !== null ? this.gasForm.value.year : ''))
      .set('month', (this.gasForm.value.month !== null ? this.gasForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
     params =  params.set('auditId', this.gasForm.value.auditId !== null ? this.gasForm.value.auditId : '')
      .set('customerName', this.gasForm.value.customerName !== null ? this.gasForm.value.customerName : '');
    }
    this.findGasList(true, params);
  }

  get f() { return this.gasForm.controls; }

  showPopUp(event: any): any {
    if (this.users.role == 'ADMIN' && event.value!=null && event.billingDate!=null) {
      const dialogRef = this.dialog.open(GasUsagePopupComponent, {
        width: '70vw',
        height: '70vh',
        data: {event},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.search(this.gasForm.value,true);
      });
    }
  }

  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.gasForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.gasForm.get('auditId').setValue(event.option.value);
      this.gasForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
  validateYearInput(event: Event) {
    AppUtility.validateInput(event,1,2100);
  }
  
  validateYearChange(event: Event) {
    AppUtility.validateChange(event, this.gasForm.controls['year'], 1, 2100);
  }
  validateMonthInput(event: Event) {
    AppUtility.validateInput(event,1,12);
  }
  
  validateMonthChange(event: Event) {
    AppUtility.validateChange(event, this.gasForm.controls['month'], 1, 12);
  }
}
