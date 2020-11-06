import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemJobsRoutingModule } from './system-jobs-routing.module';
import { SystemJobsListComponent } from './system-jobs-list/system-jobs-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemThreadInfoComponent } from './system-thread-info/system-thread-info.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonHEAModule,
    SystemJobsRoutingModule
  ],
  declarations: [SystemJobsListComponent, SystemThreadInfoComponent],
  entryComponents: [SystemThreadInfoComponent]
})
export class SystemJobsModule { }
