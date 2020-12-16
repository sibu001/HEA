import { DatePipe } from '@angular/common';

export class Transformer {
    static transformCustomerTableData(src: any, viewType: number, dataKey?: any): any {
        const dataSource: any = {
            list: []
        };
        if (viewType === -1) {
            src.list.forEach(element => {
                const dataSourceObj: any = {};
                dataSourceObj.auditId = element.auditId;
                dataSourceObj.name = element.user.name;
                dataSourceObj.group = element.customerGroup.groupName;
                dataSourceObj.notes = element.notes;
                dataSourceObj.place = element.place.placeName;
                dataSourceObj.joinDate = new Date(element.createdDate);
                dataSourceObj.maxAlertLevel = element.maxAlertLevel;
                dataSourceObj.customerId = element.customerId;
                dataSourceObj.reportKey = element.reportKey;
                dataSource.list.push(dataSourceObj);
            });
            dataSource.startRow = src.startRow;
            dataSource.pageSize = src.pageSize;
            dataSource.totalSize = src.totalSize;
            dataSource.hasNext = src.hasNext;
        } else {
            src.data.customerList.list.forEach(element => {
                let i = 0;
                const dataSourceObj: any = {};
                element.columns.forEach(columnValue => {
                    if (dataKey[i].pattern === '###,##0 th') {
                        dataSourceObj[dataKey[i].definition] = columnValue.value !== null ? (parseFloat(columnValue.value).toFixed(0) + ' th') : '';
                    } else if (dataKey[i].pattern === '#,##0 W' || dataKey[i].pattern === '###,##0 W') {
                        dataSourceObj[dataKey[i].definition] = columnValue.value !== null ? (parseFloat(columnValue.value).toFixed(0) + ' W') : '';
                    } else if (dataKey[i].pattern === '###,##0 kWh') {
                        dataSourceObj[dataKey[i].definition] = columnValue.value !== null ? (parseFloat(columnValue.value).toFixed(0) + ' kWh') : '';
                    } else if (dataKey[i].pattern === '#,###' || dataKey[i].pattern === '##' || dataKey[i].pattern === '##0') {
                        dataSourceObj[dataKey[i].definition] = columnValue.value !== null ? (parseFloat(columnValue.value).toFixed(0)) : '';
                    } else if (dataKey[i].pattern === '$#,##0') {
                        dataSourceObj[dataKey[i].definition] = columnValue.value !== null ? ('$' + parseFloat(columnValue.value).toFixed(0)) : '';
                    } else {
                        dataSourceObj[dataKey[i].definition] = columnValue.value;
                    }
                    i++;
                });
                dataSourceObj.customerId = element.customerId;
                dataSource.list.push(dataSourceObj);
            });
            dataSource.startRow = src.data.customerList.startOfCurrentPage;
            dataSource.pageSize = src.data.customerList.pageSize;
            dataSource.totalSize = src.data.customerList.totalSize;
            dataSource.hasNext = src.data.customerList.nextPageAvailable;
        }
        return dataSource;
    }
    static transformCustomerTableKey(viewType: number, data: any): any {
        let key: Array<any> = [];
        const dataKey: Array<any> = [];
        if (viewType === -1) {
            key = [
                {
                    key: 'auditId',
                    displayName: 'Audit Id',
                    sort: 'auditId',
                    isEdit: true
                },
                {
                    key: 'name',
                    displayName: 'Name',
                    sort: 'name',
                },
                {
                    key: 'links',
                    displayName: 'Links',
                    type: 'link',
                    links: [
                        {
                            routerLink: '/topicshistory',
                            displayName: 'Topic',
                            queryParam: {}
                        },
                        {
                            routerLink: '/dashboard',
                            displayName: 'Home',
                            queryParam: {}
                        },
                        {
                            routerLink: 'userReportLink.do',
                            displayName: 'User History',
                            queryParam: {}
                        }
                    ]
                },
                {
                    key: 'group',
                    displayName: 'Group',
                },
                {
                    key: 'notes',
                    displayName: 'Notes',
                    sort: 'notes'
                },
                {
                    key: 'place',
                    displayName: 'Place',
                    sort: 'place'
                },
                {
                    key: 'joinDate',
                    displayName: 'Join Date',
                    sort: 'joinDate',
                    isDate: true
                },
                {
                    key: 'maxAlertLevel',
                    displayName: '',
                    sort: 'maxAlertLevel',
                    type: 'alert',
                    event: ''
                },
            ];
        } else {
            let i = 0;
            data.data.viewAttributes.forEach(element => {
                let keyObj: any = {};
                keyObj = element;
                if (element.label === 'Files') {
                    keyObj.key = 'files';
                    element.definition = 'files';
                    dataKey[i] = element;
                } else if (element.label === 'IntNotes') {
                    keyObj.key = 'staffNote';
                    element.definition = 'staffNote';
                    dataKey[i] = element;
                } if (element.definition === 'activationDate' || element.definition === 'user.lastSuccessfulUtilityReadDate') {
                    keyObj.key = element.definition;
                    keyObj.isDate = true;
                    dataKey[i] = element;
                } else {
                    keyObj.key = element.definition;
                    dataKey[i] = element;
                }

                keyObj.displayName = element.label;
                keyObj.sort = element.sortAllowed ? element.definition : '';
                if (i === 0) {
                    keyObj.isEdit = true;
                }
                i++;
                if (element.attributeType === 'A' || element.attributeType === 'E' || element.attributeType === 'N' || element.attributeType === 'D') {
                    keyObj.imagePath = 'assets/images/ico_add.gif';
                    keyObj.type = 'image';
                    keyObj.changeable = true;
                }
                key.push(keyObj);
            });
        }
        return { key, dataKey };
    }
    static transformStaffTableData(src: any): any {
        const dataSource: any = {
            list: []
        };
        src.list.forEach(element => {
            const dataSourceObj: any = element;
            dataSourceObj.createdDate = new Date(element.createdDate);
            dataSource.list.push(dataSourceObj);
        });
        dataSource.startRow = src.startRow;
        dataSource.pageSize = src.pageSize;
        dataSource.totalSize = src.totalSize;
        dataSource.hasNext = src.hasNext;
        return dataSource;
    }

    static transformUtilityCredentialTableData(src: any): any {
        const dataSource = [];
        src.forEach(element => {
            const dataSourceObj: any = element;
            dataSourceObj.credentialType = element.credentialType.credentialName;
            dataSourceObj.active = element.active ? 'assets/images/icon_check_orange.png' : '';
            dataSourceObj.dataInUse = element.dataInUse ? 'assets/images/icon_check_orange.png' : '';
            dataSourceObj.utilityInUse = element.utilityInUse ? 'assets/images/icon_check_orange.png' : '';
            dataSourceObj.electricityInUse = element.electricityInUse ? 'assets/images/icon_check_orange.png' : '';
            dataSourceObj.heatingInUse = element.heatingInUse ? 'assets/images/icon_check_orange.png' : '';
            dataSourceObj.waterInUse = element.waterInUse ? 'assets/images/icon_check_orange.png' : '';
            dataSourceObj.authorizationEndDate = element.authorizationEndDate ? new DatePipe('en-US').transform(new Date(element.authorizationEndDate), 'MM/dd/yyyy') : '';
            dataSourceObj.authorizationStartDate = element.authorizationStartDate ? new DatePipe('en-US').transform(new Date(element.authorizationStartDate), 'MM/dd/yyyy') : '';
            dataSourceObj.lastSuccessfulUsageDate = element.lastSuccessfulUsageDate ? new DatePipe('en-US').transform(new Date(element.lastSuccessfulUsageDate), 'MM/dd/yyyy, h:mm:ss') : '';
            if (dataSourceObj.authorizationStatus === '1') {
                dataSourceObj.authorizationStatus = 'Active';
            }
            dataSource.push(dataSourceObj);
        });
        return dataSource;
    }

    static transformCustomerAlertTableData(src: any): any {
        const dataSource = [];
        src.data.forEach(element => {
            const dataSourceObj: any = element;
            dataSourceObj.customerAlertType = element.customerAlertType.alertName;
            dataSourceObj.alertLevels = element.alertLevel === 0 ? 'Green' : '';
            if (element.alertLevel === 5) {
                dataSourceObj.alertLevels = 'Yellow';
            } else if (element.alertLevel === 10) {
                dataSourceObj.alertLevels = 'Red';
            }
            dataSource.push(dataSourceObj);
        });
        return dataSource;
    }

    static transformCustomerEventTableData(src: any): any {
        const dataSource = [];
        src.data.forEach(element => {
            const dataSourceObj: any = element;
            dataSourceObj.eventType = element.customerEventType.eventName + ' (' + element.customerEventType.eventCode + ')';
            dataSourceObj.eventDatetime = element.eventDatetime ? new Date(element.eventDatetime) : '';
            dataSource.push(dataSourceObj);
        });
        return dataSource;
    }

    static transformStaffNoteTableData(src: any): any {
        const dataSource = [];
        src.data.forEach(element => {
            const dataSourceObj: any = element;
            dataSourceObj.staff = element.user.name;
            dataSourceObj.noteDate = element.noteDate ? new Date(element.noteDate) : '';
            dataSource.push(dataSourceObj);
        });
        return dataSource;
    }

    static transformCustomerFileTableData(src: any): any {
        const dataSource: any = {
            list: []
        };
        src.forEach(element => {
            const dataSourceObj: any = element;
            dataSourceObj.timestamp = new Date(element.timestamp);
            const newArray = element.fileName.split('/');
            dataSourceObj.name = newArray[newArray.length - 1];
            dataSourceObj.isInlineEdit = true;
            dataSource.list.push(dataSourceObj);
        });
        return dataSource;
    }

}
