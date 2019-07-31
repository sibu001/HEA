import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[],field: string, searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.subject.toLowerCase().includes(searchText);
        });
    }
    // transform(items: any[], field: string, value: string): any[] {
    //     if (value != undefined && value.length > 0) {
    //         if (!items) return [];
    //         return items.filter( it => {
    //   return it.subject.includes(value);
    // });
    //         // let i=items.filter(it => it[field] == value);
    //         // console.log(i);
    //         //  return i;
    //     } else {
    //         return items;
    //     }
    // }
}