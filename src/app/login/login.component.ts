import { TopicHistoryComponent } from './../survey/topichistory.component';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ContentChild, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
import { Location } from '@angular/common';
import { AdminFilter, UsageHistoryFilter } from '../models/filter-object';
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit{
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
      this.theme = params['theme'] || 'MBL';
    });
    this.users =JSON.parse(localStorage.getItem('users'));
    if (!this.users) this.users = new Users(); 

    if (this.theme) {
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
  
  ngAfterViewInit(): void {
    this.router.navigate([''],{ 
      relativeTo : this.route,
      queryParams : { theme : 'MBL'},
      queryParamsHandling : 'merge'
      
    })
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
            this.browserInfoDo();
            this.performOuthMe();
          }
        },
        (error) => {
          const response = JSON.parse(JSON.stringify(error));
          console.log(response);
          if (response.error.error_description) {
            this.errorMessage = response.error.error_description;
          } else {
            this.errorMessage = response.statusText;
          }
          document.getElementById('loader').classList.remove('loading');
        }
      );
    }
  }

  mobilecheck() {
	  var check = false;
	    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
};

  browserInfoDo(){
    this.loginService.performPost( {screenWidth : window.innerWidth, screenscreenHeight : window.innerHeight, timezoneOffset : new Date().getTimezoneOffset(), mobilecheck : this.mobilecheck()},'free/browserInfo.do')
    .subscribe(
      response => {
      }, error =>{
        console.log(error);
      }
    )
  } 

  // performTest(){
  //   let formData = new HttpParams();
  //   formData = formData.append('j_username',this.users.username);
  //   formData = formData.append('j_password',this.users.password);
  //   this.loginService.performPostWithParam({},'j_spring_security_check',formData)
  //   .subscribe(
  //     data=>{
  //       console.log(data);
  //     }, error => {
  //       console.log(error);
  //     }
  //   )
  // }

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
               this.users.lastVisitedURL != '/surveyView'
               &&  (this.users.currentPaneNumber == undefined 
                || this.users.currentPaneNumber == null)
            ) {
              this.users.allSurveyCheck = false;
              this.loginService.setUser(this.users);
              document.getElementById('loader').classList.add('loading');
              this.router.navigate(['dashboard']);
            } else {
              this.users.allSurveyCheck = true;
              this.users.isDashboard = true;
              this.users.isFirstTime = true;
              this.loginService.setUser(this.users);
              let topicHistory = new TopicHistoryComponent(this.loginService,this.router,this.location);
              const survey = this.users.currentPaneNumber.survey;
              const paneInfo =  this.users.currentPaneNumber.currentPane;
              document.getElementById('loader').classList.add('loading');
              topicHistory.goToTopicPage(survey.surveyId,paneInfo.paneCode,survey.surveyDescription.surveyCode,this.users.paneNumber);
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

}
