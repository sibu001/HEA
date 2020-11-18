import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-view-configuration-attributes-edit',
  templateUrl: './view-configuration-attributes-edit.component.html',
  styleUrls: ['./view-configuration-attributes-edit.component.css']
})
export class ViewConfigurationAttributesEditComponent implements OnInit {

  id: any;
  configForm: FormGroup;
  attributeTypeData = TableColumnData.ATTRIBUTE_TYPE_DATA;
  definitionData = TableColumnData.DEFINITION_DATA;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }


  ngOnInit() {

    this.setForm(undefined);
    if (this.id !== undefined) {
    }
  }

  setForm(event: any) {
    this.configForm = this.formBuilder.group({
      columnOrder: [event !== undefined ? event.columnOrder : ''],
      attributeType: [event !== undefined ? event.attributeType : ''],
      definition: [event !== undefined ? event.definition : ''],
      label: [event !== undefined ? event.label : '', Validators.required],
      sortAllowed: [event !== undefined ? event.sortAllowed : ''],
      valueType: [event !== undefined ? event.valueType : ''],
    });
  }
  back() {
    this.location.back();
  }

  save(): any { }

  delete(): any { }

  goToAttributeList(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeList'], { queryParams: { id: this.id } });
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
