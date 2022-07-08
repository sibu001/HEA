import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { d } from '@angular/core/src/render3';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-utility-credentials',
  templateUrl: './utility-credentials.component.html',
  styleUrls: ['./utility-credentials.component.css']
})
export class UtilityCredentialsComponent implements OnInit , OnDestroy{
  utilityCredentialForm: FormGroup;
  credentialTypeList: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  public electricityInUse: boolean;
  public heatingInUse: boolean;
  public removeOldBills: boolean = false;
  public heatingServiceIds: Array<any>;
  public electricServiceIds: Array<any>;
  public usagePointsData  = { oauthRefreshToken : "", authScope : ""};
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly customerService: CustomerService,
    private readonly el: ElementRef,
    public dialogRef: MatDialogRef<UtilityCredentialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  ngOnInit() {
    this.getOpenedUtiliyCredentialsById();
    this.getOpenUtilityCredentials();
    this.setForm(undefined);
    this.findCredentialType(false, '');
    if (this.data.row !== undefined) {  
      if(this.data.row.subscriptionId == null){
        this.customerService.openUtilityCredentialsById(this.data.customerId,this.data.row.id);
      }else{
        this.customerService.openUtilityCredentials(this.data.customerId, this.data.row.subscriptionId);
      }
    }
  }

  getOpenedUtiliyCredentialsById(){
    this.subscriptions.add(this.customerService.getOpenUtilityCredentialsById()
    .subscribe(
      data =>{
        this.setFormStyle2(data);
        console.log({credential : data});
      }, error => {
        console.log(error);
      }))
  }

  getOpenUtilityCredentials(){
    this.subscriptions.add(this.customerService.getOpenedUtiliyCredentials().pipe(skipWhile((item: any) => item === undefined))
    .subscribe((response) => {
      console.log("new response" + JSON.stringify(response));
      this.setForm(response);
      this.getUsgaePoints(response.data);
      this.electricityInUse = response.data.credential.electricityInUse;
      this.heatingInUse = response.data.credential.heatingInUse;
    }));
  }

  getUsgaePoints(event){
    this.customerService.loadUsagePoints(event.credential.credentialTypeCode, event.credential.subscriptionId);
    this.subscriptions.add(this.customerService.getUsagePoints()
    .pipe(skipWhile((item: any) => !item))
    .subscribe(
      (usagePoints: any) => {
          this.usagePointsData = usagePoints;
      }, error => { console.error(error)}
    ));

  }

  showSelectedServiceId(event : any, serviceId : string ,list :any) {

    let selectedId;
    if( serviceId == "electricityServiceId")
      selectedId = event.credential.electricityServiceId;
    else 
      selectedId = event.credential.heatingServiceId;

    return list.map( (services) => services.customerAgreement).indexOf(selectedId);
  }

  findCredentialType(force: boolean, filter: string): void {
    this.systemService.loadCredentialTypeList(force, filter);
    this.subscriptions.add(this.systemService.getCredentialTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialTypeList: any) => {
        this.credentialTypeList = credentialTypeList;
      }));
  }

  setForm(event: any) {
    if (event !== undefined) {
      event = event.data;

      this.getAllElectricityServiceIdFromList(event.serviceIds);
      this.getAllHeatingServiceIdFromList(event.serviceIds);

    var selectedElectricityIndex =  this.showSelectedServiceId(event,"electricityServiceId",this.electricServiceIds);
    var selectedHeatingIndex = this.showSelectedServiceId(event,"heatingServiceId",this.heatingServiceIds);

    }
    
    this.utilityCredentialForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      credentialTypeCode: [event !== undefined ? event.credential.credentialType.credentialType : 'calwater', Validators.required],
      login: [event !== undefined ? event.credential.login : null],
      password: [event !== undefined ? event.credential.password : null],
      active: [event !== undefined ? event.credential.active : false],
      account: [event !== undefined ? event.credential.account : null],
      electricityServiceId: [event !== undefined ? this.electricServiceIds[selectedElectricityIndex].customerAgreement : null],
      electricityMeterId: [event !== undefined ? event.credential.electricityMeterId : null],
      electricitySignDate: [event !== undefined ? AppUtility.getDateFromMilllis(this.electricServiceIds[this.electricServiceIds.length -1].signDate) : null],
      heatingServiceId: [event !== undefined ? this.heatingServiceIds[selectedHeatingIndex].customerAgreement : null],
      heatingMeterId: [event !== undefined ? event.credential.heatingMeterId  : null],
      heatingSignDate: [event !== undefined ? AppUtility.getDateFromMilllis(this.heatingServiceIds[this.heatingServiceIds.length -1].signDate) : null],
      waterServiceId: [event !== undefined ? event.credential.waterServiceId : null],
      waterMeterId: [event !== undefined ? event.credential.waterMeterId : null],
      waterSignDate: [event !== undefined ? event.credential.waterSignDate : null],
      subscriptionId: [event !== undefined ? event.subscriptionId : null],
      feedId: [event !== undefined ? event.feedId : null],
      houseNumber: [event !== undefined ? event.credential.houseNumber : null],
      postalCode: [event !== undefined ? event.credential.postalCode : null],
      billDateDay: [event !== undefined ? event.credential.billDateDay : null],
      dataInUse: [event !== undefined ? event.credential.dataInUse : false],
      utilityInUse: [event !== undefined ? event.credential.utilityInUse : false],
      electricityInUse: [event !== undefined ? event.credential.electricityInUse : false],
      heatingInUse: [event !== undefined ? event.credential.heatingInUse : false],
      waterInUse: [event !== undefined ? event.credential.waterInUse : false],
    });

  }


  setFormStyle2(event){
    this.utilityCredentialForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      credentialTypeCode: [event !== undefined ? event.credentialType.credentialType : 'calwater', Validators.required],
      login: [event !== undefined ? event.login : null],
      password: [event !== undefined ? event.password : null],
      active: [event !== undefined ? event.active : false],
      account: [event !== undefined ? event.account : null],
      electricityServiceId: [event !== undefined ? event.electricityServiceId : null],
      electricityMeterId: [event !== undefined ? event.electricityMeterId : null],
      electricitySignDate: [event !== undefined && event.electricitySignDate !== null? AppUtility.getDateFromMilllis(this.electricServiceIds[this.electricServiceIds.length -1].signDate) : null],
      heatingServiceId: [event !== undefined ? event.heatingServiceId : null],
      heatingMeterId: [event !== undefined ? event.heatingMeterId  : null],
      heatingSignDate: [event !== undefined && event.heatingSignDate !== null ? event.heatingSignDateAppUtility.getDateFromMilllis(this.heatingServiceIds[this.heatingServiceIds.length -1].signDate) : null],
      waterServiceId: [event !== undefined ? event.waterServiceId : null],
      waterMeterId: [event !== undefined ? event.waterMeterId : null],
      waterSignDate: [event !== undefined ? event.waterSignDate : null],
      subscriptionId: [event !== undefined ? event.subscriptionId : null],
      feedId: [event !== undefined ? event.feedId : null],
      houseNumber: [event !== undefined ? event.houseNumber : null],
      postalCode: [event !== undefined ? event.postalCode : null],
      billDateDay: [event !== undefined ? event.billDateDay : null],
      dataInUse: [event !== undefined ? event.dataInUse : false],
      utilityInUse: [event !== undefined ? event.utilityInUse : false],
      electricityInUse: [event !== undefined ? event.electricityInUse : false],
      heatingInUse: [event !== undefined ? event.heatingInUse : false],
      waterInUse: [event !== undefined ? event.waterInUse : false],
    });
  }

  getDateFromMilllis(millisecond: any) {
    const date = new Date(millisecond)
    var d = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear()+' '+date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return d;
  }

  getAllHeatingServiceIdFromList(serviceList: any): Array<any> {
    this.heatingServiceIds = serviceList.filter((service) => {
      if (service.serviceKind == 1)
        return true;
      return false;
    });
    return this.heatingServiceIds;
  }

  getAllElectricityServiceIdFromList(serviceList: any): Array<any> {
    this.electricServiceIds = serviceList.filter((service) => {
      if (service.serviceKind == 0)
        return true;
      return false;
    });
    return this.electricServiceIds;
  }


  onNoClick() {
    this.dialogRef.close(false);
  }

  validateCredentialData() {
    this.subscriptions.add(this.customerService.validateUtilityCredentialData(this.data.customerId, this.data.row.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
      }));
  }

  rescrapeCustomerUsage(updateOnly: boolean) {
    const params = new HttpParams()
      .set('sendActivationLink', '' + this.data.activationMail)
      .set('updateOnly', '' + updateOnly);
    this.subscriptions.add(this.customerService.rescrapeCustomerUsage(this.data.customerId, this.data.row.id, params).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
      }));
  }

  settingServiceInUseValue(){
    if(this.utilityCredentialForm.value.heatingServiceId == "none")
      this.utilityCredentialForm.value.heatingInUse = false;
    else
      this.utilityCredentialForm.value.heatingInUse = true;

    if(this.utilityCredentialForm.value.electricityServiceId == "none")
      this.utilityCredentialForm.value.electricityInUse = false;
    else
      this.utilityCredentialForm.value.electricityInUse = true;
  }

  save() {
    this.utilityCredentialForm.value.heatingSignDate = new Date(this.utilityCredentialForm.value.heatingSignDate).getTime(); 
    this.utilityCredentialForm.value.electricitySignDate = new Date(this.utilityCredentialForm.value.electricitySignDate).getTime(); 
    this.settingServiceInUseValue();

    if (this.utilityCredentialForm.valid) {
      if (this.data.row && this.data.row.id) {
        this.subscriptions.add(this.customerService.updateUtilityCredential(this.data.customerId, this.data.row.id, this.utilityCredentialForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      } else {
        this.subscriptions.add(this.customerService.saveUtilityCredential(this.data.customerId, this.utilityCredentialForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.utilityCredentialForm.controls)) {
      if (this.utilityCredentialForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  async rescrapeBills(smartMeter: string) {
    let smartMeterId;
    if (smartMeter == "Electric") {
      smartMeterId = this.data.row.electricityMeterId;
    }
    if (smartMeter == "Gas") {
      smartMeterId = this.data.row.heatingMeterId;
    }
    const params = new HttpParams()
      .set('removeOldBills', '' + this.removeOldBills);
    this.subscriptions.add(this.customerService.rescrapeCustomerBills(this.data.customerId, this.data.row.id, smartMeterId, params).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {

      }));
    this.dialogRef.close(true);
  }

  setHeatingmeterId(){
    var agrement =  this.utilityCredentialForm.get('heatingServiceId').value;
    var agrement1 =  this.heatingServiceIds.find(
      (item) =>{
          if(item.customerAgreement == agrement)
            return true;
          return false;
      }
    )
   
    this.utilityCredentialForm.patchValue({heatingMeterId : agrement1.meterId});
  }


  setElectricitymeterId(){
    var agrement =  this.utilityCredentialForm.get('electricityServiceId').value;
    var agrement1 =  this.electricServiceIds.find(
      (item) =>{
          if(item.customerAgreement == agrement)
            return true;
          return false;
      }   
    )
   
    this.utilityCredentialForm.patchValue({electricityMeterId : agrement1.meterId});
  }

}

