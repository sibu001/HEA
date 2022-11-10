import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TrendingChartDefinitionRoutingModule
} from './trending-chart-definition-routing.module';

import {
  TrendingChartDefinitionListComponent
} from './trending-chart-definition-list/trending-chart-definition-list.component';
import {
  TrendingChartDefinitionEditComponent
} from './trending-chart-definition-edit/trending-chart-definition-edit.component';
import {
  TrendingChartDefinitionSeriesComponent
} from './trending-chart-definition-series/trending-chart-definition-series.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrendingChartEditComponent } from './trending-chart-edit/trending-chart-edit.component';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    RichTextEditorModule,
    TrendingChartDefinitionRoutingModule
  ],
  declarations: [
    TrendingChartDefinitionListComponent,
    TrendingChartDefinitionEditComponent,
    TrendingChartDefinitionSeriesComponent,
    TrendingChartEditComponent
  ],
  providers: [HtmlEditorService, ImageService, LinkService, ToolbarService]

})
export class TrendingChartDefinitionModule { }
