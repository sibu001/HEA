import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramGroupRoutingModule } from './program-group-routing.module';
import { ProgramGroupListComponent } from './program-group-list/program-group-list.component';
import { ProgramGroupEditComponent } from './program-group-edit/program-group-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CommonHEAModule,
    ProgramGroupRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
  ],
  declarations: [ProgramGroupListComponent, ProgramGroupEditComponent],
  providers: [SystemService]
})
export class ProgramGroupModule { }
