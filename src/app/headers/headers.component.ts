import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  hides = true;
  hideLogo = true;
  float: string;
  mobHeight: number;
  screenWidth: any;
  iframeUrl: string;
  isResponsive = false;
  users: Users = new Users();
  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    if (this.users.role === 'USERS') {
      this.iframeUrl = 'https://heasmartaudit.typeform.com/to/C3KCyo?auditId=' +
        this.users.outhMeResponse.auditId + '&amp;typeform-embed=popup-drawer';
    }
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
    });

    $(document).ready(function () {
      $('.navbar-nav li a').click(function (event) {
        $('.navbar-collapse').collapse('hide');
      });
    });

    if (this.users.role === 'USERS' && this.users.surveyLength <= 3 || (this.users.currentPaneNumber !== null &&
      this.users.currentPaneNumber !== undefined && this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'Profile')) {
      if (document.getElementById('_home')) {
        document.getElementById('_home').classList.add('header_menu_none');
      } if (document.getElementById('all_topic')) {
        document.getElementById('all_topic').classList.add('header_menu_none');
      } if (document.getElementById('menu_option')) {
        document.getElementById('menu_option').classList.add('header_menu_none');
      }
      this.headerResposiveMenu();
    }
    this.hideResponsiveMenu();
  }
  hideResponsiveMenu() {
    if (this.isResponsive) {
      let surveyCode;
      if (this.users.currentPaneNumber !== undefined) {
        surveyCode = this.users.currentPaneNumber.survey.surveyDescription.surveyCode;
      }
      if (this.users.surveyLength <= 3 || (this.users.currentPaneNumber !== undefined ? surveyCode === 'Profile' : false)) {
        setTimeout(() => {
          this.headerResposiveMenu();
        }, 300);
      }
    }
  }
  headerResposiveMenu() {
    if (document.getElementById('_home1')) {
      document.getElementById('_home1').classList.add('header_menu_none');
    }
    if (document.getElementById('all_topic1')) {
      document.getElementById('all_topic1').classList.add('header_menu_none');
    }
    if (document.getElementById('menu_option1')) {
      document.getElementById('menu_option1').classList.add('header_menu_none');
    }
    if (document.getElementById('menu_option2')) {
      document.getElementById('menu_option2').classList.add('header_menu_none');
    }

  }
  hide(numbers) {
    this.isResponsive = false;
    this.users = this.loginService.getUser();
    if (numbers === 1) {
      this.isResponsive = true;
      this.hideResponsiveMenu();
    } else if (numbers === 2) {
      if (this.users.role === 'ADMIN') {
        this.router.navigate(['admin/customer']);
      } else {
        if (this.users.surveyLength <= 3) {
          this.router.navigate(['/surveyView']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    } else if (numbers === 3) {
      if (this.users.surveyLength > 3 &&
        (this.users.currentPaneNumber !== undefined ?
          this.users.currentPaneNumber.survey.surveyDescription.surveyCode !== 'Profile' : true)) {
        this.router.navigate(['/accountDetail']);
      }
    } else if (numbers === 4) {
      if (this.users.surveyLength > 3) {
        this.router.navigate(['/topicshistory']);
      }
    } else if (numbers === 5) {
      if (this.users.surveyLength > 3) {
        this.router.navigate(['/topicshistory']);
      }
    } else if (numbers === 6) {
      if (this.users.surveyLength > 3) {
        this.router.navigate(['/customerEventList']);
      }
    } else if (numbers === 7) {
      this.router.navigate(['/MailArchiveList']);
    } else if (numbers === 8) {
      this.router.navigate(['/surveyRecommendationList']);
    } else if (numbers === 9) {
      window.open(window.location.origin + '/hea-web/trendingHome.do', '_self');
    }
  }
  logouts() {
    this.loginService.logout();
  }
  back() {
    this.isResponsive = false;
  }
  openfeedbackpage() {
    document.getElementById('feedback1').classList.add('feedbackDivCss');
    document.getElementById('feedback2').classList.add('feedbackiframeCss');
    document.getElementById('feedback3').classList.add('feedBackDiv1');
  }
  closefeedbackpage() {
    document.getElementById('feedback1').classList.remove('feedbackDivCss');
    document.getElementById('feedback2').classList.remove('feedbackiframeCss');
    document.getElementById('feedback3').classList.remove('feedBackDiv1');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.innerWidth = window.innerWidth;
    if (window.innerWidth >= 767) {
      this.isResponsive = false;
    }

  }
}
