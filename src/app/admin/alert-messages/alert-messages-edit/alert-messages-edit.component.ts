import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { SystemThreadInfoComponent } from '../../system-jobs/system-thread-info/system-thread-info.component';

@Component({
  selector: 'app-alert-messages-edit',
  templateUrl: './alert-messages-edit.component.html',
  styleUrls: ['./alert-messages-edit.component.css']
})
export class AlertMessagesEditComponent implements OnInit, OnDestroy {

  public alertMessagesForm: FormGroup;
  public id: any;
  targetList: any[] = TableColumnData.TARGET;
  alertTypeList: any[] = TableColumnData.ALERT_TYPE;
  alertLevelList: any[] = TableColumnData.ALERT_LEVEL_TYPE;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public dialogRef: MatDialogRef<SystemThreadInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public readonly formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly loginService: LoginService,
    private readonly systemUtilityService : UtilityService) { }

  ngOnInit() {
    this.setForm(undefined);
    if (this.data !== undefined && this.data.id !== undefined) {
      this.id = this.data.id;
      this.systemMeasurementService.loadAlertMessageById(Number(this.data.id));
      this.loadAlertMessagesById();
    }
  }

  onNoClick() {
    this.dialogRef.close(false);
  }


  loadAlertMessagesById() { 
    this.subscriptions.add(this.systemMeasurementService.getAlertMessageById()
    .pipe(filter((item: any) => item && item.id == this.data.id ))
      .subscribe((alertMessage: any) => {
        this.setForm(alertMessage);
      }));
  }
  setForm(event: any) {
    this.alertMessagesForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : null],
      target: [event !== undefined ? event.target : 'C'],
      alertType: [event !== undefined ? event.alertType : 'L'],
      alertLevel: [event !== undefined ? event.alertLevel : '10'],
      active: [event !== undefined ? event.active : true],
      filter: [event !== undefined ? event.filter : ''],
      messageTemplate: [event !== undefined ? event.messageTemplate : ''],
    });
  }

  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemMeasurementService.deleteAlertMessageById(this.data.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.dialogRef.close(true);
        }));
    }
  }
  
  execute(){
    this.subscriptions.add(
      this.loginService.performPostWithParam({},`alertMessageTypes/${this.id}/processSingle`,AppUtility.addNoLoaderParam())
      .subscribe(
        (response) =>{
          if(response.errorMessage){
            this.systemUtilityService.showErrorMessage(response.errorMessage);
          }
        }, (error) =>{
          this.systemUtilityService.showErrorMessage(error.error.errorMessage);
        }
      )
    )
  }

  onSaveClick() {
    if (this.alertMessagesForm.valid) {
      if (this.data.id !== null && this.data.id !== undefined) {
        this.subscriptions.add(this.systemMeasurementService.updateAlertMessage(this.data.id, this.alertMessagesForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      } else {
        this.subscriptions.add(this.systemMeasurementService.saveAlertMessage(this.alertMessagesForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      }
    } else {
      this.validateAllFormFields(this.alertMessagesForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  get f() { return this.alertMessagesForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}

