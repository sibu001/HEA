import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { GoogleMapComponent } from 'src/app/common/google-map/google-map.component';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { DatePipe, Location } from '@angular/common';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { UtilityCredentialsComponent } from '../utility-credentials/utility-credentials.component';
import { CustomerAlertComponent } from '../customer-alert/customer-alert.component';
import { CustomerEventTypeComponent } from '../customer-event-type/customer-event-type.component';
import { StaffNoteComponent } from '../staff-note/staff-note.component';
import { HttpParams } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material';
import { MustMatch } from 'src/app/common/password.validator';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();
  customerForm: FormGroup;
  passwordForm: FormGroup;
  customerGroupList: any;
  coachUserList: any;
  pgeHasPoolDisabled = false;
  placeCode: Array<any>;
  statusData: Array<any> = TableColumnData.STATUS_DATA;
  credentialsKeys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_CREDENTIAL_KEY;
  public credentialsDataSource: any;
  public credentialsData = {
    content: [],
    totalElements: 0,
  };

  alertsKeys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_ALERT_KEY;
  public alertsDataSource: any;
  public alertsData = {
    content: [],
    totalElements: 0,
  };

  eventKeys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_EVENT_KEY;
  public eventDataSource: any;
  public eventData = {
    content: [],
    totalElements: 0,
  };

  staffKeys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_STAFF_KEY;
  public staffDataSource: any;
  public staffData = {
    content: [],
    totalElements: 0,
  };

  filesKeys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_FILE_KEY;
  public filesDataSource: any;
  public filesData = {
    content: [],
    totalElements: 0,
  };
  zoom = 17;
  lat = 51.673858;
  lng = 7.815982;
  id: any;
  isForce = false;
  fileObject: any;
  description = '';
  minLength = 12;
  maxLength = 100;
  pattern = '';
  regex = '';
  charactersCount = 0;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly customerService: CustomerService,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly location: Location,
    private readonly router: Router,
    private datePipe: DatePipe,
    private readonly el: ElementRef) {
    this.getPasswordValidationRule();
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.findPlace(true, '');
    this.loadCustomerGroup();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.loadUtilityCredential(this.id);
      this.loadCustomerAlert(this.id);
      this.loadCustomerEvent(this.id);
      this.loadStaffNote(this.id);
      this.loadCustomerFile(this.id);
      this.customerService.loadCustomerById(this.id);
      this.loadCustomerById();
    }
  }

  findPlace(force: boolean, filter: string): any {
    this.systemUtilityService.loadPlaceList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getPlaceList().pipe(skipWhile((item: any) => !item))
      .subscribe((placeList: any) => {
        this.placeCode = placeList;
      }));
  }
  loadCustomerById() {
    this.subscriptions.add(this.customerService.getCustomerById().pipe(skipWhile((item: any) => !item))
      .subscribe((customer: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/customer/customerEdit'], { queryParams: { 'id': customer.customerId } });
        }
        this.setForm(customer);
      }));
  }
  loadCustomerGroup() {
    this.systemService.loadCoachUserList(true, '?filter.withRole=COACH');
    this.systemService.loadCustomerGroupList(false, '');
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupList = customerGroupList;
      }));
    this.subscriptions.add(this.systemService.getCoachUserList().pipe(skipWhile((item: any) => !item))
      .subscribe((coachUserList: any) => {
        this.coachUserList = coachUserList.list;
      }));

  }
  setPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(this.maxLength), Validators.minLength(this.minLength), Validators.pattern(this.pattern)]],
      confirmPassword: ['']
    }, { validator: MustMatch('password', 'confirmPassword') });
  }
  // checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  //   const pass = group.get('password').value;
  //   const confirmPass = group.get('confirmPassword').value;
  //   return pass === confirmPass ? null : { notSame: true };
  // }
  setForm(event: any) {
    this.customerForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      customerId: [event !== undefined ? event.customerId : ''],
      customerGroupId: [event !== undefined ? event.customerGroupId : 1],
      programGroupId: [event !== undefined ? event.programGroupId : ''],
      userId: [event !== undefined ? event.userId : ''],
      coachUserId: [event !== undefined ? event.coachUserId : ''],
      auditId: [event !== undefined ? event.auditId : ''],
      activationDate: [event !== undefined ? (this.datePipe.transform(event.activationDate, 'MM/dd/yyyy h:mm:ss')) : ''],
      staffPermission: [event !== undefined ? event.staffPermission : true],
      findReason: [event !== undefined ? event.findReason : ''],
      phoneNumber: [event !== undefined ? event.phoneNumber : ''],
      placeCode: [event !== undefined ? event.placeCode : 'ALAMEDA'],
      city: [event !== undefined ? event.city : ''],
      postalCode: [event !== undefined ? event.postalCode : ''],
      state: [event !== undefined ? event.state : ''],
      street1: [event !== undefined ? event.street1 : ''],
      pgeAddressValidated: [event !== undefined ? event.pgeAddressValidated : ''],
      pgeAddress: [event !== undefined ? event.pgeAddress : ''],
      pgeCity: [event !== undefined ? event.pgeCity : ''],
      pgePostalCode: [event !== undefined ? event.pgePostalCode : ''],
      pgeState: [event !== undefined ? event.pgeState : ''],
      pgeStreet: [event !== undefined ? event.pgeStreet : ''],
      accountNumber: [event !== undefined ? event.accountNumber : ''],
      accountAddressNumber: [event !== undefined ? event.accountAddressNumber : ''],
      pgeAgreementSigned: [event !== undefined ? event.pgeAgreementSigned : ''],
      pgeHasPool: [event !== undefined ? event.pgeHasPool : ''],
      solarPvInstalled: [event !== undefined ? event.solarPvInstalled : ''],
      calWaterAccount: [event !== undefined ? event.calWaterAccount : null],
      purismaAccount: [event !== undefined ? event.purismaAccount : null],
      zillowConstructionSQFT: [event !== undefined ? event.zillowConstructionSQFT : ''],
      zillowLotSize: [event !== undefined ? event.zillowLotSize : ''],
      zillowYearBuilt: [event !== undefined ? event.zillowYearBuilt : ''],
      homeProfileHash: [event !== undefined ? event.homeProfileHash : ''],
      homeProfileId: [event !== undefined ? event.homeProfileId : ''],
      constructionSQFT: [event !== undefined ? event.constructionSQFT : ''],
      lotSize: [event !== undefined ? event.lotSize : ''],
      yearBuilt: [event !== undefined ? event.yearBuilt : ''],
      monthBillBig: [event !== undefined ? event.monthBillBig : ''],
      permissionGranted: [event !== undefined ? event.permissionGranted : ''],
      livedMoreThan: [event !== undefined ? event.livedMoreThan : ''],
      historyCollected: [event !== undefined ? event.historyCollected : ''],
      constructionValidated: [event !== undefined ? event.constructionValidated : ''],
      optOutMail: [event !== undefined ? event.optOutMail : ''],
      pgeBillDateDay: [event !== undefined ? event.pgeBillDateDay : ''],
      notes: [event !== undefined ? event.notes : null],
      paidService: [event !== undefined ? event.paidService : null],
      needScraping: [event !== undefined ? event.needScraping : ''],
      needVACACalculation: [event !== undefined ? event.needVACACalculation : ''],
      needSVCalculation: [event !== undefined ? event.needSVCalculation : ''],
      needSACalculation: [event !== undefined ? event.needSACalculation : ''],
      deleted: [event !== undefined ? event.deleted : ''],
      hasElectricity: [event !== undefined ? event.hasElectricity : ''],
      hasElectricityCharge: [event !== undefined ? event.hasElectricityCharge : ''],
      hasGas: [event !== undefined ? event.hasGas : ''],
      hasGasCharge: [event !== undefined ? event.hasGasCharge : ''],
      hasWater: [event !== undefined ? event.hasWater : ''],
      hasElectricDetail: [event !== undefined ? event.hasElectricDetail : ''],
      hasWaterCharge: [event !== undefined ? event.hasWaterCharge : ''],
      hasGasDetail: [event !== undefined ? event.hasGasDetail : ''],
      excludeFromReports: [event !== undefined ? event.excludeFromReports : ''],
      ngHeatingModel: [event !== undefined ? event.ngHeatingModel : null],
      elCoolingModel: [event !== undefined ? event.elCoolingModel : null],
      elHeatingModel: [event !== undefined ? event.elHeatingModel : ''],
      modelChangedBy: [event !== undefined ? event.modelChangedBy : ''],
      eligibleStartDate: [event !== undefined ? event.eligibleStartDate : ''],
      latitude: [event !== undefined ? event.latitude : ''],
      longitude: [event !== undefined ? event.longitude : ''],
      maxAlertLevel: [event !== undefined ? event.maxAlertLevel : ''],
      smePeriod: [event !== undefined ? event.smePeriod : ''],
      stripeCustomerId: [event !== undefined ? event.stripeCustomerId : null],
      sharedPercentage: [event !== undefined ? event.sharedPercentage : null],
      viewedHomepage: [event !== undefined ? event.viewedHomepage : ''],
      stopJob: [event !== undefined ? event.stopJob : ''],
      allowUIVersion: [event !== undefined ? event.allowUIVersion : ''],
      uiVersion: [event !== undefined ? event.uiVersion : 'V1'],
      programGroup: [event !== undefined ? event.programGroup : null],
      coachUser: [event !== undefined ? event.customerGroup : null],
      registrationDate: [event !== undefined ? (this.datePipe.transform(event.registrationDate, 'MM/dd/yyyy h:mm:ss')) : null],
      vacaCalculationDate: [event !== undefined ? (this.datePipe.transform(event.vacaCalculationDate, 'MM/dd/yyyy h:mm:ss')) : null],
      lastMonthlyCalc: [event !== undefined ? (this.datePipe.transform(event.lastMonthlyCalc, 'MM/dd/yyyy h:mm:ss')) : null],
      user: this.formBuilder.group({
        userId: [event !== undefined ? event.user.userId : ''],
        username: [event !== undefined ? event.user.username : ''],
        name: [event !== undefined ? event.user.name : '', Validators.required],
        email: [event !== undefined ? event.user.email : '', Validators.required],
        staffPhoneNumber: [event !== undefined ? event.user.staffPhoneNumber : ''],
        status: [event !== undefined ? event.user.status : 0],
        deleted: [event !== undefined ? event.user.deleted : ''],
        homeowner: [event !== undefined ? event.user.homeowner : ''],
        comments: [event !== undefined ? event.user.comments : ''],
        surveyVersionSetting: [event !== undefined ? event.user.surveyVersionSetting : ''],
        accessToUserPassword: [event !== undefined ? event.user.accessToUserPassword : ''],
        registrationAuthentication: [event !== undefined ? event.user.registrationAuthentication : ''],
        restorePasswordKey: [event !== undefined ? event.user.restorePasswordKey : ''],
        restorePasswordDate: [event !== undefined ? event.user.restorePasswordDate : ''],
        lastSuccessfulUtilityReadDate: [event !== undefined ? (this.datePipe.transform(event.user.lastSuccessfulUtilityReadDate, 'MM/dd/yyyy h:mm:ss')) : ''],
        passwordStrengthLevel: [event !== undefined ? event.user.passwordStrengthLevel : ''],
        passwordNeedChange: [event !== undefined ? event.user.passwordNeedChange : ''],
        customerViewConfigurationId: [event !== undefined ? event.user.customerViewConfigurationId : ''],
        passwordChangeDate: [event !== undefined ? event.user.passwordChangeDate : ''],
        id: [event !== undefined ? event.user.id : ''],
      }),
      customerGroup: [event !== undefined ? event.customerGroup : {}],
      place: this.formBuilder.group({
        place: [event !== undefined ? event.place.place : ''],
        placeName: [event !== undefined ? event.place.placeName : ''],
        stationId: [event !== undefined ? event.place.stationId : ''],
        timezone: [event !== undefined ? event.place.timezone : ''],
        latitude: [event !== undefined ? event.place.latitude : ''],
        longitude: [event !== undefined ? event.place.longitude : ''],
        id: [event !== undefined ? event.place.id : ''],
      }),
      passwordForm: this.formBuilder.group(
        {
          password: ['',
            [
              Validators.required,
              Validators.minLength(this.minLength),
              Validators.maxLength(this.maxLength)
            ]
          ],
          confirmPassword: ['', Validators.required],
        },
        { validator: MustMatch('password', 'confirmPassword') }),
      activationMail: [false],
      repeatedActivationMail: [false],
    });
  }

  getPasswordValidationRule() {
    this.customerService.loadPasswordValidationRule();
    this.subscriptions.add(this.customerService.getPasswordValidationRule().pipe(skipWhile((item: any) => !item))
      .subscribe((passwordValidationRule: any) => {
        if (passwordValidationRule.data && passwordValidationRule.data.length > 0) {
          this.maxLength = passwordValidationRule.data[0].maximumLength;
          this.minLength = passwordValidationRule.data[0].minimumLength;
          if (passwordValidationRule.data.length > 1 && passwordValidationRule.data[1].rules.length > 0) {
            this.pattern = passwordValidationRule.data[1].rules[0].validCharacters;
            this.charactersCount = passwordValidationRule.data[1].rules[0].numberOfCharacters;
          }
          this.regex = '^.*(?=(?:.*?[' + this.pattern
            .replace(']', '').concat('\\\]')
            + ']){' + this.charactersCount + ',}).*$';
          this.p.password.setValidators([Validators.pattern(new RegExp(this.regex))]);
          this.p.password.updateValueAndValidity();
          // this.setPasswordForm();
        }
        console.log(passwordValidationRule);
      }));
  }

  onchange() {
    console.log(this.p.password.errors);
  }
  getValidateNewPassword(password: any) {
    this.customerService.loadValidateNewPassword(password);
    this.subscriptions.add(this.customerService.getValidateNewPassword().pipe(skipWhile((item: any) => !item))
      .subscribe((passwordValidation: any) => {
        console.log(passwordValidation);
      }));
  }

  saveValidateNewPassword(password: any) {
    const params = new HttpParams()
      .set('password', password);
    this.subscriptions.add(this.customerService.saveValidateNewPassword(params).pipe(skipWhile((item: any) => !item))
      .subscribe((passwordValidation: any) => {
        console.log(passwordValidation);
      }));
  }

  saveNewPassword(password: any) {
    this.subscriptions.add(this.customerService.setNewPassword(this.id, password).pipe(skipWhile((item: any) => !item))
      .subscribe((passwordValidation: any) => {
        console.log(passwordValidation);
      }));
  }

  openAddressOnGoogleMap() {
    this.dialog.open(GoogleMapComponent, {
      width: '515px',
      height: '500px',
      data: {
        lat: this.customerForm.value.latitude,
        lng: this.customerForm.value.longitude
      },
      disableClose: false
    });
  }

  loadUtilityCredential(customerId: any) {
    this.customerService.loadUtilityCredentialList(customerId);
    this.subscriptions.add(this.customerService.getUtilityCredentialDataSourceList().pipe(skipWhile((item: any) => !item))
      .subscribe((utilityCredentialList: any) => {
        this.credentialsData.content = utilityCredentialList;
        this.credentialsDataSource = [...this.credentialsData.content];
      }));
  }
  editUtility(event: any) {
    const obj = {
      row: event
    };
    this.openUtilityCredential(obj);
  }
  openUtilityCredential(event: any) {
    if (!event) {
      event = {
        customerId: this.id,
        activationMail: this.customerForm.value.activationMail
      };
    } else {
      event.customerId = this.id;
      event.activationMail = this.customerForm.value.activationMail;
    }
    const dialogRef = this.dialog.open(UtilityCredentialsComponent, {
      width: '70vw',
      height: '70vh',
      data: event,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUtilityCredential(this.id);
      }
    });
  }

  deleteUtilityCredential(event: any) {
    this.subscriptions.add(this.customerService.deleteUtilityCredentialById(this.id, event.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.loadUtilityCredential(this.id);
      }));
  }

  loadCustomerAlert(customerId: any) {
    this.customerService.loadAlertList(customerId);
    this.subscriptions.add(this.customerService.getAlertList().pipe(skipWhile((item: any) => !item))
      .subscribe((alertList: any) => {
        this.alertsData.content = alertList;
        this.alertsDataSource = [...this.alertsData.content];
      }));
  }

  editAlert(event: any) {
    const obj = {
      row: event
    };
    this.addCustomerAlert(obj);
  }

  addCustomerAlert(event: any) {
    if (!event) {
      event = {
        customerId: this.id
      };
    } else {
      event.customerId = this.id;
    }
    const dialogRef = this.dialog.open(CustomerAlertComponent, {
      width: '50vw',
      height: '50vh',
      data: event,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCustomerAlert(this.id);
      }
    });
  }


  deleteCustomerAlert(event: any) {
    this.subscriptions.add(this.customerService.deleteAlertById(this.id, event.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.loadCustomerAlert(this.id);
      }));
  }

  loadCustomerEvent(customerId: any) {
    this.customerService.loadCustomerEventList(customerId);
    this.subscriptions.add(this.customerService.getCustomerEventList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerEventList: any) => {
        this.eventData.content = customerEventList;
        this.eventDataSource = [...this.eventData.content];
      }));
  }
  addCustomerEvent(event: any) {
    if (!event) {
      event = {
        customerId: this.id,
        isList: false
      };
    } else {
      event.customerId = this.id;
      event.isList = false;
    }
    const dialogRef = this.dialog.open(CustomerEventTypeComponent, {
      width: '50vw',
      height: '50vh',
      data: event,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCustomerEvent(this.id);
      }
    });
  }

  editCustomerEvent(event: any) {
    const obj = {
      row: event
    };
    this.addCustomerEvent(obj);
  }
  deleteCustomerEvent(event: any) {
    this.subscriptions.add(this.customerService.deleteCustomerEventById(this.id, event.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.loadCustomerEvent(this.id);
      }));
  }

  loadStaffNote(customerId: any) {
    this.customerService.loadStaffNoteList(customerId);
    this.subscriptions.add(this.customerService.getStaffNoteList().pipe(skipWhile((item: any) => !item))
      .subscribe((staffNote: any) => {
        this.staffData.content = staffNote;
        this.staffData.totalElements = staffNote.length;
        this.staffDataSource = [...this.staffData.content];
      }));
  }
  addStaffNote(event: any) {
    if (!event) {
      event = {
        customerId: this.id,
        isList: false
      };
    } else {
      event.customerId = this.id;
      event.isList = false;
    }
    const dialogRef = this.dialog.open(StaffNoteComponent, {
      width: '50vw',
      height: '50vh',
      data: event,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStaffNote(this.id);
      }
    });
  }

  editStaffNote(event: any) {
    const obj = {
      row: event
    };
    this.addStaffNote(obj);
  }

  deleteStaffNote(event: any) {
    this.subscriptions.add(this.customerService.deleteStaffNoteById(this.id, event.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.loadStaffNote(this.id);
      }));
  }
  loadCustomerFile(customerId: any) {
    this.customerService.loadCustomerFileList(customerId);
    this.subscriptions.add(this.customerService.getCustomerFileList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerFileList: any) => {
        this.filesData.content = customerFileList.list;
        this.filesData.totalElements = customerFileList.length;
        this.filesDataSource = [...this.filesData.content];
      }));
  }

  addFile() {
    const element: HTMLElement = document.querySelectorAll('#fileInput')[0] as HTMLElement;
    element.click();
  }

  uploadFile() {
    this.subscriptions.add(this.customerService.saveCustomerFile(this.id, this.fileObject, '?description=' + this.description).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.loadCustomerFile(this.id);
      }));
  }

  deleteCustomerFile(customerId: any, event: any) {
    this.subscriptions.add(this.customerService.deleteCustomerFileById(customerId, event.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.loadCustomerFile(customerId);
      }));
  }

  handleInLineEditEvent(event: any): any {
    const i = this.filesData.content.findIndex((item: any) => item.name === event.row.name);
    this.filesData.content[i].isInlineEdit = false;
    this.filesDataSource = [...this.filesData.content];

  }

  handleInLineSaveEvent(event: any): any {
    const params = new HttpParams()
      .set('fileName', event.row.name)
      .set('description', event.row.description);
    this.subscriptions.add(this.customerService.updateCustomerFile(this.id, '', params).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.loadCustomerFile(this.id);
      }));

  }
  handle(files: any) {
    if (files.length > 0) {
      this.fileObject = files[0];
    }
  }

  changeDropDownValue(event: any, type: any) {
    let i = -1;
    switch (type) {
      case 'coachUser':
        i = this.coachUserList.findIndex((item: any) => item.id === event.target.value);
        if (i !== -1) {
          this.customerForm.value.coachUser = this.coachUserList[i];
        } else {
          this.customerForm.value.coachUser = null;
        }
        break;
      case 'customerGroup':
        i = this.customerGroupList.findIndex((item: any) => item.id === event.target.value);
        if (i !== -1) {
          this.customerForm.value.customerGroup = this.customerGroupList[i];
        } else {
          this.customerForm.value.customerGroup = '';
        }
        break;
      case 'place':
        i = this.placeCode.findIndex((item: any) => item.id === event.target.value);
        if (i !== -1) {
          this.customerForm.value.place = this.placeCode[i];
        } else {
          this.customerForm.value.place = '';
        }
        break;

      default:
        break;
    }
    console.log(event.target.value);
  }

  delete() {
    this.subscriptions.add(this.customerService.deleteCustomerById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/customer/customerList']);
      }));
  }

  cancel() {
    this.location.back();
  }

  previewFile(event: any) {
    const url = window.location.origin + '/' + event.fileName + '?preview=true&fileName=Test.txt';
    window.open(url, '_blank');
  }

  save() {
    if (this.customerForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        if (this.customerForm.value.repeatedActivationMail) {
          const mailObj = {
            customerId: this.id,
            sendRepeatedActivationMail: this.customerForm.value.repeatedActivationMail
          };
          this.sendActivationMail(mailObj);
        }
        if (this.customerForm.value.activationMail) {
          const mailObj = {
            customerId: this.id,
            sendActivationMail: this.customerForm.value.activationMail
          };
          this.sendActivationMail(mailObj);
        }
        this.subscriptions.add(this.customerService.updateCustomer(this.id, this.customerForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerById();
          }));
      } else {
        this.subscriptions.add(this.customerService.saveCustomer(this.customerForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerById();
          }));
      }
    } else {
      this.validateForm();
    }
  }

  clearCustomerValueCache() {
    if (this.id) {
      this.subscriptions.add(this.customerService.clearCustomerValueCache(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
        }));
    }
  }

  recalculateCustomerVariable() {
    if (this.id) {
      this.subscriptions.add(this.customerService.recalculateCustomerVariable(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
        }));
    }
  }

  sendActivationMail(mailObject: any) {
    this.subscriptions.add(this.customerService.sendActivationMailMessage(mailObject).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
      }));
  }

  validateForm() {
    for (const key of Object.keys(this.customerForm.controls)) {
      if (this.customerForm.controls[key].invalid && key === 'user') {
        const user = this.customerForm.controls.user as FormGroup;
        for (const keys of Object.keys(user.controls)) {
          if (user.controls[keys].invalid) {
            const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + keys + '"]');
            invalidControl.focus();
            break;
          }
        }
      }
      if (this.customerForm.controls[key].invalid && key !== 'user') {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.customerForm.controls; }
  get p() {
    const passwordForm = this.customerForm.controls.passwordForm as FormGroup;
    return passwordForm.controls;
  }
  get f1() {
    const user = this.customerForm.controls.user as FormGroup;
    return user.controls;
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
