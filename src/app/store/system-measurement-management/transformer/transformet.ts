export class SystemMeasurementUtilityTransformer {
    static transformAlertMessageTableData(src: any): any {
        const dataSourceList: any = [];
        src.data.list.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            if (element.target === 'C') {
                dataSourceObject.target = 'Customer';
            } else if (element.target === 'U') {
                dataSourceObject.target = 'Staff';
            }
            if (element.alertType === 'L') {
                dataSourceObject.alertType = 'On Login';
            } else if (element.alertType === 'S') {
                dataSourceObject.alertType = 'Now';
            }
            if (element.alertLevel === 0) {
                dataSourceObject.alertLevel = 'Informational';
            } else if (element.alertLevel === 5) {
                dataSourceObject.alertLevel = 'Warning';
            } else if (element.alertLevel === 10) {
                dataSourceObject.alertLevel = 'Error';
            }
            dataSourceObject.active = element.active ? 'assets/images/icon_check_green.png' : '';
            dataSourceList.push(dataSourceObject);
        });
        return {
            data: {
                nextPageAvailable: src.data.nextPageAvailable,
                normalSize: src.data.normalSize,
                previousPageAvailable: src.data.previousPageAvailable,
                size: src.data.size,
                startOfCurrentPage: src.data.startOfCurrentPage,
                startOfNextPage: src.data.startOfNextPage,
                startOfPreviousPage: src.data.startOfPreviousPage,
                totalSize: src.data.totalSize,
                list: dataSourceList
            }
        };
    }

}
