import { Routes, RouterModule } from '@angular/router';
import { leakListViewComponent } from 'src/app/leakListview/leakListview.component';
import { NgModule } from '@angular/core';

export const leakListViewRoutes: Routes = [
    { path: 'leakListView', component: leakListViewComponent },
];
@NgModule({
    imports: [RouterModule.forChild(leakListViewRoutes)],
    exports: [RouterModule]
})
export class leakListViewRoutingModule { }
