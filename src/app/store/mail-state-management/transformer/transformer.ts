export class MailTransformer {
    static transformMailDescription(src: any, filter: any): any {
        const dataSourceList: any = [];
        let index = 1;
        if (filter && filter.get('startRow')) {
            index = Number(filter.get('startRow')) + 1;
        }
        src.data.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.serialNumber = index;
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
        index++;
        return { data: dataSourceList };
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
                } else if (element.partType === 'footer') {
                    dataSourceList[i].footerId = element.customerGroupMailPartId;
                }
            } else {
                dataSourceObject = element;
                dataSourceObject.groupName = element.customerGroup.groupCode + ' ' + element.customerGroup.groupName;
                dataSourceObject.header = 'Edit part';
                dataSourceObject.footer = 'Edit part';
                dataSourceObject.serialNumber = index;
                dataSourceObject.headerId = 0;
                dataSourceObject.footerId = 0;
                if (element.partType === 'header') {
                    dataSourceObject.headerId = element.customerGroupMailPartId;
                } else if (element.partType === 'footer') {
                    dataSourceObject.headerId = element.customerGroupMailPartId;
                }
                index++;
                dataSourceList.push(dataSourceObject);
            }
        });
        return dataSourceList;
    }
}
