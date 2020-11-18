import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareMyDataRoutingModule } from './share-my-data-routing.module';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareMyDataListComponent } from './share-my-data-list/share-my-data-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonHEAModule,
    ReactiveFormsModule,
    ShareMyDataRoutingModule
  ],
  declarations: [ShareMyDataListComponent]
})
export class ShareMyDataModule { }
