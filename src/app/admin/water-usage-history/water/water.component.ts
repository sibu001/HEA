import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.GAS_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public data = {
    content: [],
    totalElements: 0,
  };
  public force = false;
  private readonly subscriptions: Subscription = new Subscription();
  myDataForm: FormGroup = this.fb.group({
    auditId: this.fb.control(['']),
    customerName: this.fb.control(['']),
    year: this.fb.control(['']),
    month: this.fb.control([''])
  });
  constructor(public router: Router, public fb: FormBuilder, public usageHistoryService: UsageHistoryService) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.findWater(this.force, '');
  }

  findWater(force: boolean, filter: any): any {
    this.usageHistoryService.loadWaterList(force, filter);
    this.subscriptions.add(this.usageHistoryService.getWaterList().pipe(skipWhile((item: any) => !item))
      .subscribe((waterList: any) => {
        this.data.content = waterList;
        this.dataSource = [...this.data.content];
      }));
  }

  search(event: any): void {
    const filter = '?filter.startRow=0&formAction='
      + (event !== undefined && event.active !== undefined ? 'sort' : '') + '&sortField='
      + (event !== undefined && event.sort.active !== undefined ? event.sort.active : '') + '&sortOrder='
      + (event !== undefined && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC')
      + '&filter.auditId=' + this.myDataForm.value.auditId
      + '&filter.customerName=' + this.myDataForm.value.customerName
      + '&filter.year=' + this.myDataForm.value.year
      + '&filter.month=' + this.myDataForm.value.month;
    this.findWater(true, filter);
  }
  goToEditWater(): any { }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
