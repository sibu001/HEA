import { LoadPanesForSelectionAsNext } from './../../../store/topic-state-management/state/topic.action';
import { LoadUsageHistoryDataByTypeAndId } from './../../../store/usage-history-state-management/state/usage-history.action';
import { TopicDescriptionPaneCopyComponent } from './../topic-description-pane-copy/topic-description-pane-copy.component';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Subscription, pipe } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { MatDialog } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { filter, take } from 'rxjs/operators';
import { AppUtility } from 'src/app/utility/app.utility';

@Component({
  selector: 'app-topic-description-pane',
  templateUrl: './topic-description-pane.component.html',
  styleUrls: ['./topic-description-pane.component.css'],
})
export class TopicDescriptionPaneComponent implements OnInit, OnDestroy {

  id: any;
  public paneForm: FormGroup;
  public paneData;
  public addRequest : boolean = false;
  dataBlockKeys = TableColumnData.PANE_DATA_BLOCK_KEY;
  dataFieldKeys = TableColumnData.PANE_DATA_FIELD_KEY;
  chartKeys = TableColumnData.PANE_CHART_KEYS;
  reportKeys = TableColumnData.PANE_REPORT_KEYS;
  nextPaneSectionList: any[] = Array<any>();
  public dataBlockDataSource =  [];
  public dataFieldDataSource = [];
  public chartDataSource: any;
  public reportsDataSource: any;
  public surveyDescriptionId : any;

  public totalElement = 0;
  public dataBlockData = {
    content: [],
    totalElements: 0,
  };
  public dataFieldData = {
    content: [],
    totalElements: 0,
  };
  public chartData = {
    content: [],
    totalElements: 0,
  };
  public reportData = {
    content: [],
    totalElements: 0,
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
  topicData = TableColumnData.TOPIC_DESCRIPTION_SELECT_DATA;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly topicService: TopicService,
    private readonly location: Location,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly utilityService : UtilityService,
    private readonly matDialog : MatDialog) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.surveyDescriptionId = params['topicDescriptionId']
    });
  }


  ngOnInit() {
    this.setForm(undefined);
    if(this.id) {
      this.loadPaneById();
      this.loadWhenIdIsPresent();
    }
    this.scrollTop();
  }

  loadWhenIdIsPresent(){
    this.getDataFieldForPane();
    this.getSelectedPaneById();
    this.getDataBlockListForPane();
    this.getNextPaneList();
    this.getPaneReportByPaneId();
    this.getAllPaneCharts();
    this.loadNextPaneList();
    this.loadDataBlockForPane();
    this.loadDataFieldForPane();
    this.loadPaneReportByPaneId();
    this.loadAllPaneCharts();
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  loadNextPaneList(){
    this.topicService.loadPanesForSelectionAsNext(this.surveyDescriptionId , this.id);
  }

  getNextPaneList(){
    this.subscriptions.add(
      this.topicService
      .getPanesForSelectionAsNext()
      .pipe(filter( item => item != undefined ))
      .subscribe( (next : any) =>{
          this.nextPaneSectionList = [...next];
        } , error =>
        { console.error(error);
          this.utilityService.showErrorMessage(error.error.errorMessage);
        }
      )
    )
  }
  


  setForm(event: any) {
    this.paneForm = this.formBuilder.group({
      section: [event !== undefined ? event.section : false],
      hideSection: [event !== undefined ? event.hideSection : null],
      paneCode: [event !== undefined ? event.paneCode : null, Validators.required],
      paneLabel: [event !== undefined ? event.paneLabel : null],
      label: [event !== undefined ? event.label : null],
      nextPaneId: [event !== undefined ? event.nextPaneId : null],
      orderNumber: [event !== undefined ? event.orderNumber : 0],
      filter: [event !== undefined ? event.filter : null],
      htmHeaderTemplate: [event !== undefined ? event.htmHeaderTemplate : null],
      htmPageTextTemplate: [event !== undefined ? event.htmPageTextTemplate : null],
      htmFooterTemplate: [event !== undefined ? event.htmFooterTemplate : null],
      htmFactoidTemplate: [event !== undefined ? event.htmFactoidTemplate : null],
      htmPendingMessageTemplate: [event !== undefined ? event.htmPendingMessageTemplate : null],
      htmTopMenuTemplate: [event !== undefined ? event.htmTopMenuTemplate : null],
      htmRightTopTemplate: [event !== undefined ? event.htmRightTopTemplate : null],
      htmRightBottomTemplate: [event !== undefined ? event.htmRightBottomTemplate : null],
      htmHelpTemplate: [event !== undefined ? event.htmHelpTemplate : null],
      showPrev: [event !== undefined ? event.showPrev : true],
      showNext: [event !== undefined ? event.showNext : true],
      comments: [event !== undefined ? event.comments : null],
    });
  }

  back(): any {
    this.router.navigate(['/admin/topicDescription/topicDescriptionEdit'],{queryParams: {id: this.surveyDescriptionId}});
  }

  save() {

    if(!AppUtility.validateAndHighlightReactiveFrom(this.paneForm)){
      return ; // don't save incase form is invalid form.
    }
    
    const body = Object.assign(this.paneData ? this.paneData : {}, this.paneForm.value);

    AppUtility.removeErrorFieldMessagesFromForm();

    if(!this.id){
      this.subscriptions.add(
        this.topicService.saveNewPane(body, this.surveyDescriptionId)
        .pipe(take(1))
        .subscribe(
          (response: any) => {
            this.addRequest = true;
            this.id = response.topicManagement.topicPane.id;
            this.router.navigate([], { 
              relativeTo: this.activateRoute,
              queryParams: {id : this.id},
              queryParamsHandling : 'merge'
            });

            this.loadWhenIdIsPresent();

          },AppUtility.errorFieldHighlighterCallBack));

      return;
    }

    this.subscriptions.add(
      this.topicService.UpdadePaneById(body,this.surveyDescriptionId,this.id)
      .pipe(take(1))
      .subscribe(
        (resposne) => {}
        , AppUtility.errorFieldHighlighterCallBack
      ));
  }

  delete() {
    
    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(
      this.topicService.deletePaneById(this.surveyDescriptionId,this.id)
      .pipe(take(1))
      .subscribe((response:any) => {AppUtility.scrollTop(); this.back();}));
      
  }

  copy() {
    const dialog = this.matDialog.open(TopicDescriptionPaneCopyComponent,
      { 
        width: '50vw',
        height: '50vh',
        disableClose: false
      });
    dialog.afterClosed().subscribe(
      data => {
        if(data)
          this.createCopy(data);
    })
    
  }

  private createCopy(data){

    document.getElementById('loader').classList.add('loading')

    let params = new HttpParams();
    params = params.append('newPaneCode',data.paneCode);
    params = params.append('prefix',data.prefixDataField);
    params = params.append('toSurveyDescriptionId', data.topicDescription);

    this.subscriptions.add(
      this.topicService.createPaneCopyFromPaneId(this.surveyDescriptionId,this.id,params)
      .pipe(take(1))
      .subscribe(
        (response : any) =>{
          this.id = response.topicManagement.topicPane.id;
          this.router.navigate([],{
            relativeTo: this.activateRoute,
            queryParams: {id : this.id},
            queryParamsHandling : 'merge'
          });

          this.ngOnDestroy();
          this.loadWhenIdIsPresent();
        }));
  }

  loadDataBlockForPane(){
    this.topicService.LoadDataBlocksForPaneById(this.id);
  }

  getDataBlockListForPane(){
    this.subscriptions.add(
      this.topicService.getDataBlockListByPaneId()
    .pipe(filter((data : any) =>  data && data[0] && data[0].paneId == this.id))
    .subscribe(
      response => {
        this.dataBlockDataSource = response;
    }, error => {
      this.utilityService.showErrorMessage(error.error.errorMessage);
      console.error(error);
    }
    ))
  }

  loadDataFieldForPane(){
    this.topicService.loadDataFieldByPaneId(this.id);
  }

  getDataFieldForPane(){
    this.subscriptions.add(
      this.topicService.getDataFieldByPaneId()
      .pipe(filter(data => data && data[0] && data[0].paneId == this.id))
      .subscribe(
        response =>{
          this.dataFieldDataSource = [...response];
        }, error =>{
          console.error(error);
        }
      ));
  }

  loadPaneById(){
    this.topicService.loadSelectedTopicPaneById(this.surveyDescriptionId,this.id);
  }

  getSelectedPaneById(){
    this.subscriptions.add(
      this.topicService.getSelectedTopicPaneById()
      .pipe(filter( (data : any) => data && (data.id == this.id || this.addRequest)))
      .subscribe(
        next => {
          this.addRequest = false;
          this.paneData = next;
          this.setForm(next);
          AppUtility.scrollTop();
        }, error => {
          console.error(error)
        }
    )
    )
  }

  loadPaneReportByPaneId(){
    this.topicService.loadPaneReportsByPaneId(this.id);
  }

  getPaneReportByPaneId(){
    this.subscriptions.add(
      this.topicService.getPaneReportByPaneId()
      .pipe(filter((data : any) => data && data[0] && data[0].paneId == this.id))
      .subscribe(
        (response) =>{
          this.reportsDataSource = response;
        }
      )
    )
  }

  loadAllPaneCharts(){
    this.topicService.LoadAllPaneChartByPaneId(this.id);
  }

  getAllPaneCharts(){
    this.topicService.GetAllPaneChartByPaneId()
    .pipe(filter((response : any) => response && response[0] && response[0].paneId == this.id))
    .subscribe(
      (response : any) =>{
        this.chartData.content = response;
        this.chartDataSource = response;
      }
    )
  }

  addDataBlock() {
    this.router.navigate(['/admin/topicDescription/topicPaneDataBlockEdit'],{ queryParams: { paneId : this.id , topicDescriptionId : this.surveyDescriptionId}} );
  }

  addDataField() {
    const queryParams = { paneId : this.id , topicDescriptionId : this.surveyDescriptionId }
    queryParams[AppConstant.DATA_FIELD_EDIT_REQUEST] = AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE;
    this.router.navigate(['admin/topicDescription/topicPaneDataFieldEdit'],{ queryParams : queryParams});
  }

  addCharts() {
    this.router.navigate(['admin/topicDescription/topicPaneChartEdit'],{ queryParams: { paneId : this.id , topicDescriptionId : this.surveyDescriptionId} });
  }

  addReports() {
    this.router.navigate(['admin/topicDescription/topicPaneReportEdit'],{ queryParams: { paneId : this.id , topicDescriptionId : this.surveyDescriptionId} });
  }

  goToEditDataBlock(event) {
    this.router.navigate(['admin/topicDescription/topicPaneDataBlockEdit'], { queryParams: {id: event.id, paneId : this.id , topicDescriptionId : this.surveyDescriptionId} });
  }

  goToEditDataField(event) {
    const queryParams = {id: event.id, paneId : this.id , topicDescriptionId : this.surveyDescriptionId}
    queryParams[AppConstant.DATA_FIELD_EDIT_REQUEST] = AppConstant.DATA_FIELD_EDIT_REQUEST_FROM_PANE;
    this.router.navigate(['admin/topicDescription/topicPaneDataFieldEdit'], { queryParams: queryParams });
  }

  goToEditCharts( event : any) {
    this.router.navigate(['admin/topicDescription/topicPaneChartEdit'], { queryParams: { id : event.id, paneId : this.id,topicDescriptionId : this.surveyDescriptionId} });
  }

  goToEditReports(event : any) {
    this.router.navigate(['admin/topicDescription/topicPaneReportEdit'], { queryParams: {id : event.id, paneId : this.id , topicDescriptionId : this.surveyDescriptionId} });
  }

  get f() { return this.paneForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  get form(){
    return this.paneForm.value;
  }

  highlightErrorField(formControlName : string) : boolean{
    return this.f[formControlName].invalid && (this.f[formControlName].dirty || this.f[formControlName].touched);
  }

}
