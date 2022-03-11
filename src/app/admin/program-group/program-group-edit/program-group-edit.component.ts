import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

@Component({
  selector: 'app-program-group-edit',
  templateUrl: './program-group-edit.component.html',
  styleUrls: ['./program-group-edit.component.css']
})
export class ProgramGroupEditComponent implements OnInit, OnDestroy {


  programGroupForm: FormGroup;
  id: any;
  isForce = false;
  customerEventTypeList: any[] = [];
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.loadCustomerEvent();
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadProgramGroupById(Number(this.id));
      this.loadProgramGroupById();
    }
  }

  loadCustomerEvent() {
    this.systemUtilityService.loadCustomerEventTypeList(true, '');
    this.subscriptions.add(this.systemUtilityService.getCustomerEventTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialTypeList: any) => {
        this.customerEventTypeList = credentialTypeList;
      }));
  }
  loadProgramGroupById() {
    this.subscriptions.add(this.systemService.getProgramGroupById().pipe(skipWhile((item: any) => !item))
      .subscribe((programGroup: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/program/programGroupEdit'], { queryParams: { 'id': programGroup.id } });
        }
        this.setForm(programGroup);
      }));
  }
  setForm(event: any) {
    this.programGroupForm = this.formBuilder.group({
      id: [event !== undefined ? event.id : ''],
      programCode: [event !== undefined ? event.programCode : '', Validators.required],
      programName: [event !== undefined ? event.programName : '', Validators.required],
      inCustomerEventTypeId: [event !== undefined ? event.inCustomerEventTypeId : ''],
      outCustomerEventTypeId: [event !== undefined ? event.outCustomerEventTypeId : ''],
      programGroupId: [event !== undefined ? event.programGroupId : ''],
    });
  }
  back() {
    this.router.navigate(['admin/program/programGroupList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemService.deleteProgramGroupById(this.id).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/program/programGroupList'], { queryParams: { 'force': true } });
        }));
    }
  }

  save() {
    if (this.programGroupForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemService.updateProgramGroup(this.id, this.programGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadProgramGroupById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveProgramGroup(this.programGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.scrollTop();
            this.loadProgramGroupById();
          }));
      }
    } else {
      this.validateAllFormFields(this.programGroupForm);
      this.validateForm();
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  validateForm() {
    for (const key of Object.keys(this.programGroupForm.controls)) {
      if (this.programGroupForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  get f() { return this.programGroupForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
