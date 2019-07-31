import { Routes } from '@angular/router';
import { HeadersComponent } from "src/app/headers/headers.component";
import { MenuComponent } from "src/app/headers/menu.component";

export const HeaderRoutes: Routes = [
    { path: 'header', component: HeadersComponent },
    { path: 'menu', component: MenuComponent },
];
