import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-share-my-data-list',
  templateUrl: './share-my-data-list.component.html',
  styleUrls: ['./share-my-data-list.component.css']
})
export class ShareMyDataListComponent implements OnInit, OnDestroy {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.SHARE_MY_DATA_KEYS;
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
    subscriptionId: this.fb.control(['']),
    customerAccount: this.fb.control([''])
  });
  constructor(public router: Router, public fb: FormBuilder, public usageHistoryService: UsageHistoryService) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.findShareMyData(this.force, '');
  }

  findShareMyData(force: boolean, filter: any): any {
    this.usageHistoryService.loadShareMyDataList(force, filter);
    this.subscriptions.add(this.usageHistoryService.getShareMyDataList().pipe(skipWhile((item: any) => !item))
      .subscribe((shareMyDataList: any) => {
        this.data.content = shareMyDataList;
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
      + '&filter.subscriptionId=' + this.myDataForm.value.subscriptionId
      + '&filter.customerAccount=' + this.myDataForm.value.customerAccount;
    this.findShareMyData(true, filter);
  }

  goToEditShareMyData(event: any): any { }

  update(): any { }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
