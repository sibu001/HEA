import { Component, HostListener, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AppUtility } from '../utility/app.utility';
import { AppConstant } from '../utility/app.constant';

@Component({
  selector: 'topic-history',
  templateUrl: './topichistory.component.html',
  styleUrls: ['./topichistory.component.css']
})
export class TopicHistoryComponent implements OnInit {
  hide = true;
  users: Users = new Users();
  public customer : any = { user : { name : ''}, auditId : ''};
  private readonly subscriptions: Subscription = new Subscription();
  subject$ : Subject<any> = new Subject();
  public isTopicGotSkipped : boolean = false;
  dataListForSuggestions = [];
  public allowedMenuListforUser;
  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    this.customer = this.users.outhMeResponse;
    this.allowedMenuListforUser = this.users.allowedMenuList;
    this.findCustomer();
  }

  ngOnInit() {
    let surveyCode;

    this.users.isSurvey = false;
    if (this.users.allSurveyCheck) {
      this.users.surveyList = new Array;
      this.getAllSurvey();
      this.checkSkippedSurveys();
    } else {
      this.users.allSurveyCheck = false;
      this.loginService.setUser(this.users);
      this.isTopicGotSkipped = this.users.surveyList.find((survey) => survey.skipped);
    }

    if (this.users.currentPaneNumber) {
      surveyCode = this.users.currentPaneNumber.survey.surveyDescription.surveyCode;
      // if (this.users.role === 'USERS' && (this.users.surveyLength <= 3 || (this.users.currentPaneNumber !== undefined ? surveyCode === 'Profile' : false))) {
      if (this.users.role === 'USERS' && (this.users.surveyLength <= 3)) {
        this.router.navigate(['surveyView']);
      }
    }
    AppUtility.scrollTop();
  }

  checkSkippedSurveys(){
    this.subscriptions.add(
      this.loginService
      .performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys/nextSurvey')
      .subscribe((response : any ) =>{
          this.users.nextSurvey = response.data;
          this.loginService.setUser(this.users);
      })
    );
  }

  goToTopicPage(surveyId, paneCode, surveyCode, index,customerId?:string) {
    document.getElementById('loader').classList.add('loading');
    const object = {};
    customerId = this.users && this.users.outhMeResponse && this.users.outhMeResponse.customerId ? this.users.outhMeResponse.customerId :customerId  
    this.loginService.performPostMultiPartData(object, 'customers/' + customerId + '/surveys/' + surveyCode + '/' + surveyId + '/panes/' + paneCode).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
        if (response.errorCode == null && response.errorMessage == null) {
          this.users.currentPaneNumber = response.data;
          this.users.paneNumber = index;
          this.users.isDashboard = false;
          this.loginService.setUser(this.users);
          this.router.navigate(['surveyView']);
        }

      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
  getAllSurvey() {
    document.getElementById('loader').classList.add('loading');
    this.users.surveyCode = new Array;
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        for (const surveyCodeList of response.data) {
          this.users.surveyCode.push(surveyCodeList.surveyDescription.surveyCode);
        }
        document.getElementById('loader').classList.remove('loading');
        const surveyLength = Object.keys(response.data).length;
        this.users.surveyLength = surveyLength;
        this.users.surveyList = response.data;
        this.users.allSurveyCheck = false;
        this.loginService.setUser(this.users);
        this.isTopicGotSkipped = this.users.surveyList.find((survey) => survey.skipped);
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  back() {
    if (this.users.role === 'USERS') {
      this.location.back();
    } else {
      this.router.navigate(['admin/customer']);
    }
  }

    // search functionality for customer

    findCustomerByAuditIdOrCustomerName(calledBy, value){
   
      let filters = new HttpParams();
      
      if(calledBy == 'auditId'){
        filters = filters.set('auditId',value);
        this.customer.user.name = '';
      }else{
        filters = filters.set('customerName',value);
        this.customer.auditId = '';
      }
      filters = filters.set('useLike','true');

      filters = AppUtility.addNoLoaderParam(filters)
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
            if(response)
              this.dataListForSuggestions = response.slice(0,100);
            if(this.dataListForSuggestions.length == 1){
              this.selectedSuggestion(this.dataListForSuggestions[0]);
              this.dataListForSuggestions = [];
            }
          }, error =>{
             console.log(error);
          }
        ));
  }
  
  selectedSuggestion(event : any){
  
    this.customer = event;
    this.users.outhMeResponse = this.customer;
    this.users.theme = this.customer.customerGroup.theme;
    this.users.recommendationStatusChange = true;
    this.users.allSurveyCheck = true;
    this.loginService.setUser(this.users);
  
    this.ngOnInit();
  
  }
  
}
