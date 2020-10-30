import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceRoutingModule } from './place-routing.module';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ZipCodeEditComponent } from './zip-code-edit/zip-code-edit.component';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';

@NgModule({
  imports: [
    CommonModule,
    PlaceRoutingModule,
    CommonHEAModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState
    ]),
  ],
  declarations: [PlaceListComponent, PlaceEditComponent, ZipCodeEditComponent],
  entryComponents: [ZipCodeEditComponent],
  providers: [SystemUtilityService]
})
export class PlaceModule { }
