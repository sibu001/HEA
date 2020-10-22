import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { environment } from 'src/environments/environment';
import { CustomerEventComponent } from './customer-event/customer-event.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    CommonHEAModule,
    MatDialogModule,
    DragDropModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapAPIKey
    }),
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState
    ]),
  ],
  declarations: [
    CustomerListComponent,
    CustomerViewComponent,
    CustomerEventComponent
  ],
  providers: [SystemService, CustomerService],
  entryComponents: [CustomerEventComponent]
})
export class CustomerModule { }
