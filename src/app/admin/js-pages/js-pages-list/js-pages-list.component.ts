import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-js-pages-list',
  templateUrl: './js-pages-list.component.html',
  styleUrls: ['./js-pages-list.component.css']
})
export class JsPagesListComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public jsPagesData = {
    content: [],
    totalElements: 0,
  };

  periodData: any[] = TableColumnData.PERIOD_DATA;
  jsPagesForm: FormGroup = this.fb.group({
    code: this.fb.control(''),
    pageName: this.fb.control(''),
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.JS_PAGES_KEYS;
    this.findJsPages();
  }

  findJsPages(event?: any): any { }

  addJsPages(): any {
    this.router.navigate(['/admin/jsPages/jsPagesEdit']);
  }

  goToEditJsPages(): any {
    this.router.navigate(['/admin/jsPages/jsPagesEdit'], { queryParams: { id: this.id } });
  }
  search(): any { }

}
