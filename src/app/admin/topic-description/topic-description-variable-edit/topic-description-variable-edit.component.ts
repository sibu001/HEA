import { AppConstant } from 'src/app/utility/app.constant';
import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppComponent } from 'src/app/app.component';
import { ThrowStmt } from '@angular/compiler';
import { AppUtility } from 'src/app/utility/app.utility';

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
  topicDescriptionData : any = {};
  topicDescription : any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly topicService: TopicService,
    private readonly loginService : LoginService,
    private readonly location: Location,
    private readonly datePipe: DatePipe,
    private readonly utilityService: UtilityService,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.surveyDescriptionId = params['topicDescriptionId'];
      this.topicDescription = params['topicDescription'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);

    this.getCalculationValueFromStore()
    this.getCalculationTypeListFromStore();

    this.loadCalculationTypeList(); 
    this.loadLookUpCalculationPeriod();

    if(this.id){
      this.getSeletedTopicDescriptionVariableFromStore();
      this.loadtopicDescriptionVariableData();
    }
    AppUtility.scrollTop();
  }

  loadCalculationTypeList(): any {
    this.systemService.loadCalculationTypeList();
  }

  getCalculationTypeListFromStore() : any{
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
    .pipe(filter(data => data),take(1))
    .subscribe((calculationTypeList: any) => {
      this.calculationTypeList = calculationTypeList.data;
      if(!this.id) this.variableForm.patchValue({calculationType : this.calculationTypeList[0].lookupValue});
    }));
  }

  
  setForm(event: any): any {
    this.variableForm = this.formBuilder.group({
      field: [event !== undefined ? event.field : '', Validators.required],
      calculationType: [event !== undefined ? event.calculationType : ''],
      calculation: [event !== undefined ? event.calculation : ''],
      calculationPeriod: [event !== undefined ? event.calculationPeriod : ''],
      comments: [event !== undefined ? event.comments : ''],
      keepVaca : [ event !== undefined ? event.keepVaca : false]
    });
  }

  getCalculationValueFromStore(){
    this.subscriptions.add(
      this.topicService.getLookUpForVariablePeriod()
      .pipe(filter((item: any) => item),take(1))
      .subscribe(
        (response: any) =>{
            this.calculationPeriodList = response;
            if(this.id === undefined)
            this.variableForm.patchValue({calculationPeriod : this.calculationPeriodList[2].lookupValue});
        })
      )
  }

  loadLookUpCalculationPeriod(){  
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCalculationPeriod);
  }

  getSeletedTopicDescriptionVariableFromStore(){
    this.subscriptions.add(
      this.topicService.getSeletedTopicDescriptionVariable()
      .pipe(filter((item: any) => item && item.id == this.id))
      .subscribe(
        (response) =>{
          this.topicDescriptionData = {...response};
          this.setForm(response);
          AppUtility.scrollTop();
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
    this.router.navigate(['/admin/topicDescription/topicDescriptionEdit'],{queryParams: {id: this.surveyDescriptionId}});
  }

  save(): any {

    if(!AppUtility.validateAndHighlightReactiveFrom(this.variableForm)) return;

    const body = Object.assign(this.topicDescriptionData,this.variableForm.value);

    AppUtility.removeErrorFieldMessagesFromForm();

    if(this.id){
      this.subscriptions.add(
        this.topicService.updateTopicDescriptionVariable(this.surveyDescriptionId,this.id,body)
        .pipe(take(1)).subscribe(
          (resposne) =>{}
          ,AppUtility.errorFieldHighlighterCallBack));
        
      return;
    }

    body.createdDate = undefined;
    body.updatedDate = undefined;

    this.subscriptions.add(
      this.topicService.saveTopicDescriptionVariable(this.surveyDescriptionId,body)
      .pipe(take(1))
      .subscribe((response : any) =>{
        this.id = response.topicManagement.topicDescriptionVariable.id;
        AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
        this.getSeletedTopicDescriptionVariableFromStore();
      },AppUtility.errorFieldHighlighterCallBack)
    );
  }  
  delete(): any {

    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(
      this.topicService.deleteTopicDescritpionVariable(this.surveyDescriptionId,this.id)
      .pipe(take(1))
      .subscribe((response) =>{
        this.back();
    }));

  }

  recalculate() {
    this.subscriptions.add(
      this.loginService.performPost({},AppConstant.topicDescription +  '/' + this.surveyDescriptionId + '/' + AppConstant.topicDescritptionVariable + '/' + this.id + '/recalculate')
      .subscribe(
        (response) =>{
           if(response.errorMessage){
            this.utilityService.showErrorMessage(response.errorMessage);
           }else{
            this.router.navigate(['/admin/topicDescription/topicDescriptionVariableEdit'], { queryParams: { id: this.id , topicDescriptionId : this.surveyDescriptionId , topicDescription : this.topicDescription } });
           }
        }, error => { console.error(error); }
      ) 
    )
  }

  get f() { return this.variableForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  highlightErrorField(formControlName : string) : boolean{
    return this.f[formControlName].invalid && (this.f[formControlName].dirty || this.f[formControlName].touched);
  }

}
