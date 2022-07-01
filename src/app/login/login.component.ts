import { TopicHistoryComponent } from './../survey/topichistory.component';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ContentChild, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
import { Location } from '@angular/common';
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginRef') loginElement: ElementRef;
  users: Users = new Users();
  errorMessage: string;
  show = true;
  hide = false;
  theme: string;
  code: string;
  buildForSandbox = true;
  auth2: any;
  @ContentChild('showhideinput') input;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private location: Location
  ) {
    this.route.queryParams.subscribe((params) => {
      this.theme = params['theme'] || null;
    });
    this.users =JSON.parse(localStorage.getItem('users'));
    if (this.users == null) this.users = new Users(); 

    if (this.theme == null) {
      this.theme = 'MBL';
    }
    this.users.theme = this.theme;
    if (this.loginService.getUser().token != null) {

      if (this.loginService.getUser().role == "ADMIN")
        this.router.navigate(['/admin/customer']);
      else{
        if(this.users.lastVisitedURL == '/surveyView')
          this.router.navigate(['surveyView']);
        else
          this.router.navigate(['/dashboard']);
      }
    } else {
      // if(this.loginService.getUser().lastVisitedURL == null)
      this.loginService.setUser(this.users);
    }

    if (window.location.origin === 'https://www.hea.com' || window.location.origin === 'http://www.hea.com') {
      this.buildForSandbox = false;
    }
  }
  ngOnInit() {
    this.users = this.loginService.getUser();
    if (this.users.token) {
      if (this.loginService.getUser().role == "ADMIN")
        this.router.navigate(['/admin/customer']);
      else{
        if(this.users.lastVisitedURL == '/surveyView')
          this.router.navigate(['surveyView']);
        else
          this.router.navigate(['/dashboard']);
      }
    }
    this.fbConnect();
    this.googleInitialize();
  }

  login() {
    if (this.users.username === undefined || this.users.username.length === 0) {
      this.errorMessage = 'please enter user name';
    } else if (
      this.users.password === undefined ||
      this.users.password.length === 0
    ) {
      this.errorMessage = 'please enter valid password';
    } else {
      // const body =
      //   'username=' +
      //   this.users.username +
      //   '&password=' +
      //   this.users.password +
      //   '&client_id=' +
      //   this.users.username +
      //   '&client_secret=' +
      //   this.users.password +
      //   '&grant_type=password&scope=read';
      const params = new HttpParams()
        .set('username', this.users.username)
        .set('password', this.users.password)
        .set('client_id', this.users.username)
        .set('client_secret', this.users.password)
        .set('grant_type', 'password')
        .set('scope', 'read');
      document.getElementById('loader').classList.add('loading');
      this.loginService.performOauthToken('oauth/token', params.toString()).subscribe(
        (data) => {
          const response = JSON.parse(JSON.stringify(data));
          if (response.status === 401) {
            this.errorMessage = 'Invalid Credentials';
            document.getElementById('loader').classList.remove('loading');
          } else {
            this.users.token = response.access_token;
            this.users.refreshToken = response.refresh_token;
            this.loginService.setUser(this.users);
            this.performOuthMe();
          }
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          if (response.error.error_description) {
            this.errorMessage = response.error.error_description;
          } else {
            this.errorMessage = 'Invalid Credentials';
          }
          document.getElementById('loader').classList.remove('loading');
        }
      );
    }
  }

  performOuthMe() {
    this.loginService.performGetMultiPartData('oauth/me').subscribe(
      (data) => {
        const response = JSON.parse(JSON.stringify(data));
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
          this.errorMessage = response.error_description;
          // document.getElementById('loader').classList.remove('loading');
        }
      );
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
            if (
              (response.data.currentPane == null ||
              response.data.currentPane === undefined)
               && this.users.lastVisitedURL != '/surveyView'
            ) {
              this.users.allSurveyCheck = false;
              this.loginService.setUser(this.users);
              this.router.navigate(['dashboard']);
            } else {
              this.users.currentPaneNumber = response.data;
              this.users.allSurveyCheck = true;
              this.users.isDashboard = true;
              this.users.isFirstTime = true;
              this.loginService.setUser(this.users);
              let topicHistory = new TopicHistoryComponent(this.loginService,this.router,this.location);
              const survey = this.users.surveyList[0]
              const paneInfo =  survey.panes[0];
              topicHistory.goToTopicPage(survey.surveyId,paneInfo.paneCode,survey.surveyDescription.surveyCode,0);
              // this.router.navigate(['surveyView']);
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
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        alert('Name: ' + profile.getName() + '     Email:' + profile.getEmail());
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
