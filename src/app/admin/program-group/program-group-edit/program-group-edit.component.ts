import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';
import { Location } from '@angular/common';

@Component({
  selector: 'app-program-group-edit',
  templateUrl: './program-group-edit.component.html',
  styleUrls: ['./program-group-edit.component.css']
})
export class ProgramGroupEditComponent implements OnInit, OnDestroy {
  programGroupForm: FormGroup;
  id: any;
  isForce = false;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemService.loadProgramGroupById(Number(this.id));
      this.loadProgramGroupById();
    }
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
    this.subscriptions.add(this.systemService.deleteProgramGroupById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/program/programGroupList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.programGroupForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemService.updateProgramGroup(this.id, this.programGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadProgramGroupById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveProgramGroup(this.programGroupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadProgramGroupById();
          }));
      }
    } else {
      this.validateForm();
    }
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
  get f() { return this.programGroupForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
