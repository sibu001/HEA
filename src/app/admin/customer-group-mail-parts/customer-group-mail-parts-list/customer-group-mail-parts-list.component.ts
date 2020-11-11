import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-customer-group-mail-parts-list',
  templateUrl: './customer-group-mail-parts-list.component.html',
  styleUrls: ['./customer-group-mail-parts-list.component.css']
})
export class CustomerGroupMailPartsListComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public mailData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  customerGroupData: any[] = TableColumnData.CUSTOMER_GROUP_DATA;
  mailForm: FormGroup = this.fb.group({
    customerGroup: this.fb.control(''),
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.CUSTOMER_GROUP_MAIL_PART_KEYS;
    this.findMailPart();
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
