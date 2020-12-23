import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { AlertMessagesEditComponent } from '../alert-messages-edit/alert-messages-edit.component';

@Component({
  selector: 'app-alert-messages-list',
  templateUrl: './alert-messages-list.component.html',
  styleUrls: ['./alert-messages-list.component.css']
})
export class AlertMessagesListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.ALERT_MESSAGE_KEY;
  public dataSource: any;
  public alertMessagesData = {
    content: [],
    totalElements: 0,
  };
  public alertMessagesForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  public adminFilter: AdminFilter;
  constructor(public formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    public dialog: MatDialog) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.setUpForm(undefined);
    this.search(undefined);
  }

  onAddAlertMessages(event: any) {
    const dialogRef = this.dialog.open(AlertMessagesEditComponent, {
      width: '50vw',
      height: '75vh',
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      this.search(undefined);
    });
  }

  setUpForm(event: any) {
    this.alertMessagesForm = this.formBuilder.group({
      target: [event !== undefined && event !== null ? event.target : ''],
      alertType: [event !== undefined && event !== null ? event.alertType : ''],
      isActive: [event !== undefined && event !== null ? event.isActive : true],
    });
  }

  findAlertMessages(force: boolean, filter: any): void {
    this.systemMeasurementService.loadAlertMessageList(force, filter);
    this.subscriptions.add(this.systemMeasurementService.getAlertMessageList().pipe(skipWhile((item: any) => !item))
      .subscribe((alertMessageList: any) => {
        this.alertMessagesData.content = alertMessageList.data.list;
        this.alertMessagesData.totalElements = alertMessageList.data.totalSize;
        this.dataSource = [...this.alertMessagesData.content];
      }));
  }

  search(event: any): void {
    const params = new HttpParams()
      .set('startRow', '0')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase()  : 'ASC'))
      .set('target', (this.alertMessagesForm.value.target !== null ? this.alertMessagesForm.value.target : ''))
      .set('active', (this.alertMessagesForm.value.isActive !== null && this.alertMessagesForm.value.isActive !== undefined ? this.alertMessagesForm.value.isActive : ''))
      .set('alertType', (this.alertMessagesForm.value.alertType !== null ? this.alertMessagesForm.value.alertType : ''));
    this.findAlertMessages(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
