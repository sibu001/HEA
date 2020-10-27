import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceRoutingModule } from './place-routing.module';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ZipCodeEditComponent } from './zip-code-edit/zip-code-edit.component';

@NgModule({
  imports: [
    CommonModule,
    PlaceRoutingModule,
    CommonHEAModule,
    ReactiveFormsModule
  ],
  declarations: [PlaceListComponent, PlaceEditComponent, ZipCodeEditComponent],
  entryComponents: [ZipCodeEditComponent]
})
export class PlaceModule { }
