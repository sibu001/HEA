import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from "src/app/headers/menu.component";
import { NgModule } from '@angular/core';

export const HeaderRoutes: Routes = [
    { path: 'menu', component: MenuComponent },
];


@NgModule({
    imports: [RouterModule.forChild(HeaderRoutes)],
    exports: [RouterModule]
  })
  export class HeaderRoutingModule { }