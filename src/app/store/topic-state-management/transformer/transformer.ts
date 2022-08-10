export class TopicUtilityTransformer {
    static transformTopicDescriptionTableData(src: any): any {
        const dataSourceList: any = [];
        let index = 1;
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.serialNumber = index;
            dataSourceObject.nextSurveyCode = '-> ' + element.nextSurveyCode;
            if (element.active) {
                dataSourceObject.active = 'Active';
            } else {
                dataSourceObject.active = 'Disabled';
            }
            index++;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformDataBlocksTableData(src : any) : any{
        src.map(
            item =>{
                if(item.array == true) 
                    item.array = '*'
                else
                   item.array = '';
            }
        )
        return src;
    }

    static transformFieldValuesTableData(src : any){
       return src.map(
            data =>{
                data.range = (data.rangeStart ? data.rangeStart.toFixed(1) : '0.0') +
                 ' - ' +  (data.rangeEnd ? data.rangeEnd.toFixed(1) : '0.0' );
                return data;
            }
        )
    } 

    static transformFieldValuesSingleData(data : any){
                 data.range = (data.rangeStart ? data.rangeStart.toFixed(1) : 0.0) +
                  ' - ' +  (data.rangeEnd ? data.rangeEnd.toFixed(1) : 0.0 );
                 return data;
     } 
}
