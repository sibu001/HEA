import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

@Component({
  selector: 'app-customer-event-type',
  templateUrl: './customer-event-type.component.html',
  styleUrls: ['./customer-event-type.component.css']
})
export class CustomerEventTypeComponent implements OnInit {
  isList = false;
  customerEventList: any = [];
  customerEventTypeForm: FormGroup;
  customerEventTypeList: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  eventCode: string;
  eventDescription: string;
  author: any;
  authorType: any;
  index = 0;
  showDelete = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly el: ElementRef,
    public dialogRef: MatDialogRef<CustomerEventTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.author = users.username;
    this.authorType = 'staff';
  }

  ngOnInit() {
    this.loadCustomerEventType();
    if (this.data.isList) {
      const eventObj = {
        customerEventTypeId: 0,
        customerEventType: {
          eventCode: this.data.key,
          description: ''
        }
      };
      this.setForm(eventObj);
      this.isList = this.data.isList;
      if (this.data.row !== undefined) {
        this.customerService.loadCustomerEventListByCode(this.data.row.customerId, this.data.key);
        this.subscriptions.add(this.customerService.getCustomerEventListByCode().pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            if (response.data.length > 0) {
              this.showDelete = true;
              this.customerEventList = response.data;
              this.setForm(response.data[this.index]);
            }
          }));
      }
    } else {
      this.setForm(undefined);
      if (this.data.row !== undefined) {
        this.customerService.loadCustomerEventById(this.data.customerId, this.data.row.id);
        this.subscriptions.add(this.customerService.getCustomerEventById().pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.setForm(response.data);
          }));
      }
    }
  }

  loadCustomerEventType() {
    this.subscriptions.add(this.systemUtilityService.loadCustomerEventTypeList(false, '').pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.customerEventTypeList = response.systemUtilityManagement.customerEventTypeList;
        if (this.data.isList && !this.showDelete) {
          const i = this.customerEventTypeList.findIndex((item: any) => item.eventCode === this.data.key);
          if (i !== -1) {
            this.customerEventTypeForm.controls['eventCode'].setValue(this.customerEventTypeList[i].eventCode);
            this.customerEventTypeForm.controls['eventDescription'].setValue(this.customerEventTypeList[i].description);
            this.customerEventTypeForm.controls['customerEventTypeId'].setValue(this.customerEventTypeList[i].customerEventTypeId);
          }
        }
      }));
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
  changeEventCode(event: any) {
    const i = this.customerEventTypeList.findIndex((item: any) => item.eventCode === event.target.value);
    if (i !== -1) {
      this.customerEventTypeForm.controls['eventCode'].setValue(this.customerEventTypeList[i].eventCode);
      this.customerEventTypeForm.controls['eventDescription'].setValue(this.customerEventTypeList[i].description);
      this.customerEventTypeForm.controls['customerEventTypeId'].setValue(this.customerEventTypeList[i].customerEventTypeId);
    }
  }
  setForm(event: any) {
    this.eventCode = event !== undefined && event.customerEventType ? event.customerEventType.eventCode : '';
    this.eventDescription = event !== undefined && event.customerEventType ? event.customerEventType.description : '';
    this.author = event !== undefined && event.linkedPersonName ? event.linkedPersonName : this.author;
    this.customerEventTypeForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      customerEventTypeId: [event !== undefined && event.customerEventTypeId ? event.customerEventTypeId : '', Validators.required],
      eventCode: [event !== undefined && event.customerEventType ? event.customerEventType.eventCode : ''],
      eventDescription: [event !== undefined && event.customerEventType ? event.customerEventType.description : ''],
      eventDatetime: [event !== undefined && event.eventDatetime ? new Date(event.eventDatetime) : new Date()],
      description: [event !== undefined && event.description ? event.description : '', Validators.required],
      linkedPersonType: [event !== undefined && event.linkedPersonType ? event.linkedPersonType : 2],
      linkedPersonName: [event !== undefined && event.linkedPersonName ? event.linkedPersonName : this.author],
    });
  }
  next() {
    if (this.showDelete) {
      if (this.index < this.customerEventList.length - 1) {
        this.index++;
        this.setForm(this.customerEventList[this.index]);
      } else {
        this.index = 0;
        this.setForm(this.customerEventList[this.index]);
      }
    }
  }

  prev() {
    if (this.showDelete) {
      if (this.index === 0) {
        this.index = this.customerEventList.length - 1;
        this.setForm(this.customerEventList[this.index]);
      } else {
        this.index--;
        this.setForm(this.customerEventList[this.index]);
      }
    }
  }
  newEvent() {
    const eventTypeObject = this.setEventTypeObject();
    const eventObj = {
      customerEventTypeId: eventTypeObject.customerEventTypeId,
      customerEventType: eventTypeObject
    };
    this.showDelete = false;
    this.setForm(eventObj);
  }

  setEventTypeObject() {
    const i = this.customerEventTypeList.findIndex((item: any) => item.eventCode === this.data.key);
    if (i !== -1) {
      return this.customerEventTypeList[i];
    }
    return null;
  }

  delete() {
    this.subscriptions.add(this.customerService.deleteCustomerEventById(this.data.row.customerId, this.customerEventTypeForm.value.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.dialogRef.close(true);
      }));
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
