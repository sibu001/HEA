import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerAlertTypesRoutingModule } from './customer-alert-types-routing.module';
import { CustomerAlertTypeListComponent } from './customer-alert-type-list/customer-alert-type-list.component';
import { CustomerAlertTypeEditComponent } from './customer-alert-type-edit/customer-alert-type-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommonHEAModule } from 'src/app/common/common.module';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonHEAModule,
    CustomerAlertTypesRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
  ],
  declarations: [CustomerAlertTypeListComponent, CustomerAlertTypeEditComponent],
  providers: [SystemService, SystemUtilityService]
})
export class CustomerAlertTypesModule { }
