import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customer-event',
  templateUrl: './customer-event.component.html',
  styleUrls: ['./customer-event.component.css']
})
export class CustomerEventComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick() {
    this.dialogRef.close();
  }

}
