import { Component, OnInit, ViewChild, ElementRef, Renderer, OnDestroy } from '@angular/core';
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
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private loginService: LoginService,
    private renderer: Renderer,
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
    this.renderer.invokeElementMethod(this.inp1.nativeElement, 'focus');
  }

  edit(number: any) {
    let surveyCode, surveyId, paneCode;
    if (number === 1) {
      surveyCode = this.users.surveyList[1].surveyDescription.surveyCode;
      surveyId = this.users.surveyList[1].surveyId;
      paneCode = this.users.surveyList[1].panes[1].paneCode;
    } else if (number === 3) {
      surveyCode = this.users.surveyList[1].surveyDescription.surveyCode;
      surveyId = this.users.surveyList[1].surveyId;
      paneCode = this.users.surveyList[1].panes[2].paneCode;
    } else if (number === 2) {
      surveyCode = 'Water';
      surveyId = this.users.surveyList[8].surveyId;
      paneCode = 'w_Intro';
    }
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
    this.subscriptions.add(this.loginService.performPostMultiPartDataPost(this.users.outhMeResponse, 'customers/current/' + this.users.outhMeResponse.userId).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
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

  cancel() {
    if (this.users.role === 'USERS') {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['admin/customer']);
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
