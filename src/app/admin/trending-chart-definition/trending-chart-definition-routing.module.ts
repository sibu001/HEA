import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingChartDefinitionEditComponent } from './trending-chart-definition-edit/trending-chart-definition-edit.component';
import { TrendingChartDefinitionListComponent } from './trending-chart-definition-list/trending-chart-definition-list.component';
import { TrendingChartDefinitionSeriesComponent } from './trending-chart-definition-series/trending-chart-definition-series.component';
import { TrendingChartEditComponent } from './trending-chart-edit/trending-chart-edit.component';

const routes: Routes = [
  { path: 'trendingChartDefinitionList', component: TrendingChartDefinitionListComponent },
  { path: 'trendingChartDefinitionEdit', component: TrendingChartDefinitionEditComponent },
  { path: 'trendingChartDefinitionSeries', component: TrendingChartDefinitionSeriesComponent },
  { path: 'trendingChartEdit', component: TrendingChartEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendingChartDefinitionRoutingModule { }
