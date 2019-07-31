import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {SidebarModule} from 'primeng/primeng';
import {leakListViewComponent} from "src/app/leakListview/leakListview.component";;
@NgModule({
    declarations: [
        leakListViewComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        PanelModule,
        ButtonModule,
        SidebarModule,
    ],
    providers: [],
    exports: [

    ]

})
export class leakListViewModule {

}