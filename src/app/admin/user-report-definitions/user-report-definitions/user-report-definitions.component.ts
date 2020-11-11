import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-user-report-definitions',
  templateUrl: './user-report-definitions.component.html',
  styleUrls: ['./user-report-definitions.component.css']
})
export class UserReportDefinitionsComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public userReportsData = {
    content: [],
    totalElements: 0,
  };
  userReportsForm: FormGroup = this.fb.group({
    label: this.fb.control(''),
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.USER_REPORTS_KEYS;
    this.findUserReports();
  }

  findUserReports(event?: any): any { }

  addUserReports(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportDefinitionsEdit']);
  }

  goToEditUserReports(): any {
    this.router.navigate(['/admin/userReportDefinitions/userReportDefinitionsEdit'], { queryParams: { id: this.id } });
  }
  search(): any { }

}
