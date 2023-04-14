import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-weather-station-edit',
  templateUrl: './weather-station-edit.component.html',
  styleUrls: ['./weather-station-edit.component.css']
})
export class WeatherStationEditComponent implements OnInit, OnDestroy {

  id: any;
  isForce = false;
  stationForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  toggleSaveButton = true;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemUtilityService.loadWeatherStationById(this.id);
      this.loadWeatherStationById();
    }
    AppUtility.scrollTop();
  }


  setForm(event: any) {
    this.stationForm = this.formBuilder.group({
      stationId: [event !== undefined ? event.stationId : '', Validators.required],
      stationIsdId: [event !== undefined ? event.stationIsdId : ''],
      stationName: [event !== undefined ? event.stationName : '', Validators.required],
    });
  }

  loadWeatherStationById() {
    this.subscriptions.add(this.systemUtilityService.getWeatherStationById()
    .pipe(filter((item: any) => {
      console.log(item)
      console.log("this.id : " + this.id);
      return item && (this.id == item.id || this.isForce );
    }))
      .subscribe((weatherStation: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/weatherStation/weatherStationEdit'], { queryParams: { 'id': weatherStation.id } });
        }
        this.setForm(weatherStation);
      }));
  }

  back() {
    this.router.navigate(['admin/weatherStation/weatherStationList'], { queryParams: { 'force': this.isForce } });
  }
  
  delete() {
    this.subscriptions.add(this.systemUtilityService.deleteWeatherStationById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.isForce= true;
        this.router.navigate(['admin/weatherStation/weatherStationList'], { queryParams: { 'force': this.isForce } });
      }));
  }

  save() {
    if (this.stationForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.id = this.stationForm.value.stationId;
          this.systemUtilityService.updateWeatherStation(this.id, this.stationForm.value);
      } else {
        this.systemUtilityService.saveWeatherStation(this.stationForm.value)
        this.loadWeatherStationById();
      }
      this.isForce = true;
    } else {
      this.validateAllFormFields(this.stationForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  saveWeatherStation(event: FormGroup): any {
    console.log(event);
  }

  toggleSaveButtonEvent(): any {
    this.toggleSaveButton = !this.toggleSaveButton;
  }

  get f() { return this.stationForm.controls; }


  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
