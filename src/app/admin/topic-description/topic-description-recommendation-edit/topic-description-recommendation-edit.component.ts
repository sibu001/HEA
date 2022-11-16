import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { skipWhile, skip, filter } from 'rxjs/operators';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-topic-description-recommendation-edit',
  templateUrl: './topic-description-recommendation-edit.component.html',
  styleUrls: ['./topic-description-recommendation-edit.component.css'],
})
export class TopicDescriptionRecommendationEditComponent implements OnInit, OnDestroy {

  id: any;
  recommendationForm: FormGroup;
  recommendationKeys: TABLECOLUMN[];
  recommendationLeakTypeList = [];
  actionTypeList = [];
  htmlTextTemplate : any;
  recommendationLeakObject;
  priceCalculationType: any = TableColumnData.PRICE_CALCULATION_TYPE;
  imageList = [];
  conservationCategory = [];
  addRequest = false;
  iconList = [];
  allPossibleLeaksRecommendations = [];
  allPossibleLeaks = [];
  allPossibleRecommendations = [];
  allRelatedRecommendations = [];
  allRelatedLeaks = [];
  allRelatedLeaksData = [];
  allRelatedRecommendationsData = [];
  dataSource: any;
  topicDescriptionId;
  // dataListnerLeaks : Subject<any> = new Subject();
  // dataListnerRecommendations : Subject<any> = new Subject();
  recommendationAndLeakSeperaterSubject : Subject<any> = new Subject();
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
    private readonly topicService: TopicService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.topicDescriptionId = params['topicDescriptionId'];
      this.addRequest = params['addRequest'];
    });
    this.recommendationKeys = TableColumnData.RECOMMENDATION_EDIT_KEY;

    this.setForm(undefined);

    this.recommendationAndLeakSeperaterSubjectListner();
    // this.dataListnerRecommendationsFunction();
    // this.dataListnerLeaksFunction();
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
  }


  ngOnInit() {
    if (this.id) {
      this.getRelatedLeakById();
      this.getRelatedRecommendationList();
      this.getRecommendationsLeakAndUnique();
      
      this.loadRecommendationsLeakAndUnique();
      this.loadRecommendationsLeakAndUniqueById();
      this.loadRelatedLeaksById();
      this.loadRelatedRecommendationList();
    }
    this.scrollTop();
  }

  scrollTop(){
    window.scrollTo(0,0);
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
      actionType: [event !== undefined ? event.actionType != null ? event.actionType : '2' : ''],
      sendReminderMail: [event !== undefined ? event.sendReminderMail : ''],
      priceValueAlgType: [event !== undefined ? event.priceValueAlgType : 'P'],
      priceValueAlg: [event !== undefined ? event.priceValueAlg : ''],
      takebackImage: [event !== undefined ? event.takebackImage : ''],
      takebackValueAlg: [event !== undefined ? event.takebackValueAlg : ''],
      takebackIcon: [event !== undefined ? event.takebackIcon : ''],
      htmlTextTemplate: [event !== undefined ? event.htmlTextTemplate : ''],
      instructionTemplate: [event !== undefined ? event.instructionTemplate : ''],
      comments: [event !== undefined ? event.comments : ''],
    });
  }

  back(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionEdit'], { queryParams: { id: this.topicDescriptionId } });
  }

  loadRecommendationsLeakAndUnique() {
    this.systemService.loadRecommendationsLeakAndUnique(this.topicDescriptionId,new HttpParams());
  }

  getRecommendationsLeakAndUnique() {
    this.subscriptions.add(
      this.systemService.getRecommendatonLeakAndUnique()
        .pipe(skipWhile((data) => !data))
        .subscribe(
          data => {
            this.allPossibleLeaksRecommendations = data;
            this.recommendationAndLeakSeperaterSubject.next('getRecommendationsLeakAndUnique');
          }, error => {
            console.error(error);
          }
        )
    )
  }


  private recommendationAndLeakSeperaterSubjectListner(){ 
    this.subscriptions.add(
      this.recommendationAndLeakSeperaterSubject
      .pipe(skipWhile((item: any) => !this.recommendationLeakTypeList[0]))
      .subscribe(
        data =>{
          this.seperateLeaksAndRecommendation();
        }, error => {
          console.error(error);
        }
      )
    )
  }

  private seperateLeaksAndRecommendation(){

    let leakCode;
    let recommendationCode;

    this.recommendationLeakTypeList.forEach(
      element =>{
        if(element.valueName == 'Leaks')
          leakCode = element.lookupValue;
          
        if(element.valueName == 'Recommendations')
          recommendationCode = element.lookupValue;
      })

      if( this.allPossibleLeaksRecommendations.length != 0){
        this.extractLeaksList(this.allPossibleLeaksRecommendations,leakCode);
        this.extractRecommendationsList(this.allPossibleLeaksRecommendations,recommendationCode);
      }
  }

  private async extractLeaksList(src : any,takebackType : any){
    src = src.filter(
        element =>{
          if(element.takebackType == takebackType)
            return true;
          return false;
        }
    )
    this.allPossibleLeaks = src;
    // this.dataListnerLeaks.next('allPossibleLeaks');
  }

  private async extractRecommendationsList(src : any , takebackType : any){
    src = src.filter(
        element =>{
          if(element.takebackType == takebackType)
            return true;
          return false;
        }
    )
    this.allPossibleRecommendations = src;
    // this.dataListnerRecommendations.next('allPossibleRecommendations')
  }


  loadRecommendationsLeakAndUniqueById() {
    this.systemService.loadRecommendationsLeakAndUniqueById(this.topicDescriptionId, this.id);
  }

  getRecommendationsLeakAndUniqueById() {
    this.subscriptions.add(
      this.systemService.getRecommendatonLeakAndUniqueById()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          data => {
            if (!this.addRequest) {
              this.setForm(data);
              this.recommendationLeakObject = data;
              if (!this.id) {
                this.router.navigate([], {
                  relativeTo: this.activateRoute,
                  queryParams: { id: data.id },
                  queryParamsHandling: 'merge'
                })
              }
            }
          }, error => {
            console.error(error);
          }
        )
    )
  }

  loadTakeBackTypeLookUp() {
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeTakeBackValue);
  }

  getTakeBackTypeLookUp() {
    this.subscriptions.add(
      this.topicService.getLookValueForTakeBackType()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          data => {
            this.recommendationLeakTypeList = data;
            this.recommendationAndLeakSeperaterSubject.next('getTakeBackTypeLookUp');
          }, error => {
            console.error(error);
          }
        )
    )
  }

  loadActiontypeLookUp() {
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForActionType)
  }

  getActionTypeLookUp() {
    this.subscriptions.add(
      this.topicService.getLookUpForActionType()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          data => {
            this.actionTypeList = data;
          }, error => {
            console.error(error);
          }
        )
    )
  }

  loadTakeBackImageLookUp() {
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForTakeBackImage);
  }

  getTakeBackImageLookUp() {
    this.subscriptions.add(
      this.topicService.getLookUpForTakeBackImage()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          data => {
            this.imageList = data;
          }, error => {
            console.error(error);
          }
        )
    )
  }

  loadTakeBackIconLookUp() {
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForTakeBackIcon);
  }

  getTakeBackIconLookUp() {
    this.subscriptions.add(
      this.topicService.getLookUpForTakeBackIcon()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          data => {
            this.iconList = data;
          }, error => {
            console.error(error);
          }
        )
    )
  }

  loadConservationCategoryLookUp() {
    this.topicService.loadLookUpValuesByType(AppConstant.lookUpCodeForConservationCategory);
  }

  getConservationCategoryLookUp() {
    this.subscriptions.add(
      this.topicService.getLookUpForConservationCategory()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          data => {
            this.conservationCategory = data;
          }, error => {
            console.error(error);
          }
        )
    )
  }

  loadRelatedRecommendationList() {
    this.systemService.LoadRelatedRecommendationList(this.topicDescriptionId, this.id);
  }

  getRelatedRecommendationList() {
    this.subscriptions.add(
      this.systemService.getRelatedRecommendatonById()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          data => {
            let tempList = [];
            this.allRelatedRecommendationsData = data;
            data.forEach((item: any) => {tempList.push(item.id)});
            this.allRelatedRecommendations = tempList;
            // this.dataListnerRecommendations.next('getRelatedRecommendationList');
          }, error => {
            console.error(error);
          }
        )
    )
  }

  // dataListnerRecommendationsFunction(){
  //   this.subscriptions.add(
  //     this.dataListnerRecommendations
  //     .pipe( filter( res => this.allPossibleRecommendations[0] != undefined && this.allRelatedRecommendationsData[0] != undefined))
  //     .subscribe(
  //       data => {
  //           const item = this.allRelatedRecommendationsData.find( res => res.id ==  this.id);
  //           if(item){
  //             this.allPossibleRecommendations.push(item);
  //             this.allPossibleRecommendations = [...this.allPossibleRecommendations];
  //             this.allRelatedRecommendations = [...this.allRelatedRecommendations];
  //           }
  //       } 
  //     )
  //   )
  // }

  loadRelatedLeaksById() {
    this.systemService.loadRelatedLeaksById(this.topicDescriptionId, this.id);
  }

  getRelatedLeakById() {
    this.subscriptions.add(
      this.systemService.getRelatedLeaksById()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          data => {
            let tempList = [];
            this.allRelatedLeaksData = data;
            data.forEach((item: any) => {tempList.push(item.id)});
            this.allRelatedLeaks = tempList;
            // this.dataListnerLeaks.next('allRelatedLeaks');
          }, error => {
            console.error(error);
          }
        )
    )
  }

  // dataListnerLeaksFunction(){
  //   this.subscriptions.add(
  //     this.dataListnerLeaks
  //     .pipe( filter( res => this.allRelatedLeaksData[0] != undefined && this.allPossibleLeaks[0] != undefined))
  //     .subscribe(
  //       data =>{
  //         const item = this.allRelatedLeaksData.find(res => res.id == this.id);
  //         if (item){
  //           this.allPossibleLeaks.push(item);
  //           this.allPossibleLeaks = [... this.allPossibleLeaks];
  //           this.allRelatedLeaks = [... this.allRelatedLeaks];
  //         }
  //       }
  //     )
  //   )
  // }

  save(): any {
    this.addRequest = false;
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: { addRequest: null },
      queryParamsHandling: 'merge'
    })
    const body = Object.assign(this.recommendationLeakObject ? this.recommendationLeakObject : {}, this.recommendationForm.value);
    this.systemService.saveRecommendationLeakByIdAction(this.topicDescriptionId, body);
  }

  delete(): any {
    this.systemService.deleteRecommendationUniqueLeakListAction(this.topicDescriptionId, this.id);
    this.back();
  }

  addRelatedLeaks(event: any) {
    if(event.isCheckedCheckbox == true)
      this.systemService.saveRelatedLeaksById(this.topicDescriptionId,this.id,event);
    else if(event.isCheckedCheckbox == false)
      this.systemService.deleteRelatedLeaksById(this.topicDescriptionId,this.id,event);

  }

  addRelatedRecommendations(event: any) {
    if(event.isCheckedCheckbox == true)
      this.systemService.saveRelatedRecommendationsById(this.topicDescriptionId,event,this.id);
    else if(event.isCheckedCheckbox == false)
      this.systemService.deleteRelatedRecommendationAction(this.topicDescriptionId,event,this.id);
  }

  onCheckboxChangeEvent(event: any): any {
    console.log(event);
  }

  get f() { return this.recommendationForm.value; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
