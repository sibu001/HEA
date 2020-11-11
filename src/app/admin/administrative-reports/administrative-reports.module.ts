import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeReportsRoutingModule } from './administrative-reports-routing.module';
import { AdministrativeReportsListComponent } from './administrative-reports-list/administrative-reports-list.component';
import { AdministrativeReportsEditComponent } from './administrative-reports-edit/administrative-reports-edit.component';
import { AdministrativeReportsCallComponent } from './administrative-reports-call/administrative-reports-call.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule } from '@ngxs/store';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { AdministrativeManagementState } from 'src/app/store/administrative-state-management/state/administrative.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    AdministrativeReportsRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      AdministrativeManagementState
    ]),
  ],
  declarations: [
    AdministrativeReportsListComponent,
    AdministrativeReportsEditComponent,
    AdministrativeReportsCallComponent]
})
export class AdministrativeReportsModule { }
