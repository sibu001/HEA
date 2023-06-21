import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skip, skipWhile, take, tap } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-view-configuration-attributes-edit',
  templateUrl: './view-configuration-attributes-edit.component.html',
  styleUrls: ['./view-configuration-attributes-edit.component.css']
})
export class ViewConfigurationAttributesEditComponent implements OnInit, OnDestroy {

  id: any;
  public viewConfigurationId : number;
  public attributeData : any;
  attributeForm: FormGroup;
  isForce = false;
  attributeTypeData = TableColumnData.ATTRIBUTE_TYPE_DATA;
  definitionData : Array<any> = [];
  public baseEntities : Array<any> = TableColumnData.BASE_ENTITIES;

  valueTypeList: any[] = TableColumnData.VALUE_TYPE;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly el: ElementRef) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.viewConfigurationId = params['viewConfigurationId'];
      
    });
  }

  ngOnInit() {
    AppUtility.scrollTop();
    this.setForm(undefined);
    this.getDefinationsForAttributeType();

    if (this.id) {
      this.dynamicViewService.loadAttributeById(this.id);
      this.getAttributeById();
    }else{
      this.onAttributeTypeChange('C',true);
    }
  }

  setForm(event: any) {
    this.attributeForm = this.formBuilder.group({
      columnOrder: [event !== undefined ? event.columnOrder : '0'],
      attributeType: [event !== undefined ? event.attributeType : 'C'],
      definition: [event !== undefined ? event.definition : 'customerId'],
      label: [event !== undefined ? event.label : '', Validators.required],
      sortAllowed: [event !== undefined ? event.sortAllowed : ''],
      valueType: [event !== undefined ? event.valueType : 'C'],
      pattern: [event !== undefined ? event.pattern : ''],
    });
  }


  goToAttributeList(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeList'], { queryParams: { id: this.id } });
  }

  getAttributeById() {
    this.subscriptions.add(this.dynamicViewService.getAttributeById()
    .pipe(filter((item: any) => item && item.id == this.id))
      .subscribe((attribute: any) => {
        this.setForm(attribute);
        this.attributeData = {...attribute};
        this.onAttributeTypeChange(this.attributeData.attributeType, !['S', 'V'].includes(this.attributeData.attributeType));
        AppUtility.scrollTop();
      }));
  }

  back() {
    this.router.navigate(['admin/viewConfiguration/viewConfigurationAttributeList'], 
    { queryParams: { 'force': this.isForce , viewConfigurationId : this.viewConfigurationId} });
  }

  delete() {
    this.subscriptions.add(
      this.dynamicViewService.deleteAttributeById(this.id)
      .pipe(filter((item: any) => item),take(1))
      .subscribe((response: any) => {
        this.isForce = true;
        this.back();
      }));
  }

  save() {

    if (AppUtility.validateAndHighlightReactiveFrom(this.attributeForm)) {

      if (this.id) {
        const requestBody = { ...this.attributeData, ...this.attributeForm.value };
        this.subscriptions.add(this.dynamicViewService.updateAttribute(this.id, requestBody).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.isForce = true;
          }));

      } else {

        const requestBody = {...this.attributeForm.value};
        requestBody.viewConfigurationId = this.viewConfigurationId;

        this.subscriptions.add(this.dynamicViewService.saveAttribute(requestBody).pipe(
          filter((item: any) => item),take(1))
          .subscribe((response: any) => {
            this.isForce = true;
            this.id = response.dynamicViewManagement.attribute.id;
            AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
            this.getAttributeById();
            
          }));

      }

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

  onDefinationChange(event : any){
    const definition : any = this.definitionData.find(defination => defination.key == event);
    if(definition){
      this.attributeForm.patchValue({ label : definition.value});
    }
  }

  onAttributeTypeChange(attributeType : string, checkAvaliableOptions : boolean) : void{

    if(!checkAvaliableOptions) return;

    const baseEntity : string = this.baseEntities[0].key;
    this.loadDefinationsForAttributeType(attributeType, baseEntity);
  }

  loadDefinationsForAttributeType(attributeType : string , baseEntity ?: string) : void {
    this.dynamicViewService.loadDefinationsForAttributeTypeAndBaseEntity(attributeType, baseEntity)
  }

  getDefinationsForAttributeType() : void {
    this.subscriptions.add(
      this.dynamicViewService.getDefinationsForAttributeTypeAndBaseEntity()
      .pipe(filter( data => data != undefined),
        tap((response : any ) =>{ this.definitionData = response.viewAttributeItems; },
        skip(1)))
      .subscribe((response : any) =>{
     
        if(this.definitionData.length > 0 ){
          this.attributeForm.patchValue({ definition : this.definitionData[0].definition });
        }

      }));
  }

  highlightErrorField(formControlName : string) : boolean{
    return AppUtility.showErrorMessageOnErrorField(this.f,formControlName);
  }

  get f() { return this.attributeForm.controls; }

  get form() { return this.attributeForm.value; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
