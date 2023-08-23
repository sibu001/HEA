import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { SummaryChartDefinationService } from 'src/app/store/summary-chart-defination-management/service/summary-chart-defination.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-summary-chart-definition-list',
  templateUrl: './summary-chart-definition-list.component.html',
  styleUrls: ['./summary-chart-definition-list.component.css']
})
export class SummaryChartDefinitionListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.SUMMARY_CHART_KEYS;
  private subscriptions: Subscription = new Subscription();
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  public dataSource: any;
  public summaryChartForm : FormGroup;
  public totalElement = 0;
  private adminFilter : AdminFilter;
  private forceReload : boolean = false;
  public summaryChartData = {
    content: [],
    totalElements: 0,
    pageIndex : 0,
    pageSize : AppConstant.pageSize
  };
  constructor(public router: Router, public fb: FormBuilder,
              private readonly summarChartDefinationService : SummaryChartDefinationService,
              private readonly activatedRoute : ActivatedRoute) {
                this.activatedRoute.queryParams.subscribe((params : any) =>{
                  this.forceReload = AppUtility.forceParamToBoolean(params['force']);
                })
              }

  ngOnInit() {
    this.adminFilter = AppUtility.checkForAdminFilter('summaryChartDefinationList');
    AppUtility.scrollTop();
    this.setForm(this.adminFilter.summaryChartDefinationList.formValue);
    this.search(this.forceReload, this.adminFilter.summaryChartDefinationList.page);
    this.getSummaryChartDefinationList();
  }

  setForm(event : any) {
    this.summaryChartForm = this.fb.group({
      chartCode : [ event ? event.chartCode : '']
    });
  }

  search(force : boolean, event : any) {
    const params = new HttpParams()
    .append('chart.chartCode', this.summaryChartForm && this.summaryChartForm.value.chartCode ? this.summaryChartForm.value.chartCode  : '' ) 
    .append('startRow', event && event.pageIndex ? (event.pageIndex *  event.pageSize) + '' : '0')
    .append('pageSize', event && event.pageSize ? event.pageSize : this.summaryChartData.pageSize)
    .append('sortField', (event && event.sort && event.sort.active !== undefined ? event.sort.active : ''))
    .append('sortOrderAsc', (event && event.sort && event.sort.direction !== undefined ? 
        (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
    .append('useLikeSearch','true')
    .append('disableTotalSize','false');


    this.adminFilter.summaryChartDefinationList.formValue = this.summaryChartForm.value;
    this.adminFilter.summaryChartDefinationList.page = event; 
    AppUtility.saveAdminFilter(this.adminFilter);
    this.loadSummaryChartDefinationList(force,params);
  } 

  loadSummaryChartDefinationList(force : boolean , params : HttpParams) : void {
    this.summarChartDefinationService.loadSummaryChartDefinationList(force,params);
  }

  getSummaryChartDefinationList() : void {
    this.subscriptions.add(
      this.summarChartDefinationService.getSummaryChartDefinationList()
      .pipe(filter((data : any) => data))
      .subscribe((chartList : any) =>{

        this.summaryChartData.content = chartList.list.map((chart : any ) =>{
          const data = {...chart};
          data.chartCode = chart.chart.chartCode;
          return data;
        })

        this.summaryChartData.totalElements = chartList.totalSize;

        if(chartList.startOfCurrentPage == 0){
          this.summaryChartData.pageIndex = 0;
        }else{
          this.summaryChartData.pageIndex = (chartList.startOfCurrentPage/ Number(this.summaryChartData.pageSize));
        }

        AppUtility.scrollToTableTop(this.tableScrollPoint);

      })
    )
  }


  goToEditSummaryChart(event: any): any {
    this.router.navigate(['admin/summaryChartDefinition/summaryChartDefinitionEdit'], { queryParams: { 'id': event.id } });
  }

  addSummaryChart(): any {
    this.router.navigate(['admin/summaryChartDefinition/summaryChartDefinitionEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
