import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { Location } from '@angular/common';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { TableColumnData } from 'src/app/data/common-data';

@Component({
  selector: 'app-customer-event-edit',
  templateUrl: './customer-event-edit.component.html',
  styleUrls: ['./customer-event-edit.component.css']
})
export class CustomerEventEditComponent implements OnInit, OnDestroy {
  id: any;
  eventForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  findProgramGroup(): void {
  }

  setForm(event: any) {
    this.eventForm = this.formBuilder.group({
      // id: [event !== undefined ? event.id : ''], 
      eventCode: [event !== undefined ? event.eventCode : ''],
      eventName: [event !== undefined ? event.eventName : ''],
      description: [event !== undefined ? event.description : ''],
      availableToUser: [event !== undefined ? event.availableToUser : ''],
      onlyOnePerAccount: [event !== undefined ? event.availableToUser : ''],
    });
  }
  back() {
    this.location.back();
  }
  save() {

  }
  delete() {

  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
