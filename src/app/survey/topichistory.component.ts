import { Component, OnInit } from '@angular/core';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'topic-history',
  templateUrl: './topichistory.component.html',
  styleUrls: ['./topichistory.component.css']
})
export class TopicHistoryComponent implements OnInit {
  hide: boolean = true;
  users: Users = new Users();

  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    if (this.users.allSurveyCheck) {
      this.users.surveyList = new Array;
      this.getAllSurvey();
    } else {
      this.users.allSurveyCheck = false;
      this.loginService.setUser(this.users);
    }
  }

  ngOnInit() {
    let surveyCode;
    if (this.users.currentPaneNumber != undefined) {
      surveyCode = this.users.currentPaneNumber.survey.surveyDescription.surveyCode;
      if (this.users.surveyLength <= 3 || (this.users.currentPaneNumber != undefined ? surveyCode == "Profile" : false)) {
        this.router.navigate(['surveyView']);
      }
    }
}

goToTopicPage(surveyId, paneCode, surveyCode, index) {
  document.getElementById("loader").classList.add('loading');
  var object = {};
  this.loginService.performPostMultiPartData(object, "customers/" + this.users.outhMeResponse.customerId + "/surveys/" + surveyCode + "/" + surveyId + "/panes/" + paneCode).subscribe(
    data => {
      let response = JSON.parse(JSON.stringify(data));
      console.log(response);
      document.getElementById("loader").classList.remove('loading');
      if (response.errorCode == null && response.errorMessage == null) {
        this.users.currentPaneNumber = response.data;
        this.users.paneNumber = index;
        this.loginService.setUser(this.users);
        this.router.navigate(['surveyView']);
      }

    },
    errors => {
      console.log(errors);
      let response = JSON.parse(JSON.stringify(errors))._body;
      document.getElementById("loader").classList.remove('loading');
    }
  );
}
getAllSurvey() {
  document.getElementById("loader").classList.add('loading');
  this.users.surveyCode = new Array;
  this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/surveys").subscribe(
    data => {
      let response = JSON.parse(JSON.stringify(data));
      for (let surveyCodeList of response.data) {
        this.users.surveyCode.push(surveyCodeList.surveyDescription.surveyCode);
      }
      document.getElementById("loader").classList.remove('loading');
      var surveylength = Object.keys(response.data).length;
      this.users.surveyLength = surveylength;
      this.users.surveyList = response.data;
      this.users.allSurveyCheck = false;
      this.loginService.setUser(this.users);
    },
    error => {
      let response1 = JSON.stringify(error);
      let response = JSON.parse(response1);
      document.getElementById("loader").classList.remove('loading');
    }
  );
}
back() {
  this.location.back();
}
}
