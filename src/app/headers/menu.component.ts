import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./headers.component.css', './menu.component.css']
})
export class MenuComponent implements OnInit {

  users: Users = new Users();
  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
  }

  ngOnInit() {
    let surveyCode;
    if (this.users.currentPaneNumber !== undefined) {
      surveyCode = this.users.currentPaneNumber.survey.surveyDescription.surveyCode;
    }
    if (this.users.surveyLenght <= 3 || (this.users.currentPaneNumber !== undefined ? surveyCode === 'Profile' : false)) {
      document.getElementById('_home1').classList.add('header_menu_none');
      document.getElementById('all_topic1').classList.add('header_menu_none');
      document.getElementById('menu_option1').classList.add('header_menu_none');
      document.getElementById('menu_option2').classList.add('header_menu_none');
    }
  }
  back() {
    this.location.back();
  }
  logouts() {
    this.loginService.logout();
  }
  hide(numbers) {
    if (numbers === 1) {
      if (this.users.surveyLenght <= 3) {
        this.router.navigate(['/surveyView']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else if (numbers === 2) {
      if (this.users.surveyLenght > 3) {
        this.router.navigate(['/topicshistory']);
      }
    } else if (numbers === 3 && (this.users.currentPaneNumber != null && this.users.currentPaneNumber !==
      undefined ? this.users.currentPaneNumber.survey.surveyDescription.surveyCode !== 'Profile' : true)) {
      if (this.users.surveyLenght > 3) {
        this.router.navigate(['/accountDetail']);
      }
    } else if (numbers === 9) {
      window.open(window.location.origin + '/hea-web/trendingHome.do', '_self');
    }
  }
}