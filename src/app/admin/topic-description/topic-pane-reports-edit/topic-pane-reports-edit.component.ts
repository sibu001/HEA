import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-pane-reports-edit',
  templateUrl: './topic-pane-reports-edit.component.html',
  styleUrls: ['./topic-pane-reports-edit.component.css']
})
export class TopicPaneReportsEditComponent implements OnInit, OnDestroy {
  id: any;
  reportForm: FormGroup;
  parameterKeys = TableColumnData.REPORT_PARAMETER_KEY;
  public parameterDataSource: Array<any> = [];
  private topicDescriptionId : number;
  private paneId : number;
  private reportData : any = {};
  public reportList : Array<any> = [];
  public totalElement = 0;
  public parameterData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly topicService : TopicService,
    private readonly  router : Router,
    private readonly administrativeService : AdministrativeService,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.topicDescriptionId = params['topicDescriptionId'];
      this.paneId = params['paneId'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    this.loadAdminstrativeReports();
    if(this.id){
      this.getPaneReportById();
      this.loadPaneReportById();
      this.getAllDataFields();
    }
    AppUtility.scrollTop();
  }

  loadAdminstrativeReports(){
    this.administrativeService.loadAdministrativeReportList(false, '');
    this.subscriptions.add(this.administrativeService.getAdministrativeReportList().pipe(filter((item: any) => item))
      .subscribe((reportList: any) => {
        this.reportList = reportList;
        if(!this.id) this.reportForm.patchValue({ reportId : this.reportList[0].id});
      }));
  }

  loadPaneReportById(){
    this.topicService.loadPaneReportById(this.paneId, this.id);
  }

  getPaneReportById(){
    this.subscriptions.add(
      this.topicService.getPaneReportById()
      .pipe(filter((data : any) => data && data.id == this.id))
      .subscribe((response) =>{
          this.setForm(response);
          this.reportData = {...response};
          const parameterDataSource = response.paneReportParams.map(data =>{
            data.dataFieldLabel = data.dataField ? data.dataField.label : '';
            data.reportParameterLabel = data.reportParam ? data.reportParam.parameterLabel : '';
            return data;
          });
          this.parameterDataSource = parameterDataSource;

          const reportParameter = this.reportData.report.reportParams;
          this.parameterKeys[1].option = reportParameter.map((data) => {
            const formattedData : any = {};
            formattedData.id = data.id;
            formattedData.key = data.id;
            formattedData.value = data.parameterLabel;
            return formattedData;
          })
          this.parameterKeys = [...this.parameterKeys];

          AppUtility.scrollTop();
        }));
  }

  setForm(event: any) {
    this.reportForm = this.formBuilder.group({
      reportCode: [event !== undefined ? event.reportCode : '', Validators.required],
      reportId: [event !== undefined ? event.reportId : (this.reportList[0] ? this.reportList[0].id : '')],
    });
  }

  delete(): any {

    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(
      this.topicService.deletePaneReportById(this.paneId,this.id)
      .pipe(take(1)).subscribe(
        (response) =>{
          this.back();
      }));
  }

  back() {
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'],
    {queryParams : {id : this.paneId, topicDescriptionId : this.topicDescriptionId }})
  }

  save(): any {

  if(!AppUtility.validateAndHighlightReactiveFrom(this.reportForm)) 
    return;

    const body = {...this.reportData, ...this.reportForm.value};
  
    if(this.id){
      this.topicService.SaveExistingPaneReport(this.paneId,body,this.id);
      return;
    }

    this.subscriptions.add(
      this.topicService.saveNewPaneReport(this.paneId,body)
      .pipe(take(1))
      .subscribe((response : any) => {
        this.id = response.topicManagement.paneReport.id;
        AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
        this.getPaneReportById();
        this.getAllDataFields();
    }));

  }

  highlightErrorField(formControlName : string) : boolean{
    return AppUtility.showErrorMessageOnErrorField(this.f, formControlName);  
  } 

  getAllDataFields(){
    this.topicService.loadDataFieldByPaneId(this.paneId);
    this.subscriptions.add(
      this.topicService.getDataFieldByPaneId()
      .pipe(filter(data => data))
      .subscribe((response) =>{
        console.log(response);
          this.parameterKeys[0].option = response.map((data) =>{
            const formattedData : any = {};
            formattedData.id = data.id;
            formattedData.key = data.id;
            formattedData.value = data.label + ' (' + data.field + ')';
            return formattedData;
          });
          this.parameterKeys = [...this.parameterKeys];
      }));
  }

  addParameter($event): any {
    const requestBody = {
      dataFieldId : $event.dataFieldLabel,
      reportParamId : $event.reportParameterLabel,
    };

    this.topicService.savePaneReportParameter(this.paneId,this.id,requestBody);
  } 

  deleteParameter($event): any {
    this.topicService.deletePaneReportParameter(this.paneId,this.id,$event.id);
  }

  get f(): { [key: string]: AbstractControl; } { return this.reportForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
