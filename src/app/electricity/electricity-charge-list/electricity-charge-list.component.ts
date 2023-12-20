import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter, UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { ElectricityUsagePopupComponent } from '../electricity-usage-popup/electricity-usage-popup.component';
declare var $: any;

@Component({
  selector: 'app-electricity-charge-list',
  templateUrl: './electricity-charge-list.component.html',
  styleUrls: ['./electricity-charge-list.component.css']
})
export class ElectricityChargeListComponent implements OnInit , OnDestroy{
  users: Users = new Users();
  electricityForm: FormGroup;
  dataSource: any;
  public pageIndex: any;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  totalElements : any;
  currentIndex = 0;
  pageSize = AppConstant.pageSize;
  disableNextButton = false;
  keys = TableColumnData.ELECTRICITY_CHARGE_KEYS;
  newFilterSearch = false;
  selectionPrivilege : boolean = false;
  subject$ = new Subject();
  @ViewChild('tableScrollPoint') public tableScrollPoint : ElementRef;
  constructor(private loginService: LoginService,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('usageHistoryFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null ) {
      this.adminFilter = new UsageHistoryFilter();
    }

    if(this.adminFilter.recentUsageHistory != AppConstant.electricityChargeList){
      this.sessionUtility(this.adminFilter.formValue);
      this.adminFilter.recentUsageHistory = AppConstant.electricityChargeList;
      this.adminFilter.page = undefined;
    }
  }

  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: UsageHistoryFilter;
  dataListForSuggestions = [];
  selectedCustomer = null;
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
    window.scrollTo(0, 0)
  }

  setUpForm(event: any) {
    this.electricityForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
    });
    if (this.selectionPrivilege) {
      this.electricityForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.electricityForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }
  

  getEletricityList(force: boolean, userId : string,filter: any): void {
    this.adminFilter.formValue = this.electricityForm.value;
    this.usageHistoryService.loadElectricityList(force,userId, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(this.usageHistoryService.getElectricityList().pipe(skipWhile((item: any) => !item))
    .subscribe(
    (gasList: any) => {

      gasList.data = gasList.data.map((data)=>{
        if(data.dummy || data.merge || data.split)
            data[AppConstant.ASTRIC] = "*";
        return data;
      });

      if(gasList.data.length == AppConstant.pageSize){
        this.usageHistoryData.content = gasList.data;
        this.totalElements = this.usageHistoryData.totalElements;
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
      this.checkForDisplayingUtilityAndSolarColumn();
      this.newFilterSearch = false;
      AppUtility.scrollToTableTop(this.tableScrollPoint);
      }));
  }

  checkForDisplayingUtilityAndSolarColumn(){
    const displayExtraColumn = this.dataSource.find(data =>{
       if(data.pv !== null )
         return true;
     });

     const displayGenColum = this.dataSource.find(data=>{
           if(data.utilGen !== null && data.utilGen !== 0)
               return true;
          });
 
     if(displayExtraColumn){
       this.keys = [...TableColumnData.ELECTRICITY_CHARGE_KEYS];
       this.keys.push({ key: 'utility', isEdit: true, displayName: 'Utitility', isDolar : true });
       this.keys.push({ key: 'utilityOrig', isEdit: true   , displayName: 'NEM', isDolar : true  });
       this.keys.push({ key: 'pv', isEdit: true, displayName: 'Solar', isDolar : true  });
     }else if (displayGenColum) {
      this.keys = [...TableColumnData.ELECTRICITY_CHARGE_KEYS];
      this.keys.push({key: 'utilGen', isEdit: true, displayName: '3rd Party Gen', isDolar :true  });
      }
      else{
       this.keys = TableColumnData.ELECTRICITY_CHARGE_KEYS;
     }
   }

  search(event: any, isSearch: boolean, forced ?: boolean): void {
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
    const params = new HttpParams()
      .set('type', 'electricityCharge')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : AppConstant.pageSize)
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      // .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
      .set('sortOrders[0].asc', (event && event.sort && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
      .set('year', (this.electricityForm.value.year !== null ? this.electricityForm.value.year : ''))
      .set('month', (this.electricityForm.value.month !== null ? this.electricityForm.value.month : ''));
    if (this.selectionPrivilege) {
      params.set('auditId', this.electricityForm.value.auditId !== null ? this.electricityForm.value.auditId : '');
      params.set('customerName', this.electricityForm.value.customerName !== null ? this.electricityForm.value.customerName : '');
    }
    this.filterForElectricityList(true, params);
  }

  get f() { return this.electricityForm.controls; }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.electricityForm.value.auditId !== undefined ? this.electricityForm.value.auditId : '')
      .set('customerName',this.electricityForm.value.customerName !== undefined ? this.electricityForm.value.customerName :'')
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
      ));
  }

  filterForElectricityList(force: boolean, filter: any){
    this.adminFilter.formValue = this.electricityForm.value;
    localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    let userId = null;
    if(this.selectionPrivilege){
      if(this.electricityForm.value.auditId != '' || this.electricityForm.value.customerName != '' || this.selectedCustomer != null )
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getEletricityList(force, userId,filter);
    }
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
          // this.getEletricityList(force, userId, filter);  
          }
            if(this.selectedCustomer != null){
              this.getEletricityList(force, this.selectedCustomer.userId, filter);
              this.setUpForm( this.electricityForm.value);
              this.adminFilter.formValue = this.electricityForm.value;
              this.electricityForm.value.auditId = this.selectedCustomer.auditId;
              this.electricityForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm(this.electricityForm.value);
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
            }

            if(this.selectedCustomer == null){
              this.electricityForm.value.auditId = "";
              this.electricityForm.value.customerName = "";
              this.setUpForm(this.electricityForm.value);
              document.getElementById('loader').classList.remove('loading');
            }
            
        }, error =>{
           console.log(error);
        document.getElementById('loader').classList.remove('loading');
        } 
      )
    );
  }

  showPopUp(event: any): any {
    if (this.users.role == 'ADMIN') {
      const dialogRef = this.dialog.open(ElectricityUsagePopupComponent, {
        width: '70vw',
        height: '70vh',
        data: {event}
      });
      dialogRef.afterClosed().subscribe(result => {   
        if(result){
          this.search(this.electricityForm.value,false);
        }
      });
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.electricityForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.electricityForm.get('auditId').setValue(event.option.value);
      this.electricityForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }

  validateYearInput(event: Event) {
    AppUtility.validateInput(event,1,2100);
  }
  
  validateYearChange(event: Event) {
    AppUtility.validateChange(event, this.electricityForm.controls['year'], 1, 2100);
  }
  validateMonthInput(event: Event) {
    AppUtility.validateInput(event,1,12);
  }
  
  validateMonthChange(event: Event) {
    AppUtility.validateChange(event, this.electricityForm.controls['month'], 1, 12);
  }
}
