import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventHistoryEditComponent } from './event-history-edit/event-history-edit.component';
import { EventHistoryListComponent } from './event-history-list/event-history-list.component';

const routes: Routes = [
  { path: 'eventHistoryList', component: EventHistoryListComponent },
  { path: 'eventHistoryEdit', component: EventHistoryEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventHistoryRoutingModule { }
