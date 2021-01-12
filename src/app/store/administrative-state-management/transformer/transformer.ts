import { DatePipe } from '@angular/common';

export class AdministrativeReportTransformer {
    static transformTableData(src: any, filter: any): any {
        const dataSourceList: any = [];
        let index = 1;
        if (filter && filter.get('startRow')) {
            index = Number(filter.get('startRow')) + 1;
        }
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.serialNumber = index;
            index++;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformEventHistoryTableData(src: any): any {
        const dataSourceList: any = [];
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.customerName = element.customerId;
            dataSourceObject.eventCode = element.customerEventType.eventCode;
            dataSourceObject.eventName = element.customerEventType.eventName;
            dataSourceObject.createdDate = element.eventDatetime ? new DatePipe('en-US').transform(new Date(element.eventDatetime), 'MMM d, y', 'PST') : '';
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }


}
