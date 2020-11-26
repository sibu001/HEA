import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { ZipCodeEditComponent } from '../zip-code-edit/zip-code-edit.component';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.ZIP_CODE_KEY;
  public placeStationId: Array<any> = TableColumnData.PLACE_STATION_ID;
  public timezoneData: Array<any> = TableColumnData.TIMEZONE;
  public dataSource: any;
  public rolesData = {
    content: [],
    totalElements: 0,
  };
  placeForm: FormGroup;
  isForce = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly dialog: MatDialog,
    private readonly location: Location,
    private readonly fb: FormBuilder,
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
      this.systemUtilityService.loadPlaceById(this.id);
      this.loadPlaceById();
    }
  }

  findZipCode(event: any): any {

  }

  goToEditZipCode(event: any): any {
    const dialogRef = this.dialog.open(ZipCodeEditComponent, {
      width: '500px',
      height: 'auto',
      data: { event }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  loadPlaceById() {
    this.subscriptions.add(this.systemUtilityService.getPlaceById().pipe(skipWhile((item: any) => !item))
      .subscribe((place: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/place/placeEdit'], { queryParams: { 'id': place.id } });
        }
        this.setForm(place);
      }));
  }

  onImageClickEvent(event: any): any {
    console.log('delete zip');
  }

  setForm(event: any) {
    this.placeForm = this.fb.group({
      id: this.fb.control(this.id !== undefined ? this.id : ''),
      placeCode: this.fb.control(event !== undefined ? event.id : '', Validators.required),
      placeName: this.fb.control(event !== undefined ? event.placeName : '', Validators.required),
      stationId: this.fb.control(event !== undefined ? event.stationId : ''),
      timezone: this.fb.control(event !== undefined ? event.timezone : 'America/Los_Angeles'),
      latitude: this.fb.control(event !== undefined ? event.latitude : '', Validators.required),
      longitude: this.fb.control(event !== undefined ? event.longitude : '', Validators.required),
    });
  }

  back() {
    this.router.navigate(['admin/place/placeList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemUtilityService.deletePlaceById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/place/placeList'], { queryParams: { 'force': true } });
        }));
    }
  }

  save() {
    if (this.placeForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemUtilityService.updatePlace(this.id, this.placeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadPlaceById();
            this.router.navigate(['admin/place/placeList'], { queryParams: { 'force': this.isForce } });
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.savePlace(this.placeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadPlaceById();
          }));
      }
    } else {
      this.validateAllFormFields(this.placeForm);
    }
  }
  // validateForm() {
  //   for (const key of Object.keys(this.placeForm.controls)) {
  //     if (this.placeForm.controls[key].invalid) {
  //       const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
  //       invalidControl.focus();
  //       break;
  //     }
  //   }
  // }

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


  get f() { return this.placeForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  addZipCode(): any {
    const dialogRef = this.dialog.open(ZipCodeEditComponent, {
      width: '500px',
      height: 'auto',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }
}
