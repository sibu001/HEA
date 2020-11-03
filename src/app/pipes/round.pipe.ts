import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: any, mult?: any, dir?: any): any {
    dir = dir || 'nearest';
    mult = mult || 1;
    value = !value ? 0 : Number(value);
    if (dir === 'up') {
      return Math.ceil(value / mult) * mult;
    } else if (dir === 'down') {
      return Math.floor(value / mult) * mult;
    } else {
      return Math.round(value / mult) * mult;
    }
  }

}
