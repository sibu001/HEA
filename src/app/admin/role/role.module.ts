import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    CommonHEAModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
  ],
  declarations: [RoleEditComponent, RoleListComponent],
  providers: [SystemService]
})
export class RoleModule { }
