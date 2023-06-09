import { Location } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
import { debounceTime, distinctUntilChanged, skipWhile, map, skip, filter, switchMap, take } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { templateJitUrl } from '@angular/compiler';
import { LoginService } from 'src/app/services/login.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { TopicDescriptionEditCopyComponent } from '../topic-description-edit-copy/topic-description-edit-copy.component';
import { UtilityService } from 'src/app/services/utility.service';
import { AppUtility } from 'src/app/utility/app.utility';


@Component({
  selector: 'app-topic-description-edit',
  templateUrl: './topic-description-edit.component.html',
  styleUrls: ['./topic-description-edit.component.css'],
})
export class TopicDescriptionEditComponent implements OnInit,  OnDestroy {

  id: any;
  addRequest: boolean = false;
  forceRequestList : boolean = false;
  pageSize = Number.parseInt(AppConstant.pageSize)
  topicForm: FormGroup;
  public forceLoad : boolean = false;
  public keys: TABLECOLUMN[];
  topicPaneKeys: TABLECOLUMN[];
  recommendationKeys: TABLECOLUMN[];
  topicVariablesKeys: TABLECOLUMN[];
  disableNextButtonTopicVariable = false;
  lookupRecommendation = [];
  public allTopicPane : Array<any> = [];
  htmTopMenuTemplate;
  disableNextButtonRecommendatonLeaks = false;
  disableNextButtonTopicPane = false;
  htmRightTopTemplate;
  htmRightBottomTemplate;
  public lookUpValues;
  public recommendationLeakTableData = {
    content : [],
    totalElements: Number.MAX_SAFE_INTEGER,
    pageIndex : 0
  }
  public dataSource: any;
  public totalElement = 0;
  public topicTableData = {
    content: [],
    totalElements: 0,
  };
  topicVariableDataList = [];
  recommendationsList =[];
  public topicVariableTableData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
    pageIndex : 0
  };
  suggestionListTopicVariables = [];
  leaksRecommendationTakeBackTypeSubject : Subject<any> = new Subject();
  private readonly subscriptions: Subscription = new Subscription();
  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'fullScreen',
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
  public customerGroupList : Array<any> = [];
  public selectionListCustomerGroup : Array<any> = [];
  public selectionCustomerGroupList : Array<any> = [];
  recommendationLeakData = [];
  disableNextButtonRecommendationUnique = false;
  public recommendtaionLeakAndUniqueData ={
    dataSource : [],
    totalElement : Number.MAX_SAFE_INTEGER,
    pageIndex : 0
  }

  public topicPane = {
    dataSource : [],
    totalElement : Number.MAX_SAFE_INTEGER,
    pageIndex : 0
  }
  public topicDescriptionData : any;
  private suggestionTopicVariableSubjest$ : Subject<any> = new Subject();
  private suggestionTopicPaneSubjest$ : Subject<any> = new Subject();

  constructor(
    private dialog : MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly topicService: TopicService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly loginService: LoginService,
    private readonly utilityService: UtilityService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.addRequest = params['addRequest'];
      this.forceLoad = AppUtility.forceParamToBoolean(params['force']);
    });

    this.setForm(undefined);

    this.getPermanentTopicListFromStore();
    this.setLookUpTypeInRecommendationAndLeaks();
    this.loadPermanentTopicList();
    this.getTakeBackTypeLookUp();
    this.getCustomerGroups();
    this.getCalculationValueFromStore();
    this.loadTakeBackTypeLookUp();
  }

  scrolltop(){
    window.scrollTo(0,0);
  }

  ngOnInit() {

    this.scrolltop();
    this.customerGroupList.length == 0 ? this.loadcustomerGroups() : '';
    this.topicPaneKeys = TableColumnData.TOPIC_PANE_KEY;
    this.recommendationKeys = TableColumnData.RECOMMENDATION_KEY;
    this.topicVariablesKeys = TableColumnData.TOPIC_VARIABLES_KEYS;
    this.keys = TableColumnData.CUSTOMER_GROUP_KEY; 

    this.subscriptionSuggestionListForFilterForTopicPane();
    this.subscriptionSuggestionListForFilterForTopicVariable();

    this.loadWhenTopicDescriptionExists();
  }

  loadWhenTopicDescriptionExists(){
    if(this.id){
      this.getTopicDescription();
      this.getTopicPanesById();
      this.topicPanePageChangeEvent(undefined);
      this.getRecommendationsLeakAndUnique();
      this.getCustomerGroupById();
      this.getTopicVariableDataFromStore();
      this.loadTopicDescription();
      this.loadCustomerGroupById();
      this.topicVariablesPageChangeEvent(undefined);
      this.pageChangeEventForRecommendationLeaksAndUnique(undefined);
      this.getAllTopicPanes();
    }
  }

  

  private loadTopicDescription() {
    this.topicService.loadTopicDescriptionById(this.id,this.forceLoad);
  }

  private getTopicDescription(){
    this.subscriptions.add(
    this.topicService.getTopicDescriptionById()
    .pipe( filter((data) => data && (data.id == this.id || this.addRequest)))
    .subscribe((topicDescription: any) => {
      this.id = topicDescription.id;
      this.topicDescriptionData = topicDescription;
      this.setForm(this.topicDescriptionData);
      AppUtility.scrollTop();
    }));
  }

  private loadcustomerGroups() {
    this.systemService.loadCustomerGroupList(false, '');
  }

  private getCustomerGroups(){
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
    .subscribe((customerGroupList: any) => {
      if(customerGroupList)
        this.customerGroupList = customerGroupList;
    }));
  }

  getCustomerGroupById(){

    this.subscriptions.add(
      this.systemService.getSelectedTopicGroupList()
      .pipe( filter( (item: any) => item != undefined && item[0] && this.id == item[0].surveyDescriptionId))
     .subscribe((groupList : any) => {
        let testList = [];
        groupList.forEach((item: any) =>{
          testList.push(item.customerGroup.customerGroupId);
      })
      this.selectionCustomerGroupList = [...testList];
      // setTimeout(() => this.selectionCustomerGroupList = [...testList], 100);
    },(error : any)  => {
        console.log("some error has occurred.");
      }));
  }

   loadCustomerGroupById(){
    this.systemService.loadSelectedTopicGroupList(this.id);
   }

  loadLookUpCalculationPeriod(){
    this.topicService.loadLookUpCalculationPeriod(AppConstant.lookUpCalculationPeriod);
  }

   getCalculationValueFromStore(){
    this.subscriptions.add(
      this.topicService.getLookUpCalculationPeriod()
      .pipe(skipWhile((item: any) => !item)
      ).subscribe(
        (response: any) =>{
          this.lookUpValues = response;
               this.setTopicDescriptionValues();
        })
      )
  }

  findTopicVaribles(){
    this.subscriptions.add(
      this.loginService.performGet(AppConstant.findTopicDescriptionVariables )
    )
  }

  topicPanePageChangeEvent(event : any){
    if(event) this.topicPane.pageIndex = event.pageIndex;

    let params = new HttpParams();
    params = params.append('sortOrderAsc', 'true');
    params = params.append('sortField','orderNumber');
    params = params.append('pageSize',this.pageSize+"");

    if(event != undefined){
      params = params.append('startRow',(event.pageSize * event.pageIndex) + '');
      document.getElementById("topicPaneList").scrollIntoView();
    }else {
      params = params.append('startRow','0');
    }

    this.loadTopicPanesById(params);

  }

  getAllTopicPanes(){
    this.topicService.loadPaneListByTopicDescriptionId(this.id,new HttpParams(),true);
    this.subscriptions.add(
      this.topicService.getAllPanesByTopicDescriptionId()
      .pipe(filter(data => data && data[0].surveyDescriptionId == this.id),take(1))
      .subscribe(data =>{
        this.allTopicPane = data;
      })
    )
  }

  loadTopicPanesById(params){
    this.topicService.loadPaneListByTopicDescriptionId(this.id,params);
  }

  getTopicPanesById(){
    this.subscriptions.add(
      this.topicService.getPaneListByTopicDescriptionId()
      .pipe(filter((item: any) => {
        if(item && item[0] && item[0].surveyDescriptionId == this.id){
          return true;
        }
        this.disableNextButtonTopicPane = true;
        return false;}))
      .subscribe((dataList : any) => {
      if(dataList){
        if(dataList.length == this.pageSize){
          this.topicPane.dataSource = [...dataList];
          this.disableNextButtonTopicPane = false;
        } else {
          this.disableNextButtonTopicPane = true;
          if(dataList.length > 0){
            this.topicPane.dataSource  = [...dataList];
          } else {
            this.topicPane.pageIndex = this.topicPane.pageIndex -1;
        }}  
      }
    },(error : any)  => {
      console.log("some error has occurred.");
      console.error(error);
    })
    )
  }

  setForm(event: any) {
    this.topicForm = this.formBuilder.group({
      surveyCode: [event !== undefined ? event.surveyCode : '', Validators.required],
      label: [event !== undefined ? event.label : '', Validators.required],
      reportLabel: [event !== undefined ? event.reportLabel : '', Validators.required],
      description: [event !== undefined ? event.description : ''],
      firstPaneId: [event !== undefined ?  event.firstPaneId : ''],
      active: [event !== undefined ? event.active : true],
      permanent: [event !== undefined ? event.permanent : ''],
      mandatory: [event !== undefined ? event.mandatory : ''],
      showProgressIndicator: [event !== undefined ? event.showProgressIndicator : ''],
      showDisplayLabel: [event !== undefined ? event.showDisplayLabel : ''],
      showLeaks: [event !== undefined ? event.showLeaks : ''],
      showUnique: [event !== undefined ? event.showUnique : ''],
      showRightMenu: [event !== undefined ? event.showRightMenu : ''],
      showTopMenu: [event !== undefined ? event.showTopMenu : ''],
      nextTopic: [event !== undefined ? event.nextSurveyCode : ''],
      messageOnUnload: [event !== undefined ? event.messageOnUnload : ''],
      allowPublic: [event !== undefined ? event.allowPublic : ''],
      messageForSurveyUnloadEvent: [event !== undefined ? event.messageForSurveyUnloadEvent : ''],
      htmTopMenuTemplate: [event !== undefined ? event.htmTopMenuTemplate : ''],
      htmRightTopTemplate: [event !== undefined ? event.htmRightTopTemplate : ''],
      htmRightBottomTemplate: [event !== undefined ? event.htmRightBottomTemplate : ''],
      comments: [event !== undefined ? event.comments : ''],
      isRerunTopic: [false],
    });
  }

// selectNextPermanentTopic(){
//   let index ;
//   for(let i = 1; i < this.nextPermanentTopic.length ; i++) {
//    if(this.topicDescriptionData.nextSurveyCode == this.nextPermanentTopic[i].surveyCode) {
//     return this.nextPermanentTopic[i].id;
//    }
//   }
//   return 0;
// }

loadPermanentTopicList(){
  this.topicService.loadAllPossibleTopicDescriptionList(false);
}

getPermanentTopicListFromStore(){
  this.subscriptions.add(
  this.topicService.getAllPossibletopicDescriptionList()
  .pipe(filter((item: any) => item != undefined))
  .subscribe((topicDescriptionList: any) => {
      this.nextPermanentTopic = [...topicDescriptionList];
      this.nextPermanentTopic.splice(0, 0, {label : "" , id : 0});
  }));
}


pageChangeEventForRecommendationLeaksAndUnique(event){

  if(event) this.recommendtaionLeakAndUniqueData.pageIndex = event.pageIndex;

  let params = new HttpParams();
  params = params.append('pageSize',this.pageSize+'');
  params = params.append('sortOrderAsc', 'true');
  params = params.append('sortField','recommendationId');
  if(event != undefined){
    params = params.append('startRow',(event.pageIndex * event.pageSize) + '');
    document.getElementById("recommendationList").scrollIntoView();
  }else 
    params = params.append('startRow','0');
  
  this.loadRecommendationsLeakAndUnique(params)
}

loadRecommendationsLeakAndUnique(params){
  this.systemService.loadRecommendationsLeakAndUnique(this.id,params);
}

getRecommendationsLeakAndUnique(){
  this.subscriptions.add(
    this.systemService.getRecommendatonLeakAndUnique()
    .pipe(filter((item: any) => {
      if(item && item[0] && item[0].surveyDescriptionId == this.id){
        return true;
      }
      this.disableNextButtonRecommendationUnique = true;
      return false;
      })).subscribe(
      data =>{
        this.recommendationLeakData = data;
        this.leaksRecommendationTakeBackTypeSubject.next("getRecommendationsLeakAndUnique");
        
        if(data.length == this.pageSize){
          this.recommendtaionLeakAndUniqueData.dataSource = [...data];
          this.disableNextButtonRecommendationUnique = false;
          this.leaksRecommendationTakeBackTypeSubject.next("getRecommendationsLeakAndUnique");
  
        }else{
          this.disableNextButtonRecommendationUnique = true;  
          if(data.length > 0){
            this.recommendtaionLeakAndUniqueData.dataSource = [...data];
            this.leaksRecommendationTakeBackTypeSubject.next("getRecommendationsLeakAndUnique");

          }else{
            this.recommendtaionLeakAndUniqueData.pageIndex = this.recommendtaionLeakAndUniqueData.pageIndex -1;
          }

        }
      }, error => {
        console.error(error);
      }
    )
  )
}

loadTakeBackTypeLookUp(){
  this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeTakeBackValue);
}

getTakeBackTypeLookUp(){
  this.subscriptions.add(
    this.topicService.getLookValueForTakeBackType()
    .pipe(skipWhile((item: any) => !item))
    .subscribe(
      data =>{
        this.lookupRecommendation = data;
        this.leaksRecommendationTakeBackTypeSubject.next("getTakeBackTypeLookUp");
      },  error =>{
        console.error(error);
      }
    )
  )
}

private setLookUpTypeInRecommendationAndLeaks(){
  this.subscriptions.add(
    this.leaksRecommendationTakeBackTypeSubject
    .subscribe(
      data =>{
        this.transformRecommendationData([...this.recommendtaionLeakAndUniqueData.dataSource])
      }, error =>{ console.log(error); }
    )
  )
}

private transformRecommendationData(src){
    src = src.map(
      (element) =>{
        const lookup = this.lookupRecommendation.find((lookup) => lookup.lookupValue == element.takebackType);
        if(lookup) element.lookupType = lookup.valueName;
        return element;
      }
    )
  this.recommendtaionLeakAndUniqueData.dataSource = src;
}

getSuggestionListForFilterForTopicPane(event){
  this.suggestionTopicPaneSubjest$.next(event);
}

subscriptionSuggestionListForFilterForTopicPane(){
  const params : HttpParams = AppUtility.addNoLoaderParam(new HttpParams());

  this.subscriptions.add(
    this.suggestionTopicPaneSubjest$
    .pipe(debounceTime(AppConstant.debounceTime))
    .switchMap(event => this.loginService.performGetWithParams(AppConstant.findDataFieldVariables + '?field=' + event.search,params))
    .subscribe(
      (response) =>{
        let formatedList = [];
        if(response){
          if(response.length == 1){
            this.goToEditTopicPanes(response[0]);
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

getSuggestionListForFilterForTopicVariable(event){
  this.suggestionTopicVariableSubjest$.next(event);
}

subscriptionSuggestionListForFilterForTopicVariable(){
  
  const params : HttpParams = AppUtility.addNoLoaderParam(new HttpParams());

    this.subscriptions.add(
      this.suggestionTopicVariableSubjest$
      .pipe(debounceTime(AppConstant.debounceTime))
      .switchMap(event => this.loginService.performGetWithParams(AppConstant.findTopicDescriptionVariables + '?field=' + event.search,params))
      .subscribe(
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

  }

  back(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionList'], { queryParams: {force : this.forceRequestList}});
  }


  saveCustomerGroups(){
    this.subscriptions.add(
      this.loginService.performPost(this.selectionCustomerGroupList[0],'surveyDescriptions/' + this.id +'/surveyDescriptionGroups')
      .subscribe(
        next =>{
          console.log(next);
        }, error =>{
          console.log(error);
        }
      )
    )
  }

  save(): any {    
    if(!AppUtility.validateAndHighlightReactiveFrom(this.topicForm)){
      return ; // don't save incase form is invalid form.
    }

    const body = Object.assign(this.topicDescriptionData == undefined ?  {} : this.topicDescriptionData, this.topicForm.value);
    // for updating old object.
    if(this.id){
      this.subscriptions.add(
        this.topicService.updateTopicDescription(this.id, body)
        .pipe(take(1))
        .subscribe(
          (response)=>{
            this.forceRequestList = true;
            this.saveNewlyAddedAndRemovedTopicGroup();
        }));
      return;
    }

    // for saving new object.
    this.subscriptions.add(
      this.topicService.saveTopicDescription(body)
      .pipe(take(1))
      .subscribe(
        (response : any)=>{
          this.forceRequestList = true;
          this.id = response.topicManagement.topicDescription.id;
          this.router.navigate([], { 
            relativeTo: this.activateRoute,
            queryParams: {id : this.id  },
            queryParamsHandling : 'merge'
          });
          this.getTopicDescription();
          this.loadWhenTopicDescriptionExists();
      }));
  }

  saveNewlyAddedAndRemovedTopicGroup(){
    const {newlySelected, newlyRemoved } = AppUtility.getNewlySelectedAndRemovedList(this.selectionListCustomerGroup,this.selectionCustomerGroupList,'customerGroupId');

    this.saveCustomerGroupsToTopicDescription(newlySelected);
    this.removeCustomerGroupFromTopicDescription(newlyRemoved);
  }

  saveCustomerGroupsToTopicDescription(topicDescriptionList : Array<any>){
    topicDescriptionList.forEach((item) => {
      this.systemService.addCustomerGroupToList(this.id,item)
    })
  }

  removeCustomerGroupFromTopicDescription(topicDescriptionList : Array<any>){
    topicDescriptionList.forEach((item) => {
      this.systemService.removeCustomerGroupToList(this.id,item)
    })
  }

  delete(): any { 

    if(!confirm('Are you sure you want to delete?')) return;

    this.subscriptions.add(
      this.topicService.deleteTopicDescriptionById(this.id)
      .pipe(take(1))
      .subscribe((response: any) => {this.forceRequestList = true; this.back();}));
  }

  copy(): any {
    const dialogRef = this.dialog.open(TopicDescriptionEditCopyComponent, {
      width: '40vw',
      height: '35vh',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createcopy(result)
      }
    });
  }

  private createcopy(event : any){
    document.getElementById('loader').classList.add('loading')
    let params = new HttpParams();
    params = params.append('newSurveyCode',event.nextTopicCode);
    params = params.append('prefix',event.prefix);
    this.subscriptions.add(
      this.topicService.CopyCreateTopicDescriptionFromId(this.id,params)
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          // SubscriptionUtil.unsubscribe(this.subscriptions);
          this.id = response.topicManagement.topicDescription.id ;
          this.router.navigate([], { 
            relativeTo: this.activateRoute,
            queryParams: {id :  this.id , addRequest : null},
            queryParamsHandling : 'merge'
          });
          this.forceRequestList = true;
          this.topicPanePageChangeEvent(undefined);
          this.topicVariablesPageChangeEvent(undefined);
          this.pageChangeEventForRecommendationLeaksAndUnique(undefined);
          this.loadCustomerGroupById();
          this.getAllTopicPanes();
          this.getTopicDescription();
        }
      ));
  }


  ReInitTopic(): any {

    if(!confirm('Are you sure?')) return;

    let params = new HttpParams();
    let isRerunTopic = this.topicForm.value.isRerunTopic == false ? false : this.topicForm.value.isRerunTopic
    params = params.append('rerunSurvey',isRerunTopic);
    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(
      this.loginService.performPostWithParam({}, AppConstant.topicDescription +  '/' + this.id  + '/reinitSurvey',params)
      .subscribe(
        data =>{
          AppUtility.scrollTop();
        }, error =>{ 
          console.error(error);
          document.getElementById('loader').classList.remove('loading');
        }
      )
    )
   }


  topicVariablesPageChangeEvent(event){
    if(event) this.topicVariableTableData.pageIndex = event.pageIndex;
    let params = new HttpParams();
    params = params.append('pageSize',this.pageSize+"");
    params = params.append('sortOrderAsc', 'true');
    params = params.append('sortField','field');
    if(event != undefined){
      params = params.append('startRow',(event.pageIndex * event.pageSize) + '');
      document.getElementById("topicVarables").scrollIntoView();
    }else 
      params = params.append('startRow','0');
      
    this.loadTopicVariable(params);
  }

  loadTopicVariable(params: any){
    this.topicService.loadTopicVariables(this.id,params);
  }

   getTopicVariableDataFromStore(){
    this.subscriptions.add(this.topicService.getTopicVariable()
      .pipe(filter((item: any) => {
        if(item && item[0] && item[0].surveyDescriptionId == this.id){
          return true;
        }
        this.disableNextButtonTopicVariable = true;
        return false;
      }))
      .subscribe(
        (response) =>{
          this.topicVariableDataList = [...response]
          if(!this.lookUpValues)
            this.loadLookUpCalculationPeriod();
          else{
            this.setTopicDescriptionValues();
          }
        } , error => { console.error(error)}
      )
      )
  }

  setTopicDescriptionValues(){

    for(let item of this.lookUpValues){
      for(let data of this.topicVariableDataList){
        if(data.calculationPeriod == item.lookupValue){
          if(data.calculationPeriod == 'E' || data.calculationPeriod == 'G' || data.calculationPeriod == 'V') 
              data.calculationPeriodActual = `???variablePeriod.${data.calculationPeriod}???`
          else data.calculationPeriodActual = item.valueName;
        }
      }}  

    if(this.topicVariableDataList.length == this.pageSize){
      this.topicVariableTableData.content = [...this.topicVariableDataList];
      this.disableNextButtonTopicVariable = false;
    } else {
      this.disableNextButtonTopicVariable = true;
      if(this.topicVariableDataList.length > 0){
        this.topicVariableTableData.content = [...this.topicVariableDataList];
      } else {
        this.topicVariableTableData.pageIndex =  this.topicVariableTableData.pageIndex -1;
    }}  
  }

  get form(){
    return this.topicForm.value;
  }

  get formControl(){
    return this.topicForm.controls;
  }

  highlightErrorField(formControlName : string) : boolean{
    return this.formControl[formControlName].invalid && (this.formControl[formControlName].dirty || this.formControl[formControlName].touched);
  }

  addTopicPanes(): any {      
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'],{queryParams: {topicDescriptionId: this.topicDescriptionData.id }});
  }

  addRecommendationLeaks(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionRecommendationEdit'], { queryParams: { topicDescriptionId: this.topicDescriptionData.id, addRequest : true } });
  }

  addTopicVariables(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionVariableEdit'],{queryParams: {topicDescriptionId: this.topicDescriptionData.id , topicDescription : this.topicDescriptionData.surveyCode + ", " + this.topicDescriptionData.label}});
  }
 
  goToEditTopicPanes(event: any): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionPaneEdit'], { queryParams: { id: event.paneId , topicDescriptionId: this.topicDescriptionData.id } });
  }

  goToEditRecommendationLeaks(event: any): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionRecommendationEdit'], { queryParams: { id: event.id, topicDescriptionId: this.topicDescriptionData.id  } });
  }

  goToEditTopicVariables(event: any): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionVariableEdit'], { queryParams: { id: event.id , topicDescriptionId : event.surveyDescriptionId , topicDescription : this.topicDescriptionData.surveyCode + ", " + this.topicDescriptionData.label  } });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
