import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminFilter } from 'src/app/models/filter-object';
import { LoginService } from 'src/app/services/login.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-user-report-preview',
  templateUrl: './user-report-preview.component.html',
  styleUrls: ['./user-report-preview.component.css']
})
export class UserReportPreviewComponent implements OnInit, OnDestroy {
  id: any;
  contentForm: FormGroup;
  currentSelectedCustomer : any;
  errorMessage: string;
  public showHTML : boolean = false;
  public adminFilter : AdminFilter;
  public userReportPreviewData : any;
  public dataListForSuggestions : Array<any> = [];
  private readonly subscriptions: Subscription = new Subscription();
  private subject$ : Subject<any> = new Subject();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly loginService : LoginService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.adminFilter = AppUtility.checkForAdminFilter('userReportPreview');
  }


  ngOnInit() {
    this.setForm(undefined);
    AppUtility.scrollTop();
    this.findCustomer();
  }

  setForm(event: any) {
    this.contentForm = this.formBuilder.group({
      auditId: [event !== undefined ? event.auditId : ''],
      customerName: [event !== undefined ? event.customerName : ''],
      showHtml: [event !== undefined ? event.showHtml : ''],
    });
  }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.contentForm.value.auditId !== undefined ? this.contentForm.value.auditId : '')
      .set('customerName',this.contentForm.value.customerName !== undefined ? this.contentForm.value.customerName :'')
      .set('useLike','true');
  }

  findCustomerByAuditIdOrCustomerName(calledBy){
    let filters =  this.filterForCustomer();
    
    if(filters.get('auditId').length < 4 && filters.get('customerName').length < 4)
      return null;
    
    if(calledBy == 'auditId'){
      filters = filters.delete('customerName');
    }else{
      filters = filters.delete('auditId');
    }

    filters = AppUtility.addNoLoaderParam(filters);
    this.subject$.next(filters);
  }

  selectedSuggestion(event : any){
    this.currentSelectedCustomer = event;
    this.contentForm.get('customerName').setValue(this.currentSelectedCustomer.user.name)
    this.contentForm.get('auditId').setValue(this.currentSelectedCustomer.auditId);
    this.getuserReportPreview(this.currentSelectedCustomer.customerId);
  }

  getuserReportPreview(customerId : number) : void {

    const params : HttpParams = new HttpParams().append('customerId',customerId.toString());
    
    this.subscriptions.add(
      this.loginService.performGetWithParams(
        AppUtility.endPointGenerator([AppConstant.userReports,this.id,AppConstant.preview]),params)
      .subscribe((response : any) =>{

        if(response.errorMessage){
          this.errorMessage = response.errorMessage;
          this.userReportPreviewData = undefined;
          const mailContentFrame = document.getElementById('ifrmMailContent') as any;
          mailContentFrame.contentDocument.body.textContent = '';
          return;
        }

      this.errorMessage = undefined;

      this.userReportPreviewData = response.data;
      this.adminFilter.userReportPreview = 
                    { customerId : this.currentSelectedCustomer.customerId,
                    auditId : this.currentSelectedCustomer.auditId,
                    user : {name : this.currentSelectedCustomer.user.name, }}
      localStorage.setItem('adminFilter',JSON.stringify(this.adminFilter));
      this.showHideHTML();       

      },(error : any) =>{
        console.error(error);
      })
    )
  }

  showHideHTML(){

    if(!this.userReportPreviewData)
      return;

    const userReportPreview = document.getElementById('ifrmMailContent') as any;
    if(this.showHTML){
        userReportPreview.contentDocument.body.textContent = this.userReportPreviewData.content;
    }else{
        userReportPreview.contentDocument.body.innerHTML = this.userReportPreviewData.content;
    }
  }

  findCustomer(){
    this.subscriptions.add(this.subject$
      .pipe(
       debounceTime(AppConstant.debounceTime)  
      , distinctUntilChanged())
      .switchMap(filters => this.loginService.customerSuggestionListRequest(filters))
      .subscribe(
        (response) =>{
          this.dataListForSuggestions = response;
          if(this.dataListForSuggestions.length == 1){
            this.selectedSuggestion(this.dataListForSuggestions[0]);
          }
        }, error =>{
           console.log(error);
        }
      ));
  }

  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
