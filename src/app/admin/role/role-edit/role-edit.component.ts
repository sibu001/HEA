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

  roleForm: FormGroup;
  roleCode: any;
  isForce = false;
  userId: any;
  private readonly subscriptions: Subscription = new Subscription();

  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemService: SystemService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.userId = users.userId;
    this.systemService.loadRoleList(true, this.userId);
    this.activateRoute.queryParams.subscribe(params => {
      this.roleCode = params['roleCode'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.roleCode) {
      this.loadRoleById();
    }
  }

  loadRoleById() {
    this.systemService.loadRoleById(this.roleCode);
    this.subscriptions.add(this.systemService.getRoleById().pipe(skipWhile((item: any) => !item))
      .subscribe((role: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/role/roleEdit'], { queryParams: { 'roleCode': role.roleCode } });
        }
        this.setForm(role.data);
      }, error => {
        console.log(error);
      }));
  }

  setForm(event: any) {
    this.roleForm = this.formBuilder.group({
      roleCode: [event !== undefined ? event.roleCode : '', Validators.required],
      description: [event !== undefined ? event.description : ''],
      id: [event !== undefined ? event.id : null],
      permanent: [event !== undefined ? event.permanent : true],
    });
  }

  back() {
    this.router.navigate(['admin/role/roleList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.subscriptions.add(this.systemService.deleteRoleById(this.roleCode).pipe(skipWhile((item: any) => !item))
        .subscribe((response: any) => {
          this.router.navigate(['admin/role/roleList'], { queryParams: { 'force': true } });
        }));
    }
  }

  save() {
    if (this.roleForm.valid) {
      if (this.roleCode !== null && this.roleCode !== undefined) {
        this.roleForm.value.id = this.roleForm.value.roleCode;
        this.subscriptions.add(this.systemService.updateRole(this.roleCode, this.roleForm.value).pipe(
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
