import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-system-parameter-list',
  templateUrl: './system-parameter-list.component.html',
  styleUrls: ['./system-parameter-list.component.css']
})
export class SystemParameterListComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public systemParameterData = {
    content: [],
    totalElements: 0,
  };
  systemParameterForm: FormGroup = this.fb.group({
    parameterValue: [''],
    description: ['']
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.SYSTEM_PARAMETER_KEYS;
    this.findSystemParameter();
  }

  findSystemParameter(event?: any): any {

  }

  goToEditSystemParameter(event: any): any {
    this.router.navigate(['/admin/systemParameter/systemParameterEdit'], { queryParams: { 'id': event.id } });
  }

  addSystemParameter(): any {
    this.router.navigate(['/admin/systemParameter/systemParameterEdit']);
  }
}
