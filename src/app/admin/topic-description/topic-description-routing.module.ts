import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopicDescriptionEditComponent } from './topic-description-edit/topic-description-edit.component';
import { TopicDescriptionListComponent } from './topic-description-list/topic-description-list.component';
import { TopicDescriptionPaneComponent } from './topic-description-pane/topic-description-pane.component';
import {
  TopicDescriptionRecommendationEditComponent
} from './topic-description-recommendation-edit/topic-description-recommendation-edit.component';
import { TopicDescriptionVariableEditComponent } from './topic-description-variable-edit/topic-description-variable-edit.component';
import { TopicPaneChartSeriesComponent } from './topic-pane-chart-series/topic-pane-chart-series.component';
import { TopicPaneChartsEditComponent } from './topic-pane-charts-edit/topic-pane-charts-edit.component';
import { TopicPaneDataBlockEditComponent } from './topic-pane-data-block-edit/topic-pane-data-block-edit.component';
import { TopicPaneDataFieldEditComponent } from './topic-pane-data-field-edit/topic-pane-data-field-edit.component';
import { TopicPaneReportsEditComponent } from './topic-pane-reports-edit/topic-pane-reports-edit.component';

const routes: Routes = [
  { path: 'topicDescriptionList', component: TopicDescriptionListComponent },
  { path: 'topicDescriptionEdit', component: TopicDescriptionEditComponent },
  { path: 'topicDescriptionPaneEdit', component: TopicDescriptionPaneComponent },
  { path: 'topicDescriptionRecommendationEdit', component: TopicDescriptionRecommendationEditComponent },
  { path: 'topicDescriptionVariableEdit', component: TopicDescriptionVariableEditComponent },
  { path: 'topicPaneDataBlockEdit', component: TopicPaneDataBlockEditComponent },
  { path: 'topicPaneDataFieldEdit', component: TopicPaneDataFieldEditComponent },
  { path: 'topicPaneChartEdit', component: TopicPaneChartsEditComponent },
  { path: 'topicPaneReportEdit', component: TopicPaneReportsEditComponent },
  { path: 'topicPaneChartSeriesEdit', component: TopicPaneChartSeriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicDescriptionRoutingModule { }
