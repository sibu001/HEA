import { AppUtility } from 'src/app/utility/app.utility';

export class MailTransformer {
    static transformMailDescription(src: any): any {
        const dataSourceList: any = [];
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.totalProcessedTime = AppUtility.convertMillisecondToTime(element.totalProcessedTime);
            switch (element.mailPeriod) {
                case 'M':
                    dataSourceObject.mailPeriod = 'Monthly';
                    break;
                case 'D':
                    dataSourceObject.mailPeriod = 'Daily';
                    break;
                case 'N':
                    dataSourceObject.mailPeriod = 'None';
                    break;
                case 'S':
                    dataSourceObject.mailPeriod = 'Single';
                    break;
                case 'W':
                    dataSourceObject.mailPeriod = 'Weekly';
                    break;
                case 'Y':
                    dataSourceObject.mailPeriod = 'Year';
                    break;
                default:
                    break;
            }
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformCustomerGroupMailPartTableData(src: any, filter: any): any {
        const dataSourceList: any = [];
        let index = 1;
        if (filter && filter.get('startRow')) {
            index = Number(filter.get('startRow')) + 1;
        }
        src.forEach(element => {
            let dataSourceObject: any = {};
            const i = dataSourceList.findIndex((item: any) => item.customerGroup.groupCode === element.customerGroup.groupCode);
            if (i !== -1) {
                if (element.partType === 'header') {
                    dataSourceList[i].headerId = element.customerGroupMailPartId;
                    dataSourceList[i].header = 'Edit part';
                } else if (element.partType === 'footer') {
                    dataSourceList[i].footerId = element.customerGroupMailPartId;
                    dataSourceList[i].footer = 'Edit part';
                }
            } else {
                dataSourceObject = element;
                dataSourceObject.groupName = element.customerGroup.groupCode + ' ' + element.customerGroup.groupName;
                dataSourceObject.serialNumber = index;
                dataSourceObject.headerId = 0;
                dataSourceObject.footerId = 0;
                dataSourceObject.header = '';
                dataSourceObject.footer = '';
                if (element.partType === 'header') {
                    dataSourceObject.header = 'Edit part';
                    dataSourceObject.headerId = element.customerGroupMailPartId;
                } else if (element.partType === 'footer') {
                    dataSourceObject.footer = 'Edit part';
                    dataSourceObject.footerId = element.customerGroupMailPartId;
                }
                index++;
                dataSourceList.push(dataSourceObject);
            }
        });
        return dataSourceList;
    }

    static transformContextVariableTableData(src: any): any {
        const dataSourceList: any = [];
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            //  commented due to mail description edit page.
            // dataSourceObject.calculation = element.calculation.substring(0, 60);
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

}
