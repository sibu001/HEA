import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerEventRoutingModule } from './customer-event-routing.module';
import { CustomerEventListComponent } from './customer-event-list/customer-event-list.component';
import { CustomerEventEditComponent } from './customer-event-edit/customer-event-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonHEAModule,
    CustomerEventRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
  ],
  declarations: [CustomerEventListComponent, CustomerEventEditComponent],
  providers: [SystemService, SystemUtilityService]
})
export class CustomerEventModule { }
