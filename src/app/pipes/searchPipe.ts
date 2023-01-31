import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform { 
    transform(items: any[], field: string, searchText: string): any[] {  
        console.log("inside search pipe");
        if (!items) { return []; }
        if (!searchText) { return items; }
        if (!field) return items;  // field form :- obejct.nested-object.2nd-level-nested-object...... 

        searchText = searchText.toLowerCase();
        return items.filter(it => {
            let variable = 'field'
                .split('.')
                .reduce((p,c)=>p&&p[c]||null, it)
            
            if(!variable) return false;  // checking the extistance of the field.
            return variable.toLowerCase().includes(searchText); // checking the extistance of the searchText.
        });
    }
}
