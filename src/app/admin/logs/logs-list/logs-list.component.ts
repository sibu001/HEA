import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public logsData = {
    content: [],
    totalElements: 0,
  };
  logsForm: FormGroup = this.fb.group({
    username: [''],
    recordType: [''],
    entity: [''],
    entityReference: [''],
    comment: [''],
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.LOGS_KEYS;
    this.findLogs();
  }

  findLogs(event?: any): any {

  }

  goToEditLogs(event: any): any {
    this.router.navigate(['/admin/logs/logsEdit'], { queryParams: { 'id': event.id } });
  }

  addLogs(): any {
    this.router.navigate(['/admin/logs/logsEdit']);
  }
}
