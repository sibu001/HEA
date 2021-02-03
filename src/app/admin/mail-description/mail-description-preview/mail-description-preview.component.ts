import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-mail-description-preview',
  templateUrl: './mail-description-preview.component.html',
  styleUrls: ['./mail-description-preview.component.css']
})
export class MailDescriptionPreviewComponent implements OnInit, OnDestroy {
  id: any;
  contentForm: FormGroup;
  mailType: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly mailService: MailService,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.loadMailType();
    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  loadMailType() {
    this.mailService.loadMailDescriptionList(true, '');
    this.subscriptions.add(this.mailService.getMailDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((mailDescriptionList: any) => {
        this.mailType = mailDescriptionList.data;
      }));
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
