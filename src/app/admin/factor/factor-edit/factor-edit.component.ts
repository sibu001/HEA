import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-factor-edit',
  templateUrl: './factor-edit.component.html',
  styleUrls: ['./factor-edit.component.css']
})
export class FactorEditComponent implements OnInit, OnDestroy {

  id: any;
  eventForm: FormGroup;
  public placeData: Array<any> = TableColumnData.PLACE_CODE;
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
  public calculationType: Array<any> = TableColumnData.CALCULATION_TYPE;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  findProgramGroup(): void {
  }

  setForm(event: any) {
    this.eventForm = this.formBuilder.group({
      // id: [event !== undefined ? event.id : ''],
      factorCode: [event !== undefined ? event.factorCode : ''],
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
  back() {
    this.location.back();
  }

  goToDebug() {

  }

  save() {

  }
  delete() {

  }

  Recalculate() {

  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
