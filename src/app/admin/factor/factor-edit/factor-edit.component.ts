import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
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
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
  public calculationType: Array<any> = TableColumnData.CALCULATION_TYPE;
  private readonly subscriptions: Subscription = new Subscription();
  isForce = false;
  userId: any;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.userId = users.userId;
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.findPlace(true, '');
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemUtilityService.loadFactorById(this.id);
      this.loadFactorById();
    }
  }

  setForm(event: any) {
    this.factorForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      factorCode: [event !== undefined ? event.factorCode : '', Validators.required],
      place: [event !== undefined ? event.place : ''],
      comparisonCode: [event !== undefined ? event.comparisonCode : ''],
      year: [event !== undefined ? event.year : ''],
      value: [event !== undefined ? event.value : ''],
      dimension: [event !== undefined ? event.dimension : ''],
      name: [event !== undefined ? event.name : ''],
      sourceUrl: [event !== undefined ? event.sourceUrl : ''],
      calculationType: [event !== undefined ? event.calculationType : ''],
      calculationRule: [event !== undefined ? event.calculationRule : ''],
      calculationPeriod: [event !== undefined ? event.calculationPeriod : ''],
      isActive: [event !== undefined ? event.isActive : ''],
      comments: [event !== undefined ? event.comments : '']
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
    this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });

  }
  recalculate() {

  }

  loadFactorById() {
    this.subscriptions.add(this.systemUtilityService.getFactorById().pipe(skipWhile((item: any) => !item))
      .subscribe((factor: any) => {
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
    this.subscriptions.add(this.systemUtilityService.deleteFactorById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/factor/factorList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.factorForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemUtilityService.updateFactor(this.id, this.factorForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadFactorById();
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.saveFactor(this.factorForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadFactorById();
          }));
      }
    } else {
      this.validateForm();
    }
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
