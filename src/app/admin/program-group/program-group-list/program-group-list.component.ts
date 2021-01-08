import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  public keys: Array<TABLECOLUMN> = TableColumnData.PROGRAM_GROUP_COLUMN_DATA;
  public dataSource: any;
  public force = false;
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
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      this.force = params['force'];
    });
  }

  ngOnInit() {
    this.scrollTop();
    this.search(undefined, this.force);
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  findProgramGroup(filter: any, force: boolean): void {
    this.systemService.loadProgramGroupsList(force, filter);
    this.subscriptions.add(this.systemService.getProgramGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((programGroupList: any) => {
        this.programGroupData.content = programGroupList;
        this.dataSource = [...this.programGroupData.content];
      }));
  }

  search(event: any, force: boolean): void {
    const params = new HttpParams()
      .set('startRow', '0')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrder', (event && event.sort.direction !== undefined ? event.sort.direction.toUpperCase() : 'ASC'))
      .set('programCode', (this.programGroupForm.value.programCode !== null ? this.programGroupForm.value.programCode : ''))
      .set('programName', (this.programGroupForm.value.programName !== null ? this.programGroupForm.value.programName : ''));
    this.findProgramGroup(params, force);
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
