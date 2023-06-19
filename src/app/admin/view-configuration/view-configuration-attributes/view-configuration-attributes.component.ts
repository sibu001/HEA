import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { AdminFilter } from 'src/app/models/filter-object';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-view-configuration-attributes',
  templateUrl: './view-configuration-attributes.component.html',
  styleUrls: ['./view-configuration-attributes.component.css']
})
export class ViewConfigurationAttributesComponent implements OnInit, OnDestroy {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.ATTRIBUTE_LIST_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public viewConfigurationId : number;
  public adminFilter : AdminFilter;
  public attributeData = {
    content: [],
    totalElements: 0,
    pageIndex : 0,
    pageSize : Number(AppConstant.pageSize)
  };
  @ViewChild('tableScrollPoint') public tableScrollPoint : ElementRef;
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  constructor(public fb: FormBuilder,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {

    this.adminFilter = AppUtility.checkForAdminFilter('attributeList');

    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
      this.viewConfigurationId = params['viewConfigurationId'];
      this.search(undefined, false);
    });

  }

  ngOnInit() {
    this.getAttributeCount();
    this.getAttributes();
  }

  addAttributes(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeEdit'], 
      { queryParams: { viewConfigurationId : this.viewConfigurationId }});
  }

  goToEditAttributes(event : any): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeEdit'], 
    { queryParams: { id: event.id, viewConfigurationId : this.viewConfigurationId } });
  }

  back(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationList']);
  }

  loadAttributes(force: boolean, params: any): void{
    this.dynamicViewService.loadAttributeList(force, params);
  }

  getAttributes(): void {
    this.subscriptions.add(this.dynamicViewService.getAttributeList()
    .pipe(filter((item: any) => item instanceof Array && 
      (item.length == 0 || item[0].viewConfigurationId == this.viewConfigurationId)))
      .subscribe((dynamicViewList: any) => {
        this.attributeData.content = dynamicViewList;
        this.dataSource = this.attributeData.content.map((data) =>{
          const attributeData = {...data};
          attributeData.sortAllowed = attributeData.sortAllowed ? '*' : '';
          // attributeData.attributeType = TableColumnData.VIEW_ATTRIBUTE_ATTRIBUTE_TYPE.get(attributeData.attributeType);
          
          const attributeType = TableColumnData.ATTRIBUTE_TYPE_DATA.find((data) => data.key == attributeData.attributeType);
          if(attributeType){
            attributeData.attributeType = attributeType.value; 
          }
          
          return attributeData;
        });
        AppUtility.scrollToTableTop(this.tableScrollPoint);
      }));
  }

  loadAttributesCount(force: boolean, params: any){
    this.dynamicViewService.loadAttributeCount(force,params);
  } 

  getAttributeCount() {
    this.subscriptions.add(
      this.dynamicViewService.getAttributeCount()
      .subscribe(count =>{
        this.attributeData.totalElements = count;
      })
    )
  }

  search(event: any, isSearch: boolean): void {

    this.adminFilter.attributeList.page = event;

    if(event) this.attributeData.pageIndex = event.pageIndex;
    else this.attributeData.pageIndex = 0;

    let params = new HttpParams()
      .set('homeowner', 'false')
      .set('pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : this.attributeData.pageSize.toString())
      .set('startRow', (event && event.pageIndex !== undefined && event.pageSize ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'));

    let countParams : HttpParams = new HttpParams();

    if(this.viewConfigurationId){
      countParams = countParams.append('viewConfigurationId', this.viewConfigurationId.toString());
      params = params.append('viewConfigurationId', this.viewConfigurationId.toString());
    }

    this.loadAttributes(true, params);
    this.loadAttributesCount(true,countParams);

    AppUtility.saveAdminFilter(this.adminFilter);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

