import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { SystemThreadInfoComponent } from '../system-thread-info/system-thread-info.component';

@Component({
  selector: 'app-system-jobs-list',
  templateUrl: './system-jobs-list.component.html',
  styleUrls: ['./system-jobs-list.component.css']
})
export class SystemJobsListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public systemJobsData = {
    content: [],
    totalElements: 0,
  };
  usedMemory: any;
  freeMemory: any;
  totalMemory: any;
  maxMemory: any;
  date: Date = new Date();
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  constructor(public formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly router: Router,
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.search();
  }

  showThreadInfo() {
    const dialogRef = this.dialog.open(SystemThreadInfoComponent, {
      width: '70vw',
      height: '90vh',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
  
  findSystemJobs(force: boolean): void {
    this.systemMeasurementService.loadSystemJobsList(force, '');
    this.subscriptions.add(this.systemMeasurementService.getSystemJobsList().pipe(skipWhile((item: any) => !item))
      .subscribe((systemJobs: any) => {
        this.systemJobsData.content = systemJobs.list;
        this.systemJobsData.totalElements = systemJobs.totalSize;
        this.dataSource = [...this.systemJobsData.content];
      }));
  }

  search(): void {
    this.findSystemJobs(true);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
