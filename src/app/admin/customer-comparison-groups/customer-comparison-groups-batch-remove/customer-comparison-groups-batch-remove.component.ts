import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
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
  public comparisonCodeDropdownData: Array<any>;
  public errorMessage: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly el: ElementRef,
    private readonly systemService: SystemService,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
  }

  ngOnInit() {
    this.loadComparisonCode();
    this.scrollTop();
    this.findWeatherStation(false, '');
    this.setForm(undefined);
  }

  loadComparisonCode() {
    this.systemService.loadComparisonCodeList();
    this.subscriptions.add(this.systemService.getComparisonCodeList().pipe(skipWhile((item: any) => !item))
      .subscribe((comparisonCode: any) => {
        this.comparisonCodeDropdownData = comparisonCode.data;
      },
        error => {
          this.errorMessage = error;
        }));
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.weatherStationIds = weatherStationList;
      },
        error => {
          this.errorMessage = error;
        }));
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  setForm(event: any) {
    this.customerComparisonGroupForm = this.formBuilder.group({
      comparisonCode: [event !== undefined ? event.comparisonCode : 'Cooling'],
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      weatherStation: [event !== undefined ? event.weatherStation : ''],
    });
  }
  back() {
    this.location.back();
  }
  delete() {
    if (this.customerComparisonGroupForm.valid) {
      this.subscriptions.add(this.systemUtilityService.deleteCustomerComparisonGroupInBatch(this.setHttpParameter()).pipe(
        skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.location.back();
        },
          error => {
            this.errorMessage = error;
          }));
    } else {
      this.validateForm();
    }
  }

  setHttpParameter(): HttpParams {
    const params = new HttpParams()
      .set('comparisonCode', this.customerComparisonGroupForm.value.comparisonCode)
      .set('orderNumber', this.customerComparisonGroupForm.value.orderNumber)
      .set('weatherStation', this.customerComparisonGroupForm.value.weatherStation);
    return params;
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
