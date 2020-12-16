import { DatePipe } from '@angular/common';

export class UsageHistoryTransformer {
    static transformGasList(src: any): any {
        const dataSourceList: any = [];
        src.data.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.billingPeriod = new DatePipe('en-US').transform(new Date(element.startDate), 'MMM d, y') + ' - ' + new DatePipe('en-US').transform(new Date(element.endDate), 'MMM d, y');
            dataSourceList.push(dataSourceObject);
        });
        return { data: dataSourceList };
    }
}
