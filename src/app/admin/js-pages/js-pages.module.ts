import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsPagesRoutingModule } from './js-pages-routing.module';
import { JsPagesListComponent } from './js-pages-list/js-pages-list.component';
import { JsPagesEditComponent } from './js-pages-edit/js-pages-edit.component';
import { CommonHEAModule } from 'src/app/common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { JsPagesPreviewComponent } from './js-pages-preview/js-pages-preview.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonHEAModule,
    CodemirrorModule,
    ReactiveFormsModule,
    JsPagesRoutingModule
  ],
  declarations: [JsPagesListComponent, JsPagesEditComponent, JsPagesPreviewComponent]
})
export class JsPagesModule { }
