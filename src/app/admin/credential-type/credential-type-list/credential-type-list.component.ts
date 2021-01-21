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
  selector: 'app-credential-type-list',
  templateUrl: './credential-type-list.component.html',
  styleUrls: ['./credential-type-list.component.css']
})
export class CredentialTypeListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN> = TableColumnData.CREDENTIAL_TYPE_COLUMN_DATA;
  public dataSource: any;
  public force = false;
  public credentialTypeData = {
    content: [],
    totalElements: 0,
  };
  credentialTypeForm = this.fb.group({
    credentialType: [''],
    credentialName: ['']
  });
  private readonly subscriptions: Subscription = new Subscription();
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
    this.findCredentialType(this.force, '');
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  findCredentialType(force: boolean, filter: any): void {
    this.systemService.loadCredentialTypeList(force, filter);
    this.subscriptions.add(this.systemService.getCredentialTypeList().pipe(skipWhile((item: any) => !item))
      .subscribe((credentialTypeList: any) => {
        this.credentialTypeData.content = credentialTypeList;
        this.dataSource = [...this.credentialTypeData.content];
      }));
  }

  gotoEditCredentialType(event: any): void {
    this.router.navigate(['admin/credential-type/credentialTypeEdit'], { queryParams: { 'id': event.id } });
  }

  search(event: any): void {
    const params = new HttpParams()
      .set('startRow', '0')
      .set('useLikeSearch', 'true')
      .set('sortField', (event && event.sort.active !== undefined ? event.sort.active : ''))
      .set('sortOrderAsc', (event && event.sort.direction !== undefined ? (event.sort.direction === 'desc' ? 'false' : 'true') : 'true'))
      .set('credentialType', (this.credentialTypeForm.value.credentialType !== null ? this.credentialTypeForm.value.credentialType : ''))
      .set('credentialName', (this.credentialTypeForm.value.credentialName !== null ? this.credentialTypeForm.value.credentialName : ''));

    this.findCredentialType(true, params);
  }

  addCredentialType() {
    this.router.navigate(['admin/credential-type/credentialTypeEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
