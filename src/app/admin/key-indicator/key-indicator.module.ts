import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyIndicatorRoutingModule } from './key-indicator-routing.module';
import { KeyIndicatorListComponent } from './key-indicator-list/key-indicator-list.component';
import { KeyIndicatorEditComponent } from './key-indicator-edit/key-indicator-edit.component';
import { KeyIndicatorVariableComponent } from './key-indicator-variable/key-indicator-variable.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { MailManagementState } from 'src/app/store/mail-state-management/state/mail.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { MailService } from 'src/app/store/mail-state-management/service/mail.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
import { TrendingDefinitionState } from 'src/app/store/trending-defination-state-management/state/trending-definition.state';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    KeyIndicatorRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      MailManagementState,
      TopicManagementState,
      TrendingDefinitionState
    ]),
  ],
  declarations: [KeyIndicatorListComponent, KeyIndicatorEditComponent, KeyIndicatorVariableComponent],
  providers: [SystemService, MailService, CustomerService, TopicService, TrendingDefinitionService],
})
export class KeyIndicatorModule { }
