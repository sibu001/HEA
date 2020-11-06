import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ec2InstancesListComponent } from './ec2-instances-list/ec2-instances-list.component';

const routes: Routes = [{ path: 'ec2InstancesList', component: Ec2InstancesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ec2InstancesRoutingModule { }
