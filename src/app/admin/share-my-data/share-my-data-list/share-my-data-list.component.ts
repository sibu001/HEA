import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { LoginService } from 'src/app/services/login.service';
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
  public force = true;
  private readonly subscriptions: Subscription = new Subscription();
  myDataForm: FormGroup = this.fb.group({
    auditId: this.fb.control(['']),
    customerName: this.fb.control(['']),
    subscriptionId: this.fb.control(['']),
    customerAccount: this.fb.control([''])
  });
  constructor(public router: Router, public fb: FormBuilder,
     public usageHistoryService: UsageHistoryService,
     public loginService : LoginService) {

      }

  ngOnInit() {
    // document.getElementById('loader').classList.remove('loading');
    this.findShareMyData(this.force, this.createRequestParameters(undefined));
    this.getDataFromStore();
    this.getDataFromStoreForShareMyDataProcessCustomer();
  }

  findShareMyData(force: boolean, filter: any): any {
    this.usageHistoryService.loadShareMyDataList(force, filter);
  }

  getDataFromStore(){
    this.subscriptions.add(this.usageHistoryService.getShareMyDataList().pipe(skipWhile((item: any) => !item))
    .subscribe((shareMyDataList: any) => {
      this.data.content = shareMyDataList;
      this.dataSource = [...this.data.content];
      console.log(shareMyDataList);
    }));
  }

  search(event: any): void {
    const filter = '?filter.startRow=0&formAction='
      + '&auditId=' + this.myDataForm.value.auditId
      + '&name=' + this.myDataForm.value.customerName
      + '&subscriptionId=' + this.myDataForm.value.subscriptionId
      + '&customerAccount=' + this.myDataForm.value.customerAccount;
      + '&useGbaUsagePointTable' + ( event !== undefined && event.useGbaUsagePointTable !== undefined ? event.useGbaUsagePointTable : true)
      + '&loadFromFiles' + ( event !== undefined && event.loadFromFiles !== undefined ? event.loadFromFiles : false)
    this.findShareMyData(true, filter);
  }

  createRequestParameters(event){
    return '?auditId=' + this.myDataForm.value.auditId
    + '&name=' + this.myDataForm.value.customerName
    + '&subscriptionId=' + this.myDataForm.value.subscriptionId
    + '&customerAccount=' + this.myDataForm.value.customerAccount
    + '&useGbaUsagePointTable=' + ( event !== undefined && event.useGbaUsagePointTable !== undefined ? event.useGbaUsagePointTable : true)
    + '&loadFromFiles=' + ( event !== undefined && event.loadFromFiles !== undefined ? event.loadFromFiles : false)
    + '&clearData=' + (event !== undefined && event.clearData !== undefined ? event.clearData : true);
  }


  shareMyDataProcesConsumerFilter(event) : HttpParams{
    return new HttpParams()
      .set('customerRef',event.subscriptionId)
      .set('processAsNew', "" + (!event.optional && event.optional == false ? false : true) );
  }

  buttonUpdateEvent(event){
    const httpsParams = this.shareMyDataProcesConsumerFilter(event.row);
    this.shareMyDataProcessCustomer(httpsParams);
  }

  shareMyDataProcessCustomer(filters){
    this.usageHistoryService.loadShareMyDataProcessCustomer(filters);
  }

  getDataFromStoreForShareMyDataProcessCustomer(){
    this.subscriptions.add(
        this.usageHistoryService.getShareMyStateProcessConsumer()
        .pipe(skipWhile((item: any) => !item))
        .subscribe(
          (item) => {
              console.log(item);
          }, error => console.log(error)
          ))
  }

	  goToEditShareMyData(event: any): any { }
  	
    update(): any { }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
