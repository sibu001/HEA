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
import { debounceTime, distinctUntilChanged, skipWhile, map, skip, filter } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { templateJitUrl } from '@angular/compiler';
import { LoginService } from 'src/app/services/login.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { TopicDescriptionEditCopyComponent } from '../topic-description-edit-copy/topic-description-edit-copy.component';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-topic-description-edit',
  templateUrl: './topic-description-edit.component.html',
  styleUrls: ['./topic-description-edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class TopicDescriptionEditComponent implements OnInit,  OnDestroy {

  id: any;
  pageSize = Number.parseInt(AppConstant.pageSize);
  topicForm: FormGroup;
  public keys: TABLECOLUMN[];
  topicPaneKeys: TABLECOLUMN[];
  recommendationKeys: TABLECOLUMN[];
  topicVariablesKeys: TABLECOLUMN[];
  disableNextButtonTopicVariable = false;
  lookupRecommendation = [];
  public lookUpValues;
  public dataSource: any;
  public totalElement = 0;
  public topicTableData = {
    content: [],
    totalElements: 0,
  };
  allTopicPane = []
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
  public customerGroupList : Array<any> = [];
  public selectionListCustomerGroup : Array<any> = [];
  public selectionCustomerGroupList : Array<any> = [];
  recommendationLeakData = [];
  public topicPane = {
    dataSource : [],
    totalElement : 0,
    index : 0
  }
  public topicDescriptionData : any;

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
    this.keys = TableColumnData.CUSTOMER_GROUP_KEY;
    this.topicPaneKeys = TableColumnData.TOPIC_PANE_KEY;
    this.recommendationKeys = TableColumnData.RECOMMENDATION_KEY;
    this.topicVariablesKeys = TableColumnData.TOPIC_VARIABLES_KEYS;
    
      if(this.id){
        this.getTopicDescription();
        this.getTopicPanesById();
        this.loadTopicPanesById();
        this.getRecommendationsLeakAndUnique();
        this.getCustomerGroupById();
        this.getTopicVariableDataFromStore();
        this.loadTopicDescription();
        this.loadCustomerGroupById();
        this.topicVariablesPageChangeEvent(undefined);
        this.loadRecommendationsLeakAndUnique();
      }
  }

  private loadTopicDescription() {
    this.topicService.loadTopicDescriptionById(this.id);
  }

  private getTopicDescription(){
    this.subscriptions.add(
    this.topicService.getTopicDescriptionById()
    .pipe( filter(x => x !== undefined))
    .subscribe((topicDescription: any) => {
      this.topicDescriptionData = topicDescription;
      this.setForm(this.topicDescriptionData);
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
      .pipe( filter( item => item != undefined))
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

  loadTopicPanesById(){
    this.topicService.loadPaneListByTopicDescriptionId(this.id);
  }

  getTopicPanesById(){
    this.subscriptions.add(
      this.topicService.getPaneListByTopicDescriptionId()
      .pipe(skipWhile((item: any) => !item))
      .subscribe((dataList : any) => {
      if(dataList){
        this.allTopicPane = [...dataList];
        this.topicPane.dataSource = this.allTopicPane.slice(0,this.pageSize);   
        this.topicPane.totalElement = this.allTopicPane.length;
        this.topicPane.index = 0;
      }
        // this.setForm(this.topicDescriptionData);
    },(error : any)  => {
      console.log("some error has occurred.");
      console.error(error);
    })
    )
  }

  topicPanePagination(event){
      const pageIndex = event.pageIndex;
      this.topicPane.dataSource = this.allTopicPane.slice(pageIndex*this.pageSize,pageIndex*this.pageSize + this.pageSize);
      this.topicPane.index = pageIndex;
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
      nextTopic: [event !== undefined ? this.selectNextPermanentTopic() : ''],
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

  getSelectedPaneID(){
    for(let topic of this.allTopicPane){
      if(topic.id == this.topicDescriptionData.firstPaneId){
       return topic.id;
      }
   }
  }


selectNextPermanentTopic(){
  let index ;
  for(let i = 1; i < this.nextPermanentTopic.length ; i++) {
   if(this.topicDescriptionData.nextSurveyCode == this.nextPermanentTopic[i].surveyCode) {
    return this.nextPermanentTopic[i].id;
   }
  }
  return 0;
}

loadPermanentTopicList(){
  this.topicService.loadTopicDescriptionList(true, '');
}

getPermanentTopicListFromStore(){
  this.subscriptions.add(
  this.topicService.getTopicDescriptionList()
  .pipe(filter((item: any) => item != undefined))
  .subscribe((topicDescriptionList: any) => {
      this.nextPermanentTopic = [...topicDescriptionList];
      this.nextPermanentTopic.splice(0, 0, {label : "" , id : 0});
  }));
}

loadRecommendationsLeakAndUnique(){
  this.systemService.loadRecommendationsLeakAndUnique(this.id);
}

getRecommendationsLeakAndUnique(){
  this.subscriptions.add(
    this.systemService.getRecommendatonLeakAndUnique()
    .pipe(skipWhile((data)=> !data))
    .subscribe(
      data =>{
        this.recommendationLeakData = data;
        this.leaksRecommendationTakeBackTypeSubject.next("getRecommendationsLeakAndUnique");
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
        this.transformRecommendationData([...this.recommendationLeakData])
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
  this.recommendationsList = src;
}

getSuggestionListForFilterForTopicPane(event){
  this.subscriptions.add(
    this.loginService.performGet(AppConstant.findDataFieldVariables + '?field=' + event.search)
    .pipe(
      distinctUntilChanged(),
      debounceTime(AppConstant.debounceTime)
    ).subscribe(
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
  //   console.log(event);
  //   this.selectionCustomerGroupList = [...event];
  }

  back(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionList']);
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
    document.getElementById('loader').classList.add('loading');
      const body = Object.assign(this.topicDescriptionData == undefined ?  {} : this.topicDescriptionData, this.topicForm.value);
      this.subscriptions.add(
        this.loginService.performPost(body,AppConstant.topicDescription)
        .subscribe(
          next=>{
           if(this.id){
             this.ngOnInit();
           }else{
              this.back();
           }
          }, error =>{
            document.getElementById('loader').classList.add('loading');
            this.utilityService.showErrorMessage(error.error.errorMessage);
          }
        )
      );
  }

  delete(): any { 
    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(
      this.loginService.performDelete(AppConstant.topicDescription + '/' + this.id)
      .subscribe(
        next => {
          document.getElementById('loader').classList.add('loading');
          // this.router.navigate(['topicDescription']);
          this.back();
        }, error =>{
          this.utilityService.showErrorMessage(error.error.errorMessage);
          console.error(error);
        }
      )
    )
  }

  copy(): any {
    const dialogRef = this.dialog.open(TopicDescriptionEditCopyComponent, {
      width: '50vw',
      height: '50vh',
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
      this.loginService.performPostWithParam( {},AppConstant.topicDescription + '/' + this.id + '/copy',params)
      .subscribe(
        next =>{
          document.getElementById('loader').classList.remove('loading');
          this.topicDescriptionData = {...next}
          this.id = next.id;
          this.router.navigate([], { 
            relativeTo: this.activateRoute,
            queryParams: {id : next.id , addRequest : null},
            queryParamsHandling : 'merge'
          })
          this.ngOnInit();
        }, error => {
          console.log(error);
          this.utilityService.showErrorMessage(error.error.errorMessage);
          document.getElementById('loader').classList.remove('loading')
        }
      )
      )
  }


  ReInitTopic(): any {
    let params = new HttpParams();
    let isRerunTopic = this.topicForm.value.isRerunTopic == false ? false : this.topicForm.value.isRerunTopic
    params = params.append('rerunSurvey',isRerunTopic);
    document.getElementById('loader').classList.add('loading');
    this.subscriptions.add(
      this.loginService.performPostWithParam({}, AppConstant.topicDescription +  '/' + this.id  + '/reinitSurvey',params)
      .subscribe(
        data =>{
          // document.getElementById('loader').classList.add('loading');
          this.ngOnInit();
        }, error =>{ 
          console.error(error);
          document.getElementById('loader').classList.remove('loading');
        }
      )
    )
   }


  topicVariablesPageChangeEvent(event){
    let params = new HttpParams();
    params = params.append('pageSize',this.pageSize+"");
    params = params.append('sortOrderAsc`', 'true');
    params = params.append('sortField','field');
    if(event != undefined)
      params = params.append('startRow',event.pageIndex);
    else 
      params = params.append('startRow','0');
      
    this.loadTopicVariable(params);
  }

  loadTopicVariable(params: any){
    this.topicService.loadTopicVariables(this.id,params);
  }

   getTopicVariableDataFromStore(){
    this.subscriptions.add(this.topicService.getTopicVariable()
      .pipe(
        filter(x => x !== undefined)
      ).subscribe(
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

  addRemoveCustomerGroup(event : any){
    // console.log(event);
    if(event.isCheckedCheckbox == true)
      this.systemService.addCustomerGroupToList(this.id,event.id)
    else if(event.isCheckedCheckbox == false)
      this.systemService.removeCustomerGroupToList(this.id,event.id);
  }

  setTopicDescriptionValues(){

    for(let item of this.lookUpValues){
      for(let data of this.topicVariableDataList){
        if(data.calculationPeriod == item.lookupValue){
          data.calculationPeriodActual = item.valueName;
        }
      }}  

    if(this.topicVariableDataList.length == this.pageSize){
      this.topicVariableTableData.content = [...this.topicVariableDataList];
      this.disableNextButtonTopicVariable = false;
    } else {
      this.disableNextButtonTopicVariable = true;
      if(this.topicVariableDataList.length > 0){
        // this.topicVariableDataList = [...this.topicVariableDataList];
        this.topicVariableTableData.content = [...this.topicVariableDataList];
      } else {
        this.topicVariableTableData.pageIndex =  this.topicVariableTableData.pageIndex -1;
    }}  
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
