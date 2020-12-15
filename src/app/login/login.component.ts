import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ContentChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: Users = new Users();
  errorMessage: string;
  show = true;
  hide = false;
  theme: string;
  code: string;
  @ContentChild('showhideinput') input;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.theme = params['theme'] || null;
    });
    if (this.theme == null) {
      this.theme = 'MBL';
    }
    this.users.theme = this.theme;
    this.loginService.setUser(this.users);
  }
  ngOnInit() {
    this.users = this.loginService.getUser();
    if (this.users.token) {
      this.router.navigate(['/dashboard']);
    }
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
      this.loginService.performOauthToken('oauth/token', '', params).subscribe(
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
          this.errorMessage = 'Invalid Credentials';
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
            if (roles.roleCode === 'ADMIN') {
              this.users.role = roles.roleCode;
              this.users.userId = userId;
              this.users.allSurveyCheck = true;
              this.loginService.setUser(this.users);
              this.getUserById(userId);
              break;
            }
          }
          if (this.users.role !== 'ADMIN') {
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
              response.data.currentPane == null ||
              response.data.currentPane === undefined
            ) {
              this.users.allSurveyCheck = false;
              this.loginService.setUser(this.users);
              this.router.navigate(['dashboard']);
            } else {
              this.users.currentPaneNumber = response.data;
              this.users.allSurveyCheck = true;
              this.loginService.setUser(this.users);
              this.router.navigate(['surveyView']);
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
}
