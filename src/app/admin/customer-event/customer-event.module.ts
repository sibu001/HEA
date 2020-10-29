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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonHEAModule,
    CustomerEventRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
  ],
  declarations: [CustomerEventListComponent, CustomerEventEditComponent],
  providers: [SystemService]
})
export class CustomerEventModule { }
