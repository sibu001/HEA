import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public topicData = {
    content: [],
    totalElements: 0,
  };
  filter = false;
  cache = false;
  topicForm: FormGroup = this.fb.group({
    label: this.fb.control(''),
    user: this.fb.control(''),
    customerGroup: this.fb.control(''),
    customerPlace: this.fb.control(''),
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.TOPIC_KEYS;
    this.findTopicDescription();
  }

  findTopicDescription(event?: any): any {

  }

  search(): any {

  }

  disableFilter(): any {
    this.filter = !this.filter;
  }

  disableValueCache(): any {
    this.cache = !this.cache;
  }
}
