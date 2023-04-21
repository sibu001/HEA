import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter, skip, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { SystemThreadInfoComponent } from '../system-thread-info/system-thread-info.component';

@Component({
  selector: 'app-system-jobs-list',
  templateUrl: './system-jobs-list.component.html',
  styleUrls: ['./system-jobs-list.component.css']
})
export class SystemJobsListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.SYSTEM_JOBS_KEY;
  public dataSource: any;
  public operatingSystemInfo: any;
  public systemJobsData = {
    content: [],
    totalElements: 0,
  };
  date: Date = new Date();
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  constructor(public formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.search();
    this.findOperatingSystemInfo();
    this.getSystemJobs();
  }

  showThreadInfo() {
    const dialogRef = this.dialog.open(SystemThreadInfoComponent, {
      width: '70vw',
      height: '80vh',
      data: {requestFor : 'threadInfo'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  showShortThreadInfo() {
    const dialogRef = this.dialog.open(SystemThreadInfoComponent, {
      width: '70vw',
      height: '80vh',
      data: {requestFor : 'shortThreadInfo'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }


  findSystemJobs(force: boolean): void {
    this.systemMeasurementService.loadSystemJobsList(force, '');
  }

  getSystemJobs(){
    this.subscriptions.add(this.systemMeasurementService.getSystemJobsList().pipe(skip(1),filter((item: any) => item))
    .subscribe((systemJobs: any) => {
      this.systemJobsData.content = systemJobs;
      this.dataSource = [...this.systemJobsData.content];
      this.systemJobsData.totalElements = this.systemJobsData.content.length;
      AppUtility.scrollTop();
    }));
  }

  findOperatingSystemInfo(): void {
    this.systemMeasurementService.loadOperatingSystemInfo();
    this.subscriptions.add(this.systemMeasurementService.getOperatingSystemInfo().pipe(skipWhile((item: any) => !item))
      .subscribe((operatingSystemInfo: any) => {
        this.operatingSystemInfo = operatingSystemInfo;
      }));
  }

  handleJob(event: any) {
    if (event.buttonType.key === 'execute') {
      this.subscriptions.add(
        this.systemMeasurementService.executeSystemJobs(event.row.schedulerName, event.row.group, event.row.methodName)
        .pipe(take(1),filter((item: any) => item))
        .subscribe((operatingSystemInfo: any) => {
          this.search();
        }));
    } else if (event.buttonType.key === 'pause') {
      this.subscriptions.add(this.systemMeasurementService.pauseSystemJobs(event.row.schedulerName, event.row.group, event.row.methodName)
       .pipe(take(1),filter((item: any) => item))
       .subscribe((operatingSystemInfo: any) => {
          this.search();
        }));
    } else if (event.buttonType.key === 'resume') {
      this.subscriptions.add(this.systemMeasurementService.resumeSystemJobs(event.row.schedulerName, event.row.group, event.row.methodName)
      .pipe(take(1),filter((item: any) => item))
      .subscribe((operatingSystemInfo: any) => {
          this.search();
        }));
    }
  }

  search(): void {
    this.findSystemJobs(true);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
