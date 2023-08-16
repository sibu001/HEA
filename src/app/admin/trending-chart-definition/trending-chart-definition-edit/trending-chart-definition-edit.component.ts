import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-trending-chart-definition-edit',
  templateUrl: './trending-chart-definition-edit.component.html',
  styleUrls: ['./trending-chart-definition-edit.component.css']
})
export class TrendingChartDefinitionEditComponent implements OnInit, OnDestroy {

  id: any;
  trendingForm: FormGroup;
  chartKeys = TableColumnData.TRENDING_CHART_KEYS;
  public chartDataSource: any;
  public forceReload : boolean = false;
  public trendingPartData : any;
  public totalElement = 0;
  public chartData = {
    content: [],
    totalElements: 0,
    pageSize : AppConstant.pageSize,
    pageIndex : 0
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly formBuilder: FormBuilder,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly trendingDefinationService : TrendingDefinitionService,
    private readonly router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.forceReload = AppUtility.forceParamToBoolean(params['force']);
    });
  }

  ngOnInit() {
    AppUtility.scrollTop();
    this.setForm(undefined);
    
    if(this.id){
      this.getTrendingPartsById();
      this.loadTrendingPartsById();
      this.search(undefined);
      this.getTrendingChartsByTrendingPartsId();
    }
  }

  setForm(event: any) {
    this.trendingForm = this.formBuilder.group({
      labelTemplate: [event !== undefined ? event.labelTemplate : ''],
      orderNumber: [event !== undefined ? event.orderNumber : ''],
      explanationTemplate: [event !== undefined ? event.explanationTemplate : ''],
      showOnHomePage: [event !== undefined ? event.showOnHomePage : '', Validators.required],
      filter: [event !== undefined ? event.filter : ''],
    });
  }

  loadTrendingPartsById(){
    this.trendingDefinationService.loadTrendingPartsById(this.forceReload, this.id);
  }

  getTrendingPartsById(){
    this.subscriptions.add(
      this.trendingDefinationService.getTrendingPartsById()
      .pipe(filter(data => data && data.id == this.id))
      .subscribe((trendingParts : any) => {
        this.trendingPartData = {...trendingParts};
        this.setForm({...trendingParts});
        AppUtility.scrollTop();
      })
    );
  }

  back() {
    this.router.navigate(['/admin/trendingChartDefinition/trendingChartDefinitionList']);
  }

  save() {

    AppUtility.removeErrorFieldMessagesFromForm();

    if(this.id){
      const requestBody = {...this.trendingPartData, ...this.trendingForm.value};
      this.subscriptions.add(
        this.trendingDefinationService.updateTrendingParts(this.id,requestBody)
        .pipe(take(1))
        .subscribe((state) =>{

        },AppUtility.errorFieldHighlighterCallBack)
      )
      return;
    }

    const requestBody = {...this.trendingForm.value};
    this.subscriptions.add(
      this.trendingDefinationService.saveTrendingParts(requestBody)
      .pipe(take(1))
      .subscribe((state : any) =>{
        this.id = state.trendingDefinationManagement.trendingParts.id;
        AppUtility.appendIdToURLAfterSave(this.router,this.activateRoute,this.id);
        this.getTrendingPartsById();
      },AppUtility.errorFieldHighlighterCallBack)
    )
  }

  delete() {
    this.subscriptions.add(
      this.trendingDefinationService.deleteTrendingPartsById(this.id)
      .pipe(take(1))
      .subscribe((state : any) =>{
        this.back();
      })
    )
  }

  loadTrendingChartsByTrendingPartsId(force : boolean, params : HttpParams){
    this.trendingDefinationService.loadTrendingChartsByTrendingPartsId(force,this.id,params);
  }

  getTrendingChartsByTrendingPartsId(){
    this.subscriptions.add(
      this.trendingDefinationService.getTrendingPartsCharts()
      .pipe(filter((charts : any) => charts))
      .subscribe((charts : any) => {

        this.chartData.content = charts.list.map((data : any) => {
          data.chartCode = data.chart.chartCode;
          return {...data};
        });
        this.chartData.totalElements = charts.totalSize;
      })
    )
  }

  search(event : any) {
    const params = new HttpParams()
      .append('startRow', event && event.pageIndex ? (event.pageIndex *  event.pageSize) + '' : '0')
      .append('pageSize', event && event.pageSize ? event.pageSize : this.chartData.pageSize)
      .append('sortField', (event && event.sort && event.sort.active !== undefined ? event.sort.active : ''))
      .append('sortOrderAsc', (event && event.sort && event.sort.direction !== undefined ? 
          (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .append('useLikeSearch','true')
      .append('disableTotalSize','false');

      if(event) this.chartData.pageIndex = event.pageIndex;
      else this.chartData.pageIndex = 0;

      this.loadTrendingChartsByTrendingPartsId( ((this.forceReload || event) ? true : false), params );
  }

  addCharts() {
    this.router.navigate(['admin/trendingChartDefinition/trendingChartEdit'],
      { queryParams: { trendingPartId : this.id}});
  }

  goToEditCharts(event : any) {
    this.router.navigate(['admin/trendingChartDefinition/trendingChartEdit'], 
      { queryParams: { trendingPartId : this.id,  id: event.id } });
  }

  get f() { return this.trendingForm.controls; }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
