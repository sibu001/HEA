import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-js-pages-preview',
  templateUrl: './js-pages-preview.component.html',
  styleUrls: ['./js-pages-preview.component.css']
})
export class JsPagesPreviewComponent implements OnInit {
  id: any;
  jsPreviewForm: FormGroup;
  mailType = TableColumnData.MAIL_TYPE;
  url: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly dynamicViewService: DynamicViewService,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.dynamicViewService.loadJavaScriptPageById(this.id);
      this.loadJavaScriptPageById();
    }
  }

  loadJavaScriptPageById() {
    this.subscriptions.add(this.dynamicViewService.getJavaScriptPageById().pipe(skipWhile((item: any) => !item))
      .subscribe((jsPages: any) => {
        this.setForm(jsPages);
      }));
  }


  setForm(event: any) {
    if (event && event.pageBody) {
      this.url = event.pageBody;
    }
    this.jsPreviewForm = this.formBuilder.group({
      code: [event !== undefined ? event.code : ''],
      name: [event !== undefined ? event.name : ''],
      pageBody: [event !== undefined ? event.pageBody : ''],
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  sendMailToAddress(): any { }

  get f() { return this.jsPreviewForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
