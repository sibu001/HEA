import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, AfterViewChecked, DoCheck } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ShowInfoComponent } from './show-info/show-info.component';
import { MatDialog } from '@angular/material';
import { AppConstant } from '../utility/app.constant';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { UtilityService } from '../services/utility.service';
import { HttpParams } from '@angular/common/http';
import { AllowedMenuList } from '../utility/app.allowedMenuList';
import { AppUtility } from '../utility/app.utility';

declare var $: any;

export interface RootObject {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
  
})
export class HeadersComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked,DoCheck {

  hides = true;
  hideLogo = true;
  float: string;
  mobHeight: number;
  screenWidth: any;
  iframeUrl: string;
  isResponsive = false;
  users: Users = new Users();
  dialogRef: any; 
  testData : string = 'user test data';
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  allowedMenuListforUser : AllowedMenuList;

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
    this.allowedMenuListforUser  = this.users.allowedMenuList;
  }

  ngDoCheck(): void {

    // if(this.users.role == 'USERS' && this.router.url == '/surveyView'){
      if ((this.users.role == 'USERS' && this.router.url == '/surveyView' && this.users.surveyLength <= 3) ||
        (this.users.currentPaneNumber ? this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'Profile' : false)) {
         this.hideMenuOption();
     }else{
       this.showHiddenMenu();
     }
    // }else {
    //   this.showHiddenMenu();
    // } 
  
  }
  ngAfterViewChecked(): void {
    this.users = this.loginService.getUser();
    if ( this.router.url == '/surveyView' && 
    ((this.users.role == 'USERS' && this.users.surveyLength <= 3) ||
    (this.users.currentPaneNumber ? this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'Profile' : false))) {
     this.hideMenuOption();
 }else{
   this.showHiddenMenu();
 }
  }

  ngAfterViewInit(): void {
    if (this.users.theme === 'P4P') {
      if (document.getElementById('main-bar-menu')) {
        document.getElementById('main-bar-menu').classList.add('main-bar-menu-margin');
      }
    }
    this.changeLogoPosition();

    if ( this.router.url == '/surveyView' && 
    ((this.users.role == 'USERS' && this.users.surveyLength <= 3) ||
    (this.users.currentPaneNumber ? this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'Profile' : false))) {
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
  }

  ngOnInit(): void {
    // AppUtility.initPendingMessagesService(this.users.userId);
    // AppUtility.multicastPendingMessages(this.users.userId);
    /* for demonstration purposes only */

      this.subscriptions.push(
        this.loginService.userStateListner.subscribe(
          (users : Users) => {
            this.users = users;
          })
      );

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

  showHiddenMenu(){

    if (document.getElementById('_home')) {
      document.getElementById('_home').classList.remove('header_menu_none');
    }
    
    if (document.getElementById('_account')) {
      document.getElementById('_account').classList.remove('header_menu_none');
    }
    if (document.getElementById('all_topic')) {
      document.getElementById('all_topic').classList.remove('header_menu_none');
    }

    if (document.getElementById('_home1')) {
      document.getElementById('_home1').classList.remove('header_menu_none');
    }

    if (document.getElementById('all_topic1')) {
      document.getElementById('all_topic1').classList.remove('header_menu_none');
    }
    if (document.getElementById('_account1')) {
      document.getElementById('_account1').classList.remove('header_menu_none');
    }
    
  }

  hideMenuOption(){

    if (document.getElementById('_home')) {
      document.getElementById('_home').classList.add('header_menu_none');
    }
  
    if (document.getElementById('_account')) {
      document.getElementById('_account').classList.add('header_menu_none');
    }
    if (document.getElementById('all_topic')) {
      document.getElementById('all_topic').classList.add('header_menu_none');
    }

    if (document.getElementById('_home1')) {
      document.getElementById('_home1').classList.add('header_menu_none');
    }
  
    if (document.getElementById('all_topic1')) {
      document.getElementById('all_topic1').classList.add('header_menu_none');
    }
    if (document.getElementById('_account1')) {
      document.getElementById('_account1').classList.add('header_menu_none');
    }

  }

  hideResponsiveMenu(): void {
    if (this.isResponsive) {
      let surveyCode;
      if (this.users.currentPaneNumber) {
        surveyCode = this.users.currentPaneNumber.survey.surveyDescription.surveyCode;
      }
      if (this.users.surveyLength <= 3 || (this.users.currentPaneNumber ? surveyCode === 'Profile' : false)) {
        setTimeout(() => {
          this.headerResponsiveMenu();
        }, 30);
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
      this.closeOpenedDialogBox();
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
      panelClass : 'notification-dialog',
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
      if (this.users.role != 'USERS') {
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
      if (this.users.role != 'USERS') {
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
      if(this.router.url == '/surveyView'){
        localStorage.setItem('users',JSON.stringify(this.users));
        this.redirectUserToclassicUI();
        // this.sendDataToClassicVersion();
      }else{
      window.open(window.location.origin + '/hea-web/trendingHome.do', '_self');
      } 
    } else if(routeNumber = 10){
        window.open(window.location.origin + '/hea-web/customerList.do', '_self');
      }
  }

  sendDataToClassicVersion(){

    console.log(window.location.origin + '/hea-web/survey.do');
    window.open(window.location.origin + '/hea-web/survey.do','_self');
    

    // const user = this.loginService.getUser();
    // const data = user.currentPaneNumber;

    // const formData = new FormData();

    // formData.append("formAction","loadPane");
    // formData.append("surveyId",data.survey.surveyId);
    // formData.append("surveyDescriptionId",data.surveyDescriptionId);
    // formData.append("paneCode",data.currentPane.paneCode);
    // formData.append("userId",data.survey.userId);
    // formData.append("returnPath","surveyHistoryList.do")

    // document.getElementById('loader').classList.add('loading');
    // this.loginService.performPostMultiPartFromData(    
    //   formData, 'survey.do'
    // ).subscribe(
    //   (response) =>{
    //     console.log(response);
    //   } ,(error) =>{
    //     console.log(error.url);
    //       window.open(error.url,'_self');
    //   }
    // )

  }

  redirectUserToclassicUI(){

    const formData = new FormData();
    formData.append('uiCode','V1');
    document.getElementById('loader').classList.add('loading');
    this.loginService.performPostMultiPartFromData
    (formData,'customers/'+  this.users.outhMeResponse.customerId + '/selectUI')
    .subscribe((response : any) =>{
      this.sendDataToClassicVersion();
    }, error =>{ 
      console.log(error);
    },() =>{
      this.sendDataToClassicVersion();
    })

  }

  logouts(): void {
    this.closeOpenedDialogBox();
    this.loginService.logout();
  }

  closeOpenedDialogBox(){
     let closeButton = document.getElementsByClassName('closeButton')[0] as HTMLElement;
     if(closeButton) closeButton.click();
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
      AppUtility.isnavBarCollapsed = false;
    }else{
      AppUtility.isnavBarCollapsed = true;
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
