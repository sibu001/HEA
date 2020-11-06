import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopicListComponent } from './topic-list/topic-list.component';

const routes: Routes = [{ path: 'topicList', component: TopicListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicListRoutingModule { }
