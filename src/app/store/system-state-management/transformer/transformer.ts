export class SystemTransformer {
    static transformCredentialType(src: any): any {
        const dataSourceList: any = [];
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.script = (element.dataScrapingScript !== null ? (element.dataScrapingScript) : '') +
                (element.electricityScrapingScript !== null ? (', ' + element.electricityScrapingScript) : '')
                + (element.heatingScrapingScript !== null ? (', ' + element.heatingScrapingScript) : '')
                + (element.utilityScrapingScript !== null ? (', ' + element.utilityScrapingScript) : '')
                + (element.waterScrapingScript !== null ? (', ' + element.waterScrapingScript) : '');
            if (dataSourceObject.script === 0 || dataSourceObject.script === '0' || dataSourceObject.script === null) {
                dataSourceObject.script = '';
            }
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

}