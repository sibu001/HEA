import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
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
  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.SYSTEM_JOBS_KEY;
    this.findSystemJobs();
  }

  findSystemJobs() {

  }

  search(event: any): void {
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

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
