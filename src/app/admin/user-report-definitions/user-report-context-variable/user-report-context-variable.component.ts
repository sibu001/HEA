import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-user-report-context-variable',
  templateUrl: './user-report-context-variable.component.html',
  styleUrls: ['./user-report-context-variable.component.css']
})
export class UserReportContextVariableComponent implements OnInit, OnDestroy {

  id: any;
  contentForm: FormGroup;
  calculationType: any;
  public force : boolean = false;
  public variableData : any = {};
  userReportId : number ;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.userReportId = params['userReportId'];
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.loadCalculationType();
    this.setForm(undefined);

    if(this.id){
      this.systemService.loadUserReportContextVariableById(this.userReportId,this.id);
      this.getUserReportContextVariableById();
    }
    AppUtility.scrollTop();
  }

  getUserReportContextVariableById(){
    this.subscriptions.add(
      this.systemService.getUserReportContextVariableById()
      .pipe(filter((variable => variable && variable.id == this.id)))
      .subscribe((variable : any) =>{
        this.variableData = {...variable};
        this.setForm(this.variableData);
        AppUtility.scrollTop();
      }));
  }

  loadCalculationType() {
    this.systemService.loadCalculationTypeList();
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((calculationType: any) => {
        this.calculationType = calculationType.data;
      }));
  }

  setForm(event: any) {
    this.contentForm = this.formBuilder.group({
      field: [event !== undefined ? event.field : '', Validators.required],
      orderNumber: [event !== undefined ? event.orderNumber : '', Validators.required],
      calculationType: [event !== undefined ? event.calculationType : 'javascript'],
      calculation: [event !== undefined ? event.calculation : '']
    });
  }

  back() {
    this.router.navigate(['admin/userReportDefinitions/userReportDefinitionsEdit'],{ queryParams: { id : this.userReportId, force : this.force}})
  }

  save(): any {

    AppUtility.removeErrorFieldMessagesFromForm();
    if(!AppUtility.validateAndHighlightReactiveFrom(this.contentForm)) return;

    if(this.id){
      const requestBody = {...this.variableData, ...this.contentForm.value};
      this.subscriptions.add(
        this.systemService.UpdateUserReportContextVariableId(this.userReportId,this.id,requestBody)
        .pipe(filter((data : any) =>data),take(1))
        .subscribe((variable : any)=>{
          this.force = true;
        },AppUtility.errorFieldHighlighterCallBack)
      );
      return;
    }

    const requestBody = {...this.contentForm.value};
    requestBody.userReportId = this.userReportId;

    this.subscriptions.add(
      this.systemService.SaveUserReportContextVariable(this.userReportId,requestBody)
      .pipe(filter((variable : any) => variable), take(1))
      .subscribe( (variable : any) =>{

        this.force = true;
        this.id = variable.systemManagement.userReportContextVariable.id;
        AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
        this.getUserReportContextVariableById();

      },AppUtility.errorFieldHighlighterCallBack)
    )
  }

  delete(): any {
    if(!AppUtility.deleteConfirmatonBox()) return;

    this.subscriptions.add(
      this.systemService.DeleteUserReportContextVariableById(this.userReportId, this.id)
      .pipe(filter((data : any) => data), take(1))
      .subscribe((data) =>{
        this.force = true;
        this.back();
      })
    )
  }

  get f() { return this.contentForm.controls; }

  highlightErrorField(formControlName : string) : boolean{
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
