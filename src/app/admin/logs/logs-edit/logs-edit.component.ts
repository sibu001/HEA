import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProspectsEditComponent } from '../../prospects/prospects-edit/prospects-edit.component';

@Component({
  selector: 'app-logs-edit',
  templateUrl: './logs-edit.component.html',
  styleUrls: ['./logs-edit.component.css']
})
export class LogsEditComponent implements OnInit {

  public logData : any;
  constructor(
    public dialogRef: MatDialogRef<ProspectsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.logData = data;
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

}
