import { DatePipe } from "@angular/common";

export class SystemUtilityTransformer {
    static transformSystemParameterTableData(src: any): any {
        const dataSourceList: any = [];
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            if (element.formatType === 'C') {
                dataSourceObject.format = 'String';
            }
            if (element.formatType === 'N') {
                dataSourceObject.format = 'Number';
            }
            if (element.formatType === 'D') {
                dataSourceObject.format = 'Date';
            }
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }
    static transformCustomerEventTypeTableData(src: any): any {
        const dataSourceList: any = [];
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            if (element.shared) {
                dataSourceObject.shared = '*';
                dataSourceObject.sharedValue = element.shared;
            } else {
                dataSourceObject.shared = '';
            }
            if (element.onlyOne) {
                dataSourceObject.onlyOne = '*';
                dataSourceObject.onlyOneValue = element.onlyOne;
            } else {
                dataSourceObject.onlyOne = '';
            }

            if (element.optOutMail) {
                dataSourceObject.optOutMail = '*';
                dataSourceObject.optOutMailValue = element.optOutMail;
            } else {
                dataSourceObject.optOutMail = '';
            }

            if (element.availableToCoaches) {
                dataSourceObject.availableToCoaches = '*';
                dataSourceObject.availableToCoachesValue = element.availableToCoaches;
            } else {
                dataSourceObject.availableToCoaches = '';
            }

            if (element.periodEvent) {
                dataSourceObject.periodEvent = '*';
                dataSourceObject.periodEventValue = element.periodEvent;
            } else {
                dataSourceObject.periodEvent = '';
            }



            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

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
            element.logDate =  element.logDate ? new DatePipe('en-US').transform(new Date(element.logDate), 'MM/dd/yyyy HH:mm:ss') : '';
            index++;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformDegreeDaysTableData(src: any, filter: any): any {
        const dataSourceList: any = [];
        let index = 1;
        if (filter && filter.get('startRow')) {
            index = Number(filter.get('startRow')) + 1;
        }
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.base = element.base + ' ' + element.unit;
            dataSourceObject.value = parseFloat(element.value).toFixed(4) + ' ' + element.unit;
            dataSourceObject.serialNumber = index;
            index++;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }
}
