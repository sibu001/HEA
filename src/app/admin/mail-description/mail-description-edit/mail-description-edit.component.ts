import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { StackTraceComponent } from '../stack-trace/stack-trace.component';

@Component({
  selector: 'app-mail-description-edit',
  templateUrl: './mail-description-edit.component.html',
  styleUrls: ['./mail-description-edit.component.css']
})
export class MailDescriptionEditComponent implements OnInit, OnDestroy {

  id: any;
  topicForm: FormGroup;
  public customerGroupKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  contentPartsKeys = TableColumnData.CONTENT_PART_KEYS;
  variableKeys = TableColumnData.VARIABLE_KEYS;
  periodData: any[] = TableColumnData.PERIOD_DATA;
  public customerGroupDataSource: any;
  public contentPartsDataSource: any;
  public variableDataSource: any;
  public totalElement = 0;
  public customerGroupData = {
    content: [],
    totalElements: 0,
  };
  public contentPartsData = {
    content: [],
    totalElements: 0,
  };
  public variableData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    public dialog: MatDialog) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {

    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  setForm(event: any) {
    this.topicForm = this.formBuilder.group({
      sourceType: [event !== undefined ? event.sourceType : ''],
      mailName: [event !== undefined ? event.mailName : ''],
      mailFilter: [event !== undefined ? event.mailFilter : ''],
      period: [event !== undefined ? event.period : ''],
      periodDayRule: [event !== undefined ? event.periodDayRule : ''],
      stopDays: [event !== undefined ? event.stopDays : ''],
      stopNumber: [event !== undefined ? event.stopNumber : ''],
      resetPeriod: [event !== undefined ? event.resetPeriod : ''],
      stopDateRule: [event !== undefined ? event.stopDateRule : ''],
      subjectTemplate: [event !== undefined ? event.subjectTemplate : ''],
      contentType: [event !== undefined ? event.contentType : ''],
      includeHeader: [event !== undefined ? event.includeHeader : ''],
      includeFooter: [event !== undefined ? event.includeFooter : ''],
      ccCoachUser: [event !== undefined ? event.ccCoachUser : ''],
      isActive: [event !== undefined ? event.isActive : ''],
      allowAdminForce: [event !== undefined ? event.allowAdminForce : ''],
      ignoreOptOutMail: [event !== undefined ? event.ignoreOptOutMail : '']
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  copy(): any { }

  addContentParts(): any {
    this.router.navigate(['/admin/mailDescription/mailContentParts']);
  }

  addVariable(): any {
    this.router.navigate(['/admin/mailDescription/mailContextVariables']);
  }

  goToEditContentParts(): any {
    this.router.navigate(['/admin/mailDescription/mailContentParts'], { queryParams: { id: this.id } });
  }

  goToEditVariable(): any {
    this.router.navigate(['/admin/mailDescription/mailContextVariables'], { queryParams: { id: this.id } });
  }

  Preview() {
    this.router.navigate(['/admin/mailDescription/mailDescriptionPreview'], { queryParams: { id: this.id } });
  }

  showStackTrace(): any {
    const dialogRef = this.dialog.open(StackTraceComponent, {
      width: '550px',
      height: '300px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  callMailReminder(): any { }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
