import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ElementRef, ViewChild, Renderer } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AppUtility } from '../utility/app.utility';
import { Subscription, fromEvent } from 'rxjs';
import { SubscriptionUtil } from '../utility/subscription-utility';
import { AppConstant } from '../utility/app.constant';
import { take } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'leaklistview',
  templateUrl: './leakListview.component.html',
  styleUrls: ['./leakListview.component.css']
})
export class leakListViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inp') inp: ElementRef;
  users: Users = new Users();
  private customerId : number;
  private subscriptions: Subscription = new Subscription();
  constructor(private location: Location, private router: Router, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    this.customerId = this.users.outhMeResponse.customerId;
    for (let i = 0; i < this.users.leakList.length; i++) {
      this.users.leakList[i].flag = true;
    }

  }

  ngOnInit() {
    fromEvent(window,'beforeunload')
    .pipe(take(1))
    .subscribe((event : any) =>{
      this.ngOnDestroy();
    });
  }

  addDirectLinksToLeakList(){
    this.users.leakList.forEach(leak =>{
        const leakId = leak.id;
        this.addDirectLinkToLeak(leak,leakId);
    })
  } 

  addDirectLinkToLeak(leak : any, leakId : number){
    if(leak.directLink) return;
    this.loginService.performGet(`${AppConstant.customer}/${this.customerId}/${AppConstant.leaks}/${leakId}/directLink`)
    .subscribe(response => {
      leak.directLink = response.data;
    });
  }


  ngAfterViewInit() {
    if (this.users.isLeakChange) {
      this.getLeaksAndRecommendation();
    }else{
      this.addDirectLinksToLeakList();
      this.scrollToLeak();
    }
  }

  scrollToLeak(){
    const leak = document.getElementById('leak' + this.users.leakFocusId);
    if(this.users.leakFocusId && leak){
      try {
        setTimeout(() =>leak.scrollIntoView());
        // window.scrollBy(0,-100);
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
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/recommendationsAndLeaks').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.users.leakList = response.data.leaks;
        this.users.recommendationList = response.data.recommendations;
        this.users.isLeakChange = false;
        this.loginService.setUser(this.users);
        for (let i = 0; i < this.users.leakList.length; i++) {
          this.users.leakList[i].flag = true;
        }

        this.addDirectLinksToLeakList();
        document.getElementById('loader').classList.remove('loading');
        this.scrollToLeak();
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }

  surveyRecommendationList(number,recommendationsListID) {
    this.users.recommendationNo = number;
    this.loginService.setUser(this.users);
    this.router.navigate(['/surveyRecommendationList']);

  }
  leakHelp(id, priceValue, takebackValue, surveyRecommendationId) {
    this.sendMailForHelp(priceValue, takebackValue, surveyRecommendationId);
    this.users.leakList[id].flag = false;
  }

  sendMailForHelp(priceValue, takebackValue, surveyRecommendationId) {
    // const content = 'toAddress=support@hea.com&fromAddress=' + this.users.outhMeResponse.user.email + '&subject=Request for Leak help, audit '
    //   + this.users.outhMeResponse.auditId + '&subjectCharset=utf-8&bodyContent=Leak:' + surveyRecommendationId + ' <br> Size:' + takebackValue + ' watts and $' +
    //   priceValue + ' wasted a year <br> User: ' + this.users.outhMeResponse.user.name + ' ' + this.users.outhMeResponse.user.email + ' ' + this.users.outhMeResponse.phoneNumber + '&bodyCharset=utf-8&contentType=text/html';

      const formData = new FormData();
      formData.append('toAddress','support@hea.com');
      formData.append('fromAddress',this.users.outhMeResponse.user.email);
      formData.append('subject','Request for Leak help, audit'+this.users.outhMeResponse.auditId);
      formData.append('subjectCharset','utf-8');
      formData.append('bodyContent','Leak:'+surveyRecommendationId);
      formData.append('<br> Size',takebackValue);
      formData.append('watts and $',priceValue);
      formData.append('wasted a year <br> User:',this.users.outhMeResponse.user.name);
      formData.append(' ',this.users.outhMeResponse.user.email);
      formData.append(' ',this.users.outhMeResponse.phoneNumber );
      formData.append('bodyCharset','utf-8');
      formData.append('contentType','text/html');




    this.loginService.performPostMultiPartFromData({},`customers/${this.customerId}/surveyRecommendations/${surveyRecommendationId}/sendHelpWithLeakMail`,formData).subscribe(
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

  copyTextToClipBoard(text : string){
    this.subscriptions.add(AppUtility.copyToClipboardEvent(text));
  }

  ngOnDestroy(): void {
    this.loginService.setUser(this.users);
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
  
}