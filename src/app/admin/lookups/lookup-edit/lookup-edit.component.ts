import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-lookup-edit',
  templateUrl: './lookup-edit.component.html',
  styleUrls: ['./lookup-edit.component.css']
})
export class LookupEditComponent implements OnInit, OnDestroy {

  id: any;
  lookupForm: FormGroup;
  isForce = false;
  userId: any;
  lookupValueData = {
    content: [],
    totalElements: 0
  };

  lookupValueDataSource: any = [];
  lookupValueKey: Array<TABLECOLUMN> = TableColumnData.LOOKUP_VALUE_KEYS;
  private readonly subscriptions: Subscription = new Subscription();
  toggleSaveButton: Boolean = true;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly el: ElementRef) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.userId = users.userId;
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.systemUtilityService.loadLookupById(this.id);
      this.loadLookupById();
    }
  }

  setForm(event: any) {
    this.lookupForm = this.formBuilder.group({
      lookupCode: [event !== undefined ? event.lookupCode : ''],
      lookupName: [event !== undefined ? event.lookupName : ''],
      defaultValue: [event !== undefined ? event.defaultValue : ''],
    });
  }
  goToDebug() {

  }
  recalculate() {

  }

  loadLookupById() {
    this.subscriptions.add(this.systemUtilityService.getLookupById().pipe(skipWhile((item: any) => !item))
      .subscribe((lookup: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/lookup/lookupEdit'], { queryParams: { 'id': lookup.id } });
        }
        this.setForm(lookup);
      }));
  }

  back() {
    this.router.navigate(['admin/lookup/lookupList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.systemUtilityService.deleteLookupById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/lookup/lookupList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.lookupForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.systemUtilityService.updateLookup(this.id, this.lookupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadLookupById();
          }));
      } else {
        this.subscriptions.add(this.systemUtilityService.saveLookup(this.lookupForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadLookupById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.lookupForm.controls)) {
      if (this.lookupForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  saveLookup(event: FormGroup): any {
    console.log(event);
  }

  toggleSaveButtonEvent(): any {
    this.toggleSaveButton = !this.toggleSaveButton;
  }

  get f() { return this.lookupForm.controls; }


  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
