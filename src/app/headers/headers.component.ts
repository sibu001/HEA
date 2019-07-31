import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/services/login.service";
import { Users } from "src/app/models/user";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  hides: boolean = true;
  hideLogo: boolean = true;
  float: string;
  mobHeight: number;
  screenWidth: any;
  users: Users = new Users();
  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    this.screenWidth = window.screen.width;
  }

  ngOnInit() {
    /* for demonstration purposes only */
    $('.navbar-toggle').click(function () {
      if ($(this).hasClass('collapsed')) {
        $(this).removeClass('collapsed');
      } else {
        $(this).addClass('collapsed');
      }
    })

    $(document).ready(function () {
      $(".navbar-nav li a").click(function (event) {
        $(".navbar-collapse").collapse('hide');
      });
    });

  }
  hide(numbers) {
    if (numbers == 1) {
      this.router.navigate(["/menu"]);
    } else if (numbers == 2) {
      if (this.users.surveyLenght <= 3) {
        this.router.navigate(["/surveyView"]);
      } else {
        this.router.navigate(["/dashboard"]);
      }
    } else if (numbers == 3) {
    } else if (numbers == 4) {
      if (this.users.surveyLenght > 3) {
        this.router.navigate(["/topicshistory"]);
      }
    } else if (numbers == 5) {
      if (this.users.surveyLenght > 3) {
        this.router.navigate(["/topicshistory"]);
      }
    } else if (numbers == 6) {
       if (this.users.surveyLenght > 3) {
        this.router.navigate(["/customerEventList"]);
      }
    } else if (numbers == 7) {
      this.router.navigate(["/MailArchiveList"]);
    } else if (numbers == 8) {
      this.router.navigate(["/surveyRecommendationList"]);
    } else if (numbers == 9) {
    }
  }
  logouts() {
    this.loginService.logout();
  }
}
