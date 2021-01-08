import { copyStyles } from '@angular/animations/browser/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemUtilityService } from 'src/app/store/system-utility-state-management/service/system-utility.service';
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
  public force = false;
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
    this.findPlace(this.force, '');
  }

  findPlace(force: boolean, filter: string): any {
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
              customerGroupObj.stationId = weatherStationList.find(({ stationId }) => stationId === element.stationId).stationNameForLabel;
              placeListData.push(customerGroupObj);
            });
            this.placeData.content = placeListData;
            this.dataSource = [...this.placeData.content];
          }));
      }));
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
    const filter = '?filter.startRow=0' + '&sortField='
      + (event !== undefined && event.sort.active !== undefined ? event.sort.active : '') + '&sortOrder='
      + (event !== undefined && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC')
      + '&placeName='
      + this.placeForm.value.placeName + '&zipCode='
      + this.placeForm.value.zipCode;
    this.findPlace(true, filter);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
