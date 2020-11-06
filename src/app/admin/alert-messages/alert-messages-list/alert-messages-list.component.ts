import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { AlertMessagesEditComponent } from '../alert-messages-edit/alert-messages-edit.component';

@Component({
  selector: 'app-alert-messages-list',
  templateUrl: './alert-messages-list.component.html',
  styleUrls: ['./alert-messages-list.component.css']
})
export class AlertMessagesListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public alertMessagesData = {
    content: [],
    totalElements: 0,
  };
  public alertMessagesForm: FormGroup = this.formBuilder.group({
    target: this.formBuilder.control(''),
    alertType: this.formBuilder.control(''),
    isActive: this.formBuilder.control('')
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public readonly formBuilder: FormBuilder, public dialog: MatDialog) {
  }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.EC2_INSTANCE_KEY;
    this.findAlertMessages();
  }

  findAlertMessages() {

  }

  search(event: any): void {
  }

  onAddAlertMessages() {
    const dialogRef = this.dialog.open(AlertMessagesEditComponent, {
      width: '50vw',
      height: '75vh',
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
