import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-cimis-station-edit',
  templateUrl: './cimis-station-edit.component.html',
  styleUrls: ['./cimis-station-edit.component.css']
})
export class CimisStationEditComponent implements OnInit, OnDestroy {

  cimisStationForm: FormGroup;
  id: any;
  isForce = false;
  public dateFormat : string = AppConstant.DATE_SELECTION_INPUT_FIELD;
  public errorMessage: any;
  private cimisStationData :any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemMeasurementService: SystemMeasurementService,
    private readonly activateRoute: ActivatedRoute,
    private readonly el: ElementRef,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemMeasurementService.loadCimisStationById(this.id);
      this.loadCimisStationById();
    }
    AppUtility.scrollTop();
  }
  setForm(event: any) {
    this.cimisStationForm = this.formBuilder.group({
      stationNbr: [event !== undefined ? event.stationNbr : ''],
      name: [event !== undefined ? event.name : '', Validators.required],
      county: [event !== undefined ? event.county : '', Validators.required],
      city: [event !== undefined ? event.city : '', Validators.required],
      regionalOffice: [event !== undefined ? event.regionalOffice : '', Validators.required],
      elevation: [event !== undefined ? event.elevation : '', Validators.required, AppUtility.inputFieldNumberValidator],
      groundCover: [event !== undefined ? event.groundCover : '', Validators.required],
      latitude: [event !== undefined ? event.latitude : '', Validators.required, AppUtility.inputFieldNumberValidator],
      longitude: [event !== undefined ? event.longitude : '', Validators.required, AppUtility.inputFieldNumberValidator],
      connectDate: [event !== undefined ? AppUtility.getDateFromMilllis(event.connectDate) : '', Validators.required],
      disconnectDate: [event !== undefined ? AppUtility.getDateFromMilllis(event.disconnectDate) : '', Validators.required],
      isActive: [event !== undefined ? event.isActive : false],
      isEtoStation: [event !== undefined ? event.isEtoStation : false],
      zipCodes: [event !== undefined ? event.zipCodes : '', Validators.required]
    });
  }

  loadCimisStationById() {
    this.subscriptions.add(this.systemMeasurementService.getCimisStationById()
    .pipe(filter((item: any) => item && (item.id == this.id || this.isForce)))
      .subscribe((cimisStation: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/cimisStation/cimisStationEdit'], { queryParams: { 'id': cimisStation.id } });
        }

        this.cimisStationData = cimisStation;
        this.setForm(cimisStation);
      },
        error => {
          this.errorMessage = error;
        }));
  }

  delete() {
    this.subscriptions.add(this.systemMeasurementService.deleteCimisStationById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/cimisStation/cimisStationList'], { queryParams: { 'force': true } });
      },
      error => {
        this.errorMessage = error;
      }));
  }

  isConnectDateVaild : boolean = true;
  isDisconnectDateVaild : boolean = true;

  save() {
    if (this.cimisStationForm.valid) {

      this.isConnectDateVaild = AppUtility.isDateValid(this.cimisStationForm.value.connectDate);
      this.isDisconnectDateVaild = AppUtility.isDateValid(this.cimisStationForm.value.disconnectDate);

      if(!this.isConnectDateVaild || !this.isDisconnectDateVaild){
        return;
      }

      const updatedFormValue = { ...this.cimisStationForm.value,
      connectDate : new Date(this.cimisStationForm.value.connectDate).getTime(),
      disconnectDate : new Date(this.cimisStationForm.value.disconnectDate).getTime()};

      if (this.id !== null && this.id !== undefined) {
        const requestPayload = {...this.cimisStationData, ...updatedFormValue }
        this.systemMeasurementService.updateCimisStation(this.id, requestPayload).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {},
            error => { this.errorMessage = error; AppUtility.scrollTop(); });
      } else {
        this.systemMeasurementService.saveCimisStation(updatedFormValue).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => { 
            this.loadCimisStationById();
          },
            error => { this.errorMessage = error; AppUtility.scrollTop(); });
      }
      this.isForce = true;
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.cimisStationForm.controls)) {
      if (this.cimisStationForm.controls[key].invalid) {
        this.cimisStationForm.controls[key].markAsTouched();
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        // break;
      }
    }
  }
  back() {
    this.router.navigate(['admin/cimisStation/cimisStationList'], { queryParams: { 'force': this.isForce } });
  }
  get f() { return this.cimisStationForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
