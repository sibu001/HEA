import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { JsPagesRoutingModule } from './js-pages-routing.module';
import { JsPagesListComponent } from './js-pages-list/js-pages-list.component';
import { JsPagesEditComponent } from './js-pages-edit/js-pages-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { JsPagesPreviewComponent } from './js-pages-preview/js-pages-preview.component';
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { DynamicViewManagementState } from 'src/app/store/dynamic-view-state-management/state/dynamic-view.state';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { PipeModule } from 'src/app/pipes/pipe/pipe.module';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonHEAModule,
    CodemirrorModule,
    ReactiveFormsModule,
    JsPagesRoutingModule,
    PipeModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      SystemUtilityManagementState,
      DynamicViewManagementState,
      TopicManagementState
    ]),
  ],
  providers: [
    SystemService,
    DatePipe,
    LoginService,
    SystemUtilityService,
    CustomerService,
    DynamicViewService,
    TopicService
  ],
  declarations: [
    JsPagesListComponent,
    JsPagesEditComponent,
    JsPagesPreviewComponent,
  ],

})
export class JsPagesModule { }
