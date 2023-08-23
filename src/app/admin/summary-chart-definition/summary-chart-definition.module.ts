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
      TopicManagementState
    ])
  ],
  declarations: [SummaryChartDefinitionListComponent,
    SummaryChartDefinitionEditComponent,
    SummaryChartDefinitionSeriesComponent,
  ],
  providers : [SummaryChartDefinationService, TopicService ]
})
export class SummaryChartDefinitionModule { }
