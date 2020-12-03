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
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }
}
