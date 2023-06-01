import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';
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
    AppUtility.scrollTop();
    this.loadReportType();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.loadAdministrativeReportById();
      this.getAdministrativeReport();
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

  loadAdministrativeReportById(){
    this.administrativeService.loadAdministrativeReportById(Number(this.id));
  }

  getAdministrativeReport() {
    this.subscriptions.add(
      this.administrativeService.getAdministrativeReportById()
      .pipe(filter((item: any) => item && item.id == this.id))
      .subscribe((report: any) => {
        this.reportObject = {...report};
        if (report.report) {
          this.dataFieldKeys[0].type = undefined;
          this.showAddButton = false;
        } else {
          this.showAddButton = true;
          this.dataFieldKeys[0].type = 'input';
        }

        report.reportParams.forEach((element: any) => {
          if (!report.report) {
            element.action = 'assets/images/ico_minus.gif';
            element.isInputEdit = false;
          } else {
            element.isInputEdit = true;
          }
        });
        this.parameters = JSON.parse(JSON.stringify(report.reportParams));
        this.dataFieldDataSource = [...this.parameters];
        // if (this.isForce) {
        //   this.router.navigate(['admin/administrativeReport/administrativeReportEdit'], { queryParams: { 'id': report.id } });
        // }
        this.setForm(report);
        AppUtility.scrollTop();
      }));
  }

  addNewRow() {
    this.showAddButton= false;
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
    if (AppUtility.validateAndHighlightReactiveFrom(this.reportForm)) {
      if (this.id) {
        const requestBody = {...this.reportObject, ...this.reportForm.value};
        this.subscriptions.add(this.administrativeService.updateAdministrativeReport(this.id, requestBody).pipe(
          filter((item: any) => item))
          .subscribe((response: any) => {
          }));
      } else {
        this.subscriptions.add(this.administrativeService.saveAdministrativeReport(this.reportForm.value).pipe(
          filter((item: any) => item))
          .subscribe((response: any) => {
            this.id = response.administrativeManagement.administrativeReport.id;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
            this.getAdministrativeReport();
          }));
      }
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

    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(this.administrativeService.deleteAdministrativeReportById(this.id).pipe(skipWhile((item: any) => !item))
      .pipe(take(1))
      .subscribe((response: any) => {
        this.back();
        // this.router.navigate(['admin/administrativeReport/administrativeReportList'], { queryParams: { 'force': true } });
      }));
  }

  addParameter(event: any): any {
    this.subscriptions.add(this.administrativeService.saveAdministrativeReportParams(this.id, event).pipe(
      filter((item: any) => item),take(1))
      .subscribe((response: any) => {
        // this.isForce = true;
        // this.loadAdministrativeReportById();
      }));
  }

  deleteParameter(event: any) {
    this.subscriptions.add(this.administrativeService.deleteAdministrativeReportParamsById(this.id, event.row.id).pipe(skipWhile((item: any) => !item))
      .pipe(take(1))
      .subscribe((response: any) => {
        // this.isForce = true;
        // this.loadAdministrativeReportById();
      }));
  }
  get f() { return this.reportForm.controls; }

  highlightErrorField(formControlName : string) : boolean{
    return this.f[formControlName].invalid && (this.f[formControlName].dirty || this.f[formControlName].touched);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
