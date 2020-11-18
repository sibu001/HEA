import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsPagesEditComponent } from './js-pages-edit/js-pages-edit.component';
import { JsPagesListComponent } from './js-pages-list/js-pages-list.component';
import { JsPagesPreviewComponent } from './js-pages-preview/js-pages-preview.component';

const routes: Routes = [
  { path: 'jsPagesList', component: JsPagesListComponent },
  { path: 'jsPagesEdit', component: JsPagesEditComponent },
  { path: 'jsPagesPreview', component: JsPagesPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsPagesRoutingModule { }
