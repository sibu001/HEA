import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-lookup-list',
  templateUrl: './lookup-list.component.html',
  styleUrls: ['./lookup-list.component.css']
})
export class LookupListComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public lookupData = {
    content: [],
    totalElements: 0,
  };
  factorForm: FormGroup = this.fb.group({
    defaultValue: [''],
    lookupName: ['']
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.LOOKUP_KEYS;
    this.findLookup();
  }

  findLookup(event?: any): any {

  }

  goToEditLookup(event: any): any {
    this.router.navigate(['/admin/lookup/lookupEdit'], { queryParams: { 'id': event.id } });
  }

  addLookup(): any {
    this.router.navigate(['/admin/lookup/lookupEdit']);
  }
}
