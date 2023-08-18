import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AppUtility } from 'src/app/utility/app.utility';

@Component({
  selector: 'app-summary-chart-definition-list',
  templateUrl: './summary-chart-definition-list.component.html',
  styleUrls: ['./summary-chart-definition-list.component.css']
})
export class SummaryChartDefinitionListComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.SUMMARY_CHART_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public data = {
    content: [],
    totalElements: 0,
  };
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    AppUtility.scrollTop();
    this.findSummaryChart();
  }

  findSummaryChart(event?: any): any {

  }

  goToEditSummaryChart(event: any): any {
    this.router.navigate(['admin/summaryChartDefinition/summaryChartDefinitionEdit'], { queryParams: { 'id': event.id } });
  }

  addSummaryChart(): any {
    this.router.navigate(['admin/summaryChartDefinition/summaryChartDefinitionEdit']);
  }
}
