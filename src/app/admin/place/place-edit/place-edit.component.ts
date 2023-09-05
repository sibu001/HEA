import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppUtility } from 'src/app/utility/app.utility';
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
  public placeData : any;
  public zipData = {
    content: [],
    totalElements: 0,
  };
  placeForm: FormGroup;
  isForce = false;
  errorMessage: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.loadZipCodeList();
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.findWeatherStation(false, '');
    this.loadTimeZoneList();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemUtilityService.loadPlaceById(this.id);
      this.getPlaceById();
    }
    this.combineLatestWeatherStationAndZipCode(); 
  }

  goToEditZipCode(event: any): any {
    const dialogRef = this.dialog.open(ZipCodeEditComponent, {
      width: '500px',
      height: 'auto',
      disableClose: true,
      data: { event }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  getPlaceById() {
    this.subscriptions.add(this.systemUtilityService.getPlaceById()
    .pipe(filter((item: any) => item && this.id == item.id))
      .subscribe((place: any) => {
        this.placeData = {...place};
        this.setForm(place);
        this.scrollTop();
      },
      error => {
        this.errorMessage = error;
      }));
  }

  loadTimeZoneList() {
    this.systemUtilityService.loadTimeZoneList(false);
    this.subscriptions.add(this.systemUtilityService.getTimeZoneList().pipe(skipWhile((item: any) => !item))
      .subscribe((timeZoneList: any) => {
        this.timezoneData = timeZoneList.data;
      },
      error => {
        this.errorMessage = error;
      }));
  }

  setForm(event: any) {
    this.placeForm = this.fb.group({
      id: this.fb.control(this.id !== undefined ? this.id : ''),
      place: this.fb.control(event !== undefined ? event.id : '', Validators.required),
      placeName: this.fb.control(event !== undefined ? event.placeName : '', Validators.required),
      stationId: this.fb.control(event !== undefined ? event.stationId : ''),
      timezone: this.fb.control(event !== undefined ? event.timezone : ''),
      latitude: this.fb.control(event !== undefined ? event.latitude : '', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,100})?$')]),
      longitude: this.fb.control(event !== undefined ? event.longitude : '', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,100})?$')]),
    });
  }

  back() {
    this.router.navigate(['admin/place/placeList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemUtilityService.deletePlaceById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.isForce = true;
          this.back();
        },
        error => {
          this.errorMessage = error;
        }));
    }
  }

  save() {
    if (this.placeForm.valid) {
      if (this.id !== null && this.id !== undefined) {

        const placeData = {...this.placeData, ...this.placeForm.value};
        this.subscriptions.add(this.systemUtilityService.updatePlace(this.placeForm.value.id, placeData)
        .pipe( take(1))
          .subscribe((state: any) => {
            this.isForce = true;
          },
          error => {
            this.errorMessage = error;
          }));

      } else {

        this.subscriptions.add(this.systemUtilityService.savePlace(this.placeForm.value)
        .pipe(take(1))
          .subscribe((state: any) => {
            this.id = state.systemUtilityManagement.place.id;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
            this.getPlaceById();
          },
          error => {
            this.errorMessage = error;
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

  findWeatherStation(force: boolean, filter: any): void {
    this.systemUtilityService.loadWeatherStationList(force, filter);
  }

  loadZipCodeList() {
    this.systemUtilityService.loadZipCodeList(this.id, '');
  }

  combineLatestWeatherStationAndZipCode(){

    const weatherStationList$ : Observable<any> = this.systemUtilityService.getWeatherStationList()
      .pipe(filter((item: any) => item));
    
    const zipCodeList$ : Observable<any> = this.systemUtilityService.getZipCodeList()
      .pipe(filter((item: any) => item));

    this.subscriptions.add(
      combineLatest([weatherStationList$, zipCodeList$])
      .subscribe(([weatherStationList, zipCodeList] : any) =>{

        this.placeStationId = weatherStationList;
        this.zipData.content = [];
        this.zipData.content = zipCodeList.map(data => {
          const element = {...data};
          let customerGroupObj: any;
          customerGroupObj = element;
          if (element.stationId) {
            customerGroupObj.stationId = weatherStationList.find(({ stationId }) => stationId === element.stationId).stationNameForLabel;
          }
          return element;
        });
        this.dataSource = [...this.zipData.content];
        
      })
    )
  }

  addZipCode(): any {
    const dialogRef = this.dialog.open(ZipCodeEditComponent, {
      width: '500px',
      height: 'auto',
      disableClose: true,
      data: {
        placeCode: this.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadZipCodeList();
      }
    });
  }

  deleteZip(event: any): any {
    this.subscriptions.add(this.systemUtilityService.deleteZipCodeById(this.id, event.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.loadZipCodeList();
      },
      error => {
        this.errorMessage = error;
      }));
  }

  get f() { return this.placeForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
