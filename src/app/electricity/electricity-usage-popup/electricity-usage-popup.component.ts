import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GasUsagePopupComponent } from 'src/app/gas/gas-usage-popup/gas-usage-popup.component';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { skipWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-electricity-usage-popup',
  templateUrl: './electricity-usage-popup.component.html',
  styleUrls: ['./electricity-usage-popup.component.css']
})
export class ElectricityUsagePopupComponent implements OnInit {
  @Input() usageModelObj: any;
  @Output() onModelSave = new EventEmitter<any>();
  usageModelObj2: any;
  users: Users = new Users();
  usageHistoryId: number;
  useTypes: string;
  dataObject = [];
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private loginService: LoginService,
    private usageHistoryService: UsageHistoryService,
    public dialogRef: MatDialogRef<GasUsagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.findUserUsageHistoryData()
  }

  search(event,force){

  }

  findUserUsageHistoryData(){
    this.subscriptions.add(
      this.usageHistoryService.loadUsageHistoryDataByTypeAndId(this.data.event.userId,'electricity',this.data.event.usageHistoryId)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
            this.usageModelObj = this.convertToViewObject(response.usageHistoryManagement.electricity);
            this.dataObject[0] = this.usageModelObj;
        } ,error => { console.log(error)}
    ));
  }

  convertToViewObject(event){
    event.billingDate = new Date(event.billingDate).toISOString().substring(0,10)
    event.startDate =  new Date(event.startDate).toISOString().substring(0,10)
    event.endDate = new Date(event.endDate).toISOString().substring(0,10)
    event.startDateOrig = new Date(event.startDateOrig).toISOString().substring(0,10)
    event.endDateOrig = new Date(event.endDateOrig).toISOString().substring(0,10)
    return event;
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
    this.usageModelObj = this.convetObjectForRequest(this.usageModelObj);
    this.usageModelObj2 = Object.assign({}, this.usageModelObj);
    this.useTypes = this.usageModelObj2.type;
    this.usageHistoryId = this.usageModelObj2.id;
    // if ((this.useTypes === 'smartMeterElectric') || (this.useTypes === 'smartMeterElectricDaily ') || (this.useTypes === 'smartMeterGas')) {
    //   document.getElementById('loader').classList.add('loading');
    //   this.loginService.performPut(this.usageModelObj2, 'users/' + this.usageModelObj2.userId + '/' + this.useTypes + '/' + this.usageHistoryId).subscribe(
    //     data => {
    //       document.getElementById('loader').classList.remove('loading');
    //       this.onModelSave.emit();
    //     },
    //     error => {
    //       document.getElementById('loader').classList.remove('loading');
    //       console.log(error);
    //     }
    //   );
    // } else {
      if (this.useTypes === 'gasCharge') {
        this.useTypes = 'gas';
      } else if (this.useTypes === 'electricityCharge') {
        this.useTypes = 'electricity';
      }
      let date;
      if (this.usageModelObj2.startDateView !== null && this.usageModelObj2.startDateView !== undefined) {
        date = this.usageModelObj2.startDateView;
        if (this.usageModelObj2.startTime !== null && this.usageModelObj2.startTime !== undefined) {
          date = date + ' ' + this.usageModelObj2.startTime;
        }
        this.usageModelObj2.startDate = new Date(date);
      }

      if (this.usageModelObj2.endDateView !== null && this.usageModelObj2.endDateView !== undefined) {
        date = this.usageModelObj2.endDateView;
        if (this.usageModelObj2.endTime !== null && this.usageModelObj2.endTime !== undefined) {
          date = date + ' ' + this.usageModelObj2.endTime;
        }
        this.usageModelObj2.endDate = new Date(date);
      }

      if (this.usageModelObj2.startDateOrigView !== null && this.usageModelObj2.startDateOrigView !== undefined) {
        date = this.usageModelObj2.startDateOrigView;
        if (this.usageModelObj2.startTimeOrig !== null && this.usageModelObj2.startTimeOrig !== undefined) {
          date = date + ' ' + this.usageModelObj2.startTimeOrig;
        }
        this.usageModelObj2.startDateOrig = new Date(date);
      }

      if (this.usageModelObj2.endDateOrigView !== null && this.usageModelObj2.endDateOrigView !== undefined) {
        date = this.usageModelObj2.endDateOrigView;
        if (this.usageModelObj2.endTimeOrig !== null && this.usageModelObj2.endTimeOrig !== undefined) {
          date = date + ' ' + this.usageModelObj2.endTimeOrig;
        }
        this.usageModelObj2.endDateOrig = new Date(date);
      }

      if (this.usageModelObj2.billingDateView !== null && this.usageModelObj2.billingDateView !== undefined) {
        date = this.usageModelObj2.billingDateView;
        if (this.usageModelObj2.billingTime !== null && this.usageModelObj2.billingTime !== undefined) {
          date = date + ' ' + this.usageModelObj2.billingTime;
        }
        this.usageModelObj2.billingDate = new Date(date);
      }
      document.getElementById('loader').classList.add('loading');
      this.loginService.performPut(this.usageModelObj2, 'users/' + this.usageModelObj2.userId + '/usage/' + this.useTypes + '/' + this.usageHistoryId).subscribe(
        data => {
          document.getElementById('loader').classList.remove('loading');
          this.onModelSave.emit();
        },
        error => {
          document.getElementById('loader').classList.remove('loading');
          console.log(error);
        }
      );
    // }
  }

  closeDialogBox(){
    this.dialogRef.close();
  }

  deleteGasDetails(){
    this.subscriptions.add(
      this.usageHistoryService.DeleteSelectedUsageHistory(this.usageModelObj.userId,'electricity',this.usageModelObj.usageHistoryId)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response : any) =>{
          console.log(response);
          this.closeDialogBox();
        }
      )
    )
  }
}
