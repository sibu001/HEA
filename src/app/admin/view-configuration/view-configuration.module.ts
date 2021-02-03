import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ViewConfigurationRoutingModule } from './view-configuration-routing.module';
import { ViewConfigurationListComponent } from './view-configuration-list/view-configuration-list.component';
import { ViewConfigurationEditComponent } from './view-configuration-edit/view-configuration-edit.component';
import { ViewConfigurationAttributesComponent } from './view-configuration-attributes/view-configuration-attributes.component';
import { ViewConfigurationAttributesEditComponent } from './view-configuration-attributes-edit/view-configuration-attributes-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { DynamicViewManagementState } from 'src/app/store/dynamic-view-state-management/state/dynamic-view.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    ViewConfigurationRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      DynamicViewManagementState,
      TopicManagementState
    ]),
  ],
  providers: [SystemService, DatePipe, LoginService, SystemUtilityService,
    CustomerService, DynamicViewService, TopicService],
  declarations: [ViewConfigurationListComponent, ViewConfigurationEditComponent, ViewConfigurationAttributesComponent, ViewConfigurationAttributesEditComponent]
})
export class ViewConfigurationModule { }
