import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-cimis-station-edit',
  templateUrl: './cimis-station-edit.component.html',
  styleUrls: ['./cimis-station-edit.component.css']
})
export class CimisStationEditComponent implements OnInit, OnDestroy {

  cimisStationForm: FormGroup;
  id: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
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
      this.systemService.loadCustomerGroupById(Number(this.id));
      this.loadCustomerGroupById();
    }
  }
  loadCustomerGroupById() {

  }
  setForm(event: any) {
    this.cimisStationForm = this.formBuilder.group({
      stationNumber: [event !== undefined ? event.stationNumber : '', Validators.required],
      stationName: [event !== undefined ? event.stationName : '', Validators.required],
      country: [event !== undefined ? event.country : '', Validators.required],
      city: [event !== undefined ? event.city : '', Validators.required],
      regionalOffice: [event !== undefined ? event.regionalOffice : '', Validators.required],
      elevation: [event !== undefined ? event.elevation : '', Validators.required],
      groundCover: [event !== undefined ? event.groundCover : '', Validators.required],
      latitude: [event !== undefined ? event.latitude : '', Validators.required],
      longitude: [event !== undefined ? event.longitude : '', Validators.required],
      active: [event !== undefined ? event.active : ''],
      etoStation: [event !== undefined ? event.etoStation : ''],
      zipCodes: [event !== undefined ? event.zipCodes : '']
    });
  }
  back() {
    this.router.navigate(['admin/cimisStation/cimisStationList']);
  }
  delete() {

  }

  save() {

  }

  get f() { return this.cimisStationForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
