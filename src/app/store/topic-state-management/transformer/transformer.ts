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
}
