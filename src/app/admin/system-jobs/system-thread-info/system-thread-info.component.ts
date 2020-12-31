import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';

@Component({
  selector: 'app-system-thread-info',
  templateUrl: './system-thread-info.component.html',
  styleUrls: ['./system-thread-info.component.css']
})
export class SystemThreadInfoComponent implements OnInit {

  public keys: Array<TABLECOLUMN> = TableColumnData.SYSTEM_THREAD_KEY;
  public dataSource: any = [];
  public systemThreadData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public dialogRef: MatDialogRef<SystemThreadInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly systemMeasurementService: SystemMeasurementService) { }

  ngOnInit() {
    this.findSystemThreadInfo();
  }

  findSystemThreadInfo() {
    this.systemMeasurementService.loadThreadInfo();
    this.subscriptions.add(this.systemMeasurementService.getThreadInfo().pipe(skipWhile((item: any) => !item))
    .subscribe((systemJobs: any) => {
      this.systemThreadData.content = systemJobs;
      this.dataSource = [...this.systemThreadData.content];
    }));
  }


  onNoClick() {
    this.dialogRef.close();
  }
}
