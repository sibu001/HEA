import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from 'src/app/headers/menu.component';
import { SafePipeModule } from 'safe-pipe';
import { SharedModule } from '../general/share.module';
import { HeaderRoutingModule } from './headers.routes';

@NgModule({
    declarations: [
        MenuComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        SafePipeModule,
        HeaderRoutingModule
    ],
    exports: []

})
export class HeaderModule {
}
