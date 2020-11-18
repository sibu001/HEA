import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-key-indicator-list',
  templateUrl: './key-indicator-list.component.html',
  styleUrls: ['./key-indicator-list.component.css']
})
export class KeyIndicatorListComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public data = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  periodData: any[] = TableColumnData.PERIOD_DATA;
  mailForm: FormGroup = this.fb.group({
    keyIndicatorCode: this.fb.control(''),
    keyIndicatorName: this.fb.control(''),
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.MAIL_DESC_KEYS;
    this.findKeyIndicator();
  }

  findKeyIndicator(event?: any): any { }

  addKeyIndicators(): any {
    this.router.navigate(['/admin/keyIndicator/keyIndicatorEdit']);
  }

  goToEditKeyIndicators(): any {
    this.router.navigate(['/admin/keyIndicator/keyIndicatorEdit'], { queryParams: { id: this.id } });
  }
  search(): any { }
}
