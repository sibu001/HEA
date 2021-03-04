import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortgrid'
})

@Injectable()
export class SortGridPipe implements PipeTransform {
    transform(array: Array<any>, args: string): Array<any> {
        if (typeof args[0] === 'undefined') {
            return array;
        }
        const direction = args[0][0];
        const column = args.replace('-', '');
        if (column === 'priceValue') {
            array.sort((a: any, b: any) => {

                const left = Number(new Date(a[column]));
                const right = Number(new Date(b[column]));
                return (direction === '-') ? right - left : left - right;
            });
        } else if (column === 'status') {
            const sortingArr = [ 'N', 'L', 'Y', 'D' ];
            array.sort((a: any, b: any) => {
                return sortingArr.indexOf(a[column]) - sortingArr.indexOf(b[column]);
            });
        } else if (column === 'recommendation') {
            const column2 = 'takebackLabel';
            array.sort((a: any, b: any) => {
                const c = a[column];
                const d = b[column];
                const e = c[column2];
                const f = d[column2];
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
