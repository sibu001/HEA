import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ec2InstancesRoutingModule } from './ec2-instances-routing.module';
import { Ec2InstancesListComponent } from './ec2-instances-list/ec2-instances-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonHEAModule,
    Ec2InstancesRoutingModule
  ],
  declarations: [Ec2InstancesListComponent]
})
export class Ec2InstancesModule { }
