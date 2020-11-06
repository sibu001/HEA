import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemThreadInfoComponent } from '../../system-jobs/system-thread-info/system-thread-info.component';

@Component({
  selector: 'app-alert-messages-edit',
  templateUrl: './alert-messages-edit.component.html',
  styleUrls: ['./alert-messages-edit.component.css']
})
export class AlertMessagesEditComponent implements OnInit {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any = [];
  public systemThreadData = {
    content: [],
    totalElements: 0,
  };
  public alertMessagesForm: FormGroup = this.formBuilder.group({
    target: this.formBuilder.control(''),
    alertType: this.formBuilder.control(''),
    alertLevel: this.formBuilder.control(''),
    isActive: this.formBuilder.control(''),
    spelFilter: this.formBuilder.control(''),
    message: this.formBuilder.control('')
  });
  constructor(public dialogRef: MatDialogRef<SystemThreadInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.SYSTEM_THREAD_KEY;
    this.findSystemThreadInfo();
  }

  findSystemThreadInfo() {

  }
  search(event: any): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    this.dialogRef.close();
  }
}
