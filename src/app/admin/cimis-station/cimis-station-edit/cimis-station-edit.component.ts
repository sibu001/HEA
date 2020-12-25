import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
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
      this.loadCimisStationById();
    }
  }
  setForm(event: any) {
    this.cimisStationForm = this.formBuilder.group({
      stationNbr: [event !== undefined ? event.stationNbr : '', Validators.required],
      name: [event !== undefined ? event.name : '', Validators.required],
      county: [event !== undefined ? event.county : '', Validators.required],
      city: [event !== undefined ? event.city : '', Validators.required],
      regionalOffice: [event !== undefined ? event.regionalOffice : '', Validators.required],
      elevation: [event !== undefined ? event.elevation : '', Validators.required],
      groundCover: [event !== undefined ? event.groundCover : '', Validators.required],
      latitude: [event !== undefined ? event.latitude : '', Validators.required],
      longitude: [event !== undefined ? event.longitude : '', Validators.required],
      isActive: [event !== undefined ? event.isActive : ''],
      isEtoStation: [event !== undefined ? event.isEtoStation : ''],
      zipCodes: [event !== undefined ? event.zipCodes : '']
    });
  }

  loadCimisStationById() {
    this.systemMeasurementService.loadCimisStationById(this.id);
    this.subscriptions.add(this.systemMeasurementService.getCimisStationById().pipe(skipWhile((item: any) => !item))
      .subscribe((cimisStation: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/cimisStation/cimisStationEdit'], { queryParams: { 'id': cimisStation.id } });
        }
        this.setForm(cimisStation);
      }));
  }

  delete() {
    this.subscriptions.add(this.systemMeasurementService.deleteCimisStationById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/cimisStation/cimisStationList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.cimisStationForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemMeasurementService.updateCimisStation(this.id, this.cimisStationForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCimisStationById();
          }));
      } else {
        this.subscriptions.add(this.systemMeasurementService.saveCimisStation(this.cimisStationForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCimisStationById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.cimisStationForm.controls)) {
      if (this.cimisStationForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
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
