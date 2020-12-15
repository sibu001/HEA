export class UsageHistoryTransformer {
    static transformGasList(src: any): any {
        const dataSourceList: any = [];
        src.data.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.billingPeriod = new Date(element.startDate) + ' - ' + new Date(element.endDate);
            dataSourceList.push(dataSourceObject);
        });
        return { data: dataSourceList };
    }

    static transformGasChargeList(src: any): any {
        const dataSourceList: any = [];
        src.data.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.billingPeriod = new Date(element.startDate) + ' - ' + new Date(element.endDate);
            dataSourceList.push(dataSourceObject);
        });
        return { data: dataSourceList };
    }
}
