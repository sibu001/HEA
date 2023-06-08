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


    //  for explanation see comment :- https://xp-dev.com/trac/HEA/ticket/2063#comment:557
    public static transformCustomerGroupMailPartTableData
        (customerGroupMailPart : Array<any>, customerGroupList : Array<any>, filter : any) : Array<any>{

        let index = 1;
        if (filter && filter.get('startRow')) {
            index = Number(filter.get('startRow')) + 1;
        }

        return customerGroupList.map((customerGroup) =>{

            const mailPartCustomerGroup = {...customerGroup};
            mailPartCustomerGroup.serialNumber = index;
            mailPartCustomerGroup.groupName = `${mailPartCustomerGroup.groupCode}, ${mailPartCustomerGroup.groupName}`;
            
            const selectedMailPartCustomerGroup : Array<any> = customerGroupMailPart
                .filter(data => data.customerGroupId == customerGroup.customerGroupId);

            selectedMailPartCustomerGroup.forEach((mailPartGroup) =>{

                if(mailPartGroup.partType == 'header'){
                    mailPartCustomerGroup.header = 'Edit Part';
                    mailPartCustomerGroup.headerId = mailPartGroup.customerGroupMailPartId;
                } else if( mailPartGroup.partType == 'footer'){
                    mailPartCustomerGroup.footer = 'Edit Part';
                    mailPartCustomerGroup.footerId = mailPartGroup.customerGroupMailPartId;
                }

            });

            index++;
            return mailPartCustomerGroup;
        })
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
