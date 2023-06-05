import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, skipWhile } from 'rxjs/operators';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-mail-description-preview',
  templateUrl: './mail-description-preview.component.html',
  styleUrls: ['./mail-description-preview.component.css']
})
export class MailDescriptionPreviewComponent implements OnInit, OnDestroy {
  id: any;
  contentForm: FormGroup;
  mailType: any;
  customerList: any = [];
  users: Users = new Users();
  debugForm: FormGroup;
  errorMessage: any;
  subject$ : Subject<any> = new Subject();
  dataListForSuggestions = [];
  mailPreviewData : any;
  showHTML : boolean = false;
  sentToMailAddress : string = '';
  currentSelectedCustomer : any;
  adminFilter : any;
  mailDescriptionId : number;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly mailService: MailService,
    private readonly administrativeService: AdministrativeService,
    private readonly loginService: LoginService,
    private readonly utilityService: UtilityService,
    private readonly location: Location,
    private readonly router : Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.mailDescriptionId = this.id;
    });

    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    this.users = this.loginService.getUser();
    this.customerList = this.users.searchUserList;

  }


  ngOnInit() {
    this.loadMailType();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.mailService.loadMailDescriptionById(this.id);
      this.loadMailDescriptionById();
    }
    this.findCustomer();

    this.setForm(this.adminFilter.mailPreview);
    this.currentSelectedCustomer = this.adminFilter.mailPreview;
    this.getMailPreviewById();
    this.loadMailPreviewbyId(this.adminFilter.mailPreview.customerId);

  }

  scrollTop() {
    window.scroll(0, 0);
  }


  loadMailDescriptionById() {
    this.subscriptions.add(this.mailService.getMailDescriptionById().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescription: any) => {
        this.scrollTop();
        // this.setForm(mailDescription.data);
      }));
  }

  loadMailType() {
    this.mailService.loadMailDescriptionList(true, '',true);
    this.subscriptions.add(this.mailService.getAllMailDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescriptionList: any) => {
        this.mailType = mailDescriptionList.data;
      }));
  }

  loadMailPreviewbyId(customerId : string){

    const params = new HttpParams()
                  .append('customerId',customerId);

    this.mailService.loadMailPreviewById(this.mailDescriptionId,params);
  }

  getMailPreviewById(){
    const self = this;
    this.subscriptions.add(
      this.mailService.getMailPreviewById()
      .pipe(filter(data => data && data.id == this.id))
      .subscribe(
        data =>{

          if(data.errorMessage){
              self.errorMessage = data.errorMessage;
              self.mailPreviewData = undefined;
              const mailContentFrame = document.getElementById('ifrmMailContent') as any;
              mailContentFrame.contentDocument.body.textContent = '';
              return;
          }

          this.errorMessage = undefined;

          self.mailPreviewData = data;
          self.adminFilter.mailPreview = 
                         { customerId : self.currentSelectedCustomer.customerId,
                         auditId : self.currentSelectedCustomer.auditId,
                         user : {name : self.currentSelectedCustomer.user.name, }}
          localStorage.setItem('adminFilter',JSON.stringify(self.adminFilter));
          self.showHideHTML();
        }
      )
    )
  }

  mailTypeChange(mailDescriptionId){
    this.mailDescriptionId = mailDescriptionId.target.value;            
    this.router.navigate([],{
      relativeTo: this.activateRoute,
      queryParams: {id : this.mailDescriptionId},
      queryParamsHandling : 'merge'
    });
    this.loadMailPreviewbyId(this.currentSelectedCustomer? this.currentSelectedCustomer.customerId : '');
  }


  showHideHTML(){

    if(!this.mailPreviewData)
      return;

    const mailContentFrame = document.getElementById('ifrmMailContent') as any;
    if(this.showHTML){
        mailContentFrame.contentDocument.body.textContent = this.mailPreviewData.mailContent;
    }else{
        mailContentFrame.contentDocument.body.innerHTML = this.mailPreviewData.mailContent;
    }
  }

  setForm(event: any) {
    this.contentForm = this.formBuilder.group({
      auditId: [event !== undefined && event.auditId ? event.auditId : ''],
      customerName: [event !== undefined && event.user.name ? event.user.name : ''],
      mailDescriptionId: [this.mailDescriptionId],
    });
  }

  back() {
    this.location.back();
  }

  search(event: any) {
    const params = new HttpParams()
      .set('filter.pageSize', '5')
      .set('filter.startRow', '0')
      .set('loadCustomers', 'true')
      .set('filter.customerName', '%' + event);
    this.getCustomerList(params);
  }

  getCustomerList(url: any) {
    this.subscriptions.add(this.administrativeService.loadCustomerList(url).pipe(skipWhile((item: any) => !item))
      .subscribe((customerList: any) => {
        this.customerList = customerList.administrativeManagement.customerList.list;
      }));
  }


  handleAutoComplete(event: any): any {
    this.users.searchUserList[0] = event.option.value;
    this.loginService.setUser(this.users);
    this.contentForm.controls['auditId'].setValue(event.option.value.auditId);
    this.contentForm.controls['customerName'].setValue(event.option.value.user.name);
    this.contentForm.controls['userId'].setValue(event.option.value.user.id);
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

  selectedSuggestion(event : any){
      this.currentSelectedCustomer = event;
      this.contentForm.get('customerName').setValue(this.currentSelectedCustomer.user.name)
      this.contentForm.get('auditId').setValue(this.currentSelectedCustomer.auditId);
      this.loadMailPreviewbyId(this.currentSelectedCustomer.customerId);
  }

  save(): any { }

  delete(): any { }

  sendMailToAddress(): any { 

    const params = new HttpParams()
          .append('customerId',this.currentSelectedCustomer.customerId)
          .append('sendTo',this.sentToMailAddress);

    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(
      this.loginService.performPostWithParam
      ({}, AppConstant.mailDescription + '/' + this.id +  '/' + AppConstant.sendPreview,params)
      .subscribe(
        (response) =>{
          document.getElementById('loader').classList.remove('loading');
          console.log(response);
        }, error=>{
          document.getElementById('loader').classList.remove('loading');
          this.utilityService.showErrorMessage(error.error.message);
        }
      )
    )
  }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
