import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortgrid'
})

@Injectable()
export class SortGridPipe implements PipeTransform {
    transform(array: Array<any>, args: string): Array<any> {
        if (typeof args[0] === "undefined") {
            return array;
        }
        let direction = args[0][0];
        let column = args.replace('-', '');
        if (column == "priceValue") {
            array.sort((a: any, b: any) => {

                let left = Number(new Date(a[column]));
                let right = Number(new Date(b[column]));
                return (direction === "-") ? right - left : left - right;
            });
        } else if (column == "status") {
            array.sort((a: any, b: any) => {
                if (a[column] < b[column]) {
                    return -1;
                } else if (a[column] > b[column]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (column == "recommendation") {
            let column2 = "takebackLabel";
            array.sort((a: any, b: any) => {
                let c = a[column];
                let d = b[column];
                let e = c[column2];
                let f = d[column2];
                if (e < f) {
                    return -1;
                } else if (e > f) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return array;
    }
}