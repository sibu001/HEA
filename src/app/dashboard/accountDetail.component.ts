import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterContentInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/user';
import { Router } from '@angular/router';
import { SystemService } from '../store/system-state-management/service/system.service';
import { map, skipWhile } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { SubscriptionUtil } from '../utility/subscription-utility';
import { CustomerService } from '../store/customer-state-management/service/customer.service';
import { TableColumnData } from '../data/common-data';
import { TABLECOLUMN } from '../interface/table-column.interface';
declare var $: any;
@Component({
  selector: 'accountDetail',
  templateUrl: './accountDetail.component.html',
  styleUrls: ['./accountDetail.component.css']
})
export class AccountDetailComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('inp1') inp1: ElementRef;
  helpHide: boolean;
  helpHide1: boolean;
  helpHide2: boolean;
  customerCredentialsList: any[] = [];
  users: Users = new Users();
  viewConfigurationList: any;
  public errorMessage: any;
  emailData = {
    content : [],
    totalElements  : 0
  }
  optOutData = {
    content : [],
    totalElements  : 0
  }
  minPasswordLength : number = 8;
  maxPasswordLength : number = 100;
  pattern : '';
  charactersCount : number;
  regex : string;
  private subject : Subject<any> = new Subject();
  private readonly subscriptions: Subscription = new Subscription();
  public emailDataSource : Array<any>;
  public id: number;
  optOutKeys: Array<TABLECOLUMN> = TableColumnData.OPT_OUT_KEY;
  emailKeys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_EMAIL_KEY;
  public password: string = '';
  public confirmPassword : string = '';
  public userId : number;
  public confirmPasswordMissMatch : boolean = false;
  public uiBehaviourVersionList = Array.from(TableColumnData.UI_VERSION_BEAHAVIOUR);
  public userAccountDetails : any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private readonly systemService: SystemService,
    private readonly customerService: CustomerService) {
    this.users = this.loginService.getUser();
    this.getPasswordValidationRule();
  }
  ngAfterContentInit(): void {
    console.log("this.password : " +  this.password);
  }

  ngOnInit() {
    if (this.users.role === 'USERS') {
      this.getCustomerCredentials();
      this.userAccountDetails = this.users.outhMeResponse.user;
      this.id = this.users.outhMeResponse.id;

      this.getOptOut();
      this.loadOptOut();
  
      this.loadAllEmailSettings();
      this.getAllEmailSettings();
  
      this.emailSettingsList();

    } else {
      this.userAccountDetails = this.users.userData;
      this.loadCustomerViewConfiguration();
    }
    
    this.scrollTop();
  }

  edit(number: any) {
    let surveyCode, surveyId, paneCode;
    if (number === 1) {
      surveyCode = 'HomeProfile';
      paneCode = 'prf_residenceData';
    } else if (number === 3) {
      paneCode = 'prf_constuctionBuildYear';
      surveyCode = 'HomeProfile';
    } else if (number === 2) {
      surveyCode = 'Water';
      surveyId = this.users.surveyList[8].surveyId;
      paneCode = 'w_Intro';
    }

    surveyId = this.users.surveyList.find(data =>{
      if(data.surveyDescription.surveyCode = surveyCode){
        return data.panes.find(data1 =>{
          if(data1.paneCode == paneCode){
            return true;
          }
          return false;
        })
      }
      return false;
    }).surveyId;

    document.getElementById('loader').classList.add('loading');
    const object = {};
    this.subscriptions.add(this.loginService.performPostMultiPartData(object, 'customers/' + this.users.outhMeResponse.customerId + '/surveys/' + surveyCode + '/' + surveyId + '/panes/' + paneCode).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
        if (response.errorCode == null && response.errorMessage == null) {
          this.users.currentPaneNumber = response.data;
          this.loginService.setUser(this.users);
          this.router.navigate(['surveyView']);
        }
      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    ));
  }

  getCustomerCredentials() {
    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/credentials').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.customerCredentialsList = response;
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        document.getElementById('loader').classList.remove('loading');
      }
    ));
  }



  save(){
    if(this.users.role == 'USERS'){
      this.saveCustomerAccountDetais();
    }else{
      this.saveAdminAccountDetails();
    }
  } 

  saveAdminAccountDetails() {
    if(!this.saveNewPassword()) return;
    const userId = this.users.userData.userId;
    this.subscriptions.add(this.loginService.performPut(this.users.userData, 'users/' + userId).subscribe(
      response => {
        this.users.userData =response;
        this.users.name = response.name;
        this.users.username = response.username;
        this.loginService.setUser(this.users);
        this.router.navigate(['/admin/customer']);  
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        this.errorMessage = error;
        this.scrollTop();
      }
    ));
  }


  saveCustomerAccountDetais(){

    if(!this.saveNewPassword()) return;
    this.subscriptions.add(this.loginService.performPut(this.users.outhMeResponse, 'customers/' + this.users.outhMeResponse.customerId).subscribe(
      response => {
        this.users.outhMeResponse = response;
        this.users.name = response.user.name;
        this.users.username = response.user.username;
        this.loginService.setUser(this.users);
        this.router.navigate(['dashboard']);
      },
      error => {
        this.errorMessage = error;
        this.scrollTop();
      }
    ));

  }

  loadCustomerViewConfiguration() {
    this.systemService.loadViewConfigurationList(true);
    this.subscriptions.add(this.systemService.getViewConfigurationList().pipe(skipWhile((item: any) => !item))
      .subscribe((viewConfigurationList: any) => {
        this.viewConfigurationList = viewConfigurationList;
        if (!this.users.outhMeResponse.user.customerViewConfigurationId) {
          this.users.outhMeResponse.user.customerViewConfigurationId = '-1';
        }
      }));
  }

  goToTopicPage(surveyId, paneCode, surveyCode, index,customerId?:string) {
    document.getElementById('loader').classList.add('loading');
    const object = {};
    customerId = this.users && this.users.outhMeResponse && this.users.outhMeResponse.customerId ? this.users.outhMeResponse.customerId :customerId  
    this.loginService.performPostMultiPartData(object, 'customers/' + customerId + '/surveys/' + surveyCode + '/' + surveyId + '/panes/' + paneCode).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
        if (response.errorCode == null && response.errorMessage == null) {
          this.users.currentPaneNumber = response.data;
          this.users.paneNumber = index;
          this.users.isDashboard = false;
          this.loginService.setUser(this.users);
          this.router.navigate(['surveyView']);
        }

      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  cancel() {
    if (this.users.role === 'USERS') {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['admin/customer']);
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  loadAllEmailSettings(){
    this.customerService.loadEmailSettingList(this.id);
  }

  getAllEmailSettings(){
    this.subscriptions.add(
      this.customerService.getEmailSettingList()
        .pipe(
          skipWhile((item: any) => !item),
          map((item) => item.filter((item2) => item2.mailDescription.active))
        )
        .subscribe((emailSetting: any) => {
          this.emailData.content = emailSetting;
          this.emailData.totalElements = emailSetting.length;
          this.subject.next('emailSettings');
        }));
  }

  loadOptOut() {
    this.customerService.loadOptOutList(this.id);
  }

  getOptOut(){
    this.subscriptions.add(this.customerService.getOptOutList().
    pipe(
      skipWhile((item: any) => !item),
      map((item) => {
        return item.filter((item2) => item2.mailDescription.active);
      })
    )
    .subscribe((optOutList: any) => {
      this.optOutData.content = optOutList;
      this.optOutData.totalElements = optOutList.length;
      this.subject.next('optOutList');
    }));
  }

  emailSettingsList(){
    this.subscriptions.add(
      this.subject
      .subscribe(
        response =>{
          if(this.emailData.content && this.optOutData.content){
          for(let optOut of this.optOutData.content){
            for(let emailData of this.emailData.content){
              if(emailData.mailDescriptionId == optOut.mailDescriptionId){
                emailData.active = false;
                break;
              }
            }
          }
          this.emailDataSource = [...this.emailData.content];
        }
        }
      )
    )
  }

  deleteOptOut(event: any) {
    this.customerService.deleteOptOut(this.id, event.mailDescriptionId);
  }

  emailSettingsCheckBoxEvent(event : any){
    console.log(event);
    if(!event.optional){
      this.customerService.saveOptOut(this.id,event.mailDescriptionId);
    }else if(event.optional){
      this.customerService.deleteOptOut(this.id,event.mailDescriptionId);
    }
  }

  isconfirmPasswordValid(confirmPassword){
    if(confirmPassword != this.password){
      this.confirmPasswordMissMatch = true;
      return false
    }

    this.confirmPasswordMissMatch = false;
    return true;
  }

  getPasswordValidationRule() {
    this.customerService.loadPasswordValidationRule();
    this.subscriptions.add(this.customerService.getPasswordValidationRule()
    .pipe(skipWhile((item: any) => !item))
      .subscribe((passwordValidationRule: any) => {
        if (passwordValidationRule.data && passwordValidationRule.data.length > 0) {
          this.maxPasswordLength = passwordValidationRule.data[0].maximumLength;
          this.minPasswordLength = passwordValidationRule.data[0].minimumLength;
          // if (passwordValidationRule.data.length > 1 && passwordValidationRule.data[1].rules.length > 0) {
          //   this.pattern = passwordValidationRule.data[1].rules[0].validCharacters;
          //   this.charactersCount = passwordValidationRule.data[1].rules[0].numberOfCharacters;
          // }
          // this.regex = '^.*(?=(?:.*?[' + this.pattern
          //   .replace(']', '').concat('\\\]')
          //   + ']){' + this.charactersCount + ',}).*$';
        }
      }));
  }

  saveNewPassword() {

    if(!this.isconfirmPasswordValid(this.confirmPassword)){
      this.scrollTop();
      return false;
    }

    if(this.password){
      const self = this;
      setTimeout(() => {
        self.subscriptions.add(self.customerService.setNewPassword(self.userId, self.password)
        .pipe(skipWhile((item: any) => !item))
        .subscribe((passwordValidation: any) => {
          console.log(passwordValidation);
        }));
      },500);
    }

    return true;
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}