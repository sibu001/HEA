import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customer-event-type',
  templateUrl: './customer-event-type.component.html',
  styleUrls: ['./customer-event-type.component.css']
})
export class CustomerEventTypeComponent implements OnInit {

  customerEventTypeForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CustomerEventTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.setForm(this.data);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  setForm(event: any) {
    this.customerEventTypeForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      customerEventTypeId: [event !== undefined ? event.customerEventTypeId : ''],
      customerEventTypeEventCode: [event !== undefined ? event.customerEventTypeEventCode : ''],
      customerEventTypeDescription: [event !== undefined ? event.customerEventTypeDescription : ''],
      eventDatetime: [event !== undefined ? event.eventDatetime : ''],
      description: [event !== undefined ? event.description : ''],
      linkedPersonTypeName: [event !== undefined ? event.linkedPersonTypeName : ''],
      linkedPersonName: [event !== undefined ? event.linkedPersonName : ''],
    });
  }

}
