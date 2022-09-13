import { TopicHistoryComponent } from 'src/app/survey/topichistory.component';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private loginService: LoginService,
    private location: Location, 
    )
    {
      console.log('works my child');
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
  
      let topicHistory = new TopicHistoryComponent(this.loginService,this.router,this.location);
      topicHistory.goToTopicPage(this.surveyId,this.paneCode,this.surveyCode,0,this.customerId);
    }else{
      this.loginService.logout(); 
    }
     
  }
}
