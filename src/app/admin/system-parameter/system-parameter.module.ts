import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemParameterRoutingModule } from './system-parameter-routing.module';
import { SystemParameterListComponent } from './system-parameter-list/system-parameter-list.component';
import { SystemParameterEditComponent } from './system-parameter-edit/system-parameter-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule, Store } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
    SystemParameterRoutingModule
  ],
  declarations: [SystemParameterListComponent, SystemParameterEditComponent]
  , providers: [SystemService]
})
export class SystemParameterModule { }
