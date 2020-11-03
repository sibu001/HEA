import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-batch-script-list',
  templateUrl: './batch-script-list.component.html',
  styleUrls: ['./batch-script-list.component.css']
})
export class BatchScriptListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public batchScriptData = {
    content: [],
    totalElements: 0,
  };
  batchScriptForm = this.fb.group({
    batchName: [''],
    batchPeriod: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(public fb: FormBuilder,
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.BATCH_SCRIPT_KEY;
    this.findBatchScript();
  }

  findBatchScript() {

  }

  search(event: any): void {
  }

  gotoEditBatchScript(event: any): any {
    this.router.navigate(['/admin/batchScript/batchScriptEdit'], { queryParams: { id: event.id } });
  }

  addBatchScript(): any {
    this.router.navigate(['/admin/batchScript/batchScriptEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
