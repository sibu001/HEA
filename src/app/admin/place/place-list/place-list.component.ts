import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, skipWhile } from 'rxjs/operators';
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
    totalElements: 0,
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
  @ViewChild('tableScrollPoint') public tableScrollPoint : ElementRef;
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
    this.loadWeatherStationList();
    this.combineResponseOfWeatherListAndPlaceList();
    this.getPlaceListCount();
    this.search(undefined);
  }

  loadWeatherStationList(){
    this.systemUtilityService.loadWeatherStationList(false, '');
  }

  loadPlacesList(force: boolean, filter: HttpParams){
    this.systemUtilityService.loadPlaceList(force, filter);
  }

  combineResponseOfWeatherListAndPlaceList(){
    const weatherStation$ :  Observable<any> = this.systemUtilityService.getWeatherStationList().pipe(filter((item: any) => item));
    const placeList$ :  Observable<any> = this.systemUtilityService.getPlaceList().pipe(filter((item: any) => item));

    this.subscriptions.add(
      combineLatest([weatherStation$,placeList$])
      .subscribe(([weatherStationList,placeList] : Array<any>) =>{

        const placeListData: any = [];
        placeList.forEach(element => {
          let customerGroupObj: any;
          customerGroupObj = element;
          if (element.stationId) {
            customerGroupObj.weatherStationId = weatherStationList.find(({ stationId }) => stationId === element.stationId).stationNameForLabel;
          }
          placeListData.push(customerGroupObj);
        });
        this.dataSource = placeListData;

        AppUtility.scrollToTableTop(this.tableScrollPoint);
      })
    )
  
  }

  loadPlaceListCount(params : HttpParams, force : boolean){
    this.systemUtilityService.loadPlaceListCount(force,params);    
  }

  getPlaceListCount() {
    this.subscriptions.add(
      this.systemUtilityService.getPlaceListCount()
      .pipe(map(data => data ? data : 0 ))
      .subscribe((count : number) =>{
        this.placeData.totalElements = count;
      })
    )
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
    this.loadPlacesList(true, params);
    this.loadPlaceListCount(params,true,);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
