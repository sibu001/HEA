
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit, OnDestroy {

  public id: any;
  roleForm: FormGroup;
 isForce = false;
  private readonly subscriptions: Subscription = new Subscription();

  constructor(private readonly fb: FormBuilder,
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
      this.systemService.loadRoleById(Number(this.id));
      this.loadRoleById();
    }
  }

  loadRoleById() {
    this.subscriptions.add(this.systemService.getRoleById().pipe(skipWhile((item: any) => !item))
      .subscribe((role: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/role/roleEdit'], { queryParams: { 'id': role.id } });
        }
        this.setForm(role);
      }));
  }

  setForm(event: any) {
    this.roleForm = this.formBuilder.group({
        id: [this.id !== undefined ? this.id : undefined],
      roleCode: [event !== undefined ? event.roleCode : '', Validators.required],
      description: [event !== undefined ? event.description : '']
    });
  }

  back() {
    this.router.navigate(['admin/role/roleList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.systemService.deleteRoleById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/role/roleList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.roleForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemService.updateRole(this.id, this.roleForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadRoleById();
          }));
      } else {
        this.subscriptions.add(this.systemService.saveRole(this.roleForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadRoleById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.roleForm.controls)) {
      if (this.roleForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }
  get f() { return this.roleForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
