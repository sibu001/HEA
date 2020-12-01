import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerGroupRoutingModule } from './customer-group-routing.module';
import { CustomerGroupListComponent } from './customer-group-list/customer-group-list.component';
import { CustomerGroupEditComponent } from './customer-group-edit/customer-group-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { DynamicViewManagementState } from 'src/app/store/dynamic-view-state-management/state/dynamic-view.state';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { MailManagementState } from 'src/app/store/mail-state-management/state/mail.state';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonHEAModule,
    CustomerGroupRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      DynamicViewManagementState,
      MailManagementState
    ]),
  ],
  declarations: [CustomerGroupListComponent, CustomerGroupEditComponent],
  providers: [SystemService, DynamicViewService, MailService]
})
export class CustomerGroupModule { }
