import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';
import { SystemService } from 'src/app/store/system-state-management/service/system.service';

@Component({
  selector: 'app-customer-group-mail-parts-list',
  templateUrl: './customer-group-mail-parts-list.component.html',
  styleUrls: ['./customer-group-mail-parts-list.component.css']
})
export class CustomerGroupMailPartsListComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.CUSTOMER_GROUP_MAIL_PART_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public mailData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  customerGroupData: any[];
  mailForm: FormGroup = this.fb.group({
    customerGroup: this.fb.control(''),
  });
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private readonly systemService: SystemService,
  ) { }

  ngOnInit() {
    this.findCustomerGroup(false, '');
    this.findMailPart();
  }

  findCustomerGroup(force: boolean, filter: any) {
    this.systemService.loadCustomerGroupList(force, filter);
    this.subscriptions.add(this.systemService.getCustomerGroupList().pipe(skipWhile((item: any) => !item))
      .subscribe((customerGroupList: any) => {
        this.customerGroupData = customerGroupList;
      }));
  }

  findMailPart(event?: any): any { }

  addMailParts(): any {
    this.router.navigate(['/admin/customerGroupMailParts/customerGroupMailPartsEdit']);
  }

  goToEditMailParts(event: any): any {
    this.router.navigate(['/admin/customerGroupMailParts/customerGroupMailPartsEdit'], { queryParams: { id: this.id } });
  }
  search(): any { }

  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }

}
