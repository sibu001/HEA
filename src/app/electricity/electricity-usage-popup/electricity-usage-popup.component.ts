import { Component, Input, OnInit, Output, EventEmitter, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GasUsagePopupComponent } from 'src/app/gas/gas-usage-popup/gas-usage-popup.component';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { skipWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';


@Component({
  selector: 'app-electricity-usage-popup',
  templateUrl: './electricity-usage-popup.component.html',
  styleUrls: ['./electricity-usage-popup.component.css']
})
export class ElectricityUsagePopupComponent implements OnInit , OnDestroy, AfterViewInit {
  @Input() usageModelObj: any = { "createdBy": "", "createdDate": "", "updatedBy": null, "updatedDate": null,
    "usageHistoryId": "", "userId": "", "year": "", "month": "",  "day": "", "hour": null,  "type": "",
    "value": "", "billingDate": "", "startDate": "","endDate": "", "startDateOrig": "", "endDateOrig": "",
    "source": "", "split": false,"merge": false,"dummy": true,"monthUpdated": false,"checked": false,"forceStore": null,
    "utilityOrig": "","utility": "","utilGen": "","pv": "","party3": "","id": ""
  };

  @Output() onModelSave = new EventEmitter<any>();
  usageModelObj2: any;
  users: Users = new Users();
  usageHistoryId: number;
  useTypes: string;
  dataObject = [];
  refresh = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private loginService: LoginService,
    private usageHistoryService: UsageHistoryService,
    public dialogRef: MatDialogRef<GasUsagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngAfterViewInit(): void {
    AppUtility.formatUsageHistoryDialogbox();
  }

  ngOnInit() {
    this.findUserUsageHistoryData()
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
    var requestObject =  this.convetObjectForRequest(this.usageModelObj);
    requestObject.forceStore =  requestObject.forceStore = true;
    console.log(requestObject);
      let value = JSON.stringify(requestObject);
      console.log(value);
      this.subscriptions.add(
        this.usageHistoryService.upadatesageServiceByUsageHistoryId(requestObject,requestObject.usageHistoryId,AppConstant.electricity,requestObject.userId)
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          (response: any) => {
            this.refresh = true;
            this.onNoClick();
          }
        )
      )
  }

  onNoClick(){
    this.dialogRef.close(this.refresh);
  }

  deleteGasDetails(){
    this.subscriptions.add(
      this.usageHistoryService.DeleteSelectedUsageHistory(this.usageModelObj.userId,AppConstant.electricity,this.usageModelObj.usageHistoryId)
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response : any) =>{
          this.refresh = true;
          this.onNoClick();
        }
      )
    )
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
