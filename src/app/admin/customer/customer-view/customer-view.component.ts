import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { GoogleMapComponent } from 'src/app/common/google-map/google-map.component';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { Location } from '@angular/common';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { UtilityCredentialsComponent } from '../utility-credentials/utility-credentials.component';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit, OnDestroy {
  customerForm: FormGroup;
  customerGroupList: any;
  coachUserList: any;
  pgeHasPoolDisabled: false;
  placeCode: Array<any> = TableColumnData.PLACE_CODE;
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
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly customerService: CustomerService,
    private readonly location: Location,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.loadCustomerGroup();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.customerService.loadCustomerById(this.id);
      this.subscriptions.add(this.customerService.getCustomerById().pipe(skipWhile((item: any) => !item))
        .subscribe((customer: any) => {
          this.setForm(customer);
        }));
    }
  }
  loadCustomerGroup() {
    this.systemService.loadCoachUserList(true, '?filter.withRole=COACH');
    this.systemService.loadCustomerGroupList(false);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupList = customerGroupList;
      }));
    this.subscriptions.add(this.systemService.getCoachUserList().pipe(skipWhile((item: any) => !item))
      .subscribe((coachUserList: any) => {
        this.coachUserList = coachUserList.list;
      }));

  }
  setForm(event: any) {
    this.customerForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      customerId: [event !== undefined ? event.customerId : ''],
      customerGroupId: [event !== undefined ? event.customerGroupId : 1],
      programGroupId: [event !== undefined ? event.programGroupId : ''],
      userId: [event !== undefined ? event.userId : ''],
      coachUserId: [event !== undefined ? event.coachUserId : ''],
      auditId: [event !== undefined ? event.auditId : ''],
      activationDate: [event !== undefined ? event.activationDate : ''],
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
      vacaCalculationDate: [event !== undefined ? event.vacaCalculationDate : ''],
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
      lastMonthlyCalc: [event !== undefined ? event.lastMonthlyCalc : ''],
      stripeCustomerId: [event !== undefined ? event.stripeCustomerId : null],
      sharedPercentage: [event !== undefined ? event.sharedPercentage : null],
      viewedHomepage: [event !== undefined ? event.viewedHomepage : ''],
      stopJob: [event !== undefined ? event.stopJob : ''],
      allowUIVersion: [event !== undefined ? event.allowUIVersion : ''],
      uiVersion: [event !== undefined ? event.uiVersion : 'V1'],
      programGroup: [event !== undefined ? event.programGroup : null],
      coachUser: [event !== undefined ? event.customerGroup : null],
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
        lastSuccessfulUtilityReadDate: [event !== undefined ? event.user.lastSuccessfulUtilityReadDate : ''],
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
    });
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

  openUtilityCredential(event: any) {
    this.dialog.open(UtilityCredentialsComponent, {
      width: '70vw',
      height: '70vh',
      data: event,
      disableClose: false
    });
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
    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(this.customerService.deleteCustomerById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
        this.router.navigate(['admin/customer/customerList']);
      },
        error => {
          document.getElementById('loader').classList.remove('loading');
          console.log(error);
        }));
  }

  cancel() {
    this.location.back();
  }

  save() {
    if (this.customerForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        document.getElementById('loader').classList.add('loading');
        this.subscriptions.add(this.customerService.updateCustomer(this.id, this.customerForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            document.getElementById('loader').classList.remove('loading');
            this.router.navigate(['admin/customer/customerList']);
          },
            error => {
              document.getElementById('loader').classList.remove('loading');
              console.log(error);
            }));
      } else {
        document.getElementById('loader').classList.add('loading');
        this.subscriptions.add(this.customerService.saveCustomer(this.customerForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            document.getElementById('loader').classList.remove('loading');
            this.router.navigate(['admin/customer/customerList']);
          },
            error => {
              document.getElementById('loader').classList.remove('loading');
              console.log(error);
            }));
      }
    } else {
      this.validateForm();
    }
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
  get f1() {
    const user = this.customerForm.controls.user as FormGroup;
    return user.controls;
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
