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

    static usgaeGasTransformGasList(src: any): any {
        const dataSourceList: any = [];
        src.data.forEach(element => {
            let dataSourceObject: any = {};
            element.value = element.value.toFixed(4);
            dataSourceObject = element;
            dataSourceObject.billingPeriod = new DatePipe('en-US').transform(new Date(element.startDate), 'MMM d, y') + ' - ' + new DatePipe('en-US').transform(new Date(element.endDate), 'MMM d, y');
            dataSourceList.push(dataSourceObject);
        });
        return { data: dataSourceList };
    }

    static shareMyDataTransformer(src : any) : any {
         src.data.forEach(
            (item) => {
                item.auditId = item.customer.auditId;
                item.account = item.credential.account;
                item.name = item.customer.user.name;
                item.city = item.customer.city;
                item.address = item.customer.street1;
                item.update = [{ name : 'update', isShow : true}];
            })

            return src;
    }
}
