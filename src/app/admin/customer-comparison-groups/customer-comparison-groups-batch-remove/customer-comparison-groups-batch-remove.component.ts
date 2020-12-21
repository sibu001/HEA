import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-customer-comparison-groups-batch-remove',
  templateUrl: './customer-comparison-groups-batch-remove.component.html',
  styleUrls: ['./customer-comparison-groups-batch-remove.component.css']
})
export class CustomerComparisonGroupsBatchRemoveComponent implements OnInit, OnDestroy {

  id: any;
  customerComparisonGroupForm: FormGroup;
  public weatherStationIds: Array<any>;
  public comparisonCodeDropdownData: Array<any> = TableColumnData.COMPARISON_CODE_DROPDOWN_DATA;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly el: ElementRef,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.findWeatherStation(false, '');
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.weatherStationIds = weatherStationList;
      }));
  }
  findProgramGroup(): void {
  }

  setForm(event: any) {
    this.customerComparisonGroupForm = this.formBuilder.group({
      comparisonCode: [event !== undefined ? event.comparisonCode : 'Cooling'],
      order: [event !== undefined ? event.order : ''],
      weatherStationId: [event !== undefined ? event.weatherStationId : ''],
    });
  }
  back() {
    this.location.back();
  }
  save() {
    if (this.customerComparisonGroupForm.valid) {
      this.subscriptions.add(this.systemUtilityService.deleteCustomerComparisonGroupInBatch(this.customerComparisonGroupForm.value).pipe(
        skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.location.back();
        }));
    } else {
      this.validateForm();
    }
  }
  delete() {

  }
  validateForm() {
    for (const key of Object.keys(this.customerComparisonGroupForm.controls)) {
      if (this.customerComparisonGroupForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.customerComparisonGroupForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
