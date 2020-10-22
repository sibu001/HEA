import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-program-group-list',
  templateUrl: './program-group-list.component.html',
  styleUrls: ['./program-group-list.component.css']
})
export class ProgramGroupListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public programGroupData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();
  programGroupForm = this.fb.group({
    programCode: [''],
    programName: ['']
  });
  constructor(public fb: FormBuilder,
    private readonly systemService: SystemService,
    private readonly router: Router) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.PROGRAM_GROUP_COLUMN_DATA;
    this.findProgramGroup();
  }

  findProgramGroup(): void {
    this.systemService.loadProgramGroupsList(false);
    this.subscriptions.add(this.systemService.getProgramGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((programGroupList: any) => {
        this.programGroupData.content = programGroupList;
        this.dataSource = [...this.programGroupData.content];
      }));
  }

  gotoEditProgramGroup(event: any): void {
    this.router.navigate(['admin/program/programGroupEdit'], { queryParams: { 'id': event.id } });
  }

  addProgramGroup() {
    this.router.navigate(['admin/program/programGroupEdit']);
  }
  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
