import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerGroupMailPartsRoutingModule } from './customer-group-mail-parts-routing.module';
import { CustomerGroupMailPartsListComponent } from './customer-group-mail-parts-list/customer-group-mail-parts-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerGroupMailPartsEditComponent } from './customer-group-mail-parts-edit/customer-group-mail-parts-edit.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    FormsModule,
    CustomerGroupMailPartsRoutingModule
  ],
  declarations: [CustomerGroupMailPartsListComponent, CustomerGroupMailPartsEditComponent]
})
export class CustomerGroupMailPartsModule { }
