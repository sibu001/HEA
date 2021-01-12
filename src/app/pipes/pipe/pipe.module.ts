import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../safeHtml';
import { SearchFilterPipe } from '../searchPipe';
import { SortGridPipe } from '../sorting';
import { SafePipe } from '../safeStyle';
import { SafeUrlPipe } from '../safe-url.pipe';
import { SortPipe } from '../sort.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortGridPipe,
    SafeHtmlPipe,
    SafePipe,
    SafeUrlPipe,
    SearchFilterPipe,
    SortPipe
  ],
  exports: [
    SortGridPipe,
    SafeHtmlPipe,
    SafePipe,
    SafeUrlPipe,
    SearchFilterPipe,
    SortPipe
  ]
})
export class PipeModule { }
