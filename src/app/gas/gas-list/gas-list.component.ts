import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdminFilter, UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { GasUsagePopupComponent } from '../gas-usage-popup/gas-usage-popup.component';
declare var $: any;

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css']
})
export class GasListComponent implements OnInit {
  users: Users = new Users();
  gasForm: FormGroup;
  public pageIndex: any;
  dataSource: any;
  selectedCustomer : any;
  totalElements = Number.MAX_SAFE_INTEGER;
  disableNextButton = false;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  keys = TableColumnData.GAS_KEYS;
  
  constructor(private loginService: LoginService,
    private router: Router,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    public readonly administrativeService : AdministrativeService,
  ) {
    this.dataListForSuggestions = [];
    this.users = this.loginService.getUser();
    this.adminFilter = JSON.parse(localStorage.getItem('usageHistoryFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null ) {
      this.adminFilter = new UsageHistoryFilter();
    }
  }
  private readonly subscriptions: Subscription = new Subscription();
  public adminFilter: UsageHistoryFilter;
  public dataListForSuggestions : any;

  ngOnInit() {
    this.scrollTop();
    this.setUpForm(this.adminFilter.formValue);
    this.search(this.adminFilter.page, false);
  }
  
  scrollTop() {
    window.scroll(0, 0);
  }

  setUpForm(event: any) {
    this.gasForm = this.fb.group({
      year: [event !== undefined && event !== null ? event.year : ''],
      month: [event !== undefined && event !== null ? event.month : ''],
    });
    if (this.users.role === 'ADMIN') {
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
          this.getGasList(force, userId, filter);
          }else{
            if(this.selectedCustomer != null){
              this.getGasList(force, this.selectedCustomer.userId, filter);
              this.gasForm.value.auditId = this.selectedCustomer.auditId;
              this.gasForm.value.customerName = this.selectedCustomer.user.name;
              this.setUpForm( this.gasForm.value);
              this.adminFilter.formValue = this.gasForm.value;
              localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));

            }
          }
        }, error =>{
           console.log(error);
        } 
      )
    );
  }

  findGasList(force: boolean, filter: any): void {
    this.adminFilter.formValue = this.gasForm.value;
    let userId = null;
    if(this.users.role == 'ADMIN'){
      if(this.gasForm.value.auditId !== '')
        this.findSelectedCustomer(force, filter);
    } else {
      userId = this.users.outhMeResponse.user.userId;
      this.getGasList(force, userId, filter);
    }
  }

  getGasList(force, userId, filter){
    this.usageHistoryService.loadGasList(force, userId, filter);
    this.subscriptions.add(this.usageHistoryService.getGasList().pipe(skipWhile((item: any) => !item))
    .subscribe((gasList: any) => {

    // if(gasList.data.length <10){
    //   this.disableNextButton = true;
    //   this.pageIndex = this.adminFilter.gasFilter.page.pageIndex-1;
    // } else {
      this.usageHistoryData.content = gasList.data;
      this.dataSource = this.usageHistoryData.content;
      this.disableNextButton = false;
    // }  
      })
      );
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    let params = new HttpParams()
      .set('type','gas')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
        .set('sortOrders[0].propertyName', ((event && event.sort &&  event.sort.active !== undefined ) && (event.sort.active = '') ? event.sort.active : 'year'))
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
    if (this.users.role !== 'USERS') {
      const dialogRef = this.dialog.open(GasUsagePopupComponent, {
        width: '70vw',
        height: '70vh',
        data: {event},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        if(!result)
          this.search(undefined,true);
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
}
