import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/user';
import { Router } from '@angular/router';
import { SystemService } from '../store/system-state-management/service/system.service';
import { skipWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from '../utility/subscription-utility';
declare var $: any;
@Component({
  selector: 'accountDetail',
  templateUrl: './accountDetail.component.html',
  styleUrls: ['../survey/topichistory.component.css']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  @ViewChild('inp1') inp1: ElementRef;
  helpHide: boolean;
  helpHide1: boolean;
  helpHide2: boolean;
  customerCredentialsList: any[] = [];
  users: Users = new Users();
  viewConfigurationList: any;
  public errorMessage: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private loginService: LoginService,
    private router: Router,
    private readonly systemService: SystemService) {
    this.users = this.loginService.getUser();

    if (this.users.role === 'USERS') {
      this.getCustomerCredentials();
    } else {
      this.users.outhMeResponse = { user: this.users.userData };
      this.loadCustomerViewConfiguration();
    }
  }

  ngOnInit() {
    this.scrollTop();
  }

  edit(number: any) {
    let surveyCode, surveyId, paneCode;
    if (number === 1) {
      surveyCode = 'HomeProfile';
      paneCode = 'prf_residenceData';
    } else if (number === 3) {
      paneCode = 'prf_constuctionBuildYear';
      surveyCode = 'HomeProfile';
    } else if (number === 2) {
      surveyCode = 'Water';
      surveyId = this.users.surveyList[8].surveyId;
      paneCode = 'w_Intro';
    }

    surveyId = this.users.surveyList.find(data =>{
      if(data.surveyDescription.surveyCode = surveyCode){
        return data.panes.find(data1 =>{
          if(data1.paneCode == paneCode){
            return true;
          }
          return false;
        })
      }
      return false;
    }).surveyId;

    document.getElementById('loader').classList.add('loading');
    const object = {};
    this.subscriptions.add(this.loginService.performPostMultiPartData(object, 'customers/' + this.users.outhMeResponse.customerId + '/surveys/' + surveyCode + '/' + surveyId + '/panes/' + paneCode).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
        if (response.errorCode == null && response.errorMessage == null) {
          this.users.currentPaneNumber = response.data;
          this.loginService.setUser(this.users);
          this.router.navigate(['surveyView']);
        }
      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    ));
  }

  getCustomerCredentials() {
    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/credentials').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.customerCredentialsList = response;
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        document.getElementById('loader').classList.remove('loading');
      }
    ));
  }

  postCustomerData() {
    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(this.loginService.performPut(this.users.outhMeResponse, 'customers/' + this.users.outhMeResponse.customerId).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.scrollTop();
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        this.errorMessage = error;
        this.scrollTop();
        document.getElementById('loader').classList.remove('loading');
      }
    ));
  }

  loadCustomerViewConfiguration() {
    this.systemService.loadViewConfigurationList(true);
    this.subscriptions.add(this.systemService.getViewConfigurationList().pipe(skipWhile((item: any) => !item))
      .subscribe((viewConfigurationList: any) => {
        this.viewConfigurationList = viewConfigurationList;
        if (!this.users.outhMeResponse.user.customerViewConfigurationId) {
          this.users.outhMeResponse.user.customerViewConfigurationId = '-1';
        }
      }));
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

  cancel() {
    if (this.users.role === 'USERS') {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['admin/customer']);
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
