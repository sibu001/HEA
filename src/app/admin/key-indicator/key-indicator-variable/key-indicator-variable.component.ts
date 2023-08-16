import { Location } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-key-indicator-variable',
  templateUrl: './key-indicator-variable.component.html',
  styleUrls: ['./key-indicator-variable.component.css']
})
export class KeyIndicatorVariableComponent implements OnInit, OnDestroy {
  id: any;
  contentForm: FormGroup;
  calculationType: any;
  keyIndicatorId : number;
  public popStateEvent : any;
  variableData : any;
  public forceReloadPreviousScreen : boolean = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly trendingDefinationService : TrendingDefinitionService,
    private readonly router : Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.keyIndicatorId = params['keyIndicatorId'];
      this.id = params['id'];
    });
  }

  ngOnInit() {
    AppUtility.scrollTop();
    this.loadCalculationType();
    this.setForm(undefined);

    if(this.id){
      this.loadKeyIndicatorVariableById();
      this.getKeyIndicatorVariableById();
    }
    this.popStateEvent = this.back.bind(this);
  }


  getKeyIndicatorVariableById(){
    this.subscriptions.add(
      this.trendingDefinationService.getKeyIndicatorVariable()
      .pipe(filter((variable : any) => variable && variable.id == this.id))
      .subscribe((variable : any ) =>{
        this.variableData = {...variable};
        this.setForm({...variable});
          
      })
    )
  }

  loadKeyIndicatorVariableById(){
    this.trendingDefinationService.loadKeyIndicatorVariableById(this.keyIndicatorId,this.id);
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
  
  back(event ?: any) {
    if(event) event.stopImmediatePropagation();
    this.router.navigate(['/admin/keyIndicator/keyIndicatorEdit'],
      { queryParams: { id : this.keyIndicatorId , 
          force : this.forceReloadPreviousScreen
      }});
  }

  save(): any {


    this.forceReloadPreviousScreen = true;
    AppUtility.scrollTop();
    if(this.id){
      const requestBody = {...this.variableData, ...this.contentForm.value};
      this.trendingDefinationService.updateKeyIndicatorVariable(this.id,this.keyIndicatorId,requestBody);

      return;
    }

    const requestBody : any = {...this.contentForm.value};
    this.subscriptions.add(
      this.trendingDefinationService.saveKeyIndicatorVariable(requestBody,this.keyIndicatorId)
      .pipe(take(1))
      .subscribe((state : any) =>{
          this.id = state.trendingDefinationManagement.keyIndicatorVariable.id;
          AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
          this.getKeyIndicatorVariableById();
      })
    );

  }

  delete(): any {
    this.subscriptions.add(
      this.trendingDefinationService.deleteKeyIndicatorVariableById(this.id,this.keyIndicatorId)
      .pipe(take(1))
      .subscribe((response : any ) =>{
        this.forceReloadPreviousScreen = true;
        this.back();
      })
    )
  }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {

    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
