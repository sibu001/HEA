import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-administrative-reports-call',
  templateUrl: './administrative-reports-call.component.html',
  styleUrls: ['./administrative-reports-call.component.css']
})
export class AdministrativeReportsCallComponent implements OnInit, OnDestroy {

  id: any;
  reportForm: FormGroup;
  reportName = 'Report Name';
  reportType = 'jrxml';
  reportParameter: any[] = [];
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
      format: [event !== undefined ? event.format : '', Validators.required],
    });
    this.reportParameter.forEach(element => {
      this.reportForm.addControl(element.parameterName, this.control(element.defaultValue));
    });
  }

  control(defaultValue: string): AbstractControl {
    return this.formBuilder.control(defaultValue);
  }
  back(): any {
    this.location.back();
  }

  call(): any { }
  get f() { return this.reportForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
