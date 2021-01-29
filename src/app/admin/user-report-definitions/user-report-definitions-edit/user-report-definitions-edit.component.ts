import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-user-report-definitions-edit',
  templateUrl: './user-report-definitions-edit.component.html',
  styleUrls: ['./user-report-definitions-edit.component.css']
})
export class UserReportDefinitionsEditComponent implements OnInit, OnDestroy {


  id: any;
  topicForm: FormGroup;
  public userReportKeys = TableColumnData.CUSTOMER_GROUP_KEY;
  contentPartsKeys = TableColumnData.CONTENT_PART_KEYS;
  variableKeys = TableColumnData.VARIABLE_KEYS;
  reportType = TableColumnData.USER_REPORT_DATA;
  contentTypeList: any[] = [];
  public userReportDataSource: any;
  public contentPartsDataSource: any;
  public variableDataSource: any;
  public totalElement = 0;
  public userReportData = {
    content: [],
    totalElements: 0,
  };
  public contentPartsData = {
    content: [],
    totalElements: 0,
  };
  public variableData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemService: SystemService,
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
    this.topicForm = this.formBuilder.group({
      order: [event !== undefined ? event.order : ''],
      displayLabel: [event !== undefined ? event.displayLabel : ''],
      userReportType: [event !== undefined ? event.userReportType : ''],
      label: [event !== undefined ? event.label : '', Validators.required],
      contentType: [event !== undefined ? event.contentType : ''],
      filter: [event !== undefined ? event.filter : '']
    });
  }

  loadContentTypeList(): any {
    this.systemService.loadContentTypeList();
    this.subscriptions.add(this.systemService.getContentType().pipe(skipWhile((item: any) => !item))
      .subscribe((contentTypeList: any) => {
        this.contentTypeList = contentTypeList.data;
      }));
  }

  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  copy(): any { }

  addContentParts(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportContentParts']);
  }

  addVariable(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportContextVariable']);
  }

  goToEditContentParts(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportContentParts'], { queryParams: { id: this.id } });
  }

  goToEditVariable(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportContextVariable'], { queryParams: { id: this.id } });
  }

  Preview() {
    this.router.navigate(['/admin/userReportDefinitions/userReportPreview'], { queryParams: { id: this.id } });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
