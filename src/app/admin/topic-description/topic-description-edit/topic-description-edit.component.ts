import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  ToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';
import { pipe, Subject, Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { templateJitUrl } from '@angular/compiler';
import { LoginService } from 'src/app/services/login.service';
import { AppConstant } from 'src/app/utility/app.constant';


@Component({
  selector: 'app-topic-description-edit',
  templateUrl: './topic-description-edit.component.html',
  styleUrls: ['./topic-description-edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class TopicDescriptionEditComponent implements OnInit, OnDestroy {

  id: any;
  topicForm: FormGroup;
  public keys: TABLECOLUMN[];
  topicPaneKeys: TABLECOLUMN[];
  recommendationKeys: TABLECOLUMN[];
  topicVariablesKeys: TABLECOLUMN[];
  public dataSource: any;
  public totalElement = 0;
  public topicTableData = {
    content: [],
    totalElements: 0,
  };
  topicVariableDataList = [];
  public topicVariableTableData = {
    content: [],
    totalElements: 0,
  };
  suggestionListTopicVariables = [];
  private readonly subscriptions: Subscription = new Subscription();
  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen',
      {
        tooltipText: 'Select Style',
        undo: true,
        template: `
        <select class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar" style="width:100px">
        <option value='nmt'>nmt</option>
        </select>`
      }]
  };
  topicData = TableColumnData.PANE_DATA;
  nextTopicCode = [];
  public nextPermanentTopic = [];
  public customerGroupList : any;
  public selectionCustomerGroupList : any;
  public topicPaneDataSource : any;
  public topicDescriptionData : any;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly topicService: TopicService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly loginService: LoginService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.getCalculationValueFromStore();
    this.keys = TableColumnData.CUSTOMER_GROUP_KEY;
    this.topicPaneKeys = TableColumnData.TOPIC_PANE_KEY;
    this.recommendationKeys = TableColumnData.RECOMMENDATION_KEY;
    this.topicVariablesKeys = TableColumnData.TOPIC_VARIABLES_KEYS;
    this.loadcustomerGroups();
      this.setForm(undefined);
    
      if(this.id){
        this.getTopicVariableDataFromStore();
        this.getPermanentTopicListFromStore();
        this.loadTopicDescription();
        this.loadCustomerGroupById();
        this.loadTopicVariable();
        this.loadPermanentTopicList();
      }
  }

  private loadTopicDescription() {
    this.topicService.loadTopicDescriptionById(this.id);
    this.subscriptions.add(this.topicService.getTopicDescriptionById().pipe(skipWhile((item: any) => !item))
    .subscribe((topicDescription: any) => {
      this.topicDescriptionData = topicDescription;
      this.loadTopicPanesById();
    }));
  }

  private loadcustomerGroups() {
    this.systemService.loadCustomerGroupList(false, '');
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupList = customerGroupList;
      }));
  }

   loadCustomerGroupById(){
    this.selectionCustomerGroupList = [];
    this.subscriptions.add(
      this.loginService.performGet(AppConstant.topicDescription + '/' + this.id + '/surveyDescriptionGroups')
     .subscribe((groupList : any) => {
        let testList = [];
        groupList.forEach((item: any) =>{
          testList.push(item.customerGroup.groupCode);
      })
      this.selectionCustomerGroupList = [...testList];
      },(error : any)  => {
        console.log("some error has occurred.");
      }));
   }

   getCalculationValueFromStore(){
    this.subscriptions.add(
      this.topicService.getLookUpCalculationPeriod()
      .pipe(skipWhile((item: any) => !item)
      ).subscribe(
        (response: any) =>{
            for(let item of response){
               for(let data of this.topicVariableDataList){
                 if(data.calculationPeriod == item.lookupValue){
                   data.calculationPeriodActual = item.valueName;
                  //  break;
                 }
               }}
           this.topicVariableTableData.content = [...this.topicVariableDataList];
        })
      )
  }

  findTopicVaribles(){
    this.subscriptions.add(
      this.loginService.performGet(AppConstant.findTopicDescriptionVariables )
    )
  }

   loadLookUpCalculationPeriod(){
     this.topicService.loadLookUpCalculationPeriod(AppConstant.lookUpCalculationPeriod);
   }

   loadTopicPanesById(){
     this.topicPaneDataSource = [];
     this.subscriptions.add(
      this.loginService.performGet(AppConstant.topicDescription + '/' + this.id + '/panes')
      .subscribe((dataList : any) => {
          this.topicPaneDataSource = [...dataList];  
          for(let topic of dataList){
             if(topic.id == this.topicDescriptionData.firstPaneId){
              this.topicForm.get('firstPaneOrSection').setValue(topic.id);
             }
          }

          this.setForm(this.topicDescriptionData);
      },(error : any)  => {
        console.log("some error has occurred.");
      }));
   }

  setForm(event: any) {
    this.topicForm = this.formBuilder.group({
      topicCode: [event !== undefined ? event.surveyCode : '', Validators.required],
      displayLabel: [event !== undefined ? event.reportLabel : '', Validators.required],
      reportLabel: [event !== undefined ? event.reportLabel : '', Validators.required],
      description: [event !== undefined ? event.description : ''],
      firstPaneOrSection: [event !== undefined ?  '' : ''],
      active: [event !== undefined ? event.active : ''],
      permanent: [event !== undefined ? event.permanent : ''],
      mandatory: [event !== undefined ? event.mandatory : ''],
      showProgressIndicator: [event !== undefined ? event.showProgressIndicator : ''],
      showDisplayLabel: [event !== undefined ? event.showDisplayLabel : ''],
      showLeaks: [event !== undefined ? event.showLeaks : ''],
      showUnique: [event !== undefined ? event.showUnique : ''],
      showRightMenu: [event !== undefined ? event.showRightMenu : ''],
      showTopMenu: [event !== undefined ? event.showTopMenu : ''],
      nextTopic: [event !== undefined ? this.selectNextPermanentTopic() : ''],
      allowPublic: [event !== undefined ? event.allowPublic : ''],
      messageForSurveyUnloadEvent: [event !== undefined ? event.messageForSurveyUnloadEvent : ''],
      topMenu: [event !== undefined ? event.showTopMenu : ''],
      rightMenuTopPart: [event !== undefined ? event.rightMenuTopPart : ''],
      rightMenuBottomPart: [event !== undefined ? event.rightMenuBottomPart : ''],
      comments: [event !== undefined ? event.comments : ''],
      isRerunTopic: [event !== undefined ? event.isRerunTopic : ''],
    });
  }


selectNextPermanentTopic(){

  let index ;
  for(let i = 0; i < this.nextPermanentTopic.length ; i++) {
   if(this.id == this.nextPermanentTopic[i].id) {
      index = i;
      break;
   }
  }
  if(index + 1 == this.nextPermanentTopic.length) 
    return ' '
  else
    return this.nextPermanentTopic[index + 1].id;
}

loadPermanentTopicList(){
  this.topicService.loadTopicDescriptionList(true, '');
}

getPermanentTopicListFromStore(){
  this.subscriptions.add(this.topicService.getTopicDescriptionList()
  .pipe(skipWhile((item: any) => !item))
  .subscribe((topicDescriptionList: any) => {
    this.nextPermanentTopic = [...topicDescriptionList];
    this.nextPermanentTopic.splice(0, 0, {});
  }));
}

GetSuggestionListForFilter(event){
    this.subscriptions.add(
      this.loginService.performGet(AppConstant.findTopicDescriptionVariables + '?field=' + event.search)
      .pipe(
        distinctUntilChanged(),
        debounceTime(AppConstant.debounceTime)
      ).subscribe(
        (response) =>{
          let formatedList = [];
          if(response){
            if(response.length == 1){
              this.goToEditTopicVariables(response[0]);
            } else{
              response.forEach(
                (item) =>{formatedList.push({value : item.field , show : item.field});}
              )
              this.suggestionListTopicVariables = formatedList ;
            }}else{
            this.suggestionListTopicVariables = formatedList ;
          }
        },error =>{ console.error(error) }
      )
    )
}

  topicCheckBoxChangeEvent(event: any) {
    this.selectionCustomerGroupList = [...event];
  }

  back() {
    this.location.back();
  }

  save(): any { }
  delete(): any { }

  copy(): any { }

  ReInitTopic(): any { }

  loadTopicVariable(){
    this.topicService.loadTopicVariables(this.id);
  }

  getTopicVariableDataFromStore(){
    this.subscriptions.add(this.topicService.getTopicVariable()
      .pipe(
        skipWhile((item: any) => !item)
      ).subscribe(
        (response) =>{
          this.topicVariableDataList = response;
          this.loadLookUpCalculationPeriod();
        } , error => { console.error(error)}
      )
      )
  }

  addTopicPanes(): any {      
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit']);
  }

  addRecommendationLeaks(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionRecommendationEdit']);
  }

  addTopicVariables(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionVariableEdit']);
  }

  goToEditTopicPanes(event: any): any {
    console.log(event);
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'], { queryParams: { id: event } });
  }

  goToEditRecommendationLeaks(event: any): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionRecommendationEdit'], { queryParams: { id: event } });
  }

  goToEditTopicVariables(event: any): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionVariableEdit'], { queryParams: { id: event.id , surveyDescriptionId : event.surveyDescriptionId , topicDescription : this.topicDescriptionData.surveyCode + ", " + this.topicDescriptionData.label  } });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
