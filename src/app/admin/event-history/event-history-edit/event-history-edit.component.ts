import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';


@Component({
  selector: 'app-event-history-edit',
  templateUrl: './event-history-edit.component.html',
  styleUrls: ['./event-history-edit.component.css']
})
export class EventHistoryEditComponent implements OnInit, OnDestroy {

  id: any;
  eventForm: FormGroup;
  eventTypeData: Array<any> = TableColumnData.CUSTOMER_EVENT_TYPE;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
  }

  setForm(event: any) {
    this.eventForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      auditId: [event !== undefined ? event.auditId : ''],
      customerName: [event !== undefined ? event.customerName : ''],
      eventType: [event !== undefined ? event.eventType : ''],
      eventDate: [event !== undefined ? event.eventDate : ''],
      additionalComments: [event !== undefined ? event.additionalComments : '']
    });
  }

  validateForm() {
    for (const key of Object.keys(this.eventForm.controls)) {
      if (this.eventForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  back() {
    this.location.back();
  }

  get f() { return this.eventForm.controls; }

  ngOnDestroy(): void {
  }

}
