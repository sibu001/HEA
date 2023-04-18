import { Sort } from '@angular/material';

export class Page {
    public paginationData: {};
    public keys: {};
    public length: number;
    public pageSize = 10;
    public pageIndex = 0;
    public sortRequest : boolean = false;
    public sqlOrder = 'false'
    public sort: Sort = {
        active: '',
        direction: 'asc',
    };
    public search = '';
}
