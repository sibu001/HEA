import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { TableColumnData } from 'src/app/data/common-data';

@Component({
  selector: 'app-customer-group-edit',
  templateUrl: './customer-group-edit.component.html',
  styleUrls: ['./customer-group-edit.component.css']
})
export class CustomerGroupEditComponent implements OnInit, OnDestroy {
  customerGroupForm: FormGroup;
  id: any;
  placeKey: Array<TABLECOLUMN> = TableColumnData.PLACE_KEY;
  isForce = false;
  placeData = {
    content: [
      {
        placeCode: 'test',
        placeName: 'test'
      }
    ],
    totalElements: 0
  };
  public placeDataSource: any = [
    {
      placeCode: 'test',
      placeName: 'test'
    }
  ];

  programGroupKey: Array<TABLECOLUMN> = TableColumnData.PROGRAM_GROUP_KEY;
  programGroupData = {
    content: [],
    totalElements: 0
  };
  public programGroupDataSource: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.findProgramGroup();
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadCustomerGroupById(Number(this.id));
      this.loadCustomerGroupById();
    }
  }
  loadCustomerGroupById() {
    this.subscriptions.add(this.systemService.getCustomerGroupById().pipe(skipWhile((item: any) => !item))
      .subscribe((programGroup: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/customer-group/customerGroupEdit'], { queryParams: { 'id': programGroup.id } });
        }
        this.setForm(programGroup);
      }));
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
    this.customerGroupForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      allowBilling: [event !== undefined ? event.allowBilling : ''],
      archived: [event !== undefined ? event.archived : ''],
      auditIdPattern: [event !== undefined ? event.auditIdPattern : '', Validators.required],
      baseDirectory: [event !== undefined ? event.baseDirectory : '', Validators.required],
      contextPath: [event !== undefined ? event.contextPath : ''],
      customerGroupId: [event !== undefined ? event.customerGroupId : ''],
      customerRegistrationSuccessViewId: [event !== undefined ? event.customerRegistrationSuccessViewId : ''],
      customerRegistrationViewId: [event !== undefined ? event.customerRegistrationViewId : ''],
      dataCheckAlg: [event !== undefined ? event.dataCheckAlg : ''],
      forgotPwdMailDescriptionId: [event !== undefined ? event.forgotPwdMailDescriptionId : ''],
      groupCode: [event !== undefined ? event.groupCode : '', Validators.required],
      groupName: [event !== undefined ? event.groupName : '', Validators.required],
      immediateLogin: [event !== undefined ? event.immediateLogin : ''],
      mailChangedMailDescriptionId: [event !== undefined ? event.mailChangedMailDescriptionId : ''],
      mailDescriptionId: [event !== undefined ? event.mailDescriptionId : ''],
      newRecommendationMailDescriptionId: [event !== undefined ? event.newRecommendationMailDescriptionId : ''],
      registrationErrorMailDescriptionId: [event !== undefined ? event.registrationErrorMailDescriptionId : ''],
      registrationUrl: [event !== undefined ? event.registrationUrl : '', Validators.required],
      repeatedMailDescriptionId: [event !== undefined ? event.repeatedMailDescriptionId : ''],
      scrapingPeriod: [event !== undefined ? event.scrapingPeriod : 'D'],
      scrapingUtility: [event !== undefined ? event.scrapingUtility : 'pge'],
      showEventHistory: [event !== undefined ? event.showEventHistory : ''],
      spamTestMailDescriptionId: [event !== undefined ? event.spamTestMailDescriptionId : ''],
      theme: [event !== undefined ? event.theme : 'AC'],
    });
  }
  back() {
    this.router.navigate(['admin/customer-group/customerGroupList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.systemService.deleteCustomerGroupById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/customer-group/customerGroupList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.customerGroupForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemService.updateCustomerGroup(this.id, this.customerGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerGroupById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveCustomerGroup(this.customerGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadCustomerGroupById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.customerGroupForm.controls)) {
      if (this.customerGroupForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.customerGroupForm.controls; }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
