import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemMeasurementService } from 'src/app/store/system-measurement-management/service/system-measurement.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-ec2-instances-list',
  templateUrl: './ec2-instances-list.component.html',
  styleUrls: ['./ec2-instances-list.component.css']
})
export class Ec2InstancesListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN> = TableColumnData.EC2_INSTANCE_KEY;
  public dataSource: any;
  public ec2InstancesData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  constructor(private readonly systemMeasurementService: SystemMeasurementService,
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.search();
  }

  findEC2Instances(force: boolean): void {
    this.systemMeasurementService.loadEC2InstanceList(force, '');
    this.subscriptions.add(this.systemMeasurementService.getEC2InstanceList().pipe(skipWhile((item: any) => !item))
      .subscribe((ec2Instances: any) => {
        this.ec2InstancesData.content = ec2Instances;
        this.dataSource = [...this.ec2InstancesData.content];
        AppUtility.scrollTop();
      }));
  }

  startEC2Instance(event: any) {
    this.systemMeasurementService.startEC2Instance(event.instanceId);
  }

  stopEC2Instance(event: any) {
    this.systemMeasurementService.stopEC2Instance(event.instanceId);
  }

  search(): void {
    this.findEC2Instances(true);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
