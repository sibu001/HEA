export class Transformer {
    static transformCustomerTableData(src: any, viewType: number): any {
        const dataSource: any = {
            list: []
        };
        src.list.forEach(element => {
            const dataSourceObj: any = {};
            switch (viewType) {
                case -1:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.name = element.user.name;
                    dataSourceObj.links = 'Topic Home User';
                    dataSourceObj.group = element.customerGroup.groupName;
                    dataSourceObj.notes = element.notes;
                    dataSourceObj.place = element.place.placeName;
                    dataSourceObj.joinDate = new Date(element.createdDate);
                    break;
                case 2:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.city = element.city;
                    dataSourceObj.constructionSQFT = element.constructionSQFT;
                    dataSourceObj.zillowYearBuilt = element.zillowYearBuilt;
                    dataSourceObj.type = '';
                    dataSourceObj.occ = '';
                    dataSourceObj.pgeHasPool = element.pgeHasPool;
                    dataSourceObj.idleLoad = '';
                    dataSourceObj.annualBil = '';
                    dataSourceObj.annualElectricity = '';
                    dataSourceObj.annualNg = '';
                    break;
                case 3:
                    dataSourceObj.userId = element.userId;
                    dataSourceObj.status = element.user.status;
                    dataSourceObj.eligibleStartDate = element.eligibleStartDate;
                    dataSourceObj.eRate = '';
                    dataSourceObj.solarPvInstalled = element.solarPvInstalled;
                    dataSourceObj.excludeFromReports = element.excludeFromReports;
                    dataSourceObj.lastSuccessfulUtilityReadDate = new Date(element.user.lastSuccessfulUtilityReadDate);
                    dataSourceObj.optOutMail = element.optOutMail;
                    dataSourceObj.statusDesc = '';
                    dataSourceObj.sm = '';
                    dataSourceObj.notes = element.notes;
                    break;
                case 4:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.pgeHasPool = element.pgeHasPool;
                    dataSourceObj.idleLoad = '';
                    dataSourceObj.totalkWh = '';
                    dataSourceObj.totTherms = '';
                    dataSourceObj.MMB = '';
                    dataSourceObj.Base = '';
                    dataSourceObj.recur = '';
                    dataSourceObj.variable = '';
                    dataSourceObj.heating = '';
                    dataSourceObj.cooling = '';
                    break;
                case 5:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.status = element.user.status;
                    dataSourceObj.assigned = element.programGroup !== null && element.programGroup !== undefined
                        ? element.programGroup.programCode : '';
                    dataSourceObj.hi_HC = '';
                    dataSourceObj.med_HC = '';
                    dataSourceObj.hi_Plug = '';
                    dataSourceObj.hi_Var = '';
                    dataSourceObj.hi_Rec = '';
                    dataSourceObj.low_E = '';
                    dataSourceObj.online = '';
                    break;
                case 6:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.status = element.user.status;
                    dataSourceObj.programName = element.programGroup !== null && element.programGroup !== undefined
                        ? element.programGroup.programCode : '';
                    dataSourceObj.activated = element.activationDate;
                    dataSourceObj.completedHEP = '';
                    break;
                case 7:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.pgeHasPool = element.pgeHasPool;
                    dataSourceObj.statusDesc = '';
                    dataSourceObj.rlPool = '';
                    dataSourceObj.annualNg = '';
                    dataSourceObj.variableNg = '';
                    break;
                case 9:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.name = element.user.name;
                    dataSourceObj.city = element.city;
                    dataSourceObj.coachUser = element.coachUser;
                    dataSourceObj.programName = element.programGroup !== null && element.programGroup !== undefined
                        ? element.programGroup.programCode : '';
                    dataSourceObj.MMBtu_init = '';
                    dataSourceObj.change = '';
                    dataSourceObj.hheFinished = '';
                    dataSourceObj.notes = element.notes;
                    break;
                case 10:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.name = element.user.name;
                    dataSourceObj.city = element.city;
                    dataSourceObj.status = element.user.status;
                    dataSourceObj.email = element.user.email;
                    dataSourceObj.phone = element.phoneNumber;
                    dataSourceObj.street = element.street1;
                    break;
                case 11:
                    dataSourceObj.auditId = element.auditId;
                    dataSourceObj.name = element.user.name;
                    dataSourceObj.activity = '';
                    dataSourceObj.calls = '';
                    dataSourceObj.visits = '';
                    dataSourceObj.chgLog = '';
                    dataSourceObj.devices = '';
                    dataSourceObj.intNotes = '';
                    dataSourceObj.files = '';
                    break;
                default:
                    break;
            }
            dataSource.list.push(dataSourceObj);
        });
        dataSource.startRow = src.startRow;
        dataSource.pageSize = src.pageSize;
        dataSource.totalSize = src.totalSize;
        dataSource.hasNext = src.hasNext;
        return dataSource;
    }
    static transformCustomerTableKey(viewType: number): any {
        let key: any;
        switch (viewType) {
            case -1:
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
                        sort: 'links',
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
                        sort: 'joinDate'
                    },
                    {
                        key: 'status',
                        displayName: '',
                        sort: 'status',
                        type: 'image',
                        imagePath: 'assets/images/circle.png',
                        event: ''
                    },
                ];
                break;
            case 2:
                key = [
                    {
                        key: 'auditId',
                        displayName: 'Audit Id',
                        sort: 'auditId',
                        isEdit: true
                    },
                    {
                        key: 'city',
                        displayName: 'City',
                        sort: 'city',
                    },
                    {
                        key: 'constructionSQFT',
                        displayName: 'Sqft',
                        sort: 'constructionSQFT',
                    },
                    {
                        key: 'zillowYearBuilt',
                        displayName: 'Yr Built',
                        sort: 'zillowYearBuilt'
                    },
                    {
                        key: 'type',
                        displayName: 'Type',
                        sort: 'type'
                    },
                    {
                        key: 'occ',
                        displayName: 'Occ.',
                        sort: 'occ'
                    },
                    {
                        key: 'pgeHasPool',
                        displayName: 'Pool?',
                        sort: 'pgeHasPool'
                    },
                    {
                        key: 'idleLoad',
                        displayName: 'Idle Load',
                        sort: 'idleLoad'
                    },
                    {
                        key: 'annualBil',
                        displayName: 'Annual Bill',
                        sort: 'annualBil'
                    },
                    {
                        key: 'annualElectricity',
                        displayName: 'Annual Elec',
                        sort: 'annualElectricity'
                    },
                    {
                        key: 'annualNg',
                        displayName: 'Annual NG',
                        sort: 'annualNg'
                    },
                ];
                break;
            case 3:
                key = [
                    {
                        key: 'userId',
                        displayName: 'User Id',
                        sort: 'userId',
                        isEdit: true
                    },
                    {
                        key: 'status',
                        displayName: 'Status',
                        sort: 'status',
                    },
                    {
                        key: 'statusDesc',
                        displayName: 'Desc',
                    },
                    {
                        key: 'eligibleStartDate',
                        displayName: 'Eligible',
                        sort: 'eligibleStartDate'
                    },
                    {
                        key: 'sm',
                        displayName: 'SM?',
                    },
                    {
                        key: 'eRate',
                        displayName: 'eRate',
                    },
                    {
                        key: 'solarPvInstalled',
                        displayName: 'Solar?',
                        sort: 'solarPvInstalled'
                    },
                    {
                        key: 'excludeFromReports',
                        displayName: 'Excluded',
                        sort: 'excludeFromReports'
                    },
                    {
                        key: 'lastSuccessfulUtilityReadDate',
                        displayName: 'LastMeterRead',
                        sort: 'lastSuccessfulUtilityReadDate'
                    },
                    {
                        key: 'optOutMail',
                        displayName: 'OptOutMail',
                        sort: 'optOutMail'
                    },
                    {
                        key: 'notes',
                        displayName: 'Notes',
                    },
                ];
                break;
            case 4:
                key = [
                    {
                        key: 'auditId',
                        displayName: 'Audit Id',
                        sort: 'auditId',
                        isEdit: true
                    },
                    {
                        key: 'pgeHasPool',
                        displayName: 'Pool?',
                        sort: 'pgeHasPool'
                    },
                    {
                        key: 'idleLoad',
                        displayName: 'Idle Watts',
                        sort: 'idleLoad'
                    },
                    {
                        key: 'totalkWh',
                        displayName: 'Total kWh',
                        sort: 'totalkWh',
                    },
                    {
                        key: 'totTherms',
                        displayName: 'Tot Therms',
                        sort: 'totTherms',
                    },
                    {
                        key: 'MMB',
                        displayName: 'MMB',
                        sort: 'MMB'
                    },
                    {
                        key: 'Base',
                        displayName: 'Base%',
                        sort: 'Base'
                    },
                    {
                        key: 'recur',
                        displayName: 'Recur%',
                        sort: 'recur'
                    },
                    {
                        key: 'variable',
                        displayName: 'Variable%',
                        sort: 'variable'
                    },
                    {
                        key: 'heating',
                        displayName: 'Heating%',
                        sort: 'heating'
                    },
                    {
                        key: 'cooling',
                        displayName: 'Cooling%',
                        sort: 'cooling'
                    },
                ];
                break;
            case 5:
                key = [
                    {
                        key: 'auditId',
                        displayName: 'Audit Id',
                        sort: 'auditId',
                        isEdit: true
                    },
                    {
                        key: 'status',
                        displayName: 'Status',
                        sort: 'status'
                    },
                    {
                        key: 'assigned',
                        displayName: 'Assigned',
                        sort: 'assigned'
                    },
                    {
                        key: 'hi_HC',
                        displayName: 'Hi_HC?',
                        sort: 'hi_HC',
                    },
                    {
                        key: 'med_Hc',
                        displayName: 'Med_HC?',
                        sort: 'med_HC',
                    },
                    {
                        key: 'hi_Plug',
                        displayName: 'Hi_Plug?',
                        sort: 'hi_Plug'
                    },
                    {
                        key: 'hi_Var',
                        displayName: 'Hi_Var?',
                        sort: 'hi_Var'
                    },
                    {
                        key: 'hi_Rec',
                        displayName: 'Hi_Rec?',
                        sort: 'hi_Rec'
                    },
                    {
                        key: 'low_E',
                        displayName: 'Low_E?',
                        sort: 'low_E'
                    },
                    {
                        key: 'online',
                        displayName: 'Online?',
                        sort: 'online'
                    }
                ];
                break;
            case 6:
                key = [
                    {
                        key: 'auditId',
                        displayName: 'Audit Id',
                        sort: 'auditId',
                        isEdit: true
                    },
                    {
                        key: 'status',
                        displayName: 'Status',
                        sort: 'status'
                    },
                    {
                        key: 'activated',
                        displayName: 'Activated',
                        sort: 'activated',
                    },
                    {
                        key: 'completedHEP',
                        displayName: 'CompletedHEP',
                        sort: 'completedHEP',
                    },
                    {
                        key: 'programName',
                        displayName: 'Program Name',
                        sort: 'programName'
                    }
                ];
                break;
            case 7:
                key = [
                    {
                        key: 'auditId',
                        displayName: 'Audit Id',
                        sort: 'auditId',
                        isEdit: true
                    },
                    {
                        key: 'statusDesc',
                        displayName: 'Status Desc',
                    },
                    {
                        key: 'pgeHasPool',
                        displayName: 'Pool?',
                        sort: 'pgeHasPool'
                    },
                    {
                        key: 'rlPool',
                        displayName: 'rl_Pool?',
                        sort: 'rlPool',
                    },
                    {
                        key: 'annualNg',
                        displayName: 'Annual NG',
                        sort: 'annualNg'
                    },
                    {
                        key: 'variableNg',
                        displayName: 'Variable NG',
                        sort: 'variableNg'
                    }
                ];
                break;
            case 9:
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
                    },
                    {
                        key: 'city',
                        displayName: 'City',
                        sort: 'city'
                    },
                    {
                        key: 'coach',
                        displayName: 'Coach',
                        sort: 'coach',
                    },
                    {
                        key: 'program',
                        displayName: 'Program',
                        sort: 'program'
                    },
                    {
                        key: 'MMBtu_init',
                        displayName: 'MMBtu Init',
                    },
                    {
                        key: 'change',
                        displayName: 'Change',
                    },
                    {
                        key: 'hheFinished',
                        displayName: 'hheFinished',
                    },
                    {
                        key: 'notes',
                        displayName: 'Notes',
                    }
                ];
                break;
            case 10:
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
                    },
                    {
                        key: 'email',
                        displayName: 'Email',
                    },
                    {
                        key: 'phone',
                        displayName: 'Phone',
                    },
                    {
                        key: 'street',
                        displayName: 'Street',
                    },
                    {
                        key: 'city',
                        displayName: 'City',
                        sort: 'city'
                    },
                    {
                        key: 'status',
                        displayName: 'Status',
                        sort: 'status',
                    }
                ];
                break;
            case 11:
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
                    },
                    {
                        key: 'activity',
                        displayName: 'Activity',
                    },
                    {
                        key: 'calls',
                        displayName: 'Calls',
                    },
                    {
                        key: 'visits',
                        displayName: 'Visits',
                    },
                    {
                        key: 'chgLog',
                        displayName: 'ChgLog',
                    },
                    {
                        key: 'devices',
                        displayName: 'Devices',
                    },
                    {
                        key: 'intNotes',
                        displayName: 'IntNotes',
                    },
                    {
                        key: 'files',
                        displayName: 'Files',
                    }
                ];
                break;
            default:
                break;
        }
        return key;
    }
}
