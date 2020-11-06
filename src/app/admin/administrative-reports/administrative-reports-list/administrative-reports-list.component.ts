import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-administrative-reports-list',
  templateUrl: './administrative-reports-list.component.html',
  styleUrls: ['./administrative-reports-list.component.css']
})
export class AdministrativeReportsListComponent implements OnInit {


  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public reportData = {
    content: [{ 'test': 'test' }],
    totalElements: 1,
  };

  topicForm: FormGroup = this.fb.group({
    reportName: this.fb.control(''),
    reportLabel: this.fb.control(''),
    reportType: this.fb.control(''),
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.ADMIN_REPORT_KEYS;
    this.findTopicDescription();
  }

  findTopicDescription(event?: any): any {

  }

  search(): any {

  }

  addReport(): any {
    this.router.navigate(['admin/administrativeReport/administrativeReportEdit']);
  }

  goToEditReport(event): any {
    this.router.navigate(['admin/administrativeReport/administrativeReportEdit'], { queryParams: { id: event.id } });
  }

  callReport(event): any {
    this.router.navigate(['admin/administrativeReport/administrativeReportCall'], { queryParams: { id: event.id } });
  }
}
