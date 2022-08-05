import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { skipWhile } from 'rxjs/operators';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';

@Component({
  selector: 'app-topic-description-recommendation-edit',
  templateUrl: './topic-description-recommendation-edit.component.html',
  styleUrls: ['./topic-description-recommendation-edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class TopicDescriptionRecommendationEditComponent implements OnInit, OnDestroy {

  id: any;
  recommendationForm: FormGroup;
  recommendationKeys: TABLECOLUMN[];
  recommendationLeakTypeList =[];
  actionTypeList = [];
  recommendationLeakObject;
  priceCalculationType: any = TableColumnData.PRICE_CALCULATION_TYPE;
  imageList = [];
  conservationCategory = [];
  addRequest = false;
  iconList = [];
  allPossibleLeaksRecommendations = [];
  allRelatedRecommendations = [];
  allRelatedLeaks = [];
  dataSource: any;
  topicDescriptionId;
  recommendationData = {
    content: [],
    totalElements: 0
  };
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
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly topicService  : TopicService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.topicDescriptionId = params['topicDescriptionId'];
      this.addRequest = params['addRequest'];
    });
    this.recommendationKeys = TableColumnData.RECOMMENDATION_EDIT_KEY;

    this.getTakeBackTypeLookUp();
    this.getTakeBackIconLookUp();
    this.getTakeBackImageLookUp();
    this.getActionTypeLookUp();
    this.getConservationCategoryLookUp();

    this.loadTakeBackTypeLookUp();
    this.loadTakeBackIconLookUp();
    this.loadActiontypeLookUp();
    this.loadConservationCategoryLookUp();
    this.loadTakeBackImageLookUp();
    this.getRecommendationsLeakAndUniqueById();

    this.setForm(undefined);
    
  }


  ngOnInit() {
    if(this.id){
      this.getRelatedLeakById();
      this.getRelatedRecommendationList();

      this.loadRecommendationsLeakAndUniqueById();
      this.loadRelatedLeaksById();
      this.loadRelatedRecommendationList();
    }
  }

  setForm(event: any): any {
    this.recommendationForm = this.formBuilder.group({
      takebackCode: [event !== undefined ? event.takebackCode : '', Validators.required],
      takebackType: [event !== undefined ? event.takebackType : '1'],
      takebackLabelTemplate: [event !== undefined ? event.takebackLabelTemplate : ''],
      suggestionTemplate: [event !== undefined ? event.suggestionTemplate : ''],
      unit: [event !== undefined ? event.unit : ''],
      recommendationFilter: [event !== undefined ? event.recommendationFilter : ''],
      valueCalculation: [event !== undefined ? event.valueCalculation : ''],
      conservationCategory: [event !== undefined ? event.conservationCategory : ''],
      actionType: [event !== undefined ? event.actionType != null ? event.actionType :'2': ''],
      sendReminderMail: [event !== undefined ? event.sendReminderMail : ''],
      priceValueAlgType: [event !== undefined ? event.priceValueAlgType : 'P'],
      priceValueAlg: [event !== undefined ? event.priceValueAlg : ''],
      takebackImage: [event !== undefined ? event.takebackImage : ''],
      takebackValueAlg : [event !== undefined ? event.takebackValueAlg : ''],
      takebackIcon: [event !== undefined ? event.takebackIcon : ''],
      htmlTextTemplate: [event !== undefined ? event.htmlTextTemplate : ''],
      instructionTemplate : [event !== undefined ? event.instructionTemplate : ''],
      comments: [event !== undefined ? event.comments : ''],
    });
  }

  back(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionEdit'],{queryParams: {id: this.topicDescriptionId}});
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
          this.allPossibleLeaksRecommendations = data;
        }, error => {
          console.error(error);
        }
      )
    )
  }



  loadRecommendationsLeakAndUniqueById(){
    this.systemService.loadRecommendationsLeakAndUniqueById(this.topicDescriptionId, this.id);
  }

  getRecommendationsLeakAndUniqueById(){
    this.subscriptions.add(
      this.systemService.getRecommendatonLeakAndUniqueById()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        data =>{
          if(!this.addRequest){
            this.setForm(data);
            this.recommendationLeakObject = data;
            if(!this.id){
              this.router.navigate([], { 
                relativeTo: this.activateRoute,
                queryParams: {id : data.id},
                queryParamsHandling : 'merge'
              })
          }
        }
        }, error =>{
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
          this.recommendationLeakTypeList = data;
        },  error =>{
          console.error(error);
        }
      )
    )
  }

  loadActiontypeLookUp(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForActionType)
  }

  getActionTypeLookUp(){
    this.subscriptions.add(
      this.topicService.getLookUpForActionType()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        data =>{
          this.actionTypeList = data;
        }, error =>{
          console.error(error);
        }
      )
    )
  }

  loadTakeBackImageLookUp(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForTakeBackImage);
  }

  getTakeBackImageLookUp(){
    this.subscriptions.add(
      this.topicService.getLookUpForTakeBackImage()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        data =>{
          this.imageList = data;
          console.log(data);
        }, error =>{
          console.error(error);
        }
      )
    )
  }

  loadTakeBackIconLookUp(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForTakeBackIcon);
  }

  getTakeBackIconLookUp(){
    this.subscriptions.add(
      this.topicService.getLookUpForTakeBackIcon()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        data =>{
          this.iconList = data;
        }, error =>{
          console.error(error);
        }
      )
    )
  }

  loadConservationCategoryLookUp(){
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForConservationCategory);
  }

  getConservationCategoryLookUp(){
    this.subscriptions.add(
      this.topicService.getLookUpForConservationCategory()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        data => {
          console.log(data);
          this.conservationCategory = data;
        } , error => {
          console.error(error);
        }
      )
    )
  }

  loadRelatedRecommendationList(){
    this.systemService.LoadRelatedRecommendationList(this.topicDescriptionId,this.id);
  }

  getRelatedRecommendationList(){
    this.subscriptions.add(
      this.systemService.getRelatedRecommendatonById()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        data =>{
          console.log(data);
        }, error =>{
          console.error(error);
        }
      )
    )
  }

  loadRelatedLeaksById(){
    this.systemService.loadRelatedLeaksById(this.topicDescriptionId,this.id);
  }

  getRelatedLeakById(){
    this.subscriptions.add(
      this.systemService.getRelatedLeaksById()
      .pipe(skipWhile((item: any) => !item))
      .subscribe(
        data =>{
          console.log(data);
        }, error =>{
          console.error(error);
        }
      )
    )
  }

  save(): any {
    this.addRequest = false;
    this.router.navigate([], { 
      relativeTo: this.activateRoute,
      queryParams: {addRequest : null},
      queryParamsHandling : 'merge'
    })
    const body = Object.assign(this.recommendationLeakObject ? this.recommendationLeakObject : {},this.recommendationForm.value);
    this.systemService.saveRecommendationLeakByIdAction(this.topicDescriptionId,body);
  }

  delete(): any {
    this.systemService.deleteRecommendationUniqueLeakListAction(this.topicDescriptionId,this.id);
    this.back();
  }

  addRelatedLeaks(event: any){
    
  }

  addRelatedRecommendations(event: any){

  }

  onCheckboxChangeEvent(event: any): any {
    console.log(event);
  }

  get f() { return this.recommendationForm.value; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
