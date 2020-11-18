import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-share-my-data-list',
  templateUrl: './share-my-data-list.component.html',
  styleUrls: ['./share-my-data-list.component.css']
})
export class ShareMyDataListComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN> = TableColumnData.SHARE_MY_DATA_KEYS;
  public dataSource: any;
  public totalElement = 0;
  public data = {
    content: [],
    totalElements: 0,
  };
  myDataForm: FormGroup = this.fb.group({
    auditId: this.fb.control(['']),
    customerName: this.fb.control(['']),
    subscriptionId: this.fb.control(['']),
    customerAccount: this.fb.control([''])
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.findShareMyData();
  }

  findShareMyData(event?: any): any { }

  goToEditShareMyData(event: any): any { }

  update(): any { }
}
