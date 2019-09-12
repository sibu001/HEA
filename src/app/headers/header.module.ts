import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import { HeadersComponent } from "src/app/headers/headers.component";
import { MenuComponent } from "src/app/headers/menu.component";
import { SafePipeModule } from 'safe-pipe';

@NgModule({
    declarations: [
        HeadersComponent,
        MenuComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserModule,
        ButtonModule,
        InputTextModule,
        SafePipeModule,
    ],
    exports: [
     HeadersComponent
    ]

})
export class HeaderModule {

}