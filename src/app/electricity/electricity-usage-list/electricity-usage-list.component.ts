import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter, UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { ElectricityUsagePopupComponent } from '../electricity-usage-popup/electricity-usage-popup.component';

@Component({
  selector: 'app-electricity-usage-list',
  templateUrl: './electricity-usage-list.component.html',
  styleUrls: ['./electricity-usage-list.component.css']
})
export class ElectricityUsageListComponent implements OnInit , OnDestroy{
  users: Users = new Users();
  public pageIndex: any;
  electricityForm: FormGroup;
  dataSource: any;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };

  selectedCustomer = null;

  dataListForSuggestions = undefined;
  keys = TableColumnData.ELECTRICITY_KEYS;
  constructor(private loginService: LoginService,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    private utilityService: UtilityService
  ) {
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('usageHistoryFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null ) {
      this.adminFilter = new UsageHistoryFilter();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: UsageHistoryFilter;

  ngOnInit() {
    this.setUpForm(this.adminFilter.formValue);
    this.search(this.adminFilter.page, false);
    this.scrollTop();
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  setUpForm(event: any) {
    this.electricityForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
    });
    if (this.users.role === 'ADMIN') {
      this.electricityForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.electricityForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }

  getEletricityList(force: boolean,userId : String, filter: any): void {
    this.adminFilter.formValue = this.electricityForm.value;
    localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    this.usageHistoryService.loadElectricityList(force,userId, filter);
    this.subscriptions.add(this.usageHistoryService.getElectricityList().pipe(skipWhile((item: any) => !item))
      .subscribe((gasList: any) => {
        
        // if(gasList.data.length == 0){
        //   this.utilityService.showErrorMessage("NO more data left.");
        //   if(this.adminFilter.electricityFilter.page){
        //     this.adminFilter.electricityFilter.page.pageIndex = this.adminFilter.electricityFilter.page.pageIndex -1;
        //     this.pageIndex = this.adminFilter.electricityFilter.page.pageIndex;
        //   }
        // }else{
          this.usageHistoryData.content = [...gasList.data];
          // this.usageHistoryData.totalElements = this.adminFilter.electricityFilter.totalElement + gasList.data.length;
          // this.adminFilter.electricityFilter.totalElement = this.adminFilter.electricityFilter.totalElement + gasList.data.length;
          this.dataSource = [...this.usageHistoryData.content];
        // }
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('type', 'electricity')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      // .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
      .set('sortOrders[0].asc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
      .set('year', (this.electricityForm.value.year !== null ? this.electricityForm.value.year : ''))
      .set('month', (this.electricityForm.value.month !== null ? this.electricityForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
      params.set('auditId', this.electricityForm.value.auditId !== null ? this.electricityForm.value.auditId : '');
      params.set('customerName', this.electricityForm.value.customerName !== null ? this.electricityForm.value.customerName : '');
    }
    this.filterForElectricityList(true, params);
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
    this.findCustomer(filters);
  }

  findCustomer(filters, calledFor ?: string){
    this.subscriptions.add(
      this.loginService.performGetWithParams('findCustomers.do',filters)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
          this.dataListForSuggestions = response;
        }, error =>{
           console.log(error);
        }
      )
    );
  }

  filterForElectricityList(force: boolean, filter: any){
    this.adminFilter.formValue = this.electricityForm.value;
    // localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    let userId = null;
    if(this.users.role == 'ADMIN'){
      if(this.electricityForm.value.auditId !== '')
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getEletricityList(force, userId, filter);
    }
  }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.electricityForm.value.auditId !== undefined ? this.electricityForm.value.auditId : '')
      .set('customerName',this.electricityForm.value.customerName !== undefined ? this.electricityForm.value.customerName :'')
      .set('useLike','true')
  }

  findSelectedCustomer(force,filter){
    localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    this.subscriptions.add(
      this.loginService.performGetWithParams('findCustomers.do', this.filterForCustomer())
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
          if(response.length != 0){
          var userId = response[0].userId;
          this.selectedCustomer = response[0] ;
          this.getEletricityList(force, userId, filter);
          }else{
            if(this.selectedCustomer != null){
              this.getEletricityList(force, this.selectedCustomer.userId, filter);
              this.electricityForm.value.auditId = this.selectedCustomer.auditId;
              this.electricityForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm( this.electricityForm.value);
              this.adminFilter.formValue = this.electricityForm.value;
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));

            }
          }
        }, error =>{
           console.log(error);
        } 
      )
    );
  }

  get f() { return this.electricityForm.controls; }

  showPopUp(event : any): any {
    if (this.users.role !== 'USERS') {
    const dialogRef = this.dialog.open(ElectricityUsagePopupComponent, {
      width: '70vw',
      height: '70vh',
      data: {event}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.search(undefined,true);  
      });
  }
  }

  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.electricityForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.electricityForm.get('auditId').setValue(event.option.value);
      this.electricityForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }
}
