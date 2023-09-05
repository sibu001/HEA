import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-zip-code-edit',
  templateUrl: './zip-code-edit.component.html',
  styleUrls: ['./zip-code-edit.component.css']
})
export class ZipCodeEditComponent implements OnInit, OnDestroy {
  public placeStationId: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  zipForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ZipCodeEditComponent>,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.findWeatherStation(false, '');
    this.setForm(undefined);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  setForm(event: any) {
    this.zipForm = this.fb.group({
      zipCode: this.fb.control(event !== undefined ? event.id : '', [Validators.required, Validators.maxLength(5)]),
      stationId: this.fb.control(event !== undefined ? event.stationId : ''),
    });
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.placeStationId = weatherStationList;
      }));
  }

  save() {
    if (this.zipForm.valid) {
      this.subscriptions.add(this.systemUtilityService.saveZipCode(this.data.placeCode, this.zipForm.value).pipe(
        skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.dialogRef.close(true);
        }));
    } else {
      this.validateAllFormFields(this.zipForm);
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

  get f() { return this.zipForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

