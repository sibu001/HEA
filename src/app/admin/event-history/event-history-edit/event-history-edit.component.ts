import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, skipWhile } from 'rxjs/operators';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';


@Component({
  selector: 'app-event-history-edit',
  templateUrl: './event-history-edit.component.html',
  styleUrls: ['./event-history-edit.component.css']
})
export class EventHistoryEditComponent implements OnInit, OnDestroy {
  users: Users = new Users();
  customerEventId: any;
  customerId: any;
  customerList: any = [];
  eventForm: FormGroup;
  eventTypeData: Array<any>;
  isForce = false;
  customerData: any;
  userId: any;
  linkedPersonType: any;
  dataListForSuggestions = [];
  private subject$ : Subject<any>  = new Subject();
  private readonly subscriptions: Subscription = new Subscription();
  addRequest: boolean = false;
  eventData: any;
  date: Date;
  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly administrativeService: AdministrativeService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.users = this.loginService.getUser();
    this.customerList = this.users.searchUserList;
    if (this.customerList.length > 0) {
      this.customerData = this.customerList[0];
    }
    this.activateRoute.queryParams.subscribe(params => {
      this.customerEventId = params['customerEventId'];
      this.customerId = params['customerId'];
      this.addRequest = params['addRequest'];
    });
    this.findCustomer();
    this.setForm(undefined);
    this.setTodayDate();
  }
  
  setTodayDate(){
    // setTimeout(()=> { this.eventForm.patchValue({eventDatetime : this.date}); }, 200);
  }

  scrollTop(){
    window.scroll(0,0);
  }

  ngOnInit() {
    this.getEventHistoryById();
    this.loadCustomerEventType();
    this.getCustomerByCustomerId();
    if (this.customerEventId !== undefined && this.customerId !== undefined) {
      this.loadEventHistoryById();
      this.loadCustomerByCustomerId();
    }
    this.scrollTop();
  }

  loadCustomerByCustomerId(){
    this.customerService.loadCustomerById(this.customerId);
  }

  getCustomerByCustomerId(){
    this.subscriptions.add(
      this.customerService.getCustomerById()
      .pipe(filter(data => data && this.customerId))
      .subscribe(
        data =>{
          this.customerData = data;
          this.eventForm.patchValue({ auditId : data.auditId , customerName : data.user.name });
          this.router.navigate([], { 
            relativeTo: this.activateRoute,
            queryParams: {customerId : data.customerId },
            queryParamsHandling : 'merge'
          })
        }
      )
    )
  }

  setForm(event: any) {
    let linkedPerson = 'Staff';
    this.linkedPersonType = event && event.linkedPersonType ? event.linkedPersonType : null;
    if (event && event.linkedPersonType === 1) {
      linkedPerson = 'Customer';
    } else if (event && event.linkedPersonType === 2) {
      linkedPerson = 'Staff';
    } else if (event && event.linkedPersonType === 3) {
      linkedPerson = 'Partner';
    }
    this.eventForm = this.fb.group({
      id: [event !== undefined ? event.id : null],
      customerEventId: [event !== undefined ? event.customerEventId : null],
      customerEventTypeId: [event !== undefined ? event.customerEventTypeId : null],
      auditId: [this.customerData !== undefined ? this.customerData.auditId : '', Validators.required],
      customerName: [this.customerData !== undefined ? this.customerData.user.name : '', Validators.required],
      customerId: [event !== undefined ? event.customerId : ''],
      eventDatetime: [event !== undefined ? '' : ''],
      description: [event !== undefined ? event.description : ''],
      modifyAllowed: [event !== undefined ? event.modifyAllowed : ''],
      linkedPersonType: [event !== undefined ? linkedPerson : ''],
      linkedPersonName: [event !== undefined ? event.linkedPersonName : ''],
      linkedUserId: [event !== undefined ? event.linkedUserId : ''],
      customerEventType: this.fb.group({
        id: [event !== undefined ? event.customerEventType.id : ''],
        customerEventTypeId: [event !== undefined ? event.customerEventType.customerEventTypeId : ''],
        description: [event !== undefined ? event.customerEventType.description : ''],
        eventCode: [event !== undefined ? event.customerEventType.eventCode : ''],
        eventName: [event !== undefined ? event.customerEventType.eventName : ''],
        onlyOne: [event !== undefined ? event.customerEventType.onlyOne : null],
        shared: [event !== undefined ? event.customerEventType.shared : null],
      }),
      user: [event && event.user ? event.user : null],
      createdBy: [event !== undefined ? event.createdBy : ''],
    });
  }

  loadCustomerEventType() {
    this.systemUtilityService.loadCustomerEventTypeList(true, '');
    this.subscriptions.add(this.systemUtilityService.getCustomerEventTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.eventTypeData = response;
        if (!this.customerEventId) {
          const customerEventType: any = this.eventForm.controls.customerEventType;
          customerEventType.controls['eventCode'].setValue(this.eventTypeData[0].eventCode);
          customerEventType.controls['description'].setValue(this.eventTypeData[0].description);
          this.eventForm.controls['customerEventTypeId'].setValue(this.eventTypeData[0].customerEventTypeId);
        }
      }));
  }

  changeDropDownValue(event: any) {
    const i = this.eventTypeData.findIndex((item: any) => item.eventCode === event.target.value);
    if (i !== -1) {
      const customerEventType: any = this.eventForm.controls.customerEventType;
      customerEventType.controls['eventCode'].setValue(this.eventTypeData[i].eventCode);
      customerEventType.controls['description'].setValue(this.eventTypeData[i].description);
      this.eventForm.controls['customerEventTypeId'].setValue(this.eventTypeData[i].customerEventTypeId);
    }
  }
  validateForm() {
    for (const key of Object.keys(this.eventForm.controls)) {
      if (this.eventForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  loadEventHistoryById() {
    this.administrativeService.loadEventHistoryById(this.customerId, this.customerEventId);
  }

  getEventHistoryById(){
    this.subscriptions.add(this.administrativeService.getEventHistoryById()
    .pipe(skipWhile((item: any) => !item))
    .subscribe((eventHistory: any) => {
      if(!this.addRequest)
        this.eventData = eventHistory;
      
      if (this.isForce) {
        this.customerId = eventHistory.customerId;
        this.customerEventId = eventHistory.customerEventId;
        this.router.navigate(['/admin/eventHistory/eventHistoryEdit'], { queryParams: { customerEventId: this.customerEventId, customerId: this.customerId } });
      }
      this.setForm(this.eventData);
    }));
  }

  back() {
    this.router.navigate(['admin/eventHistory/eventHistoryList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.administrativeService.deleteEventHistoryById(this.customerId, this.customerEventId).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/eventHistory/eventHistoryList'], { queryParams: { 'force': true } });
      }));
  }

  filterForCustomer(){
    return new HttpParams()
      .set('auditId',this.eventForm.value.auditId !== undefined ? this.eventForm.value.auditId : '')
      .set('customerName',this.eventForm.value.customerName !== undefined ? this.eventForm.value.customerName :'')
      .set('useLike','true')
  }

  findCustomerByAuditIdOrCustomerName(calledBy){
    let filters =  this.filterForCustomer();

    if(calledBy == 'auditId'){
      this.eventForm.patchValue({'customerName' : ''});
      filters = filters.delete('customerName');
    }else{
      this.eventForm.patchValue({'auditId' : ''});
      filters = filters.delete('auditId');
    }
    
    filters = filters.set('useLike','true');
    this.subject$.next(filters);
  }

  findCustomer(){
    this.subscriptions.add(this.subject$
      .pipe(
       debounceTime(600)  
      , distinctUntilChanged())
      .subscribe(
    (filters : any) =>{
      this.loginService.performGetWithParams('findCustomers.do',filters)
      .subscribe(
        (response) =>{
          this.dataListForSuggestions = response.slice(0,100);
          if(this.dataListForSuggestions.length == 1){
            this.selectedSuggestion(this.dataListForSuggestions[0]);
            this.dataListForSuggestions = [];
          }

        }, error =>{
           console.log(error);
        }
      )
    }
    )
  );
}

selectedSuggestion(event : any){
    this.eventForm.patchValue({ auditId : event.auditId , customerName : event.user.name});
    this.customerEventId = undefined;
    this.customerData = event;
    this.customerId = event.customerId;
    let params = {customerId : event.customerId};
    if(!this.addRequest){
      Object.defineProperty(params, 'customerEventId',{value : ''})
    }
    this.router.navigate([], { 
      relativeTo: this.activateRoute,
      queryParams: params,
      queryParamsHandling : 'merge'
    });
}

 
save() {
  if (this.eventForm.valid) {
    this.eventForm.value.linkedPersonType = this.linkedPersonType;
    this.eventForm.value.eventDatetime = this.eventForm.value.eventDatetime ? new Date(this.eventForm.value.eventDatetime).getTime() : '';
    this.isForce = true;
    this.addRequest = false;
    if (this.customerEventId) {
      this.administrativeService.updateEventHistory(this.customerId, this.customerEventId, this.eventForm.value);
    } else {
      this.eventForm.value.modifyAllowed = true;
      this.administrativeService.saveEventHistory(this.customerId, this.eventForm.value);
    }
  } else {
    this.validateForm();
  }
}

  get f() { return this.eventForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
