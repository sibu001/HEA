import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryChartDefinitionRoutingModule } from './summary-chart-definition-routing.module';
import { SummaryChartDefinitionListComponent } from './summary-chart-definition-list/summary-chart-definition-list.component';
import { SummaryChartDefinitionEditComponent } from './summary-chart-definition-edit/summary-chart-definition-edit.component';
import { SummaryChartDefinitionSeriesComponent } from './summary-chart-definition-series/summary-chart-definition-series.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    SummaryChartDefinitionRoutingModule
  ],
  declarations: [SummaryChartDefinitionListComponent,
    SummaryChartDefinitionEditComponent,
    SummaryChartDefinitionSeriesComponent,
  ]
})
export class SummaryChartDefinitionModule { }
