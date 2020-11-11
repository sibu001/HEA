import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProspectsRoutingModule } from './prospects-routing.module';
import { ProspectsListComponent } from './prospects-list/prospects-list.component';
import { ProspectsEditComponent } from './prospects-edit/prospects-edit.component';
import { AdministrativeService } from 'src/app/store/administrative-state-management/service/administrative.service';
import { AdministrativeManagementState } from 'src/app/store/administrative-state-management/state/administrative.state';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommonHEAModule } from 'src/app/common/common.module';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { MAT_DIALOG_DATA } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ProspectsRoutingModule,
    CommonHEAModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      AdministrativeManagementState
    ]),
  ],
  declarations: [ProspectsListComponent, ProspectsEditComponent],
  providers: [AdministrativeService,{ provide: MAT_DIALOG_DATA, useValue: {} }],
  entryComponents: [ProspectsEditComponent]
})
export class ProspectsModule { }
