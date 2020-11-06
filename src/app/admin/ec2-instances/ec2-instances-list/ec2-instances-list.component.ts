import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-ec2-instances-list',
  templateUrl: './ec2-instances-list.component.html',
  styleUrls: ['./ec2-instances-list.component.css']
})
export class Ec2InstancesListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public ec2InstancesData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor() {
  }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.EC2_INSTANCE_KEY;
    this.findEC2Instances();
  }

  findEC2Instances() {

  }

  search(event: any): void {
  }


  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
