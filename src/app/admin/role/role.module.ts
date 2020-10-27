import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    CommonHEAModule,
    ReactiveFormsModule

  ],
  declarations: [RoleEditComponent, RoleListComponent]
})
export class RoleModule { }
