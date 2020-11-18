import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-trending-chart-definition-list',
  templateUrl: './trending-chart-definition-list.component.html',
  styleUrls: ['./trending-chart-definition-list.component.css']
})
export class TrendingChartDefinitionListComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN>= TableColumnData.TRENDING_PART_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public data = {
    content: [],
    totalElements: 0,
  };
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.findTrendingChart();
  }

  findTrendingChart(event?: any): any {

  }

  goToEditTrendingChart(event: any): any {
    this.router.navigate(['admin/trendingChartDefinition/trendingChartDefinitionEdit'], { queryParams: { 'id': event.id } });
  }

  addTrendingChart(): any {
    this.router.navigate(['admin/trendingChartDefinition/trendingChartDefinitionEdit']);
  }
}
