import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { TrendingDefinitionService } from 'src/app/store/trending-defination-state-management/service/trending-definition.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-key-indicator-list',
  templateUrl: './key-indicator-list.component.html',
  styleUrls: ['./key-indicator-list.component.css']
})
export class KeyIndicatorListComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public pageIndex = 0;
  public keyIndicatorData = {
    content: [],
    totalElements: 0,
    pageSize : AppConstant.pageSize,
  };
  filter = false;
  cache = false;
  public force : boolean = false;
  adminFilter : AdminFilter = new AdminFilter();
  private readonly subscriptions: Subscription = new Subscription();
  @ViewChild('tableScrollPoint') tableScrollPoint : ElementRef;
  keyIndicatorForm: FormGroup;
  constructor(public router: Router,
              public fb: FormBuilder,
              private activatedRoute : ActivatedRoute,
              private readonly trendingDefinationSeries : TrendingDefinitionService)
              { 

                this.activatedRoute.queryParams.subscribe(params =>{
                  this.force = AppUtility.forceParamToBoolean(params['force']);
                })
              }

  ngOnInit() {
    this.keys = TableColumnData.KEY_INDICATOR_KEYS;
    this.adminFilter = AppUtility.checkForAdminFilter('keyIndicatorList');
    this.setUpForm(this.adminFilter.keyIndicatorList.formValue);
    AppUtility.scrollTop();
    this.getKeyIndicatorsList();
    this.search(this.adminFilter.keyIndicatorList.page,this.force);
  }

  setUpForm(event : any){
    this.keyIndicatorForm = this.fb.group({
      keyIndicatorCode : [ event && event.keyIndicatorCode ? event.keyIndicatorCode : '' ],
      keyIndicatorName : [ event && event.keyIndicatorName ? event.keyIndicatorName :  '' ]
    });
  }


  loadKeyIndicatorsList(force : boolean,params : HttpParams){
    this.trendingDefinationSeries.loadKeyIndicatorList(force, params);
  }

  getKeyIndicatorsList(){
    this.subscriptions.add(
      this.trendingDefinationSeries.getKeyIndicatorList()
      .pipe(filter((keyIndicatorList : any) => keyIndicatorList))
      .subscribe((keyIndicatorList : any) =>{
         this.keyIndicatorData.content = [...keyIndicatorList.list];
         this.keyIndicatorData.totalElements = keyIndicatorList.totalSize;
         AppUtility.scrollToTableTop(this.tableScrollPoint);
      }) 
    )
  }

  addKeyIndicators(): any {
    this.router.navigate(['/admin/keyIndicator/keyIndicatorEdit']);
  }

  goToEditKeyIndicators(event : any): any {
    this.router.navigate(['/admin/keyIndicator/keyIndicatorEdit'], { queryParams: { id: event.id } });
  }
  search(event : any, force : boolean): any {
    
    const params : HttpParams = new HttpParams()
      .append('keyIndicatorCode', this.keyIndicatorForm.value.keyIndicatorCode)
      .append('keyIndicatorName',this.keyIndicatorForm.value.keyIndicatorCode)
      .append('startRow', event && event.pageIndex ? (event.pageIndex *  event.pageSize) + '' : '0')
      .append('pageSize', event && event.pageSize ? event.pageSize : this.keyIndicatorData.pageSize)
      .append('sortField', (event && event.sort && event.sort.active !== undefined ? event.sort.active : ''))
      .append('sortOrderAsc', (event && event.sort && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .append('useLikeSearch','true')
      .append('disableTotalSize','false');

      if(event) this.pageIndex = event.pageIndex;
      else this.pageIndex = 0;

      this.loadKeyIndicatorsList(force, params);
      this.adminFilter.keyIndicatorList.formValue = this.keyIndicatorForm.value; 
      this.adminFilter.keyIndicatorList.page = event;
      AppUtility.saveAdminFilter(this.adminFilter);
   }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
