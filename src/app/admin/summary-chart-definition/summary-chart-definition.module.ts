import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryChartDefinitionRoutingModule } from './summary-chart-definition-routing.module';
import { SummaryChartDefinitionListComponent } from './summary-chart-definition-list/summary-chart-definition-list.component';
import { SummaryChartDefinitionEditComponent } from './summary-chart-definition-edit/summary-chart-definition-edit.component';
import { SummaryChartDefinitionSeriesComponent } from './summary-chart-definition-series/summary-chart-definition-series.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { SummaryChartDefinationService } from 'src/app/store/summary-chart-defination-management/service/summary-chart-defination.service';
import { NgxsModule } from '@ngxs/store';
import { SummaryChartDefinationState } from 'src/app/store/summary-chart-defination-management/state/summary-chart-defination.state';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SummaryChartDefinationCopyComponent } from './summary-chart-defination-copy/summary-chart-defination-copy.component';
import { SummaryChartDefinationPreviewComponent } from './summary-chart-defination-preview/summary-chart-defination-preview.component';
import { SystemManagementState } from 'src/app/store/system-state-management/state/system.state';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SystemUtilityManagementState } from 'src/app/store/system-utility-state-management/state/system-utility.state';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { LoginService } from 'src/app/services/login.service';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { CustomerService } from 'src/app/store/customer-state-management/service/customer.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    SummaryChartDefinitionRoutingModule,
    NgxsModule.forRoot([
      SummaryChartDefinationState,
      TopicManagementState,
      SystemManagementState,
      SystemUtilityManagementState,
      CustomerManagementState
    ])
  ],
  declarations: [SummaryChartDefinitionListComponent,
    SummaryChartDefinitionEditComponent,
    SummaryChartDefinitionSeriesComponent,
    SummaryChartDefinationCopyComponent,
    SummaryChartDefinationPreviewComponent
  ],
  providers : [SummaryChartDefinationService, TopicService, SystemService, SystemUtilityService
    , LoginService, CustomerService,{ provide: MAT_DIALOG_DATA, useValue: {} } ],
  entryComponents : [SummaryChartDefinationCopyComponent]
})
export class SummaryChartDefinitionModule { }
