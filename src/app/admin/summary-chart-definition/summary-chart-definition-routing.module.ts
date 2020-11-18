import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryChartDefinitionEditComponent } from './summary-chart-definition-edit/summary-chart-definition-edit.component';
import { SummaryChartDefinitionListComponent } from './summary-chart-definition-list/summary-chart-definition-list.component';
import { SummaryChartDefinitionSeriesComponent } from './summary-chart-definition-series/summary-chart-definition-series.component';

const routes: Routes = [
  { path: 'summaryChartDefinitionList', component: SummaryChartDefinitionListComponent },
  { path: 'summaryChartDefinitionEdit', component: SummaryChartDefinitionEditComponent },
  { path: 'summaryChartDefinitionSeries', component: SummaryChartDefinitionSeriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryChartDefinitionRoutingModule { }
