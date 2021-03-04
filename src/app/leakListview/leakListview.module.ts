import { NgModule } from '@angular/core';
import {leakListViewComponent} from 'src/app/leakListview/leakListview.component';
import { SharedModule } from '../general/share.module';
import { leakListViewRoutingModule } from './leakListview.routes';

@NgModule({
    declarations: [
        leakListViewComponent
    ],
    imports: [
        SharedModule,
        leakListViewRoutingModule,
    ],
    providers: [],
    exports: [

    ]

})
export class leakListViewModule {}
