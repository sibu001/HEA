import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-pane-data-block-edit',
  templateUrl: './topic-pane-data-block-edit.component.html',
  styleUrls: ['./topic-pane-data-block-edit.component.css']
})
export class TopicPaneDataBlockEditComponent implements OnInit, OnDestroy {
  id: any;
  variableForm: FormGroup;
  dataFieldKeys: TABLECOLUMN[];
  dataFieldData = {
    content: [],
    totalElements: 0
  };
  dataFieldDataSource: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.dataFieldKeys = TableColumnData.PANE_DATA_FIELD_KEY;
    this.setForm(undefined);
  }

  setForm(event: any): any {
    this.variableForm = this.formBuilder.group({
      blockCode: [event !== undefined ? event.blockCode : '', Validators.required],
      orderNumber: [event !== undefined ? event.calculationType : '1'],
      label: [event !== undefined ? event.calculationExpression : '', Validators.required],
      reportLabel: [event !== undefined ? event.calculationPeriod : '', Validators.required],
      isArray: [event !== undefined ? event.isArray : ''],
      minRowsCount: [event !== undefined ? event.minRowsCount : ''],
      maxRowsCount: [event !== undefined ? event.maxRowsCount : ''],
      showFirstRows: [event !== undefined ? event.showFirstRows : ''],
      allowRemoving: [event !== undefined ? event.allowRemoving : ''],
    });
  }

  addDataField() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataFieldEdit'], { queryParams: { isBlockField: true } });
  }
  goToEditDataField() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataFieldEdit'], { queryParams: { id: 1, isBlockField: true } });
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

  get f() { return this.variableForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
