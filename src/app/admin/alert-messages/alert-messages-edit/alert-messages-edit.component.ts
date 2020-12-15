import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { SystemThreadInfoComponent } from '../../system-jobs/system-thread-info/system-thread-info.component';

@Component({
  selector: 'app-alert-messages-edit',
  templateUrl: './alert-messages-edit.component.html',
  styleUrls: ['./alert-messages-edit.component.css']
})
export class AlertMessagesEditComponent implements OnInit, OnDestroy {

  public alertMessagesForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public dialogRef: MatDialogRef<SystemThreadInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public readonly formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) { }

  ngOnInit() {
    this.setForm(undefined);
    if (this.data !== undefined || this.data.id !== undefined) {
      this.systemMeasurementService.loadScriptBatchById(Number(this.data.id));
      this.loadAlertMessagesById();
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }


  loadAlertMessagesById() {
    this.subscriptions.add(this.systemMeasurementService.getScriptBatchById().pipe(skipWhile((item: any) => !item))
      .subscribe((alertMessage: any) => {
        this.setForm(alertMessage);
      }));
  }
  setForm(event: any) {

    this.alertMessagesForm = this.formBuilder.group({
      target: [event !== undefined ? event.target : ''],
      alertType: [event !== undefined ? event.alertType : ''],
      alertLevel: [event !== undefined ? event.alertLevel : ''],
      isActive: [event !== undefined ? event.isActive : ''],
      spelFilter: [event !== undefined ? event.spelFilter : ''],
      message: [event !== undefined ? event.message : ''],
    });
  }
  back() {
    this.router.navigate(['admin/alertMessages/alertMessagesList']);
  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });

  }

  runNow() {

  }

  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemMeasurementService.deleteAlertMessageById(this.data.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/alertMessages/alertMessagesList'], { queryParams: { 'force': true } });
        }));
    }
  }

  onSaveClick() {
    if (this.alertMessagesForm.valid) {
      if (this.data.id !== null && this.data.id !== undefined) {
        this.subscriptions.add(this.systemMeasurementService.updateAlertMessage(this.data.id, this.alertMessagesForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close();
          }));
      } else {
        this.subscriptions.add(this.systemMeasurementService.saveAlertMessage(this.alertMessagesForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close();
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

