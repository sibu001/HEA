import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicListRoutingModule } from './topic-list-routing.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonHEAModule,
    ReactiveFormsModule,
    FormsModule,
    TopicListRoutingModule
  ],
  declarations: [TopicListComponent]
})
export class TopicListModule { }
