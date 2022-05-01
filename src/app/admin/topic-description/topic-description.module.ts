import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicDescriptionRoutingModule } from './topic-description-routing.module';
import { TopicDescriptionListComponent } from './topic-description-list/topic-description-list.component';
import { TopicDescriptionEditComponent } from './topic-description-edit/topic-description-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonHEAModule } from 'src/app/common/common.module';
import { NgxsModule } from '@ngxs/store';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { TopicDescriptionPaneComponent } from './topic-description-pane/topic-description-pane.component';
import { TopicDescriptionRecommendationEditComponent } from './topic-description-recommendation-edit/topic-description-recommendation-edit.component';
import { TopicDescriptionVariableEditComponent } from './topic-description-variable-edit/topic-description-variable-edit.component';
import { TopicPaneDataBlockEditComponent } from './topic-pane-data-block-edit/topic-pane-data-block-edit.component';
import { TopicPaneDataFieldEditComponent } from './topic-pane-data-field-edit/topic-pane-data-field-edit.component';
import { TopicPaneChartsEditComponent } from './topic-pane-charts-edit/topic-pane-charts-edit.component';
import { TopicPaneReportsEditComponent } from './topic-pane-reports-edit/topic-pane-reports-edit.component';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { LoginService } from 'src/app/services/login.service';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    RichTextEditorModule,
    TopicDescriptionRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      TopicManagementState
    ]),
  ],
  declarations: [TopicDescriptionListComponent,
    TopicDescriptionEditComponent,
    TopicDescriptionPaneComponent,
    TopicDescriptionRecommendationEditComponent,
    TopicDescriptionVariableEditComponent,
    TopicPaneDataBlockEditComponent,
    TopicPaneDataFieldEditComponent,
    TopicPaneChartsEditComponent,
    TopicPaneReportsEditComponent],
  providers: [SystemService, TopicService, LoginService]
})
export class TopicDescriptionModule { }
