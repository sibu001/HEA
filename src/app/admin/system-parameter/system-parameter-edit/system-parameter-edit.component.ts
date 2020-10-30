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
  selector: 'app-system-parameter-edit',
  templateUrl: './system-parameter-edit.component.html',
  styleUrls: ['./system-parameter-edit.component.css']
})
export class SystemParameterEditComponent implements OnInit, OnDestroy {

  id: any;
  parameterForm: FormGroup;
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

  setForm(event: any) {
    this.parameterForm = this.formBuilder.group({
      parameterCode: [event !== undefined ? event.parameterCode : ''],
      description: [event !== undefined ? event.description : ''],
      parameterValue: [event !== undefined ? event.parameterValue : ''],
      formatType: [event !== undefined ? event.formatType : ''],
      needServerRestart: [event !== undefined ? event.needServerRestart : ''],
      readOnly: [event !== undefined ? event.readOnly : ''],
      comments: [event !== undefined ? event.comments : ''],
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
