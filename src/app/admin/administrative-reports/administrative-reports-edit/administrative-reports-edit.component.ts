import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-administrative-reports-edit',
  templateUrl: './administrative-reports-edit.component.html',
  styleUrls: ['./administrative-reports-edit.component.css']
})
export class AdministrativeReportsEditComponent implements OnInit, OnDestroy {

  id: any;
  reportForm: FormGroup;
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
    this.dataFieldKeys = TableColumnData.ADMIN_REPORT_PARAMETER_KEYS;
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  setForm(event: any): any {
    this.reportForm = this.formBuilder.group({
      reportName: [event !== undefined ? event.reportName : '', Validators.required],
      reportLabel: [event !== undefined ? event.reportLabel : ''],
      reportType: [event !== undefined ? event.reportType : 'sql'],
      report: [event !== undefined ? event.report : ''],
      reportFile: [event !== undefined ? event.reportFile : ''],
    });
  }
  back(): any {
    this.location.back();
  }

  save(): any {

  }
  delete(): any {

  }

  addParameter(): any {

  }

  get f() { return this.reportForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
