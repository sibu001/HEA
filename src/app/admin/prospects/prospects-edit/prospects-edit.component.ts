import { AfterViewInit, Component, ElementRef, Inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-prospects-edit',
  templateUrl: './prospects-edit.component.html',
  styleUrls: ['./prospects-edit.component.css']
})
export class ProspectsEditComponent implements OnInit, OnDestroy {

  id: any;
  prospectsForm: FormGroup;
  public coachList: any = [];
  private readonly subscriptions: Subscription = new Subscription();
  isForce = false;
  userId: any;
  errorMessage: String;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly administrativeService: AdministrativeService,
    private readonly el: ElementRef,
    private readonly systemService: SystemService,
    private readonly loginService: LoginService,
    public dialogRef: MatDialogRef<ProspectsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.findCoach();
    this.setForm(undefined);
    if (this.data !== undefined && this.data.id !== undefined) {
        this.id = this.data.id;
      this.getProspectsById();
      this.loadProspectsById();
    }
  }

  findCoach() {
      this.systemService.loadCoachUserList(false, '?filter.withRole=COACH');
      this.subscriptions.add(this.systemService.getCoachUserList().pipe(skipWhile((item: any) => !item))
        .subscribe((coachUserList: any) => {
        this.coachList = coachUserList.list;
        //this.coachList.splice(0,0,{ name : "Unassigned", "userId" : -1})
        }));
    
   
  }


  setForm(event: any) {
    this.prospectsForm = this.formBuilder.group({
      registrationId: [event !== undefined ? event.registrationId : ''],
      source: [event !== undefined ? event.source : ''],
      name: [event !== undefined ? event.name : ''],
      field6: [event !== undefined ? event.field6 : ''],
      zip: [event !== undefined ? event.zip : ''],
      email: [event !== undefined ? event.email : ''],
      emailValidated: [event !== undefined ? event.emailValidated : ''],  
      referral: [event !== undefined ? event.referral : ''],
      remoteInfo: [event !== undefined ? event.remoteInfo : ''],
      createdDate: [event !== undefined ? event.createdDate : ''],
      field1: [event !== undefined ? event.field1 : ''],
      field2: [event !== undefined ? event.field2 : ''],
      field3: [event !== undefined ? event.field3 : ''],
      field4: [event !== undefined ? event.field4 : ''],
      field5: [event !== undefined ? event.field5: ''],
      field7: [event !== undefined ? event.field7 : ''],
      field8: [event !== undefined ? event.field8 : ''],
      field9: [event !== undefined ? event.field9 : ''],
      subscriptionId: [event !== undefined ? event.subscriptionId : ''],
      auditId: [(event !==undefined && event.customer) ? event.customer.auditId : null],
      optOutMail: [event !== undefined ? event.optOutMail : false],
      coachUserId:[event !== undefined && event !== null ? event.coachUserId : ''],
      county: [event !== undefined ? event.county : ''],
      phone: [event !== undefined ? event.phone : ''],
      homeType: [event !== undefined ? event.homeType: ''],
      ownership: [event !== undefined ? event.ownership : ''],
      highestBill: [event !== undefined ? event.highestBill : ''],
      summerThermostat: [event !== undefined ? event.summerThermostat: ''],
      otherText: [event !== undefined ? event.otherText : ''],
    });

    
  }

  goToDebug() {
    // this.router.navigate(['/admin/debug/scriptDebugConsole'], { queryParams: {} });

  }
  recalculate() {

  }

  loadProspectsById() {
    this.administrativeService.loadProspectsById(this.data.id);
  }

  getProspectsById(){
    this.subscriptions.add(this.administrativeService.getProspectsById().pipe(filter((item: any) => item && this.id == item.id))
      .subscribe((prospects: any) => {
        this.setForm(prospects);
      }));
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  delete() {
    this.errorMessage = '';

    if(!confirm('Are you sure you want to delete?')){
      return;
    }

    this.subscriptions.add(this.administrativeService.deleteProspectsById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.dialogRef.close(true);
      }));
  }

  save() {
    this.errorMessage = '';
    if (this.prospectsForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.administrativeService.updateProspects(this.id, this.prospectsForm.value);
      } else {
        this.administrativeService.saveProspects(this.prospectsForm.value);
      }
      this.dialogRef.close(true);
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.prospectsForm.controls)) {
      if (this.prospectsForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  resendEmailValidation(){
    this.loginService.performPost({},'/trusted/registrations/' + this.data.id +'/sendValidationMail')
    .subscribe(
      response => {
        console.log(response);

        if(response.data.errorMessage){
          this.errorMessage = response.data.errorMessage;
          console.error(response.data);
          console.log(this.el);
          document.querySelector('mat-dialog-container').scrollTo(0,0);
        }

      }, error =>{
        console.error(error);
        AppUtility.scrollTop();
      }
    )
  }

  get f() { return this.prospectsForm.controls; }

  goToEditProspects(event: any): any {

  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
