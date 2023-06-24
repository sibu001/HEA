import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-user-report-content-part',
  templateUrl: './user-report-content-part.component.html',
  styleUrls: ['./user-report-content-part.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class UserReportContentPartComponent implements OnInit, OnDestroy {

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
  public id: number;
  public fileObject: any;
  public userReportId : number;
  contentForm: FormGroup;
  public force : boolean = false;
  public showContentTemplate : boolean = false;
  public contentData : any = {};
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private readonly systemService: SystemService,
    private readonly loginService : LoginService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.userReportId = params['userReportId'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if(this.id){
      this.getUserReportContentById();
      this.loadUserReportContentById();
    }else{
      this.getLastContentOrder();
    }
    AppUtility.scrollTop();
  }

  setForm(event: any) {
    this.contentForm = this.formBuilder.group({
      label: [event !== undefined ? event.label : ''],
      contentOrder: [event !== undefined ? event.contentOrder : ''],
      contentFilterRule: [event !== undefined ? event.contentFilterRule : ''],
      disableHtmlEditor: [event !== undefined ? event.disableHtmlEditor : ''],
      contentTemplate: [event !== undefined ? event.contentTemplate : '', Validators.required],
      imageUrl: [event !== undefined ? event.imageUrl : ''],
      imageFile: [event !== undefined ? event.imageFile : ''],
      embeddedImage: [event !== undefined ? event.embeddedImage : ''],
    });
  }

  loadUserReportContentById() : void {
    this.systemService.loadUserReportContentById(this.userReportId,this.id); 
  }

  getUserReportContentById() : void {
    this.subscriptions.add(
      this.systemService.getUserReportContentById()
      .pipe(filter(data => data && data.id == this.id))
      .subscribe((content : any ) => {
          this.contentData = {...content};
          this.setForm(this.contentData);
          AppUtility.scrollTop();

      }));
  }

  getLastContentOrder() : void {
    this.subscriptions.add(
      this.loginService.performGet(
        AppUtility.endPointGenerator([AppConstant.userReports,this.userReportId,AppConstant.contents,'lastContentOrder']))
        .subscribe((response : any) =>{
            this.contentForm.patchValue({ contentOrder : (response.data + 10) });
        }));
  }

  back() {
    this.router.navigate(['admin/userReportDefinitions/userReportDefinitionsEdit'],{ queryParams: { id : this.userReportId, force : this.force}})
  }

  save(): any {

    AppUtility.removeErrorFieldMessagesFromForm();
    if(!AppUtility.validateAndHighlightReactiveFrom(this.contentForm)) return ;

    if(this.id){
      const requestBody = {...this.contentData, ...this.contentForm.value};
      this.subscriptions.add(
        this.systemService.updateUserReportContentById(this.userReportId,requestBody,this.id)
        .pipe(filter((data : any) => data), take(1))
        .subscribe((response : any) =>{
          this.force = true;
        },AppUtility.errorFieldHighlighterCallBack));

      return;
    }

    const requestBody = {...this.contentForm.value};
    requestBody.userReportId = this.userReportId;

    this.subscriptions.add(
      this.systemService.saveUserReportContentById(this.userReportId,requestBody)
      .pipe(filter((data : any) => data), take(1))
      .subscribe((response : any) =>{
        this.force = true;
        this.id = response.systemManagement.userReportContent.id;
        AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
        this.getUserReportContentById();
      },AppUtility.errorFieldHighlighterCallBack));

  }

  delete(): any { 

    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(
      this.systemService.deleteUserReportContentById(this.userReportId,this.id)
      .pipe(take(1))
      .subscribe((response : any) =>{
        this.force = true;
        this.back();
      }));
  }

  handleFileInput(file: any) {
    this.fileObject = file[0];
  }

  generate() {
    const formData = new FormData();
      if(!this.fileObject)
        formData.append('imageUrl',this.contentForm.controls['imageUrl'].value)
      else
        formData.append('imageBody', this.fileObject);

    this.subscriptions.add(this.loginService.performPostMultiPartFromData(formData,AppUtility.endPointGenerator(
        [AppConstant.charts,AppConstant.generateEmbedImage]))
    .pipe(filter((item: any) => item))
    .subscribe((response: any) => {
      if(response.data){
        this.contentForm.controls['embeddedImage'].setValue(response.data);
      }
      this.contentForm.controls['imageFile'].setValue('');
    }));

  }

  get f() { return this.contentForm.controls; }

  showHTMLIcon() : boolean{
    const isContentPresent : boolean = (!this.f.contentTemplate.value || !this.f.contentTemplate.value.trim());
    if(!isContentPresent) { this.showContentTemplate = true; }
    return !this.showContentTemplate && isContentPresent;
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  highlightErrorField(formControlName : string) : boolean{
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }

}
