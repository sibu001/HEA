import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.PLACE_LIST_KEY;
  public dataSource: any;
  public placeData = {
    content: [],
    totalElements: Number.MAX_SAFE_INTEGER,
  };

  placeForm: FormGroup = this.fb.group({
    placeName: [''],
    zipCode: ['']
  });
  public pageSize = Number(AppConstant.pageSize);
  public currentIndex : number = 0;
  public pageIndex : number = 0;
  public newFilterSearch : boolean = false;
  public disableNextButton : boolean = false;
  public force = false;
  public sortData: any;
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemUtilityService: SystemUtilityService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.sortData = {
      active: 'placeName',
      direction: 'asc'
    };
    // this.findPlace(this.force, null);
    this.search(undefined);
  }

  findPlace(force: boolean, filter: HttpParams): any {
    this.systemUtilityService.loadWeatherStationList(false, '');
    this.subscriptions.add(this.systemUtilityService.getWeatherStationList().pipe(skipWhile((item: any) => !item))
      .subscribe((weatherStationList: any) => {
        this.systemUtilityService.loadPlaceList(force, filter);
        this.subscriptions.add(this.systemUtilityService.getPlaceList().pipe(skipWhile((item: any) => !item))
          .subscribe((customerGroupList: any) => {
            const placeListData: any = [];
            customerGroupList.forEach(element => {
              let customerGroupObj: any;
              customerGroupObj = element;
              if (element.stationId) {
                customerGroupObj.weatherStationId = weatherStationList.find(({ stationId }) => stationId === element.stationId).stationNameForLabel;
              }
              placeListData.push(customerGroupObj);
            });
            this.performPagination(placeListData);
          }));
      }));
  }


  performPagination(dataList: any){

  const obj = AppUtility.paginateData(
     { dataList : dataList ,
      dataSource : this.dataSource,
      pageSize :this.pageSize, 
      pageIndex : this.pageIndex, 
      currentIndex : this.currentIndex,
      disableNextButton : this.disableNextButton,
      newFilterSearch :this.newFilterSearch}, this)
  }


  goToEditPlace(event: any): any {
    this.router.navigate(['/admin/place/placeEdit'], { queryParams: { 'id': event.id } });
  }

  addPlace(): any {
    this.router.navigate(['/admin/place/placeEdit']);
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  search(event: any): void {

    if(event)
      this.currentIndex = event.pageIndex;
    else{
      this.currentIndex = 0;
      this.newFilterSearch = true;
    }

    const params = new HttpParams()
      .set('startRow', event && event.pageIndex ? (event.pageIndex* this.pageSize) + '' : '0')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('useLikeSearch', 'true')
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('placeName', (this.placeForm.value.placeName !== null ? this.placeForm.value.placeName : ''))
      .set('zipCode', (this.placeForm.value.zipCode !== null ? this.placeForm.value.zipCode : ''))
      .set('pageSize',this.pageSize.toString())
    this.findPlace(true, params);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
