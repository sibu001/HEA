import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-key-indicator-edit',
  templateUrl: './key-indicator-edit.component.html',
  styleUrls: ['./key-indicator-edit.component.css']
})
export class KeyIndicatorEditComponent implements OnInit, OnDestroy {
  id: any;
  topicForm: FormGroup;
  public customerGroupKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  variableKeys = TableColumnData.VARIABLE_KEYS;
  public customerGroupDataSource: any;
  public variableDataSource: any;
  public totalElement = 0;
  public customerGroupData = {
    content: [],
    totalElements: 0,
  };
  public variableData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
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
  }

  setForm(event: any) {
    this.topicForm = this.formBuilder.group({
      keyIndicatorCode: [event !== undefined ? event.keyIndicatorCode : ''],
      keyIndicatorName: [event !== undefined ? event.keyIndicatorName : ''],
      filter: [event !== undefined ? event.filter : ''],
      indicatorPartTemplate: [event !== undefined ? event.indicatorPartTemplate : '', Validators.required],
      trendingPartTemplate: [event !== undefined ? event.trendingPartTemplate : '', Validators.required],
      explainPartTemplate: [event !== undefined ? event.explainPartTemplate : ''],
      hideOnKIPage: [event !== undefined ? event.hideOnKIPage : ''],
      hideOnTrendingPage: [event !== undefined ? event.hideOnTrendingPage : '', Validators.required],
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  addVariable(): any {
    this.router.navigate(['/admin/keyIndicator/keyIndicatorVariable']);
  }

  goToEditVariable(): any {
    this.router.navigate(['/admin/keyIndicator/keyIndicatorVariable'], { queryParams: { id: this.id } });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
