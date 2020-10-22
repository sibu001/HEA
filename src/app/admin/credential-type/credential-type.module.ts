import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialTypeRoutingModule } from './credential-type-routing.module';
import { CredentialTypeListComponent } from './credential-type-list/credential-type-list.component';
import { CredentialTypeEditComponent } from './credential-type-edit/credential-type-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommonHEAModule } from 'src/app/common/common.module';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonHEAModule,
    CredentialTypeRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
  ],
  declarations: [CredentialTypeListComponent, CredentialTypeEditComponent],
  providers: [SystemService]
})
export class CredentialTypeModule { }
