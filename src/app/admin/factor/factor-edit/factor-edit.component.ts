import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { ScriptDebugConsoleData } from 'src/app/models/filter-object';
import { UtilityService } from 'src/app/services/utility.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-factor-edit',
  templateUrl: './factor-edit.component.html',
  styleUrls: ['./factor-edit.component.css']
})
export class FactorEditComponent implements OnInit, OnDestroy {

  id: any;
  factorForm: FormGroup;
  public placeData: Array<any>;
  public comparisonCodeDropdownData: Array<any>;
  public calculationType: Array<any>;
  public periodData: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  scriptDebugConsoleData : ScriptDebugConsoleData;
  isForce = false;
  userId: any;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly utilityService: UtilityService,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef,
    private readonly datePipe: DatePipe) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.userId = users.userId;
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.scriptDebugConsoleData =  AppUtility.getScriptDebugConsoleData();
  }

  ngOnInit() {
    this.loadBatchPeriodList();
    this.loadComparisonCode();
    this.loadCalculationType();
    this.findPlace(true, '');
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.getFactorById();
      this.loadFactorById();
    }
    AppUtility.scrollTop();
  }

  loadComparisonCode() {
    this.systemService.loadComparisonCodeList();
    this.subscriptions.add(this.systemService.getComparisonCodeList().pipe(skipWhile((item: any) => !item))
      .subscribe((comparisonCode: any) => {
        this.comparisonCodeDropdownData = comparisonCode.data;
      }));
  }

  loadCalculationType() {
    this.systemService.loadCalculationTypeList();
    this.subscriptions.add(this.systemService.getCalculationTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((calculationType: any) => {
        this.calculationType = calculationType.data;
      }));
  }

  loadBatchPeriodList(): any {
    this.systemService.loadBatchPeriodList();
    this.subscriptions.add(this.systemService.getBatchPeriodList().pipe(skipWhile((item: any) => !item))
      .subscribe((batchPeriodList: any) => {
        this.periodData = batchPeriodList.data;
      }));
  }

  setForm(event: any) {
    this.factorForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      factorCode: [event !== undefined ? event.factorCode : '', Validators.required],
      place: [event !== undefined ? event.place : ''],
      comparisonCode: [event !== undefined ? event.comparisonCode : ''],
      year: [event !== undefined ? event.year : ''],
      factorValue: [event !== undefined ? event.factorValue : ''],
      dimension: [event !== undefined ? event.dimension : ''],
      factorName: [event !== undefined ? event.factorName : ''],
      sourceUrl: [event !== undefined ? event.sourceUrl : ''],
      calculationType: [event !== undefined ? event.calculationType : ''],
      calculation: [event !== undefined ? event.calculation : ''],
      calculationPeriod: [event !== undefined ? event.calculationPeriod : ''],
      calculationDate: [event !== undefined ? (this.datePipe.transform(event.calculationDate, 'MM/dd/yyyy HH:mm:ss', 'PST')) : null],
      active: [event !== undefined ? event.active : ''],
      comments: [event !== undefined ? event.comments : ''],
      valueByComparisonGroup: [event !== undefined ? event.valueByComparisonGroup : ''],
      selectAllCity: [false]
    });
  }

  findPlace(force: boolean, filter: string): any {
    this.systemUtilityService.loadPlaceList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getPlaceList().pipe(skipWhile((item: any) => !item))
      .subscribe((placeList: any) => {
        this.placeData = placeList;
      }));
  }

  goToDebug() {
    this.setScriptDebugConsoleData();
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: { key: AppConstant.contextTypeFactor } });
  }

  setScriptDebugConsoleData(){
    this.scriptDebugConsoleData.script = this.factorForm.value.calculation;
    this.scriptDebugConsoleData.scriptType = this.factorForm.value.calculationType;
    this.scriptDebugConsoleData.factorId = this.id;
    AppUtility.setScriptDebugConsoleData(this.scriptDebugConsoleData);
  }

  recalculate() {
    if (this.id) {
      this.factorForm.value.calculationDate = this.factorForm.value.calculationDate ? new Date(this.factorForm.value.calculationDate).getTime() : null;
      if (this.factorForm.value.selectAllCity) {
        this.subscriptions.add(this.systemUtilityService.recalculateFactorForAllCity(this.id).pipe(skipWhile((item: any) => !item))
          .subscribe((factor: any) => {
            this.loadFactorById();
          }, error => {
            console.log('error');
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.recalculateFactor(this.id, null)
          .subscribe((factor: any) => {
            this.loadFactorById();
          }, error => {
            console.log('error');
          }));
      }
    } else {
      this.validateAllFormFields(this.factorForm);
      AppUtility.scrollTop();
      this.utilityService.showErrorMessage('id to load is required for loading');
    }
  }

  loadFactorById() {
    this.systemUtilityService.loadFactorById(this.id);
  }

  getFactorById() {
    this.subscriptions.add(this.systemUtilityService.getFactorById().pipe(skipWhile((item: any) => !item))
    .subscribe((factor: any) => {
      AppUtility.scrollTop();
      if (this.isForce) {
        this.router.navigate(['admin/factor/factorEdit'], { queryParams: { 'id': factor.id } });
      }
      this.setForm(factor);
    }));
  }

  back() {
    this.router.navigate(['admin/factor/factorList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if(AppUtility.deleteConfirmatonBox()){
      if (this.factorForm.value.selectAllCity) {
        this.subscriptions.add(this.systemUtilityService.removeFactorForAllCity(this.id).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.router.navigate(['admin/factor/factorList'], { queryParams: { 'force': true } });
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.deleteFactorById(this.id).pipe(skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.router.navigate(['admin/factor/factorList'], { queryParams: { 'force': true } });
          }));
      }
    }
   
  }

  save() {
    if (this.factorForm.valid) {
      this.isForce = true;

      if (this.id !== null && this.id !== undefined) {
        this.factorForm.value.calculationDate = null;
        this.systemUtilityService.updateFactor(this.id, this.factorForm.value)
        .subscribe(response =>{
          this.router.navigate(['admin/factor/factorList'], { queryParams: { 'force': this.isForce } });
        })
      } else {
        this.systemUtilityService.saveFactor(this.factorForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.getFactorById();
          });
      }
    } else {
      this.validateAllFormFields(this.factorForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    this.validateForm();
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  validateForm() {
    for (const key of Object.keys(this.factorForm.controls)) {
      if (this.factorForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.factorForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
