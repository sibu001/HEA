import { DatePipe } from '@angular/common';

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

    static transformCimisMeasurementTableData(src: any, filter: any): any {
        const dataSourceList: any = [];
        let index = 1;
        if (filter && filter.get('startRow')) {
            index = Number(filter.get('startRow')) + 1;
        }
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.serialNumber = index;
            dataSourceObject.cmDateTime = element.cmDateTime ? new DatePipe('en-US').transform(new Date(element.cmDateTime), 'MM/dd/yyyy') : '';
            dataSourceObject.irradiance = element.irradiance + ' Ly/day';
            index++;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformCimisStationTableData(src: any): any {
        const dataSourceList: any = [];
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.isActive = element.isActive ? 'yes' : 'no';
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformBatchScriptTableData(src: any, filter: any): any {
        const dataSourceList: any = [];
        let index = 1;
        if (filter && filter.get('startRow')) {
            index = Number(filter.get('startRow')) + 1;
        }
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.serialNumber = index;
            dataSourceObject.lastExecutionTime = element.lastExecutionTime ? new DatePipe('en-US').transform(new Date(element.lastExecutionTime), 'MM/dd/yyyy h:mm:ss') : '';
            switch (element.batchPeriod) {
                case 'D':
                    dataSourceObject.batchPeriod = 'Daily';
                    break;
                case 'M':
                    dataSourceObject.batchPeriod = 'Monthly';
                    break;
                case 'N':
                    dataSourceObject.batchPeriod = 'None';
                    break;
                case 'S':
                    dataSourceObject.batchPeriod = 'Single';
                    break;
                case 'W':
                    dataSourceObject.batchPeriod = 'Weekly';
                    break;
                case 'Y':
                    dataSourceObject.batchPeriod = 'Year';
                    break;
                default:
                    break;
            }
            index++;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformSystemJobTableData(src: any): any {
        const dataSourceList: any = [];
        let index = 1;
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.serialNumber = index;
            dataSourceObject.prevFireTime = element.prevFireTime ? new DatePipe('en-US').transform(new Date(element.prevFireTime), 'MM/dd/yyyy h:mm:ss') : '';
            dataSourceObject.nextFireTime = element.nextFireTime ? new DatePipe('en-US').transform(new Date(element.nextFireTime), 'MM/dd/yyyy h:mm:ss') : '';
            var totalSeconds = dataSourceObject.prevRunTime / 1000;
            var totalMinutes = totalSeconds / 60;
            var totalHours = totalMinutes / 60;
            var seconds = Math.floor(totalSeconds) % 60;
            var minutes = Math.floor(totalMinutes) % 60;
            var hours = Math.floor(totalHours) % 60;
            dataSourceObject.prevRunTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
            dataSourceObject.buttonList = [
                { key: 'execute', name: 'Execute', isShow: (element.state === 0 ? true : false) },
                { key: 'pause', name: 'Pause', isShow: (element.state === 0 ? true : false) },
                { key: 'resume', name: 'Resume', isShow: (element.state === 1 ? true : false) },
            ];
            if (element.state === 0) {
                dataSourceObject.state = 'Normal';
            } else if (element.state === 1) {
                dataSourceObject.state = 'Paused';
            }
            index++;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformThreadInfoTableData(src: any): any {
        const dataSourceList: any = [];
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.threadName = element.threadInfo.threadName;
            dataSourceObject.blw = '/';
            dataSourceObject.buttonList = [
                { key: 'stackTrack', name: 'Stack', isShow: true },
            ];
            dataSourceObject.detailRow = true;
            // const className = [];
            // element.threadInfo.stackTrace.forEach(elements => {
            //     className.push(elements.className);
            // });
            // dataSourceObject.element = { data: className };
            dataSourceObject.element = element;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

    static transformEC2InstanceTableData(src: any): any {
        const dataSourceList: any = [];
        let index = 1;
        src.forEach(element => {
            let dataSourceObject: any = {};
            dataSourceObject = element;
            dataSourceObject.serialNumber = index;
            dataSourceObject.buttonList = [
                { key: 'start', name: 'start Instance', isShow: true },
            ];
            index++;
            dataSourceList.push(dataSourceObject);
        });
        return dataSourceList;
    }

}
