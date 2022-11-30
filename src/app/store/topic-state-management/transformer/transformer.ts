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

    static transformDynamicFilterList(data : any){
        const outData = data.map(
            item =>{
                item.sharedShow = item.shared == true ? '*' : '';
                return item;
            }
        )

        return outData;
    } 

    static paneReportsUtility(dataSource : Array<any>){
        return dataSource.map(
            (data) =>{
                data.reportLabel = data.report.reportLabel;
                return data;
            }
        )
    }

    public static paneChartListDataTransformer(dataList : Array<any>){
        return dataList.map(
            data => {
                data.chartTitle = data.chart.title;
                data.chartCode = data.chart.chartCode;
                return data;
            }
        )
    }

    public static convertPaneListDataForParentSectionLabel(dataList : Array<any>){
        return dataList.map(
            data =>{
                if(data.parentSection)
                    data.parentSectionLabel = data.parentSection.label;

                if(data.section)
                    data.section = '*';
                else
                    data.section = '';

                return data;
            }
        )
    }
}
