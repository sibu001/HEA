import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

@Component({
  selector: 'app-customer-alert',
  templateUrl: './customer-alert.component.html',
  styleUrls: ['./customer-alert.component.css']
})
export class CustomerAlertComponent implements OnInit {
  customerAlertForm: FormGroup;
  customerAlertTypes: Array<any>;
  alertLevels: Array<any> = TableColumnData.ALERT_LEVEL;
  isFormSubmitted : boolean = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly systemService: SystemService,
    private readonly el: ElementRef,
    public dialogRef: MatDialogRef<CustomerAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getCustomerAlertType();
    this.findCustomerAlertType(true, '');
    this.setForm(undefined);
    if (this.data.row !== undefined) {
      this.customerService.loadAlertById(this.data.customerId, this.data.row.id);
      this.subscriptions.add(this.customerService.getAlertById().pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.setForm(response.data);
        }));
    }
  }

  findCustomerAlertType(force: boolean, filter: any): void {
    this.systemService.loadGetCustomerAlertTypeList(force, filter);
  }

  getCustomerAlertType(){
    this.subscriptions.add(this.systemService.getCustomerAlertTypeList().pipe(skipWhile((item: any) => !item))
    .subscribe((customerAlertTypeList: any) => {
      this.customerAlertTypes = customerAlertTypeList;
    }));
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  setForm(event: any) {
    this.customerAlertForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      customerAlertTypeId: [event !== undefined ? event.customerAlertTypeId : '', Validators.required],
      alertLevel: [event !== undefined ? event.alertLevel : ''],
      note: [event !== undefined ? event.note : ''],
    });
  }
  save() {
    this.isFormSubmitted = true;
    if (this.customerAlertForm.valid) {
      if (this.data.row && this.data.row.id) {
        this.subscriptions.add(this.customerService.updateAlert(this.data.customerId, this.data.row.id, this.customerAlertForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      } else {
        this.subscriptions.add(this.customerService.saveAlert(this.data.customerId, this.customerAlertForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.customerAlertForm.controls)) {
      if (this.customerAlertForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.customerAlertForm.controls; }
}
