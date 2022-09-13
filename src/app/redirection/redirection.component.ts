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
      let loginComponent = new LoginComponent(this.router,this.activatedRoute,this.loginService,this.location);
      loginComponent.setRequestType('redirection');
      loginComponent.performOuthMe();

      this.subscriptions.add(this.loginService.performGet(AppConstant.customer + '/' + Number.parseInt(this.customerId)).
      pipe(skipWhile((item: any) => !item))
      .subscribe((customer: any) => {
        this.users.outhMeResponse = customer;
        this.users.theme = customer.customerGroup.theme;
        this.users.recommendationStatusChange = true;
        this.loginService.setUser(this.users);
      }));
  
      let topicHistory = new TopicHistoryComponent(this.loginService,this.router,this.location);
      topicHistory.goToTopicPage(this.surveyId,this.paneCode,this.surveyCode,0,this.customerId);
    }else{
      this.loginService.logout(); 
    }
     
  }
}
