import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-administrative-reports-edit',
  templateUrl: './administrative-reports-edit.component.html',
  styleUrls: ['./administrative-reports-edit.component.css']
})
export class AdministrativeReportsEditComponent implements OnInit, OnDestroy {

  id: any;
  reportForm: FormGroup;
  reportObject: any;
  dataFieldKeys: TABLECOLUMN[] = TableColumnData.ADMIN_REPORT_PARAMETER_KEYS;
  dataFieldData = {
    content: [],
    totalElements: 0
  };
  isForce = false;
  showAddButton = false;
  isChangeParam = false;
  dataFieldDataSource: any;
  parameters: any;
  reportTypeList: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly administrativeService: AdministrativeService,
    private readonly el: ElementRef,
    private readonly systemService: SystemService,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.loadReportType();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.loadAdministrativeReportById();
    }
  }

  setForm(event: any): any {
    this.reportForm = this.formBuilder.group({
      reportId: [event !== undefined ? event.reportId : ''],
      reportName: [event !== undefined ? event.reportName : '', Validators.required],
      reportLabel: [event !== undefined ? event.reportLabel : ''],
      reportType: [event !== undefined ? event.reportType : 'sql'],
      report: [event !== undefined ? event.report : ''],
      reportParams: [event !== undefined ? event.reportParams : []],
      reportFile: [event !== undefined && event.reportFile ? event.reportFile : ''],
    });
  }
  back(): any {
    this.router.navigate(['admin/administrativeReport/administrativeReportList']);
  }

  loadAdministrativeReportById() {
    this.administrativeService.loadAdministrativeReportById(Number(this.id));
    this.subscriptions.add(this.administrativeService.getAdministrativeReportById().pipe(skipWhile((item: any) => !item))
      .subscribe((report: any) => {
        this.reportObject = report;
        if (report.report) {
          this.dataFieldKeys[0].type = undefined;
        } else {
          this.dataFieldKeys[0].type = 'input';
        }
        if (!(report.reportParams && report.reportParams.length > 0)) {
          this.showAddButton = false;
        }
        report.reportParams.forEach((element: any) => {
          if (!report.report) {
            element.action = 'assets/images/ico_minus.gif';
            this.showAddButton = true;
            element.isInputEdit = false;
          } else {
            this.showAddButton = false;
            element.isInputEdit = true;
          }
        });
        this.parameters = JSON.parse(JSON.stringify(report.reportParams));
        this.dataFieldDataSource = [...this.parameters];
        if (this.isForce) {
          this.router.navigate(['admin/administrativeReport/administrativeReportEdit'], { queryParams: { 'id': report.id } });
        }
        this.setForm(report);
      }));
  }

  addNewRow() {
    this.parameters.push({
      action: 'addInlineInput',
      defaultValue: '',
      parameterLabel: '',
      parameterName: '',
      reportId: this.id,
      isInputEdit: true
    });
    this.dataFieldDataSource = [...this.parameters];
  }

  addNewParameter(event: any) {
    this.addParameter(event.row.tableForm.value);
  }

  prepareChangeParameter(event: any) {
    if (this.reportObject.report) {
      this.isChangeParam = true;
      const i = this.reportForm.value.reportParams.findIndex((item: any) => item.reportParamId === event.row.reportParamId);
      if (i !== -1) {
        this.reportForm.value.reportParams[i].defaultValue = event.row.tableForm.value.defaultValue;
        this.reportForm.value.reportParams[i].parameterLabel = event.row.tableForm.value.parameterLabel;
      }
    }
  }

  loadReportType() {
    this.systemService.loadReportTypeList();
    this.subscriptions.add(this.systemService.getReportTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((reportType: any) => {
        this.reportTypeList = reportType.data;
      }));
  }
  save(): any {
    if (this.reportForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.administrativeService.updateAdministrativeReport(this.id, this.reportForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadAdministrativeReportById();
          }));
      } else {
        this.subscriptions.add(this.administrativeService.saveAdministrativeReport(this.reportForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.id = response.id;
            this.isForce = true;
            this.loadAdministrativeReportById();
          }));
      }
    } else {
      this.validateForm();
    }
  }

  validateForm() {
    for (const key of Object.keys(this.reportForm.controls)) {
      if (this.reportForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  delete(): any {
    this.subscriptions.add(this.administrativeService.deleteAdministrativeReportById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/administrativeReport/administrativeReportList'], { queryParams: { 'force': true } });
      }));
  }

  addParameter(event: any): any {
    this.subscriptions.add(this.administrativeService.saveAdministrativeReportParams(this.id, event).pipe(
      skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.isForce = true;
        this.loadAdministrativeReportById();
      }));
  }

  deleteParameter(event: any) {
    this.subscriptions.add(this.administrativeService.deleteAdministrativeReportParamsById(this.id, event.row.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.isForce = true;
        this.loadAdministrativeReportById();
      }));
  }
  get f() { return this.reportForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
