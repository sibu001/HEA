import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-lookup-edit',
  templateUrl: './lookup-edit.component.html',
  styleUrls: ['./lookup-edit.component.css']
})
export class LookupEditComponent implements OnInit, OnDestroy {

  id: any;
  lookupForm: FormGroup;

  lookupValueData = {
    content: [],
    totalElements: 0
  };

  lookupValueDataSource: any = [];
  lookupValueKey: Array<TABLECOLUMN>;
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
    this.lookupValueKey = TableColumnData.LOOKUP_VALUE_KEYS;
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  setForm(event: any) {
    this.lookupForm = this.formBuilder.group({
      lookupCode: [event !== undefined ? event.lookupCode : ''],
      lookupName: [event !== undefined ? event.lookupName : ''],
      defaultValue: [event !== undefined ? event.defaultValue : ''],
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
