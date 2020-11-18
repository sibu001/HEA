import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { StackTraceComponent } from '../../mail-description/stack-trace/stack-trace.component';

@Component({
  selector: 'app-view-configuration-edit',
  templateUrl: './view-configuration-edit.component.html',
  styleUrls: ['./view-configuration-edit.component.css']
})
export class ViewConfigurationEditComponent implements OnInit, OnDestroy {
  id: any;
  configForm: FormGroup;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
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
    this.configForm = this.formBuilder.group({
      configurationName: [event !== undefined ? event.configurationName : '', Validators.required],
      baseEntity: [event !== undefined ? event.baseEntity : ''],
      isPaged: [event !== undefined ? event.isPaged : ''],
      shared: [event !== undefined ? event.shared : ''],
      note: [event !== undefined ? event.note : ''],
      totalCalls: [event !== undefined ? event.totalCalls : ''],
      totalProcessedTime: [event !== undefined ? event.totalProcessedTime : ''],
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  goToAttributeList(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeList'], { queryParams: { id: this.id } });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
