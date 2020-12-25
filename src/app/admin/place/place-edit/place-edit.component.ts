import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public placeStationId: Array<any>;
  public timezoneData: Array<any>;
  public dataSource: any;
  public zipData = {
    content: [],
    totalElements: 0,
  };
  placeForm: FormGroup;
  isForce = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getZipCodeList();
    });
  }

  ngOnInit() {
    this.findWeatherStation(true, '');
    this.loadTimeZoneList();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemUtilityService.loadPlaceById(this.id);
      this.loadPlaceById();
    }
  }

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.placeStationId = weatherStationList;
      }));
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

  loadTimeZoneList() {
    this.systemUtilityService.loadTimeZoneList(false);
    this.subscriptions.add(this.systemUtilityService.getTimeZoneList().pipe(skipWhile((item: any) => !item))
      .subscribe((timeZoneList: any) => {
        this.timezoneData = timeZoneList.data;
      }));
  }

  setForm(event: any) {
    this.placeForm = this.fb.group({
      id: this.fb.control(this.id !== undefined ? this.id : ''),
      place: this.fb.control(event !== undefined ? event.id : '', Validators.required),
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
        this.placeForm.value.id = this.placeForm.value.place;
        this.subscriptions.add(this.systemUtilityService.updatePlace(this.placeForm.value.id, this.placeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadPlaceById();
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

  getZipCodeList() {
    this.subscriptions.add(this.systemUtilityService.loadZipCodeList(this.id, '').pipe(skipWhile((item: any) => !item))
      .subscribe((zipCodeList: any) => {
        this.zipData.content = zipCodeList.systemUtilityManagement.zipCodeList;
        this.dataSource = [...this.zipData.content];
      }));
  }

  addZipCode(): any {
    const dialogRef = this.dialog.open(ZipCodeEditComponent, {
      width: '500px',
      height: 'auto',
      data: {
        placeCode: this.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getZipCodeList();
      }
    });
  }

  deleteZip(event: any): any {
    this.subscriptions.add(this.systemUtilityService.deleteZipCodeById(this.id, event.zipCode).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.getZipCodeList();
      }));
  }

  get f() { return this.placeForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
