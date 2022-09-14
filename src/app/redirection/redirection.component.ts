import { UsageHistoryFilter } from 'src/app/models/filter-object';
import { AdminFilter } from './../models/filter-object';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { TopicHistoryComponent } from 'src/app/survey/topichistory.component';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Users } from '../models/user';
import { AppConstant } from '../utility/app.constant';

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.css']
})
export class RedirectionComponent implements OnInit {

  private customerId : string;
  private surveyId : string;
  private paneCode : string;
  private surveyCode : string;
  private subscriptions :Subscription = new Subscription();
  private users:Users;

  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private loginService: LoginService,
    private location: Location)
    {
      this.users = this.loginService.getUser();
      this.activatedRoute.queryParams.subscribe(
        params =>{
          this.customerId =  params['customerId'];
          this.surveyId = params['surveyId'];
          this.paneCode = params['paneCode'];
          this.surveyCode = params['surveyCode'];
        }
      )

     }

  ngOnInit() {

    if(this.surveyCode && this.customerId && this.paneCode && this.surveyId ){

      this.performOuthMe();

      this.subscriptions.add(this.loginService.performGet(AppConstant.customer + '/' + Number.parseInt(this.customerId)).
      pipe(skipWhile((item: any) => !item))
      .subscribe((customer: any) => {
        this.users.outhMeResponse = customer;
        this.users.theme = customer.customerGroup.theme;
        this.users.recommendationStatusChange = true;
        this.users = this.loginService.setUser(this.users);
        // this.getAllSurvey();
      }));



    }else{
      this.loginService.logout(); 
    }
     
  }

  goToTopicPage(surveyId, paneCode, surveyCode, index,customerId?:string) {
    document.getElementById('loader').classList.add('loading');
    const object = {};
    this.loginService.performPostMultiPartData(object, 'customers/' + customerId + '/surveys/' + surveyCode + '/' + surveyId + '/panes/' + paneCode).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
        if (response.errorCode == null && response.errorMessage == null) {
          this.users.currentPaneNumber = response.data;
          this.users.paneNumber = index;
          this.users.isDashboard = false;
          this.users =  this.loginService.setUser(this.users);
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
        this.users =  this.loginService.setUser(this.users);
        this.goToTopicPage(this.surveyId,this.paneCode,this.surveyCode,0,this.customerId);
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  performOuthMe() {
    this.loginService.performGetMultiPartData('oauth/me').subscribe(
      (data) => {
        const response = JSON.parse(JSON.stringify(data));
        if(this.users && this.users.userId != response.userId ){
          this.users.lastVisitedURL = undefined;
          this.users.currentPaneNumber = undefined;
          localStorage.setItem('adminFilter', JSON.stringify(new AdminFilter()));
          localStorage.setItem('usageHistoryFilter', JSON.stringify(new UsageHistoryFilter()));
        }
          this.performGetUserRole(response.userId);
      },
      (error) => {
        const response = JSON.parse(JSON.stringify(error));
        console.log(response);
        // this.errorMessage = response.error_description;
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
  performGetUserRole(userId: any) {
    this.loginService
      .performGetMultiPartData('users/' + userId + '/roles')
      .subscribe(
        (data) => {
          const response = JSON.parse(JSON.stringify(data));
          for (const roles of response) {
            if (roles.roleCode !== 'USERS') {
              this.users.role = roles.roleCode;
              this.users.userId = userId;
              this.users.allSurveyCheck = true;
              this.users = this.loginService.setUser(this.users);
              this.getUserById(userId);
              break;
            }
          }
          if (this.users.role === 'USERS') {
            this.postGetCustomerData(userId, 'USERS');
          }
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.postGetCustomerData(userId, 'USERS');
          // this.errorMessage = response.error_description;
          // document.getElementById('loader').classList.remove('loading');
        }
      );
  }
  getUserById(userId: any) {
    this.loginService
      .performGetMultiPartData('users/' + userId)
      .subscribe(
        (data) => {
          const response = JSON.parse(JSON.stringify(data));
          if(!this.users.outhMeResponse)
            this.users.outhMeResponse = { user: response };
          this.users.userData = response;
          this.users.name = response.name;
          this.users = this.loginService.setUser(this.users);
          this.getAllSurvey();

        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          // this.errorMessage = response.error_description;
          document.getElementById('loader').classList.remove('loading');
        }
      );
  }

  postGetCustomerData(userId: any, role: string) {
    document.getElementById('loader').classList.add('loading');
    this.loginService
      .performPostMultiPart('customers/current/' + userId)
      .subscribe(
        (data) => {
          const response = JSON.parse(JSON.stringify(data));
          if (response.errorMessage == null) {
            this.users.outhMeResponse = response;
            this.users.theme = this.users.outhMeResponse.customerGroup.theme;
            this.users.name = response.user.name;
            this.users.role = role;
            this.users = this.loginService.setUser(this.users);
            if (role === 'USERS') {
              this.getAllSurvey();
            }
          } else {
            // this.errorMessage = response.errorMessage;
          }
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          // this.errorMessage =
          //   response.error.errorMessage +
          //   '<br>Your new account registration is in process.';
          document.getElementById('loader').classList.remove('loading');
        }
      );
  }

}
