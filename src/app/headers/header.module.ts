import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SafePipeModule } from 'safe-pipe';
import { SharedModule } from '../general/share.module';
import { HeaderRoutingModule } from './headers.routes';
import { ShowInfoComponent } from './show-info/show-info.component';

@NgModule({
    declarations: [
        ShowInfoComponent,
    ],
    imports: [
        SharedModule,
        MatDialogModule,
        RouterModule,
        SafePipeModule,
        HeaderRoutingModule
    ],
    exports: [],
    entryComponents: [ShowInfoComponent]

})
export class HeaderModule {
}
