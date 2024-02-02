import { TopicHistoryComponent } from './../survey/topichistory.component';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ContentChild, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
import { Location } from '@angular/common';
import { AdminFilter, UsageHistoryFilter } from '../models/filter-object';
import { AppUtility } from '../utility/app.utility';
import { AppConstant } from '../utility/app.constant';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from '../utility/subscription-utility';

declare function mobilecheck() : boolean ;
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('loginRef') loginElement: ElementRef;
  users: Users = new Users();
  errorMessage: string;
  show = true;
  hide = false;
  theme: string;
  code: string;
  buildForSandbox = true; 
  auth2: any;
  redirectedRoute : string;
  enableFb : string;
  enableGoogle : string;
  loginScreenText : any;
  enableSocialLogin : string;
  subscription : Subscription = new Subscription();
  @ContentChild('showhideinput') input;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private location: Location
  ) {
    this.route.queryParams.subscribe((params) => {
      this.theme = params['theme'] || 'MBL';
      this.redirectedRoute = params['redirectedRoute']

    });
    this.users =JSON.parse(localStorage.getItem('users'));
    if (!this.users) this.users = new Users(); 

    if (this.theme) {
      this.theme = 'MBL';
    }
    this.users.theme = this.theme;
    if (this.loginService.getUser().token != null) {

      // if (this.loginService.getUser().role == "ADMIN")
      //   this.router.navigate(['/admin/customer']);
      // else{
      //   if(this.users.lastVisitedURL == '/surveyView')
      //     this.router.navigate(['surveyView']);
      //   else
      //     this.router.navigate(['/dashboard']);
      // }
    } else {
      // if(this.loginService.getUser().lastVisitedURL == null)
      this.loginService.setUser(this.users);
    }

    if (window.location.origin === 'https://www.hea.com' || window.location.origin === 'http://www.hea.com') {
      this.buildForSandbox = false;
    }
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd event in YourComponent:', event);

        // ticket 2415 comment 22
        this.getFbLoginEnable();
        this.getGoogleLoginEnable();
        this.getLoginScreenText();
        this.getSocialLoginEnable();
      }
    });

  }
  
  ngAfterViewInit(): void {
    

    // for checking weather the session is expired of user and had to re-login to the applicaiton.
    if (this.users.outhMeResponse) {
      document.getElementById('loader').classList.add('loading');
      this.loginService.performGetMultiPartData('oauth/me')
        .subscribe(
          response => {
            // document.getElementById('loader').classList.remove('loading');

            if(this.users.outhMeResponse.userId != response.userId){
              this.performOuthMe();
            }

            if (this.loginService.getUser().role != "USERS")
              this.router.navigate(['admin/customer']);
            else {
              console.log(this.users.surveyList);
              if(!this.users.surveyList){
                this.getAllSurvey(this.users.outhMeResponse.customerId);
              }else{
                if (this.users.lastVisitedURL == '/surveyView')
                  this.router.navigate(['surveyView']);
                else
                  this.router.navigate(['/dashboard']);
              }

            }
          }, error => {
            this.router.navigate([''], {
              relativeTo: this.route,
              queryParams: { theme: 'MBL' },
              queryParamsHandling: 'merge'
            })
  
            this.fbConnect();
            this.googleInitialize();
  
          }
        );
    }else{
      this.performOuthMe();

      //  uncomment and fix,s in case the user not successfully redirected to the login screen.

      // this.router.navigate([''], {
      //   relativeTo: this.route,
      //   queryParams: { theme: 'MBL' },
      //   queryParamsHandling: 'merge'
      // })

      this.fbConnect();
      this.googleInitialize();

    }
  }

  // login() {
  //   if (this.users.username === undefined || this.users.username.length === 0) {
  //     this.errorMessage = 'please enter user name';
  //   } else if (
  //     this.users.password === undefined ||
  //     this.users.password.length === 0
  //   ) {
  //     this.errorMessage = 'please enter valid password';
  //   } else {
  //     const params = new HttpParams()
  //       .set('username', this.users.username)
  //       .set('password', this.users.password)
  //       .set('client_id', this.users.username)
  //       .set('client_secret', this.users.password)
  //       .set('grant_type', 'password')
  //       .set('scope', 'read');
  //     document.getElementById('loader').classList.add('loading');
  //     this.loginService.performOauthToken('oauth/token', params.toString()).subscribe(
  //       (data) => {
  //         const response = JSON.parse(JSON.stringify(data));
  //         if (response.status === 401) {
  //           this.errorMessage = 'Invalid Credentials';
  //           document.getElementById('loader').classList.remove('loading');
  //         } else {
  //           this.users.token = response.access_token;
  //           this.users.refreshToken = response.refresh_token;
  //           this.loginService.setUser(this.users);
  //           this.browserInfoDo();
  //           this.performOuthMe();
  //         }
  //       },
  //       (error) => {
  //         const response = JSON.parse(JSON.stringify(error));
  //         console.log(response);
  //         if (response.error.error_description) {
  //           this.errorMessage = response.error.error_description;
  //         } else {
  //           this.errorMessage = response.statusText;
  //         }
  //         document.getElementById('loader').classList.remove('loading');
  //       }
  //     );
  //   }
  // }

  resetErrorMessage() {
    this.errorMessage = '';
  }
  
  login(){

    if (this.users.username === undefined || this.users.username.length === 0) {
      this.errorMessage = 'please enter user name';
    } else if (
      this.users.password === undefined ||
      this.users.password.length === 0
    ) {
      this.errorMessage = 'please enter valid password';
    } else {
    document.getElementById('loader').classList.add('loading');
    const params = new HttpParams()
      .append('j_username',this.users.username)
      .append('j_password',this.users.password)

      this.loginService.performOauthToken('j_spring_security_check',params.toString())
      .subscribe(
        (response) =>{
          this.browserInfoDo();
          this.performOuthMe();
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          if(response.status == '401')
            this.errorMessage = response.error.errorMessage;
          else
          if (response.error.error_description) {
            this.errorMessage = response.error.error_description;
          } else if(response.status == '400'){
            this.errorMessage = 'Invalid credentials';
          }
          else {
            this.errorMessage = response.statusText;
          }
          this.users.username = '';
          this.users.password = '';
          document.getElementById('loader').classList.remove('loading');
        }
      )
    }
  }

  browserInfoDo(){
    const body = {
      screenWidth : window.screen.width,
      screenHeight : window.screen.height,
      timezoneOffset : new Date().getTimezoneOffset(),
      mobilecheck : mobilecheck(),
      "currentApplicationUI":"smartAudit"
    }

    this.loginService.performPost(body,'free/browserInfo.do')
    .subscribe(
      response => {
      }, error =>{
        console.log(error);
      }
    )
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
        this.errorMessage = response.error_description;
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
              this.loginService.setUser(this.users);
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
          this.getAllowedMenuListForUser();
          this.errorMessage = response.error_description;
          // document.getElementById('loader').classList.remove('loading');
        }
      );
  }

  getAllowedMenuListForUser(){
    this.loginService.performGet('allowedMenuList')
    .subscribe(
      ( response)=>{
          this.users.allowedMenuList = AppUtility.setAllowedMenuList(response.data);
      }, (error) =>{
        this.errorMessage = error.error_description;
      })
  }

  getUserById(userId: any) {
    this.loginService
      .performGetMultiPartData('users/' + userId)
      .subscribe(
        (data) => {
          const response = JSON.parse(JSON.stringify(data));
          this.users.outhMeResponse = { user: response };
          this.users.userData = response;
          this.users.name = response.name;
          this.loginService.setUser(this.users);
          AppUtility.showLoader();

          if(!this.redirectedRoute)
          this.router.navigate(['admin/customer']); 
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage = response.error_description;
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
            this.loginService.setUser(this.users);
            if (role === 'USERS') {
              this.getAllSurvey(response.customerId);
            }
          } else {
            this.errorMessage = response.errorMessage;
          }
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage =
            response.error.errorMessage +
            '<br>Your new account registration is in process.';
          document.getElementById('loader').classList.remove('loading');
        }
      );
  }
  getAllSurvey(customerId) {
    this.users.surveyCode = new Array();
    this.loginService
      .performGetMultiPartData('customers/' + customerId + '/surveys')
      .subscribe(
        (data) => {
          const response = JSON.parse(JSON.stringify(data));
          if (response.errorMessage == null) {
            for (const surveyCodeList of response.data) {
              this.users.surveyCode.push(
                surveyCodeList.surveyDescription.surveyCode
              );
            }
            document.getElementById('loader').classList.remove('loading');
            const surveyLength = Object.keys(response.data).length;
            this.users.surveyLength = surveyLength;
            this.users.surveyList = response.data;
            this.loginService.setUser(this.users);
            this.getCurrentSurvey();
          } else {
            this.errorMessage = response.errorMessage;
          }
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage = response.error.errorMessage;
          document.getElementById('loader').classList.remove('loading');
        }
      );
  }
  getCurrentSurvey() {
    document.getElementById('loader').classList.add('loading');
    this.loginService
      .performGetMultiPartData(
        'customers/' + this.users.outhMeResponse.customerId + '/surveys/current'
      )
      .subscribe(
        (data) => {
          document.getElementById('loader').classList.remove('loading');
          const response = JSON.parse(JSON.stringify(data));
          if (response.errorMessage == null) {

            AppUtility.showLoader();
            if(response.data.currentPane){
              this.users.currentPaneNumber = response.data;
              this.users = this.loginService.setUser(this.users);

              if(this.users.outhMeResponse.uiVersion == AppConstant.classicVersionSelectionValue){
                window.location.href = window.location.origin + AppConstant.classicVersionTopicHistoryURL;
               }else{
                this.router.navigate(['surveyView']);
              }

            }else{

              // if (this.users.lastVisitedURL != '/surveyView') {
                
               this.users.allSurveyCheck = false;
               this.loginService.setUser(this.users);
               document.getElementById('loader').classList.add('loading');
               
               if(this.users.outhMeResponse.uiVersion == AppConstant.classicVersionSelectionValue){
                window.location.href = window.location.origin + AppConstant.classicVersionDashboardURL;
               }else{
                this.router.navigate([this.redirectedRoute ? this.redirectedRoute : 'dashboard']);
               }
               
            //  } else {
            //    this.users.allSurveyCheck = true;
            //    this.users.isDashboard = true;
            //    this.users.isFirstTime = true;
            //    this.loginService.setUser(this.users);
            //    let topicHistory = new TopicHistoryComponent(this.loginService,this.router,this.location);
            //    const survey = this.users.currentPaneNumber.survey;
            //    const paneInfo =  this.users.currentPaneNumber.currentPane;
            //    document.getElementById('loader').classList.add('loading');
            //    topicHistory.goToTopicPage(survey.surveyId,paneInfo.paneCode,survey.surveyDescription.surveyCode,this.users.paneNumber);
            //  }

              if(response.data.errorMessage != null){
                this.errorMessage = response.errorMessage;
              }
            }

          } else {
            this.errorMessage = response.errorMessage;
          }
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage = response.error.errorMessage;
          document.getElementById('loader').classList.remove('loading');
        }
      );
  }
  registration() {
    this.router.navigate(['registration']);
  }
  toggleShow() {
    this.show = !this.show;
    this.hide = !this.hide;
  }

  fbConnect() {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '424517809415902',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  fbLogin() {
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        console.log('User login sucess');
      }
      else {
        console.log('User login failed');
      }
    });

  }

  googleInitialize() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '499784972442-j774nkhbl1thrsv9rrp97okhhssrep36.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLogin();
      });
    }
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  prepareLogin() {
    if(!this.loginElement)
       return null;

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        alert('Name: ' + profile.getName() + '     Email:' + profile.getEmail());
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  getFbLoginEnable(){
    this.loginService.performGet('conf/'+'enableFacebook').subscribe(
      (data) => {
            this.enableFb = data.data;
      }

    );
  }

  getGoogleLoginEnable(){
    this.subscription.add(
      this.loginService.performGet('conf/'+'enableGoogle').subscribe(
        (data) => {
              this.enableGoogle = data.data;
        }
      )
    )
  }

  getLoginScreenText(){
    this.loginService.performGetMultiPartData('conf/'+'loginScreenText').subscribe(
      (data) => {
            this.loginScreenText = data.data;
      },
     

    )
  }

  getSocialLoginEnable(){
    this.subscription.add(
      this.loginService.performGet('conf/'+'enableSocial').subscribe(
        (data) => {
              this.enableSocialLogin = data.data;
        }
      )
    )
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscription);
  }
}
