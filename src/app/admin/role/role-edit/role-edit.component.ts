import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {


  roleForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly location: Location) { }

  ngOnInit() {
    this.setForm(undefined);
  }

  setForm(event: any) {
    this.roleForm = this.fb.group({
      roleCode: [event !== undefined ? event.roleCode : ''],
      description: [event !== undefined ? event.description : '']
    });
  }
  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    // SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
