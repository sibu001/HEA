import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-script-debug-console',
  templateUrl: './script-debug-console.component.html',
  styleUrls: ['./script-debug-console.component.css']
})
export class ScriptDebugConsoleComponent implements OnInit, OnDestroy {

  id: any;
  isTrue: Boolean = true;
  debugForm: FormGroup;
  codeMirrorOptions: any = {
    theme: 'idea',
    mode: 'application/ld+json',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
  };
  topicDescriptionData: Array<any> = TableColumnData.TOPIC_DESCRIPTION_DATA;
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
    this.debugForm = this.formBuilder.group({
      // id: [event !== undefined ? event.id : ''],
      auditId: [event !== undefined ? event.auditId : ''],
      customerName: [event !== undefined ? event.customerName : ''],
      surveyDescriptionId: [event !== undefined ? event.surveyDescriptionId : ''],
      scriptType: [event !== undefined ? event.scriptType : ''],
      script: [event !== undefined ? event.script : ''],
      event: [event !== undefined ? event.event : ''],
      result: [event !== undefined ? event.result : ''],
      disableValueCache: [event !== undefined ? event.disableValueCache : '']
    });
  }
  back() {
    this.location.back();
  }

  executeDebug() {

  }

  changeTheme(event: any): any {
    this.codeMirrorOptions.theme = event.target.value;
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
