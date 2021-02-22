import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FactorRoutingModule } from './factor-routing.module';
import { FactorListComponent } from './factor-list/factor-list.component';
import { FactorEditComponent } from './factor-edit/factor-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule, Store } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';

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
    FactorRoutingModule
  ],
  declarations: [FactorListComponent, FactorEditComponent],
  providers: [SystemService, SystemUtilityService, DatePipe]
})
export class FactorModule { }
