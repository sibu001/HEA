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
  selector: 'app-customer-group-edit',
  templateUrl: './customer-group-edit.component.html',
  styleUrls: ['./customer-group-edit.component.css']
})
export class CustomerGroupEditComponent implements OnInit, OnDestroy {
  programGroupForm: FormGroup;
  id: any;
  placeKey: Array<TABLECOLUMN>;
  placeData = {
    content: [
      {
        placeCode: 'test',
        placeName: 'test'
      }
    ],
    totalElements: 0
  };
  public placeDataSource: any=[
    {
      placeCode: 'test',
      placeName: 'test'
    }
  ];

  programGroupKey: Array<TABLECOLUMN>;
  programGroupData = {
    content: [],
    totalElements: 0
  };
  public programGroupDataSource: any;
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
    this.programGroupKey = TableColumnData.PROGRAM_GROUP_KEY;
    this.placeKey = TableColumnData.PLACE_KEY;
    this.findProgramGroup();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCustomerGroupById(Number(this.id));
      this.subscriptions.add(this.systemService.getCustomerGroupById().pipe(skipWhile((item: any) => !item))
        .subscribe((programGroup: any) => {
          this.setForm(programGroup);
        }));
    }
  }

  findProgramGroup(): void {
    this.systemService.loadProgramGroupsList(false);
    this.subscriptions.add(this.systemService.getProgramGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((programGroupList: any) => {
        this.programGroupData.content = programGroupList;
        this.programGroupDataSource = [...this.programGroupData.content];
      }));
  }

  setForm(event: any) {
    this.programGroupForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      allowBilling: [event !== undefined ? event.allowBilling : ''],
      archived: [event !== undefined ? event.archived : ''],
      auditIdPattern: [event !== undefined ? event.auditIdPattern : ''],
      baseDirectory: [event !== undefined ? event.baseDirectory : ''],
      contextPath: [event !== undefined ? event.contextPath : ''],
      customerGroupId: [event !== undefined ? event.customerGroupId : ''],
      customerRegistrationSuccessViewId: [event !== undefined ? event.customerRegistrationSuccessViewId : ''],
      customerRegistrationViewId: [event !== undefined ? event.customerRegistrationViewId : ''],
      dataCheckAlg: [event !== undefined ? event.dataCheckAlg : ''],
      forgotPwdMailDescriptionId: [event !== undefined ? event.forgotPwdMailDescriptionId : ''],
      groupCode: [event !== undefined ? event.groupCode : ''],
      groupName: [event !== undefined ? event.groupName : ''],
      immediateLogin: [event !== undefined ? event.immediateLogin : ''],
      mailChangedMailDescriptionId: [event !== undefined ? event.mailChangedMailDescriptionId : ''],
      mailDescriptionId: [event !== undefined ? event.mailDescriptionId : ''],
      newRecommendationMailDescriptionId: [event !== undefined ? event.newRecommendationMailDescriptionId : ''],
      registrationErrorMailDescriptionId: [event !== undefined ? event.registrationErrorMailDescriptionId : ''],
      registrationUrl: [event !== undefined ? event.registrationUrl : ''],
      repeatedMailDescriptionId: [event !== undefined ? event.repeatedMailDescriptionId : ''],
      scrapingPeriod: [event !== undefined ? event.scrapingPeriod : ''],
      scrapingUtility: [event !== undefined ? event.scrapingUtility : ''],
      showEventHistory: [event !== undefined ? event.showEventHistory : ''],
      spamTestMailDescriptionId: [event !== undefined ? event.spamTestMailDescriptionId : ''],
      theme: [event !== undefined ? event.theme : ''],
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
