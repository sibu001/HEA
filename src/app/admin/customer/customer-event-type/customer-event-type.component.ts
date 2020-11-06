import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';

@Component({
  selector: 'app-customer-event-type',
  templateUrl: './customer-event-type.component.html',
  styleUrls: ['./customer-event-type.component.css']
})
export class CustomerEventTypeComponent implements OnInit {

  customerEventTypeForm: FormGroup;
  customerEventTypeList: Array<any> = TableColumnData.CUSTOMER_EVENT_TYPE;
  private readonly subscriptions: Subscription = new Subscription();
  eventCode: string;
  eventDescription: string;
  author: any;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly el: ElementRef,
    public dialogRef: MatDialogRef<CustomerEventTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.author = users.username;
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.data.row !== undefined) {
      this.customerService.loadCustomerEventById(this.data.customerId, this.data.row.id);
      this.subscriptions.add(this.customerService.getCustomerEventById().pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.setForm(response.data);
        }));
    }
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
  changeEventCode(event: any) {
    const i = this.customerEventTypeList.findIndex((item: any) => item.id === event.target.value);
    if (i !== -1) {
      this.eventCode = this.customerEventTypeList[i].name;
      this.eventDescription = 'test';
      this.customerEventTypeForm.value.eventDescription = 'test';
      this.customerEventTypeForm.value.eventCode = 'enterHiHC';
    }
  }
  setForm(event: any) {
    this.eventCode = event !== undefined ? event.customerEventType.eventCode : '';
    this.eventDescription = event !== undefined ? event.customerEventType.description : '';
    this.customerEventTypeForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      customerEventTypeId: [event !== undefined ? event.customerEventTypeId : '', Validators.required],
      eventCode: [event !== undefined ? event.customerEventType.eventCode : ''],
      eventDescription: [event !== undefined ? event.customerEventType.description : ''],
      eventDatetime: [event !== undefined ? new Date(event.eventDatetime) : ''],
      description: [event !== undefined ? event.description : '', Validators.required],
      linkedPersonType: [event !== undefined ? event.linkedPersonType : 2],
      linkedPersonName: [event !== undefined ? event.linkedPersonName : this.author],
    });
  }
  save() {
    if (this.customerEventTypeForm.valid) {
      this.customerEventTypeForm.value.customerEventTypeId = Number(this.customerEventTypeForm.value.customerEventTypeId);
      if (this.data.row && this.data.row.id) {
        this.subscriptions.add(this.customerService.updateCustomerEvent(this.data.customerId, this.data.row.id, this.customerEventTypeForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      } else {
        this.subscriptions.add(this.customerService.saveCustomerEvent(this.data.customerId, this.customerEventTypeForm.value).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.dialogRef.close(true);
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.customerEventTypeForm.controls)) {
      if (this.customerEventTypeForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.customerEventTypeForm.controls; }
}
