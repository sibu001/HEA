import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
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
  public parameterDataSource: any;
  private topicDescriptionId : number;
  private paneId : number;
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
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.topicDescriptionId = params['topicDescriptionId'];
      this.paneId = params['paneId'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if(this.id){
      this.getPaneReportById();
      this.loadPaneById();
    }
    AppUtility.scrollTop();
  }

  loadPaneById(){
    this.topicService.loadPaneReportById(this.paneId, this.id);
  }

  getPaneReportById(){
    this.subscriptions.add(
      this.topicService.getPaneReportById()
      .pipe(filter(data => data != undefined))
      .subscribe(
        (response) =>{
          this.setForm(response);
        }
      )
      )
  }

  setForm(event: any) {
    this.reportForm = this.formBuilder.group({
      reportCode: [event !== undefined ? event.reportCode : '', Validators.required],
      report: [event !== undefined ? event.report : ''],
    });
  }

  delete(): any {
    this.topicService.deletePaneReportById(this.paneId,this.id);
    this.back();
  }

  back() {
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'],
    {queryParams : {id : this.paneId, topicDescriptionId : this.topicDescriptionId }})
  }

  save(): any {

    if(this.id){
      this.save
    }else{
      this.topicService.saveNewPaneReport(this.paneId,this.reportForm.value);
      this.getPaneReportById();
    }

  }

  addParameter(): any {

  }

  get f(): { [key: string]: AbstractControl; } { return this.reportForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
