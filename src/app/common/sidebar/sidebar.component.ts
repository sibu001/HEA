import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
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
  user : Users;
  role : string;
  methodName = [];
  dataField = [];
  topicVariableField = [];
  private readonly subscriptions: Subscription = new Subscription();
  constructor(
    private readonly topicService: TopicService,
    private readonly loginService: LoginService 
  ) { }
  @Input() showSideBarHeader : boolean = true;

  ngOnInit() {
    this.loadMethodList();
    this.user = this.loginService.getUser();
    this.role = this.user.role;
  }

  loadMethodList() {
    this.topicService.loadContextMethodList();
    this.subscriptions.add(this.topicService.getContextMethodList().pipe(skipWhile((item: any) => !item))
      .subscribe((methodList: any) => {
        this.methodName = methodList.data;
      }));
  }

}
