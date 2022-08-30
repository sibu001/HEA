import { Component, HostListener, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'topic-history',
  templateUrl: './topichistory.component.html',
  styleUrls: ['./topichistory.component.css']
})
export class TopicHistoryComponent implements OnInit {
  hide = true;
  users: Users = new Users();
  backUpSurveyListForBigScreen: Array<any>;

  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    this.users.isSurvey = false;
    if (this.users.allSurveyCheck) {
      this.users.surveyList = new Array;
      this.getAllSurvey();
    } else {
      this.users.allSurveyCheck = false;
      this.loginService.setUser(this.users);
      this.backUpSurveyListForBigScreen = [...this.users.surveyList];
      this.checkForUserFeedBackInSmallScreen(this.users.surveyList);
    }
  }

  ngOnInit() {
    let surveyCode;
    if (this.users.currentPaneNumber) {
      surveyCode = this.users.currentPaneNumber.survey.surveyDescription.surveyCode;
      if (this.users.role === 'USERS' && (this.users.surveyLength <= 3 || (this.users.currentPaneNumber !== undefined ? surveyCode === 'Profile' : false))) {
        this.router.navigate(['surveyView']);
      }
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const surveyList = this.users.surveyList;
    console.log(window.innerWidth);
    if(window.innerWidth <= 900){
      const lastSurvey = surveyList[surveyList.length-1];
      if(lastSurvey && lastSurvey.surveyDescription.surveyCode == 'Feedback') {
        surveyList.pop();
      }
    }else{
      this.users.surveyList = this.backUpSurveyListForBigScreen;
    }  
  
  }

  goToTopicPage(surveyId, paneCode, surveyCode, index) {
    document.getElementById('loader').classList.add('loading');
    const object = {};
    this.loginService.performPostMultiPartData(object, 'customers/' + this.users.outhMeResponse.customerId + '/surveys/' + surveyCode + '/' + surveyId + '/panes/' + paneCode).subscribe(
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
        this.checkForUserFeedBackInSmallScreen(this.users.surveyList);
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  checkForUserFeedBackInSmallScreen(surveyList :any){

    this.backUpSurveyListForBigScreen = [...surveyList];
    if(window.innerWidth <= 900){
      const lastSurvey = surveyList[surveyList.length-1];
      if(lastSurvey && lastSurvey.surveyDescription.surveyCode == 'Feedback') {
        surveyList.pop();
      }
    }
  }

  back() {
    if (this.users.role === 'USERS') {
      this.location.back();
    } else {
      this.router.navigate(['admin/customer']);
    }
  }
}
