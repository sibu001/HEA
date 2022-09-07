import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayPatternPipe'
})
export class DisplayPatternPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(args.inputType == 'text'){
      const displayPattern = args.displayPattern;
      const firstIndex =  displayPattern.indexOf('#');
      const lastIndex = displayPattern.lastIndexOf('#');

      if(firstIndex == 0 && lastIndex == displayPattern.length - 1)
      return value;

      if(lastIndex == displayPattern.length - 1){
        return displayPattern.substring(0, firstIndex) + value;
      }
      else{
        return value +  displayPattern.substring(lastIndex, displayPattern.length);
      }
    }

    return value;
  }

}
