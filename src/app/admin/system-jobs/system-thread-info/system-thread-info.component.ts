import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-system-thread-info',
  templateUrl: './system-thread-info.component.html',
  styleUrls: ['./system-thread-info.component.css']
})
export class SystemThreadInfoComponent implements OnInit {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any = [];
  public systemThreadData = {
    content: [],
    totalElements: 0,
  };
  constructor(public dialogRef: MatDialogRef<SystemThreadInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
}
