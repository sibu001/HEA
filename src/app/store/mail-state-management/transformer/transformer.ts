export class MailTransformer {
    static transformMailDescription(src: any): any {
        const dataSourceList: any = [];
        src.data.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
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
        return { data: dataSourceList };
    }
}
