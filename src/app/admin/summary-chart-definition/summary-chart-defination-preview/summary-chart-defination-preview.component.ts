import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skip } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { AppConstant } from 'src/app/utility/app.constant';

@Component({
  selector: 'app-summary-chart-defination-preview',
  templateUrl: './summary-chart-defination-preview.component.html',
  styleUrls: ['./summary-chart-defination-preview.component.css']
})
export class SummaryChartDefinationPreviewComponent implements OnInit {

  private subscriptions : Subscription = new Subscription();
  public previewForm : FormGroup;
  public customerGroupList : Array<any> = [];
  public placeList : Array<any> = [];
  public programGroupList : Array<any> = [];
  public statusData : Array<any> = TableColumnData.STATUS_DATA;
  public summaryChartId : string = '0';
  public customer : any = null;
  public currentCustomerIndex : number = 0;
  public customerListData = {
    content : [],
    totalSize : 0,
    pageSize : Number.parseInt(AppConstant.pageSize),
    pageIndex : 0,
    prevStartRow : 0,
    nextStartRow : 0,
    startRow :0,
    currentpageAction : 'next',
  };

  @ViewChild('contentDiv') contentDiv : ElementRef;

  constructor(
    private readonly formBuilder : FormBuilder,
    private readonly systemService : SystemService,
    private readonly location : Location,
    private readonly router : Router,
    private readonly activatedRoute : ActivatedRoute,
    private readonly customerService : CustomerService,
    private readonly systemUtilityService : SystemUtilityService,
    private readonly loginService : LoginService
    ) { 
      this.subscriptions.add(
        this.activatedRoute.queryParams
        .subscribe((params : any) =>{
            this.summaryChartId = params['summaryChartId'];
        })
      )
    }

  ngOnInit() {
    this.setForm(undefined);
    this.getPlaceList(new HttpParams());
    this.getCustomerGroupList(new HttpParams());
    this.getProgramList(new HttpParams());
    this.getCustomer();
    // this.loadCustomer('next',true);
    AppUtility.scrollTop();
  }

  setForm(event : any){
    this.previewForm = this.formBuilder.group({
      auditId : [''],
      customerGroupId : [''],
      customerName : [''],
      customerPlace : [''],
      customerEmail : [''],
      program : [''],
      status : ['']
    })
  }

  getCustomerGroupList(params : HttpParams){
    this.systemService.loadCustomerGroupList(false, params);
    this.subscriptions.add(
      this.systemService.getCustomerGroupList()
      .pipe(filter((item: any) => item))
      .subscribe((data : any) =>{
        this. customerGroupList  = data;
      })
    )
 
  }

  getPlaceList(params : HttpParams){
    this.systemUtilityService.loadPlaceList(false, params);
    this.subscriptions.add(this.systemUtilityService.getPlaceList().pipe(filter((item: any) => item))
      .subscribe((placeList: any) => {
        this.placeList = placeList;
      }));
  }

  getProgramList(params : HttpParams){
    this.systemService.loadProgramGroupsList(false, params);
    this.subscriptions.add(
      this.systemService.getProgramGroupList()
      .pipe(filter((item: any) => item))
      .subscribe((programGroupList: any) => {
        this.programGroupList = programGroupList;
    }));
  }

  back(){
    this.router.navigate(['/admin/summaryChartDefinition/summaryChartDefinitionEdit'], 
      { queryParams: { id : this.summaryChartId}});
  }

  loadCustomer(action : string, indexToZero : boolean){

    const params = new HttpParams()
      .append('filter.pageSize',this.customerListData.pageSize.toString())
      // .append('filter.startRow', '0')
      .append('filter.startRow',  ( indexToZero ? '0' 
        : ( action == 'next' ? 
          this.customerListData.nextStartRow.toString()
          : this.customerListData.prevStartRow.toString() )
      ))
      .append('filter.disableTotalSize','false')
      .append('loadCustomers','true')
      .append('filter.setupReportKey', 'true')
      .append('filter.customerGroupId',this.previewForm.value.customerGroupId)
      .append('filter.programGroupId',this.previewForm.value.program)
      .append('filter.customerName',this.previewForm.value.customerName)
      .append('filter.placeCode',this.previewForm.value.customerPlace)
      .append('filter.customerEmail',this.previewForm.value.customerEmail)
      .append('filter.user.status',this.previewForm.value.status)
      .append('filter.auditId',this.previewForm.value.auditId);

    this.customerListData.currentpageAction = action;

    this.customerService.loadCustomerList(true,params,-1);
  }

  getCustomer(){
    this.subscriptions.add(
      this.customerService.getCustomerList()
      .pipe(skip(1),filter((data : any) => data))
      .subscribe((customerList: any) =>{
        this.customerListData.content = customerList.list;
        this.customerListData.startRow = customerList.startRow;
        this.customerListData.totalSize = customerList.totalSize;
        this.customerListData.nextStartRow = Number(customerList.startRow + this.customerListData.pageSize);
        this.customerListData.prevStartRow = this.customerListData.startRow == 0 ? 0 
          : ( this.customerListData.startRow - this.customerListData.pageSize );


        if(customerList.list.length == 0) {
          this.customer = null;
          return;
        }

        //  checking if new page request is for next or previous page.
        if(this.customerListData.currentpageAction == 'next'){
          // if for next page then increase page index and display data of customer on 0 index in response list.
          this.customerListData.pageIndex = customerList.startRow;
          this.customer = customerList.list[0];
        }else{
          // if for previous page then decrease page index and display data of customer on length-1 index in response list.
          this.customerListData.pageIndex = customerList.startRow + this.customerListData.pageSize - 1;
          this.customer = customerList.list[ this.customerListData.pageIndex % this.customerListData.pageSize];
        }
        this.show();
      })
    )
  }

  show(){

    const params : HttpParams = new HttpParams()
        .append('customerId', this.customer.customerId.toString())
        .append('summaryChartId', this.summaryChartId);

    this.subscriptions.add(
      this.loginService.performGetWithParams('showSummaryChart.do',params)
      .subscribe( (response : any) =>{
        console.log(response);
      },(error : any) =>{
        console.log(error.error.text);
        this.contentDiv.nativeElement.innerHTML = error.error.text;
      })
    )
  }

  pageAction(action : string){

    // request for next page.
    if(action == 'next'){

      //  checking if more customer exists in customer list of not.
      if(this.customerListData.pageIndex < this.customerListData.nextStartRow - 1){

        // if more customer exists in the list then using next customer in the list to call showSummarChart Service.
        this.customerListData.pageIndex++;
        this.customer = this.customerListData.content[this.customerListData.pageIndex % this.customerListData.pageSize];

        this.show();

      }else{

        //  load more customers if all of them were visited
        this.loadCustomer('next',false);
      }

    }else{

    // request for previous page.
    // if more customer exists in the list then using next customer in the list to call showSummarChart Service.
      if(this.customerListData.pageIndex > this.customerListData.startRow){

        this.customerListData.pageIndex--;
        this.customer = this.customerListData.content[this.customerListData.pageIndex % this.customerListData.pageSize];

        this.show();

      }else{

        //  load more customers if all of them were visited
        this.loadCustomer('prev', false);
      }

    }
  }


  get f() { return this.previewForm.controls; }

  highlightErrorField(formControlName : string) : boolean {
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
