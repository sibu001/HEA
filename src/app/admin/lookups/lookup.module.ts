import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupRoutingModule } from './lookup-routing.module';
import { LookupListComponent } from './lookup-list/lookup-list.component';
import { LookupEditComponent } from './lookup-edit/lookup-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule, Store } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
    LookupRoutingModule
  ],
  declarations: [LookupListComponent, LookupEditComponent]
  , providers: [SystemService]
})
export class LookupModule { }
