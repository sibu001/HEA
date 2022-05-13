import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter, ElectricityDailySmartMeterFilter, UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { ElectricityUsagePopupComponent } from '../electricity-usage-popup/electricity-usage-popup.component';
declare var $: any;

@Component({
  selector: 'app-electricity-daily-smart-meter-list',
  templateUrl: './electricity-daily-smart-meter-list.component.html',
  styleUrls: ['./electricity-daily-smart-meter-list.component.css']
})
export class ElectricityDailySmartMeterListComponent implements OnInit {
  users: Users = new Users();
  public pageIndex: any;
  electricityDailySmartMeterForm: FormGroup;
  dataSource: any;
  public dataListForSuggestions : any;
  selectedCustomer = null;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  keys = TableColumnData.SMART_METER_DAILY_KEYS;
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
  }
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: UsageHistoryFilter;

  ngOnInit() {
    this.setUpForm(this.adminFilter.formValue);
    this.search(this.adminFilter.page, false);
    window.scroll(0, 0);
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setUpForm(event: any) {
    this.electricityDailySmartMeterForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
      day: [event !== undefined && event !== null ? event.day : ''],
    });
    if (this.users.role === 'ADMIN') {
      this.electricityDailySmartMeterForm.addControl('auditId', this.fb.control(event !== undefined && event !== null ? event.auditId : ''));
      this.electricityDailySmartMeterForm.addControl('customerName', this.fb.control(event !== undefined && event !== null ? event.customerName : ''));
    }
  }
  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.electricityDailySmartMeterForm.value.auditId !== undefined ? this.electricityDailySmartMeterForm.value.auditId : '')
      .set('customerName',this.electricityDailySmartMeterForm.value.customerName !== undefined ? this.electricityDailySmartMeterForm.value.customerName :'')
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
          this.getElectricityDailySmartMeterList(force, userId, filter);
          }else{
            if(this.selectedCustomer != null){
              this.getElectricityDailySmartMeterList(force, this.selectedCustomer.userId, filter);
              this.electricityDailySmartMeterForm.value.auditId = this.selectedCustomer.auditId;
              this.electricityDailySmartMeterForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm( this.electricityDailySmartMeterForm.value);
              this.adminFilter.formValue = this.electricityDailySmartMeterForm.value;
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));

            }
          }
        }, error =>{
           console.log(error);
        } 
      )
    );
  }

  // findGasList(force: boolean, filter: any): void {
  //   this.adminFilter.electricityDailySmartMeterFilter.formValue = this.electricityDailySmartMeterForm.value;
  //   localStorage.setItem('electricityDailySmartMeterFilter', JSON.stringify(this.adminFilter));
  //   this.usageHistoryService.loadElectricityDailySmartMeterList(force, this.users.outhMeResponse.user.id, filter);
  //   this.subscriptions.add(this.usageHistoryService.getElectricityDailySmartMeterList().pipe(skipWhile((item: any) => !item))
  //     .subscribe((gasList: any) => {
  //       this.usageHistoryData.content = gasList.data;
  //       this.usageHistoryData.totalElements = this.adminFilter.electricityDailySmartMeterFilter.totalElement + gasList.data.length + 1;
  //       this.adminFilter.electricityDailySmartMeterFilter.totalElement = this.adminFilter.electricityDailySmartMeterFilter.totalElement + gasList.data.length + 1;
  //       this.dataSource = [...this.usageHistoryData.content];
  //     }));
  // }
  findGasList(force: boolean, filter: any): void {
    this.adminFilter.formValue = this.electricityDailySmartMeterForm.value;
    // localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    let userId = null;
    if(this.users.role == 'ADMIN'){
      if(this.electricityDailySmartMeterForm.value.auditId !== '')
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getElectricityDailySmartMeterList(force, userId, filter);
    }
  }
  getElectricityDailySmartMeterList(force, userId, filter){
    this.usageHistoryService.loadElectricityDailySmartMeterList(force, userId, filter);
    this.subscriptions.add(this.usageHistoryService.getElectricityDailySmartMeterList().pipe(skipWhile((item: any) => !item))
      .subscribe((gasList: any) => {
        this.usageHistoryData.content = gasList.data;
        this.dataSource = this.usageHistoryData.content;
    //  if (gasList.data.length < 10){
    //       if(this.adminFilter.gasFilter.page){
    //         this.adminFilter.gasFilter.page.pageIndex = this.adminFilter.gasFilter.page.pageIndex -1;
    //         this.pageIndex = this.adminFilter.gasFilter.page.pageIndex;
    //       }
    //       this.disableNextButton = true;
    //  }else{
        // this.disableNextButton = false;
        // }
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    let params = new HttpParams()
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
      .set('sortOrders[0].asc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
      .set('year', (this.electricityDailySmartMeterForm.value.year !== null ? this.electricityDailySmartMeterForm.value.year : ''))
      .set('day', (this.electricityDailySmartMeterForm.value.day !== null ? this.electricityDailySmartMeterForm.value.day : ''))
      .set('month', (this.electricityDailySmartMeterForm.value.month !== null ? this.electricityDailySmartMeterForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
      params = params.set('auditId', this.electricityDailySmartMeterForm.value.auditId !== null ? this.electricityDailySmartMeterForm.value.auditId : '')
      .set('customerName', this.electricityDailySmartMeterForm.value.customerName !== null ? this.electricityDailySmartMeterForm.value.customerName : '');
    }
    this.findGasList(true, params);
  }

  get f() { return this.electricityDailySmartMeterForm.controls; }

  showPopUp(): any {
    if (this.users.role !== 'USERS') {
      const dialogRef = this.dialog.open(ElectricityUsagePopupComponent, {
        width: '70vw',
        height: '70vh',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed' + result);
      });
    }
  }
  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.electricityDailySmartMeterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.electricityDailySmartMeterForm.get('auditId').setValue(event.option.value);
      this.electricityDailySmartMeterForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }
}