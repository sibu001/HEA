import { AppConstant } from 'src/app/utility/app.constant';
import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-topic-description-variable-edit',
  templateUrl: './topic-description-variable-edit.component.html',
  styleUrls: ['./topic-description-variable-edit.component.css']
})
export class TopicDescriptionVariableEditComponent implements OnInit, OnDestroy {
  id: any;
  variableForm: FormGroup;
  calculationPeriodList: any[] = TableColumnData.CALCULATION_PERIOD;
  calculationTypeList: any[] = [];
  surveyDescriptionId : any;
  topicDescriptionData : any;
  topicDescription : any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly topicService: TopicService,
    private readonly location: Location,
    private readonly datePipe: DatePipe,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.surveyDescriptionId = params['surveyDescriptionId'];
      this.topicDescription = params['topicDescription'];
    });
    console.log(this.id); 
  }


  ngOnInit() {
    this.getCalculationValueFromStore()
    this.loadLookUpCalculationPeriod();
    this.getSeletedTopicDescriptionVariableFromStore();
    this.loadCalculationTypeList();
    this.setForm(undefined);
    this.loadtopicDescriptionVariableData();
  }

  loadCalculationTypeList(): any {
    this.systemService.loadCalculationTypeList();
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((calculationTypeList: any) => {
        this.calculationTypeList = calculationTypeList.data;
      }));
  }

  setForm(event: any): any {
    this.variableForm = this.formBuilder.group({
      field: [event !== undefined ? event.field : '', Validators.required],
      calculationType: [event !== undefined ? event.calculationType : '1'],
      calculationExpression: [event !== undefined ? event.calculation : ''],
      calculationPeriod: [event !== undefined ? event.calculationPeriod : ''],
      comments: [event !== undefined ? event.comments : ''],
      keepVaca : [ event !== undefined ? event.keepVaca : false]
    });
  }

  getCalculationValueFromStore(){
    this.subscriptions.add(
      this.topicService.getLookUpCalculationPeriod()
      .pipe(skipWhile((item: any) => !item)
      ).subscribe(
        (response: any) =>{
            this.calculationPeriodList = response;
        })
      )
  }

  loadLookUpCalculationPeriod(){  
    this.topicService.loadLookUpCalculationPeriod(AppConstant.lookUpCalculationPeriod);
  }

  getSeletedTopicDescriptionVariableFromStore(){
    this.subscriptions.add(
      this.topicService.getSeletedTopicDescriptionVariable()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        (response) =>{
          this.topicDescriptionData = {...response};
          this.topicDescriptionData.updatedDate = this.datePipe.transform(this.topicDescriptionData.updatedDate,'mm/dd/yyyy HH:MM:ss')
          this.setForm(response);
        }
        ));
  }

  loadtopicDescriptionVariableData(){
    this.topicService.loadSelectedTopicDescriptionVariable(this.surveyDescriptionId, this.id);
  }

  goToDebug() {
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });
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
