import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-view-configuration-list',
  templateUrl: './view-configuration-list.component.html',
  styleUrls: ['./view-configuration-list.component.css']
})
export class ViewConfigurationListComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public viewData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  periodData: any[] = TableColumnData.PERIOD_DATA;
  mailForm: FormGroup = this.fb.group({
    configurationName: this.fb.control(''),
    userName: this.fb.control('')
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.VIEW_CONF_KEYS;
    this.findViewConfiguration();
  }

  findViewConfiguration(event?: any): any { }

  addViewConfigurations(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationEdit']);
  }

  goToEditViewConfigurations(): any {
    this.router.navigate(['/admin/viewConfiguration/viewConfigurationEdit'], { queryParams: { id: this.id } });
  }
  search(): any { }

  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }

}
