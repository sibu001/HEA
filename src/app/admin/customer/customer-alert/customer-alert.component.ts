import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableColumnData } from 'src/app/data/common-data';

@Component({
  selector: 'app-customer-alert',
  templateUrl: './customer-alert.component.html',
  styleUrls: ['./customer-alert.component.css']
})
export class CustomerAlertComponent implements OnInit {
  customerAlertForm: FormGroup;
  customerAlertTypes: Array<any> = TableColumnData.CUSTOMER_ALERT_TYPE;
  alertLevels: Array<any> = TableColumnData.ALERT_LEVEL;
  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CustomerAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.setForm(this.data);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  setForm(event: any) {
    this.customerAlertForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      customerAlertTypeId: [event !== undefined ? event.customerAlertTypeId : ''],
      alertLevel: [event !== undefined ? event.alertLevel : ''],
      note: [event !== undefined ? event.note : ''],
    });
  }

}
