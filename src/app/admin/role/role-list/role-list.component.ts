import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';
import { AppUtility } from 'src/app/utility/app.utility';
import { SubscriptionUtil } from 'src/app/utility/subscription-utility';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit, OnDestroy {

  public keys: Array<TABLECOLUMN> = TableColumnData.ROLE_KEY;
  public dataSource: any;
  public force = false;
  public userId: any;
  public rolesData = {
    content: [],
    totalElements: 0,
  };
  private readonly subscriptions: Subscription = new Subscription();

  constructor(
    private readonly systemService: SystemService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {
    const users = JSON.parse(localStorage.getItem('users'));
    this.userId = users.userId;
    this.activateRoute.queryParams.subscribe(params => {
      this.force = AppUtility.forceParamToBoolean(params['force']);
    });
  }
  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.ROLE_KEY;
    this.findRole();

  }

  findRole(): any {
    this.systemService.loadRoleList(this.force, '');
    this.subscriptions.add(this.systemService.getRoleList().pipe(skipWhile((item: any) => !item))
      .subscribe((roleList: any) => {
        this.rolesData.content = roleList.list;
        this.dataSource = [...this.rolesData.content];
      }));
  }

  goToEditRole(event: any): any {
    this.router.navigate(['admin/role/roleEdit'], { queryParams: { 'roleCode': event.roleCode } });
  }

  addRole(): any {
    this.router.navigate(['admin/role/roleEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }
}
