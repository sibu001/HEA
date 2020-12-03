import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../safeHtml';
import { SearchFilterPipe } from '../searchPipe';
import { SortGridPipe } from '../sorting';
import { SafePipe } from '../safeStyle';
import { SafeUrlPipe } from '../safe-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortGridPipe,
    SafeHtmlPipe,
    SafePipe,
    SafeUrlPipe,
    SearchFilterPipe
  ],
  exports: [
    SortGridPipe,
    SafeHtmlPipe,
    SafePipe,
    SafeUrlPipe,
    SearchFilterPipe
  ]
})
export class PipeModule { }
