import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { LoginService } from "src/app/services/login.service";
import { Users } from "src/app/models/user";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'accountDetail',
  templateUrl: './accountDetail.component.html',
  styleUrls: ['../survey/topichistory.component.css']
})
export class AccountDetailComponent implements OnInit {
   @ViewChild('inp1') inp1: ElementRef;
  helpHide:boolean;
  helpHide1:boolean;
  helpHide2:boolean;
  customerCredentialsList: any[] = [];
  users: Users = new Users();
  constructor(private loginService: LoginService,private renderer: Renderer, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    console.log(this.users);
    this.getcustomerCredentials();
  
  }

  ngOnInit() {
    this.renderer.invokeElementMethod(this.inp1.nativeElement, 'focus');
  }
  edit(number){
    var surveyCode,surveyId,paneCode
    if(number==1){
       surveyCode=this.users.surveyList[1].surveyDescription.surveyCode;
       surveyId=this.users.surveyList[1].surveyId;
       paneCode=this.users.surveyList[1].panes[1].paneCode;
    }else  if(number==3){
       surveyCode=this.users.surveyList[1].surveyDescription.surveyCode;
       surveyId=this.users.surveyList[1].surveyId;
       paneCode=this.users.surveyList[1].panes[2].paneCode;
    }else  if(number==2){
       surveyCode="Water";
       surveyId=this.users.surveyList[8].surveyId;
       paneCode="w_Intro";
    }

  // goToTopicPage(surveyId, paneCode, surveyCode,index) {
     document.getElementById("loader").classList.add('loading');
    var object = {};
    this.loginService.performPostMultiPartData(object, "customers/" + this.users.outhMeResponse.customerId + "/surveys/" + surveyCode + "/" + surveyId + "/panes/" + paneCode).subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById("loader").classList.remove('loading');
        if (response.errorCode == null && response.errorMessage == null) {
          this.users.currentPaneNumber = response.data;
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
  getcustomerCredentials() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/credentials").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.customerCredentialsList=response;
         console.log(response);
        document.getElementById("loader").classList.remove('loading');
      
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
   postCustomerData() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performPostMultiPartDataPost(this.users.outhMeResponse,"customers/current/"+this.users.outhMeResponse.userId).subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
         console.log(response);
        document.getElementById("loader").classList.remove('loading');
      
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
  }

