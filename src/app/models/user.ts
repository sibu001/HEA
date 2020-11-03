import { Time } from '@angular/common';

export class Users {
    public outhMeResponse: any;
    public customerResponse: any;
    public theme: string;
    public email: string;
    public phone: number;
    public id: number;
    public username: string;
    public password: string;
    public role: string;
    public userId: string;
    public token: string=null;
    public socolUsername: string;
    public socolPassword: string
    public paneNumber: number = 0;
    public surveyLenght: number;

    public leakFocusId: number = 1;

    public recomandationNo: number;
    public dates: Date;
    public treadingLoadsValue: string;
    public trendId: number = 1;

    public profileId: number = 1;
    public myReportsData: any;
    public refreshToken: string;
    public instructionHtml: string;
    public recommendationList: any[] = [];
    public leakList: any[] = [];
    public customerMailList: any[] = [];
    public gasList: any[] = [];
    public electricityList: any[] = [];
    public electricityChargeList: any[] = [];
    public gasChargeList: any[] = [];
    public waterList: any[] = [];
    public surveyList: any[] = [];
    public trendingPartResource: any[] = [];
    public trendingProfileResource: any[] = [];
    public surveyCode: any[] = [];
    public usesList: any[] = [];
    public currentPaneNumber: any;
    public unitType: number = 0;
    public resourceType: number = 0;
    public lookupValue: string;
    public trendingProfileData: any;
    public mailContaint: string;
    public mailDetail: any;
    public recommendationStatusChange: boolean;
    public types: string;
    public customerEventDetail: object;
    public addEvent: boolean;
    public allSurveyCheck: boolean;
    public electricSmartMeterList: any[] = [];
    public electricDailySmartMeterList: any[] = [];
    public gasSmartMeterList: any[] = [];
    public userEventList : any[] = [];
    public customerEventList : any[] = [];

}