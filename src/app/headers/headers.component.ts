import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ShowInfoComponent } from './show-info/show-info.component';
import { MatDialog } from '@angular/material';
import { AppConstant } from '../utility/app.constant';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { UtilityService } from '../services/utility.service';
declare var $: any;
@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  hides = true;
  hideLogo = true;
  float: string;
  mobHeight: number;
  screenWidth: any;
  iframeUrl: string;
  isResponsive = false;
  users: Users = new Users();
  dialogRef: any;

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;


  constructor(private loginService: LoginService,
    private router: Router,
    private utilityService: UtilityService,
    private readonly dialog: MatDialog) {
    this.users = this.loginService.getUser();
    if (this.users.role === 'USERS') {
      this.iframeUrl = 'https://heasmartaudit.typeform.com/to/C3KCyo?auditId=' +
        this.users.outhMeResponse.auditId + '&amp;typeform-embed=popup-drawer';
    }
    this.screenWidth = window.screen.width;
  }
  ngAfterViewChecked(): void {
    this.users = this.loginService.getUser();
  }

  ngAfterViewInit(): void {
    if (this.users.theme === 'P4P') {
      if (document.getElementById('main-bar-menu')) {
        document.getElementById('main-bar-menu').classList.add('main-bar-menu-margin');
      }
    }
    this.changeLogoPosition();
  }

  ngOnInit(): void {
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

    if (this.users.role === 'USERS' && this.users.surveyLength <= 3 || (this.users.currentPaneNumber && this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'Profile')) {
      if (document.getElementById('_home')) {
        document.getElementById('_home').classList.add('header_menu_none');
      }
      if (document.getElementById('_account')) {
        document.getElementById('_account').classList.add('header_menu_none');
      }
      if (document.getElementById('all_topic')) {
        document.getElementById('all_topic').classList.add('header_menu_none');
      }
      if (document.getElementById('menu_option')) {
        document.getElementById('menu_option').classList.add('header_menu_none');
      }
      this.headerResponsiveMenu();
    }
    this.hideResponsiveMenu();

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
      this.utilityService.showSuccessMessage(this.connectionStatusMessage);
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
      this.connectionStatus = 'offline';
      console.log('Offline...');
      this.utilityService.showErrorMessage(this.connectionStatusMessage);
    }));

  }
  hideResponsiveMenu(): void {
    if (this.isResponsive) {
      let surveyCode;
      if (this.users.currentPaneNumber !== undefined) {
        surveyCode = this.users.currentPaneNumber.survey.surveyDescription.surveyCode;
      }
      if (this.users.surveyLength <= 3 || (this.users.currentPaneNumber ? surveyCode === 'Profile' : false)) {
        setTimeout(() => {
          this.headerResponsiveMenu();
        }, 300);
      }
    }
  }

  headerResponsiveMenu(): void {
    if (document.getElementById('_home1')) {
      document.getElementById('_home1').classList.add('header_menu_none');
    }
    if (document.getElementById('all_topic1')) {
      document.getElementById('all_topic1').classList.add('header_menu_none');
    }
    if (document.getElementById('_account1')) {
      document.getElementById('_account1').classList.add('header_menu_none');
    }
    if (document.getElementById('menu_option1')) {
      document.getElementById('menu_option1').classList.add('header_menu_none');
    }
    if (document.getElementById('menu_option2')) {
      document.getElementById('menu_option2').classList.add('header_menu_none');
    }
  }

  hide(routeNumber: any): void {
    this.isResponsive = false;
    this.users = this.loginService.getUser();
    if (routeNumber === 1) {
      this.isResponsive = true;
      this.hideResponsiveMenu();
      return;
    }
    if (this.users.isSurvey && this.users.role === 'USERS' && (this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'HomeProfile' || this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'HouseholdEnergy')) {
      const messages = this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'HomeProfile' ? AppConstant.homeProfileInfo : AppConstant.homeEnergyProfileInfo;
      if (confirm('Changes you made may not be saved.')) {
        this.openInfo(messages);
        this.goToOtherPage(routeNumber);
      } else {
        this.openInfo(messages);
      }
    } else {
      this.goToOtherPage(routeNumber);
    }
  }
  openInfo(message: string): void {
    this.dialogRef = this.dialog.open(ShowInfoComponent, {
      data: { message: message },
      disableClose: true,
      backdropClass: 'background-blur',
      position: {
        top: '80px',
      }
    });
  }
  goToOtherPage(routeNumber: any): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.users.isSurvey = false;
    this.loginService.setUser(this.users);
    if (routeNumber === 2) {
      if (this.users.role === 'ADMIN') {
        this.router.navigate(['admin/customer']);
      } else {
        if (this.users.surveyLength <= 3) {
          this.router.navigate(['/surveyView']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    } else if (routeNumber === 3) {
      if (this.users.surveyLength > 3 &&
        (this.users.currentPaneNumber ? this.users.currentPaneNumber.survey.surveyDescription.surveyCode !== 'Profile' : true)) {
        this.router.navigate(['/accountDetail']);
      }
      if (this.users.role === 'ADMIN') {
        this.router.navigate(['/accountDetail']);
      }
    } else if (routeNumber === 4 || routeNumber === 5) {
      if (this.users.surveyLength >= 3) {
        this.router.navigate(['/topicshistory']);
      }
    } else if (routeNumber === 6) {
      if (this.users.surveyLength > 3) {
        this.router.navigate(['/customerEventList']);
      }
    } else if (routeNumber === 7) {
      this.router.navigate(['/MailArchiveList']);
    } else if (routeNumber === 8) {
      this.router.navigate(['/surveyRecommendationList']);
    } else if (routeNumber === 9) {
      console.log(this.router.url)  
      if(this.router.url == '/surveyView'){
        this.users.lastVisitedURL = this.router.url;
        localStorage.setItem('users',JSON.stringify(this.users));
        this.sendDataToClassicVersion();    
      }else
        window.open(window.location.origin + '/hea-web/trendingHome.do', '_self');  
    } else if(routeNumber = 10){
      if(this.router.url == '/surveyView')
        this.sendDataToClassicVersion();    
      else
        window.open(window.location.origin + '/hea-web/customerList.do', '_self');
    }
  }

  sendDataToClassicVersion(){

    const user = this.loginService.getUser();
    const data = user.currentPaneNumber;

    const formData = new FormData();
    // formData.append("formAction","loadPane");
    formData.append("surveyId",data.survey.surveyId);
    formData.append("surveyDescriptionId",data.surveyDescriptionId);
    formData.append("paneCode",data.currentPane.paneCode);
    formData.append("userId",data.survey.userId);

    document.getElementById('loader').classList.add('loading');
    this.loginService.performPostMultiPartData(
      formData, 'survey.do'
    ).subscribe(
      (response) =>{
      } ,(error) =>{
        console.log(error.url);
          window.open(error.url,'_self');
      }
    )
  }

  logouts(): void {
    this.loginService.logout();
  }
  back(): void {
    this.isResponsive = false;
  }
  openFeedBackPage(): void {
    document.getElementById('feedback1').classList.add('feedbackDivCss');
    document.getElementById('feedback2').classList.add('feedbackiframeCss');
    document.getElementById('feedback3').classList.add('feedBackDiv1');
  }
  closeFeedBackPage(): void {
    document.getElementById('feedback1').classList.remove('feedbackDivCss');
    document.getElementById('feedback2').classList.remove('feedbackiframeCss');
    document.getElementById('feedback3').classList.remove('feedBackDiv1');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (window.innerWidth >= 767) {
      this.isResponsive = false;
    }
    this.changeLogoPosition();

  }

  changeLogoPosition() {
    if (document.getElementById('menu-name')) {
      const elements = document.getElementById('menu-name');
      if (elements.clientHeight && elements.clientHeight >= 95) {
        if (document.getElementById('nav-bar-logo-header')) {
          document.getElementById('nav-bar-logo-header').classList.add('log-image-responsive');
        }
      } else {
        document.getElementById('nav-bar-logo-header').classList.remove('log-image-responsive');
      }
    }
  }
  openCustomerChat(): void {
    window.open(window.location.origin + '/hea-web/chatMain.do', '_blank');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
