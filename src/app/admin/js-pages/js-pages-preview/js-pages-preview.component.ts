import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-js-pages-preview',
  templateUrl: './js-pages-preview.component.html',
  styleUrls: ['./js-pages-preview.component.css']
})
export class JsPagesPreviewComponent implements OnInit {
  id: any;
  contentForm: FormGroup;
  mailType = TableColumnData.MAIL_TYPE;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
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
    this.contentForm = this.formBuilder.group({
      auditId: [event !== undefined ? event.auditId : ''],
      customerName: [event !== undefined ? event.customerName : ''],
      mailDescriptionId: [event !== undefined ? event.mailDescriptionId : ''],
      showHtml: [event !== undefined ? event.showHtml : ''],
      address: [event !== undefined ? event.address : ''],
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  sendMailToAddress(): any { }

  get f() { return this.contentForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
