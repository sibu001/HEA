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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonHEAModule,
    CustomerGroupRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
  ],
  declarations: [CustomerGroupListComponent, CustomerGroupEditComponent],
  providers: [SystemService]
})
export class CustomerGroupModule { }
