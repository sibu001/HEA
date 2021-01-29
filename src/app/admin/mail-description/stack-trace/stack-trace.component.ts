import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemThreadInfoComponent } from '../../system-jobs/system-thread-info/system-thread-info.component';

@Component({
  selector: 'app-stack-trace',
  templateUrl: './stack-trace.component.html',
  styleUrls: ['./stack-trace.component.css']
})
export class StackTraceComponent implements OnInit {
  maxProcessedStack: any;
  constructor(public dialogRef: MatDialogRef<SystemThreadInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.maxProcessedStack = this.data.maxProcessedStack;
  }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.findSystemThreadInfo();
  }

  findSystemThreadInfo() {

  }

  search(event: any): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
