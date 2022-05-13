import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { UsageHistoryFilter } from 'src/app/models/filter-object';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { GasUsagePopupComponent } from '../gas-usage-popup/gas-usage-popup.component';
@Component({
  selector: 'app-gas-charge',
  templateUrl: './gas-charge.component.html',
  styleUrls: ['./gas-charge.component.css']
})
export class GasChargeComponent implements OnInit {
  users: Users = new Users();
  gasForm: FormGroup;
  dataSource: any;
  public pageIndex: any;
  usageHistoryData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };
  selectedCustomer = null;
  dataListForSuggestions = null;
  keys = TableColumnData.GAS_KEYS;
  constructor(private loginService: LoginService,
    private router: Router,
    private readonly usageHistoryService: UsageHistoryService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog) {
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
    this.scrollTop();
  }
  
  scrollTop(){
    window.scrollTo(0, 0);
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

  getGasList(force: boolean,userId: string, filter: any): void {
    this.adminFilter.formValue = this.gasForm.value;
    localStorage.setItem('usageHistoryFilter', JSON.stringify(this.adminFilter));
    this.usageHistoryService.loadGasList(force, userId, filter);
    this.subscriptions.add(this.usageHistoryService.getGasList().pipe(skipWhile((item: any) => !item))
      .subscribe((gasList: any) => {
        this.usageHistoryData.content = gasList.data;
        // this.usageHistoryData.totalElements = this.adminFilter.totalElement + gasList.data.length + 1;
        // this.adminFilter.totalElement = this.adminFilter.totalElement + gasList.data.length + 1;
        this.dataSource = [...this.usageHistoryData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    this.adminFilter.page = event;
    this.pageIndex = (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
      Number(event.pageIndex) + '' : 0);
    const params = new HttpParams()
      .set('type', 'gasCharge')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortOrders[0].propertyName', (event && event.sort && event.sort.active !== undefined && event.sort.active !== '' ? event.sort.active : 'year'))
      .set('sortOrders[0].asc', (event && event.sort && event.sort.direction !== undefined ? (event.sort.direction === 'asc' ? 'true' : 'false') : 'false'))
    .set('year', (this.gasForm.value.year !== null ? this.gasForm.value.year : ''))
      .set('month', (this.gasForm.value.month !== null ? this.gasForm.value.month : ''));
    if (this.users.role === 'ADMIN') {
      params.set('auditId', this.gasForm.value.auditId !== null ? this.gasForm.value.auditId : '');
      params.set('customerName', this.gasForm.value.customerName !== null ? this.gasForm.value.customerName : '');
    }
    this.findGasList(true, params);
  }

  get f() { return this.gasForm.controls; }

  showPopUp(): any {
    if (this.users.role !== 'USERS') {
      const dialogRef = this.dialog.open(GasUsagePopupComponent, {
        width: '70vw',
        height: '70vh',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed' + result);
      });
    }
  }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.gasForm.value.auditId !== undefined ? this.gasForm.value.auditId : '')
      .set('customerName',this.gasForm.value.customerName !== undefined ? this.gasForm.value.customerName :'')
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

  selectedSuggestion(event : any, select : string){
    if(select == 'auditId')
      this.gasForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    else {
      this.gasForm.get('auditId').setValue(event.option.value);
      this.gasForm.get('customerName').setValue(event.option._element.nativeElement.outerText)
    }
  }

}
