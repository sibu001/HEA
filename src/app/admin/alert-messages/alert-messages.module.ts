import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertMessagesRoutingModule } from './alert-messages-routing.module';
import { AlertMessagesListComponent } from './alert-messages-list/alert-messages-list.component';
import { AlertMessagesEditComponent } from './alert-messages-edit/alert-messages-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    AlertMessagesRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
  ],
  declarations: [AlertMessagesListComponent, AlertMessagesEditComponent],
  entryComponents: [AlertMessagesEditComponent],
  providers: [SystemMeasurementService]

})
export class AlertMessagesModule { }
