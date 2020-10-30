import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerComparisonGroupsRoutingModule } from './customer-comparison-groups-routing.module';
import { CustomerComparisonGroupsListComponent } from './customer-comparison-groups-list/customer-comparison-groups-list.component';
import { CustomerComparisonGroupsAddComponent } from './customer-comparison-groups-add/customer-comparison-groups-add.component';
import {
  CustomerComparisonGroupsBatchAddComponent
} from './customer-comparison-groups-batch-add/customer-comparison-groups-batch-add.component';
import {
  CustomerComparisonGroupsBatchRemoveComponent
} from './customer-comparison-groups-batch-remove/customer-comparison-groups-batch-remove.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { NgxsModule } from '@ngxs/store';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
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
    CustomerComparisonGroupsRoutingModule
  ],
  declarations: [
    CustomerComparisonGroupsListComponent,
    CustomerComparisonGroupsAddComponent,
    CustomerComparisonGroupsBatchAddComponent,
    CustomerComparisonGroupsBatchRemoveComponent
  ],
  providers: [SystemService, SystemUtilityService]
})
export class CustomerComparisonGroupsModule { }
