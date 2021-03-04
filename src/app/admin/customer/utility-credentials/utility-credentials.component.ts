import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

@Component({
  selector: 'app-utility-credentials',
  templateUrl: './utility-credentials.component.html',
  styleUrls: ['./utility-credentials.component.css']
})
export class UtilityCredentialsComponent implements OnInit {
  utilityCredentialForm: FormGroup;
  credentialTypeList: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly customerService: CustomerService,
    private readonly el: ElementRef,
    public dialogRef: MatDialogRef<UtilityCredentialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.setForm(undefined);
    this.findCredentialType(false, '');
    if (this.data.row !== undefined) {
      this.customerService.loadUtilityCredentialById(this.data.customerId, this.data.row.id);
      this.subscriptions.add(this.customerService.getUtilityCredentialById().pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.setForm(response);
        }));
    }

  }

  findCredentialType(force: boolean, filter: string): void {
    this.systemService.loadCredentialTypeList(force, filter);
    this.subscriptions.add(this.systemService.getCredentialTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialTypeList: any) => {
        this.credentialTypeList = credentialTypeList;
      }));
  }

  setForm(event: any) {
    this.utilityCredentialForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      credentialTypeCode: [event !== undefined ? event.credentialType.credentialType : 'calwater', Validators.required],
      login: [event !== undefined ? event.login : null],
      password: [event !== undefined ? event.password : null],
      active: [event !== undefined ? event.active : false],
      account: [event !== undefined ? event.account : null],
      electricityServiceId: [event !== undefined ? event.electricityServiceId : null],
      electricityMeterId: [event !== undefined ? event.electricityMeterId : null],
      electricitySignDate: [event !== undefined ? event.electricitySignDate : null],
      heatingServiceId: [event !== undefined ? event.heatingServiceId : null],
      heatingMeterId: [event !== undefined ? event.heatingMeterId : null],
      heatingSignDate: [event !== undefined ? event.heatingSignDate : null],
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
  save() {
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
}

