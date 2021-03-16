import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-administrative-reports-call',
  templateUrl: './administrative-reports-call.component.html',
  styleUrls: ['./administrative-reports-call.component.css']
})
export class AdministrativeReportsCallComponent implements OnInit, OnDestroy {

  id: any;
  reportForm: FormGroup;
  reportName: string;
  reportType: string;
  formatList: any[] = TableColumnData.REPORT_FORMATE;
  reportParameter: any[] = [];
  dataFieldData = {
    content: [],
    totalElements: 0
  };
  dataFieldDataSource: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly administrativeService: AdministrativeService,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.administrativeService.loadAdministrativeReportById(this.id);
      this.administrativeService.loadAdministrativeReportParamsList(this.id);
      this.loadAdministratorReportParameter();
    }
  }

  loadAdministratorReportParameter(): void {
    this.subscriptions.add(this.administrativeService.getAdministrativeReportById().pipe(skipWhile((item: any) => !item))
      .subscribe((reportParams: any) => {
        this.reportType = reportParams.reportType;
        this.reportName = reportParams.reportLabel;
      }));
    this.subscriptions.add(this.administrativeService.getAdministrativeReportParamsList().pipe(skipWhile((item: any) => !item))
      .subscribe((reportParams: any) => {
        this.reportParameter = reportParams;
        if (this.reportParameter.length > 0) {
          this.setForm(this.reportParameter[this.reportParameter.length - 1]);
        } else {
          this.setForm(undefined);
        }
      }));
  }

  setForm(event: any): any {
    this.reportForm = this.formBuilder.group({
      format: [event && event.format ? event.format : 'pdf', Validators.required],
      reportId: [this.id],
    });
    this.reportParameter.forEach(element => {
      this.reportForm.addControl(element.parameterName, this.control(element.defaultValue));
      this.reportForm.addControl('reportId', this.control(element.reportId));
    });
    if (this.reportParameter.length <= 0) {
      this.reportForm.addControl('reportId', this.id);
    }
  }

  control(defaultValue: string): AbstractControl {
    return this.formBuilder.control(defaultValue);
  }
  back(): any {
    this.location.back();
  }

  call(): any {
    console.log(this.reportForm.value);
    const formData = new FormData();
    formData.append('reportId', this.reportForm.value.reportId);
    formData.append('program', this.reportForm.value.program);
    formData.append('format', this.reportForm.value.format);
    this.subscriptions.add(this.administrativeService.callAdministrativeReport(this.id, formData).pipe(skipWhile((item: any) => !item))
      .subscribe((reportParams: any) => {
        console.log(reportParams);
         const file = new Blob([reportParams.administrativeManagement.callAdministrativeReport], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }, error => {
        const file = new Blob([error.error.text], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }));
  }
  get f() { return this.reportForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
