import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CustomerComparisonGroupsAddComponent
} from './customer-comparison-groups-add/customer-comparison-groups-add.component';
import {
  CustomerComparisonGroupsBatchAddComponent
} from './customer-comparison-groups-batch-add/customer-comparison-groups-batch-add.component';
import {
  CustomerComparisonGroupsBatchRemoveComponent
} from './customer-comparison-groups-batch-remove/customer-comparison-groups-batch-remove.component';
import {
  CustomerComparisonGroupsListComponent
} from './customer-comparison-groups-list/customer-comparison-groups-list.component';

const routes: Routes = [
  { path: 'comparisonGroupList', component: CustomerComparisonGroupsListComponent },
  { path: 'comparisonGroupAdd', component: CustomerComparisonGroupsAddComponent },
  { path: 'comparisonGroupBatchAdd', component: CustomerComparisonGroupsBatchAddComponent },
  { path: 'comparisonGroupBatchRemove', component: CustomerComparisonGroupsBatchRemoveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerComparisonGroupsRoutingModule { }
