import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-pane-data-field-edit',
  templateUrl: './topic-pane-data-field-edit.component.html',
  styleUrls: ['./topic-pane-data-field-edit.component.css']
})
export class TopicPaneDataFieldEditComponent implements OnInit, OnDestroy {

  id: any;
  isBlockField: false;
  dataFieldForm: FormGroup;
  dataFieldKeys: TABLECOLUMN[];
  dataFieldData = {
    content: [],
    totalElements: 0
  };
  dataFieldDataSource: any;
  paneData = TableColumnData.PANE_DATA;
  inputData = TableColumnData.INPUT_TYPE_DATA;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.isBlockField = params['isBlockField'] !== undefined ? JSON.parse(params['isBlockField']) : false;
    });
  }


  ngOnInit() {
    this.dataFieldKeys = TableColumnData.PANE_DATA_FIELD_KEY;
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  setForm(event: any): any {
    this.dataFieldForm = this.formBuilder.group({
      fieldCode: [event !== undefined ? event.blockCode : '', Validators.required],
      pane: [event !== undefined ? event.blockCode : '', Validators.required],
      orderNumber: [event !== undefined ? event.calculationType : ''],
      label: [event !== undefined ? event.calculationExpression : ''],
      reportLabel: [event !== undefined ? event.calculationPeriod : ''],
      source: [event !== undefined ? event.isArray : ''],
      dataType: [event !== undefined ? event.minRowsCount : ''],
      inputType: [event !== undefined ? event.maxRowsCount : ''],
      viewCondition: [event !== undefined ? event.blockCode : ''],
      validationRule: [event !== undefined ? event.showFirstRows : ''],
      validationMessage: [event !== undefined ? event.allowRemoving : ''],
      calculationType: [event !== undefined ? event.allowRemoving : ''],
      calculationRule: [event !== undefined ? event.allowRemoving : ''],
      calculationEvent: [event !== undefined ? event.allowRemoving : ''],
      displayPattern: [event !== undefined ? event.allowRemoving : ''],
      inputMask: [event !== undefined ? event.allowRemoving : ''],
      readOnly: [event !== undefined ? event.allowRemoving : ''],
      unit: [event !== undefined ? event.allowRemoving : ''],
      helpText: [event !== undefined ? event.allowRemoving : ''],
      comments: [event !== undefined ? event.allowRemoving : ''],
      displayToUser: [event !== undefined ? event.allowRemoving : ''],
      required: [event !== undefined ? event.allowRemoving : ''],
      refreshPane: [event !== undefined ? event.allowRemoving : ''],
      nextRowAnswer1: [event !== undefined ? event.allowRemoving : ''],
      rowsBetween: [event !== undefined ? event.allowRemoving : ''],
      rowsBefore: [event !== undefined ? event.allowRemoving : ''],
      rowsAfter: [event !== undefined ? event.allowRemoving : '']
    });
  }

  addDataField() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataFieldEdit']);
  }
  goToEditDataField() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataFieldEdit'], { queryParams: {} });
  }
  back(): any {
    this.location.back();
  }

  save(): any {

  }
  delete(): any {

  }

  copy(): any {

  }

  recalculate() {

  }

  saveRow() {

  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
  }

  get f() { return this.dataFieldForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
