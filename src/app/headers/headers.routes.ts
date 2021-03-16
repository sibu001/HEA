import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const HeaderRoutes: Routes = [
];


@NgModule({
    imports: [RouterModule.forChild(HeaderRoutes)],
    exports: [RouterModule]
  })
  export class HeaderRoutingModule { }
