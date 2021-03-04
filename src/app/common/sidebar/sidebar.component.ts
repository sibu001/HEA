import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { TopicService } from 'src/app/store/topic-state-management/service/topic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() showMethod = false;
  @Input() showTopicVariableFields = false;
  @Input() showDataFields = false;
  apiURL = environment.webBaseUrl;
  methodName = [];
  dataField = [];
  topicVariableField = [];
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly topicService: TopicService
  ) { }

  ngOnInit() {
    this.loadMethodList();
  }

  loadMethodList() {
    this.topicService.loadContextMethodList();
    this.subscriptions.add(this.topicService.getContextMethodList().pipe(skipWhile((item: any) => !item))
      .subscribe((methodList: any) => {
        this.methodName = methodList.data;
      }));
  }

}
