import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';

@Component({
  selector: 'app-gas-usage-popup',
  templateUrl: './gas-usage-popup.component.html',
  styleUrls: ['./gas-usage-popup.component.css']
})
export class GasUsagePopupComponent implements OnInit {
  usageModelObj = [];
  @Output() onModelSave = new EventEmitter<any>();
  private readonly subscriptions: Subscription = new Subscription();
  usageModelObj2: any;
  users: Users = new Users();
  usageHistoryId: number;
  dataObject = undefined;
  useTypes: string;
  userData : any;
  gasForm : any;
  constructor(
    private readonly formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<GasUsagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usageHistoryService: UsageHistoryService
  ) {

  }

  ngOnInit() {
    this.setUpGasFrom(undefined);
    this.userData = this.data.event;
    this.loadSelectedGasData();
  }

  loadSelectedGasData(){
    this.subscriptions.add(
      this.usageHistoryService.loadUsageHistoryDataByTypeAndId(this.userData.userId,'gas',this.userData.usageHistoryId)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
            this.setUpGasFrom(response.usageHistoryManagement.gas);
            this.dataObject = response.usageHistoryManagement.gas;
        }
    ));
 
  }
  
   setUpGasFrom(event){
    this.gasForm = this.formBuilder.group({
      year : [event !== undefined ? event.year : ''],
      month : [event !== undefined ? event.month : ''],
      day : [event !== undefined ? event.day : ''],
      hour : [event !== undefined ? event.hour : ''],
      type : [event !== undefined ? event.type : ''],
      total : [event !== undefined ? event.total : ''],
      source : [event !== undefined ? event.source : ''],
      split : [event !== undefined ? event.split : false],
      merged : [event !== undefined ? event.merged : false],
      monthUpdated : [event !== undefined ? event.monthUpdated: false],
      billingDate : [event !== undefined ? new Date(event.billingDate).toISOString().substring(0,10) : ''],
      startDate : [event !== undefined ? new Date(event.startDate).toISOString().substring(0,10) : ''],
      endDate : [event !== undefined ? new Date( ).toISOString().substring(0,10) : '', ],
      startDateOrig : [event !== undefined ? new Date(event.startDateOrig).toISOString().substring(0,10) : ''],
      endDateOrig : [event !== undefined ? new Date(event.endDateOrig).toISOString().substring(0,10) : ''],
      checked : [event !== undefined ? event.checked : false]
    })
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  convetObjectForRequest(object){
    object.billingDate = new Date(object.billingDate).getTime();
    object.startDate = new Date(object.startDate).getTime();
    object.endDate = new Date(object.endDate).getTime();
    object.startDateOrig = new Date(object.startDateOrig).getTime();
    object.endDateOrig = new Date(object.endDateOrig).getTime();
    return object;
  }

  save() {  
    var formobject =  this.convetObjectForRequest(this.gasForm.value);
    var requestObject = { ...this.dataObject,...formobject};
    console.log(formobject);
    if(this.gasForm.valid) {
      let value = JSON.stringify(requestObject);
      console.log(value);
      this.subscriptions.add(
        this.usageHistoryService.upadatesageServiceByUsageHistoryId(requestObject,this.dataObject.usageHistoryId,'gas',this.dataObject.userId)
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          (response: any) => {
            this.setUpGasFrom(response.usageHistoryManagement.gas);
            this.onNoClick();
          }
        )
      )
    }
  }
    // this.usageHistoryService.
  //   this.usageModelObj2 = Object.assign({}, this.usageModelObj);
  //   this.useTypes = this.usageModelObj2.type;
  //   this.usageHistoryId = this.usageModelObj2.id;
  //   if ((this.useTypes === 'smartMeterElectric') || (this.useTypes === 'smartMeterElectricDaily ') || (this.useTypes === 'smartMeterGas')) {
  //     document.getElementById('loader').classList.add('loading');
  //     this.loginService.performPut(this.usageModelObj2, 'users/' + this.usageModelObj2.userId + '/' + this.useTypes + '/' + this.usageHistoryId).subscribe(
  //       data => {
  //         document.getElementById('loader').classList.remove('loading');
  //         this.onModelSave.emit();``
  //       },
  //       error => {
  //         document.getElementById('loader').classList.remove('loading');
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     if (this.useTypes === 'gasCharge') {
  //       this.useTypes = 'gas';
  //     } else if (this.useTypes === 'electricityCharge') {
  //       this.useTypes = 'electricity';
  //     }
  //     let date;
  //     if (this.usageModelObj2.startDateView !== null && this.usageModelObj2.startDateView !== undefined) {
  //       date = this.usageModelObj2.startDateView;
  //       if (this.usageModelObj2.startTime !== null && this.usageModelObj2.startTime !== undefined) {
  //         date = date + ' ' + this.usageModelObj2.startTime;
  //       }
  //       this.usageModelObj2.startDate = new Date(date);
  //     }

  //     if (this.usageModelObj2.endDateView !== null && this.usageModelObj2.endDateView !== undefined) {
  //       date = this.usageModelObj2.endDateView;
  //       if (this.usageModelObj2.endTime !== null && this.usageModelObj2.endTime !== undefined) {
  //         date = date + ' ' + this.usageModelObj2.endTime;
  //       }
  //       this.usageModelObj2.endDate = new Date(date);
  //     }

  //     if (this.usageModelObj2.startDateOrigView !== null && this.usageModelObj2.startDateOrigView !== undefined) {
  //       date = this.usageModelObj2.startDateOrigView;
  //       if (this.usageModelObj2.startTimeOrig !== null && this.usageModelObj2.startTimeOrig !== undefined) {
  //         date = date + ' ' + this.usageModelObj2.startTimeOrig;
  //       }
  //       this.usageModelObj2.startDateOrig = new Date(date);
  //     }

  //     if (this.usageModelObj2.endDateOrigView !== null && this.usageModelObj2.endDateOrigView !== undefined) {
  //       date = this.usageModelObj2.endDateOrigView;
  //       if (this.usageModelObj2.endTimeOrig !== null && this.usageModelObj2.endTimeOrig !== undefined) {
  //         date = date + ' ' + this.usageModelObj2.endTimeOrig;
  //       }
  //       this.usageModelObj2.endDateOrig = new Date(date);
  //     }

  //     if (this.usageModelObj2.billingDateView !== null && this.usageModelObj2.billingDateView !== undefined) {
  //       date = this.usageModelObj2.billingDateView;
  //       if (this.usageModelObj2.billingTime !== null && this.usageModelObj2.billingTime !== undefined) {
  //         date = date + ' ' + this.usageModelObj2.billingTime;
  //       }
  //       this.usageModelObj2.billingDate = new Date(date);
  //     }
  //     document.getElementById('loader').classList.add('loading');
  //     this.loginService.performPut(this.usageModelObj2, 'users/' + this.usageModelObj2.userId + '/usage/' + this.useTypes + '/' + this.usageHistoryId).subscribe(
  //       data => {
  //         document.getElementById('loader').classList.remove('loading');
  //         this.onModelSave.emit();
  //       },
  //       error => {
  //         document.getElementById('loader').classList.remove('loading');
  //         console.log(error);
  //       }
  //     );
    // }
  // }

  deleteGasDetails(){
    this.subscriptions.add(
      this.usageHistoryService.DeleteSelectedUsageHistory(this.dataObject.userId,'gas',this.dataObject.usageHistoryId)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response : any) =>{
          console.log(response);
          this.onNoClick();
        }
      )
    )
  }
}
