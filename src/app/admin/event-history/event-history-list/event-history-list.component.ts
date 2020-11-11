import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-event-history-list',
  templateUrl: './event-history-list.component.html',
  styleUrls: ['./event-history-list.component.css']
})
export class EventHistoryListComponent implements OnInit {


  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public reportData = {
    content: [{ 'test': 'test' }],
    totalElements: 1,
  };

  topicForm: FormGroup = this.fb.group({
    periodStart: this.fb.control(''),
    auditId: this.fb.control(''),
    eventCode: this.fb.control(''),
    periodEnd: this.fb.control(''),
    customerName: this.fb.control(''),
    eventName: this.fb.control(''),
    eventFile: this.fb.control('')
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.EVENT_HISTORY_KEYS;
    this.findTopicDescription();
  }

  findTopicDescription(event?: any): any {

  }

  search(): any {

  }

  addReport(): any {
    this.router.navigate(['admin/eventHistory/eventHistoryEdit']);
  }

  goToEditReport(event): any {
    this.router.navigate(['admin/eventHistory/eventHistoryEdit'], { queryParams: { id: event.id } });
  }

  callReport(event): any {
    this.router.navigate(['admin/administrativeReport/administrativeReportCall'], { queryParams: { id: event.id } });
  }
}
