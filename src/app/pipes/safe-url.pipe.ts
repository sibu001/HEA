import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl'})
export class SafeUrlPipe implements PipeTransform  {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value): SafeScript {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}