import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayPatternPipe'
})
export class DisplayPatternPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let displayPattern = ''
    if (value.unit) return value;

    if(args.inputType == 'text'){
      displayPattern = args.displayPattern;

    if(displayPattern[0] != '#'){
      return displayPattern[0] + value;
    }

    //   const firstIndex =  displayPattern.indexOf('#');
    //   const lastIndex = displayPattern.lastIndexOf('#');

    //   if(firstIndex == 0 && lastIndex == displayPattern.length - 1)
    //   return value;

    //   if(lastIndex == displayPattern.length - 1){
    //     return displayPattern.substring(0, firstIndex) + value;
    //   }
    //   else{
    //     return value +  displayPattern.substring(lastIndex, displayPattern.length);
    //   }

    }

    if(displayPattern.includes(',')){
      const formattedValue = Math.abs(value) > 999 ? Math.sign(value)*((Math.abs(value))): Math.sign(value)*Math.abs(value)
      // return formattedValue.toString().replace('.',',');
      return formattedValue.toLocaleString('en-US');
    }
    
    return value;
  }

}
