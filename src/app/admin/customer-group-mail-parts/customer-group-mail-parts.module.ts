import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerGroupMailPartsRoutingModule } from './customer-group-mail-parts-routing.module';
import { CustomerGroupMailPartsListComponent } from './customer-group-mail-parts-list/customer-group-mail-parts-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerGroupMailPartsEditComponent } from './customer-group-mail-parts-edit/customer-group-mail-parts-edit.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { DynamicViewManagementState } from 'src/app/store/dynamic-view-state-management/state/dynamic-view.state';
import { MailManagementState } from 'src/app/store/mail-state-management/state/mail.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    FormsModule,
    CustomerGroupMailPartsRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      DynamicViewManagementState,
      MailManagementState,
      SystemUtilityManagementState
    ]),
  ],
  declarations: [CustomerGroupMailPartsListComponent, CustomerGroupMailPartsEditComponent],
  providers: [SystemService, DynamicViewService, MailService, SystemUtilityService]
})
export class CustomerGroupMailPartsModule { }
