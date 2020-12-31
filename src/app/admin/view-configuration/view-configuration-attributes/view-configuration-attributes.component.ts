import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { DynamicViewService } from 'src/app/store/dynamic-view-state-management/service/dynamic-view.service';
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
  public attributeData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  public force = false;
  constructor(public fb: FormBuilder,
    private readonly dynamicViewService: DynamicViewService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.search(undefined, false);
  }

  addAttributes(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeEdit']);
  }

  goToEditAttributes(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationAttributeEdit'], { queryParams: { id: this.id } });
  }
  back(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationList']);
  }

  findAttribute(force: boolean, filter: any): void {
    this.dynamicViewService.loadAttributeList(force, filter);
    this.subscriptions.add(this.dynamicViewService.getAttributeList().pipe(skipWhile((item: any) => !item))
      .subscribe((dynamicViewList: any) => {
        this.attributeData.content = dynamicViewList.list;
        this.attributeData.totalElements = dynamicViewList.totalSize;
        this.dataSource = [...this.attributeData.content];
      }));
  }

  search(event: any, isSearch: boolean): void {
    const params = new HttpParams()
      .set('filter.disableTotalSize', 'false')
      .set('filter.homeowner', 'false')
      .set('filter.pageSize', event && event.pageSize !== undefined ? event.pageSize + '' : '10')
      .set('filter.startRow', (event && event.pageIndex !== undefined && event.pageSize && !isSearch ?
        (event.pageIndex * event.pageSize) + '' : '0'))
      .set('formAction', (event && event.sort.active !== undefined ? 'sort' : ''))
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'));
    this.findAttribute(true, params);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}

