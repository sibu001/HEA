import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ElementRef, ViewChild, Renderer } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'leaklistview',
  templateUrl: './leakListview.component.html',
  styleUrls: ['./leakListview.component.css']
})
export class leakListViewComponent implements OnInit, AfterViewInit {
  @ViewChild('inp') inp: ElementRef;
  users: Users = new Users();
  constructor(private location: Location, private router: Router, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    for (let i = 0; i < this.users.leakList.length; i++) {
      this.users.leakList[i].flag = true;
    }
    if (this.users.isLeakChange) {
      this.getLeaksAndRecommendation();
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.users.leakFocusId){
      try {
        document.getElementById('leak' + this.users.leakFocusId).scrollIntoView();
        setTimeout(() =>{
          window.scrollTo(0,document.documentElement.scrollTop- 100);
        },100)
      } catch (e) {
        console.error(e)
       }
    }else{
      this.scrollTop();
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  back() {
    this.location.back();
  }

  getLeaksAndRecommendation() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys/' + this.users.currentPaneNumber.survey.surveyId + '/leaks').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.users.leakList = response.data;
        this.users.isLeakChange = false;
        this.loginService.setUser(this.users);
        for (let i = 0; i < this.users.leakList.length; i++) {
          this.users.leakList[i].flag = true;
        }
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }

  surveyRecommendationList(number) {
    this.users.recommendationNo = number;
    this.loginService.setUser(this.users);
    this.router.navigate(['/surveyRecommendationList']);

  }
  leakHelp(id, priceValue, takebackValue, takebackLabel) {
    this.sendMailForHelp(priceValue, takebackValue, takebackLabel);
    this.users.leakList[id].flag = false;
  }

  sendMailForHelp(priceValue, takebackValue, takebackLabel) {
    const content = 'toAddress=support@hea.com&fromAddress=' + this.users.outhMeResponse.user.email + '&subject=Request for Leak help, audit '
      + this.users.outhMeResponse.auditId + '&subjectCharset=utf-8&bodyContent=Leak:' + takebackLabel + ' <br> Size:' + takebackValue + ' watts and $' +
      priceValue + ' wasted a year <br> User: ' + this.users.outhMeResponse.user.name + ' ' + this.users.outhMeResponse.user.email + ' ' + this.users.outhMeResponse.phoneNumber + '&bodyCharset=utf-8&contentType=text/html';
    this.loginService.performGetMultiPartData('sendMail.do?' + content).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
}
