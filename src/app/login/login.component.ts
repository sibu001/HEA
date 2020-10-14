import { Component, OnInit, ContentChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Users } from "src/app/models/user";
import { LoginService } from "./../services/login.service";
import { Http } from "@angular/http";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  users: Users = new Users();
  errorMessage: string;
  show: boolean = true;
  hide: boolean = false;
  theme: string;
  code: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _http: Http,
    private loginService: LoginService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.theme = params["theme"] || null;
    });
    if (this.theme == null) {
      this.theme = "MBL";
    }
    this.users.theme = this.theme;
    this.loginService.setUser(this.users);
  }
  ngOnInit() {
    this.users = this.loginService.getUser();
    if (this.users.token != undefined) {
      this.router.navigate(["/dashboard"]);
    }
  }
  @ContentChild("showhideinput") input;
  login() {
    if (this.users.username == undefined || this.users.username.length == 0) {
      this.errorMessage = "please enter user name";
    } else if (
      this.users.password == undefined ||
      this.users.password.length == 0
    ) {
      this.errorMessage = "please enter valid password";
    } else {
      let body =
        "username=" +
        this.users.username +
        "&password=" +
        this.users.password +
        "&client_id=" +
        this.users.username +
        "&client_secret=" +
        this.users.password +
        "&grant_type=password&scope=read";
      document.getElementById("loader").classList.add("loading");
      this.loginService.performOauthToken("oauth/token", body).subscribe(
        (data) => {
          let response = JSON.parse(JSON.stringify(data));
          if (response.status == 401) {
            this.errorMessage = "Invalid Credentials";
            document.getElementById("loader").classList.remove("loading");
          } else {
            this.users.token = response.access_token;
            this.users.refreshToken = response.refresh_token;
            this.loginService.setUser(this.users);
            this.performOuthMe();
          }
        },
        (error) => {
          let response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage = "Invalid Credentials";
          document.getElementById("loader").classList.remove("loading");
        }
      );
    }
  }

  performOuthMe() {
    this.loginService.performGetMultiPartData("oauth/me").subscribe(
      (data) => {
        let response = JSON.parse(JSON.stringify(data));
        this.performGetUserRole(response.userId);
      },
      (error) => {
        let response = JSON.parse(JSON.stringify(error));
        console.log(response);
        this.errorMessage = response.error_description;
        document.getElementById("loader").classList.remove("loading");
      }
    );
  }
  performGetUserRole(userId: any) {
    this.loginService
      .performGetMultiPartData("/users/" + userId + "/roles")
      .subscribe(
        (data) => {
          let response = JSON.parse(JSON.stringify(data));
          for (let roles of response) {
            if (roles.roleCode === "ADMIN") {
              this.users.role = roles.roleCode;
              this.loginService.setUser(this.users);
              this.router.navigate(['admin/customer']);
              // window.open(window.location.origin + '/hea-web/customerList.do', '_self');
              // window.open('https://sandbox.hea.com/hea-web/customerList.do','_self');
              break;
            }
          }
          if (this.users.role !== "ADMIN") {
            this.postGetCustomeData(userId, "USERS");
          }
        },
        (error) => {
          let response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage = response.error_description;
          document.getElementById("loader").classList.remove("loading");
        }
      );
  }
  postGetCustomeData(userId: any, role: string) {
    this.loginService
      .performPostMultiPart("customers/current/" + userId)
      .subscribe(
        (data) => {
          let response = JSON.parse(JSON.stringify(data));
          if (response.errorMessage == null) {
            this.users.outhMeResponse = response;
            this.users.theme = this.users.outhMeResponse.customerGroup.theme;
            this.users.role = role;
            this.loginService.setUser(this.users);
            if (role === "USERS") {
              this.getAllSurvey(response.customerId);
            }
          } else {
            this.errorMessage = response.errorMessage;
          }
        },
        (error) => {
          let response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage =
            response.error.errorMessage +
            "<br>Your new account registration is in process.";
          document.getElementById("loader").classList.remove("loading");
        }
      );
  }
  getAllSurvey(customerId) {
    this.users.surveyCode = new Array();
    this.loginService
      .performGetMultiPartData("customers/" + customerId + "/surveys")
      .subscribe(
        (data) => {
          let response = JSON.parse(JSON.stringify(data));
          if (response.errorMessage == null) {
            for (let surveyCodeList of response.data) {
              this.users.surveyCode.push(
                surveyCodeList.surveyDescription.surveyCode
              );
            }
            document.getElementById("loader").classList.remove("loading");
            var surveylength = Object.keys(response.data).length;
            this.users.surveyLenght = surveylength;
            this.users.surveyList = response.data;
            this.loginService.setUser(this.users);
            this.getCurrentSurvey();
          } else {
            this.errorMessage = response.errorMessage;
          }
        },
        (error) => {
          let response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage = response.error.errorMessage;
          document.getElementById("loader").classList.remove("loading");
        }
      );
  }
  getCurrentSurvey() {
    document.getElementById("loader").classList.add("loading");
    this.loginService
      .performGetMultiPartData(
        "customers/" + this.users.outhMeResponse.customerId + "/surveys/current"
      )
      .subscribe(
        (data) => {
          document.getElementById("loader").classList.remove("loading");
          let response = JSON.parse(JSON.stringify(data));
          if (response.errorMessage == null) {
            if (
              response.data.currentPane == null ||
              response.data.currentPane == undefined
            ) {
              this.users.allSurveyCheck = false;
              this.loginService.setUser(this.users);
              this.router.navigate(["dashboard"]);
            } else {
              this.users.currentPaneNumber = response.data;
              this.users.allSurveyCheck = true;
              this.loginService.setUser(this.users);
              this.router.navigate(["surveyView"]);
              // console.log(response);
            }
          } else {
            this.errorMessage = response.errorMessage;
          }
        },
        (error) => {
          let response = JSON.parse(JSON.stringify(error));
          console.log(response);
          this.errorMessage = response.error.errorMessage;
          document.getElementById("loader").classList.remove("loading");
        }
      );
  }
  registration() {
    this.router.navigate(["registration"]);
  }
  toggleShow() {
    this.show = !this.show;
    this.hide = !this.hide;
  }
}
