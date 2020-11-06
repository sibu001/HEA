import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-topic-description-list',
  templateUrl: './topic-description-list.component.html',
  styleUrls: ['./topic-description-list.component.css']
})
export class TopicDescriptionListComponent implements OnInit {
  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public topicData = {
    content: [],
    totalElements: 0,
  };
  topicForm: FormGroup = this.fb.group({
    topicLabel: this.fb.control(''),
    isActive: this.fb.control(''),
    description: this.fb.control(''),
    searchContextVariable: this.fb.control(''),
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.TOPIC_DESCRIPTION_KEY;
    this.findTopicDescription();
  }

  findTopicDescription(event?: any): any {

  }

  goToEditTopicDescription(event: any): any {
    this.router.navigate(['admin/topicDescription/topicDescriptionEdit'], { queryParams: { 'id': event.id } });
  }

  addTopicDescription(): any {
    this.router.navigate(['admin/topicDescription/topicDescriptionEdit']);
  }


}
