import { SystemManagementState } from './../../store/system-state-management/state/system.state';
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
import { NgxsModule } from '@ngxs/store';
import { CustomerManagementState } from 'src/app/store/customer-state-management/state/customer.state';
import { TopicManagementState } from 'src/app/store/topic-state-management/state/topic.state';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    RichTextEditorModule,
    TrendingChartDefinitionRoutingModule,
    NgxsModule.forRoot([
      SystemManagementState,
      CustomerManagementState,
      TopicManagementState
    ]),
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
