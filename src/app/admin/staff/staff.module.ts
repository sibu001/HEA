import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommonHEAModule } from 'src/app/common/common.module';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';

@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
  ],
  declarations: [StaffListComponent, StaffEditComponent],
  providers: [SystemService, SystemUtilityService, CustomerService]
})
export class StaffModule { }
