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
  selector: 'app-credential-type-list',
  templateUrl: './credential-type-list.component.html',
  styleUrls: ['./credential-type-list.component.css']
})
export class CredentialTypeListComponent implements OnInit, OnDestroy {
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
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
    private readonly router: Router) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CREDENTIAL_TYPE_COLUMN_DATA;
    this.findCredentialType(false, '');
  }

  findCredentialType(force: boolean, filter: string): void {
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
    const filter = '?filter.startRow=0&formAction='
      + (event.active !== undefined ? 'sort' : '') + '&sortField='
      + (event.active !== undefined ? event.active : '') + '&sortOrder='
      + (event.direction !== undefined ? event.direction : 'ASC') + '&credentialTypeCode=&filter.credentialType='
      + this.credentialTypeForm.value.credentialType + '&filter.credentialName='
      + this.credentialTypeForm.value.credentialName;
    this.findCredentialType(true, filter);
  }

  addCredentialType() {
    this.router.navigate(['admin/credential-type/credentialTypeEdit']);
  }

  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

}
