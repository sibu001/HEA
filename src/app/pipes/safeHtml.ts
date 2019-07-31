import { DomSanitizer, SafeScript, } from '@angular/platform-browser'
import { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value): SafeScript {
   return this.sanitized.bypassSecurityTrustHtml(value);
  //  return this.sanitized.bypassSecurityTrustScrip(value);
  }
}