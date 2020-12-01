import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-view-configuration-attributes-edit',
  templateUrl: './view-configuration-attributes-edit.component.html',
  styleUrls: ['./view-configuration-attributes-edit.component.css']
})
export class ViewConfigurationAttributesEditComponent implements OnInit, OnDestroy {

  id: any;
  attributeForm: FormGroup;
  isForce = false;
  attributeTypeData = TableColumnData.ATTRIBUTE_TYPE_DATA;
  definitionData = TableColumnData.DEFINITION_DATA;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.setForm(undefined);
    if (this.id !== undefined) {
      this.dynamicViewService.loadDynamicViewById(this.id);
      this.loadAttributeById();
    }
  }

  setForm(event: any) {
    this.attributeForm = this.formBuilder.group({
      columnOrder: [event !== undefined ? event.columnOrder : ''],
      attributeType: [event !== undefined ? event.attributeType : ''],
      definition: [event !== undefined ? event.definition : ''],
      label: [event !== undefined ? event.label : '', Validators.required],
      sortAllowed: [event !== undefined ? event.sortAllowed : ''],
      valueType: [event !== undefined ? event.valueType : ''],
    });
  }


  goToAttributeList(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeList'], { queryParams: { id: this.id } });
  }

  loadAttributeById() {
    this.subscriptions.add(this.dynamicViewService.getDynamicViewById().pipe(skipWhile((item: any) => !item))
      .subscribe((attribute: any) => {
        if (this.isForce) {
          this.router.navigate(['admin/viewConfiguration/viewConfigurationEdit'], { queryParams: { 'id': attribute.id } });
        }
        this.setForm(attribute);
      }));
  }

  back() {
    this.router.navigate(['admin/viewConfiguration/viewConfigurationAttributeList'], { queryParams: { 'force': this.isForce } });
  }
  delete() {
    this.subscriptions.add(this.dynamicViewService.deleteDynamicViewById(this.id).pipe(skipWhile((item: any) => !item))
      .subscribe((response: any) => {
        this.router.navigate(['admin/viewConfiguration/viewConfigurationAttributeList'], { queryParams: { 'force': true } });
      }));
  }

  save() {
    if (this.attributeForm.valid) {
      if (this.id !== null && this.id !== undefined) {
        this.subscriptions.add(this.dynamicViewService.updateDynamicView(this.id, this.attributeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadAttributeById();
          }));
      } else {
        this.subscriptions.add(this.dynamicViewService.saveDynamicView(this.attributeForm.value).pipe(
          skipWhile((item: any) => !item))
          .subscribe((response: any) => {
            this.isForce = true;
            this.loadAttributeById();
          }));
      }
    } else {
      this.validateForm();
    }
  }
  validateForm() {
    for (const key of Object.keys(this.attributeForm.controls)) {
      if (this.attributeForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
  }

  get f() { return this.attributeForm.controls; }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
