import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
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
  topicDescriptionData: Array<any>;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly topicService: TopicService,
    private readonly el: ElementRef,
    private readonly location: Location) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.loadTopicDescription();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.loadScriptConsoleById();
    }
  }
  loadTopicDescription() {
    this.topicService.loadTopicDescriptionList(true, '');
    this.subscriptions.add(this.topicService.getTopicDescriptionList().pipe(skipWhile((item: any) => !item))
      .subscribe((topicDescriptionList: any) => {
        this.topicDescriptionData = topicDescriptionList;
      }));
  }


  setForm(event: any) {
    this.debugForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
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

  changeTheme(event: any): any {
    this.codeMirrorOptions.theme = event.target.value;
  }

  loadScriptConsoleById() {
    // this.subscriptions.add(this.systemMeasurementService.getScriptConsoleById().pipe(skipWhile((item: any) => !item))
    //   .subscribe((scriptConsole: any) => {
    //     this.setForm(scriptConsole);
    //   }));
  }

  executeDebug() {
    // if (this.debugForm.valid) {
    //   if (this.id !== null && this.id !== undefined) {
    //     this.subscriptions.add(this.systemMeasurementService.updateScriptConsole(this.id, this.debugForm.value).pipe(
    //       skipWhile((item: any) => !item))
    //       .subscribe((response: any) => {
    //         this.loadScriptConsoleById();
    //       }));
    //   } else {
    //     this.subscriptions.add(this.systemMeasurementService.saveScriptConsole(this.debugForm.value).pipe(
    //       skipWhile((item: any) => !item))
    //       .subscribe((response: any) => {
    //         this.loadScriptConsoleById();
    //       }));
    //   }
    // } else {
    //   this.validateForm();
    // }
  }
  validateForm() {
    for (const key of Object.keys(this.debugForm.controls)) {
      if (this.debugForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  back() {
    this.location.back();
  }
  get f() { return this.debugForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
