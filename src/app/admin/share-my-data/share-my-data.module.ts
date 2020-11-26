import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareMyDataRoutingModule } from './share-my-data-routing.module';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareMyDataListComponent } from './share-my-data-list/share-my-data-list.component';
import { NgxsModule } from '@ngxs/store';
import { UsageHistoryManagementState } from 'src/app/store/usage-history-state-management/state/usage-history.state';
import { UsageHistoryService } from 'src/app/store/usage-history-state-management/service/usage-history.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonHEAModule,
    ReactiveFormsModule,
    ShareMyDataRoutingModule,
    NgxsModule.forRoot([
      UsageHistoryManagementState
    ])
  ],
  declarations: [ShareMyDataListComponent],
  providers: [UsageHistoryService]
})
export class ShareMyDataModule { }
