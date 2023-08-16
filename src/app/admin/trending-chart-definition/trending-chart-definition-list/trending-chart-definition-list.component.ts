import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-trending-chart-definition-list',
  templateUrl: './trending-chart-definition-list.component.html',
  styleUrls: ['./trending-chart-definition-list.component.css']
})
export class TrendingChartDefinitionListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.TRENDING_PART_KEYS;
  public subscriptions : Subscription = new Subscription();
  public dataSource: any;
  public forceReload : boolean = false;
  public totalElement = 0;
  public pageIndex = 0;
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  public trendingPartsData = {
    content: [],
    totalElements: 0,
    pageIndex : 0,
    pageSize : AppConstant.pageSize
  };
  constructor(public router: Router, public fb: FormBuilder,
    private readonly activatedRoute : ActivatedRoute,
    private readonly trendingDefinationService : TrendingDefinitionService) {
      this.activatedRoute.queryParams.subscribe( (params ) =>{
        this.forceReload = AppUtility.forceParamToBoolean(params['force']);
      })
    }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.getTrendingPartList();
    this.search(undefined);
  }

  search(event : any) {
    const params = new HttpParams()
      .append('startRow', event && event.pageIndex ? (event.pageIndex *  event.pageSize) + '' : '0')
      .append('pageSize', event && event.pageSize ? event.pageSize : this.trendingPartsData.pageSize)
      .append('sortField', (event && event.sort && event.sort.active !== undefined ? event.sort.active : ''))
      .append('sortOrderAsc', (event && event.sort && event.sort.direction !== undefined ? 
          (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .append('useLikeSearch','true')
      .append('disableTotalSize','false');

    
    if(event) { this.trendingPartsData.pageIndex = event.pageIndex}
    else { this.trendingPartsData.pageIndex = 0}
      
    this.loadTrendingPartsList(params);
  }

  loadTrendingPartsList(params : HttpParams) : void {
    this.trendingDefinationService.loadTrendingPartsList(this.forceReload,params);
  }

  getTrendingPartList() : void {
    this.subscriptions.add(
      this.trendingDefinationService.getTrendingPartsList()
      .pipe(filter(data => data))
      .subscribe(((trendingParts : any) =>{
        this.trendingPartsData.content = [...trendingParts.list];
        this.trendingPartsData.totalElements = trendingParts.totalSize;
        AppUtility.scrollToTableTop(this.tableScrollPoint);
      }))
    );
  }

  goToEditTrendingChart(event: any): any {
    this.router.navigate(['admin/trendingChartDefinition/trendingChartDefinitionEdit'], { queryParams: { 'id': event.id } });
  }

  addTrendingChart(): any {
    this.router.navigate(['admin/trendingChartDefinition/trendingChartDefinitionEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }


}
