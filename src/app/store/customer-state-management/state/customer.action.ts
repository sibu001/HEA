import { HttpParams } from "@angular/common/http";

export enum SystemActionTypes {
    GET_CUSTOMER_LIST = 'Get All Customer List',
    GET_CUSTOMER_VIEW_CONFIGURATION_LIST = 'Get All Customer view configuration List',
    GET_CUSTOMER_BY_ID = 'Get Customer By Id',
    SAVE_CUSTOMER = 'Save Customer',
    SAVE_CUSTOMER_USING_FILE = 'Save Customer using file',
    UPDATE_CUSTOMER = 'Update Customer',
    DELETE_CUSTOMER_BY_ID = 'Delete Customer By Id',
    DELETE_BATCH_CUSTOMER = 'Delete Batch Customer',
    GET_STAFF_LIST = 'Get All Staff List',
    GET_STAFF_BY_ID = 'Get Staff By Id',
    SAVE_STAFF = 'Save Staff',
    UPDATE_STAFF = 'Update Staff',
    DELETE_STAFF_BY_ID = 'Delete Staff By Id',
    GET_UTILITY_CREDENTIAL_LIST = 'Get All Utility Credential List',
    GET_UTILITY_CREDENTIAL_BY_ID = 'Get Utility Credential By Id',
    SAVE_UTILITY_CREDENTIAL = 'Save Utility Credential',
    UPDATE_UTILITY_CREDENTIAL = 'Update Utility Credential',
    USAGE_POINTS = 'Usage Points',
    DELETE_UTILITY_CREDENTIAL_BY_ID = 'Delete Utility Credential By Id',
    GET_CUSTOMER_EVENT_LIST = 'Get All Customer Event List',
    GET_CUSTOMER_EVENT_BY_ID = 'Get Customer Event By Id',
    GET_CUSTOMER_EVENT_LIST_BY_CODE = 'Get Customer Event List By Code',
    SAVE_CUSTOMER_EVENT = 'Save Customer Event',
    UPDATE_CUSTOMER_EVENT = 'Update Customer Event',
    DELETE_CUSTOMER_EVENT_BY_ID = 'Delete Customer Event By Id',
    GET_ALERT_LIST = 'Get All Alert List',
    GET_ALERT_BY_ID = 'Get Alert By Id',
    SAVE_ALERT = 'Save Alert',
    UPDATE_ALERT = 'Update Alert',
    DELETE_ALERT_BY_ID = 'Delete Alert By Id',
    GET_STAFF_NOTE_LIST = 'Get All Staff Note List',
    GET_STAFF_NOTE_BY_ID = 'Get Staff Note By Id',
    SAVE_STAFF_NOTE = 'Save Staff Note',
    UPDATE_STAFF_NOTE = 'Update Staff Note',
    DELETE_STAFF_NOTE_BY_ID = 'Delete Staff Note By Id',
    GET_CUSTOMER_FILE_LIST = 'Get All Customer File List',
    GET_CUSTOMER_FILE_BY_ID = 'Get Customer File By Id',
    SAVE_CUSTOMER_FILE = 'Save Customer File',
    UPDATE_CUSTOMER_FILE = 'Update Customer File',
    DELETE_CUSTOMER_FILE_BY_ID = 'Delete Customer File By Id',
    GET_EMAIL_SETTING_LIST = 'Get Email Setting List',
    SEND_ACTIVATION_MAIL_MESSAGE = 'Send Activation Mail Message',
    CLEAR_CUSTOMER_VALUE_CACHE = 'Clear Customer Value Cache',
    RECALCULATE_CUSTOMER_VARIABLE = 'Recalculate Customer Variable',
    RESCRAPE_CUSTOMER_USAGE = 'Rescrape Customer Usage',
    RESCRAPE_CUSTOMER_BILLS = 'Rescrape Customer Bills',
    VALIDATE_UTILITY_CREDENTIAL_DATA = 'Validate Utility Credential Data',
    GET_PASSWORD_VALIDATION_RULE = 'Get Password Validation Rule',
    GET_VALIDATE_NEW_PASSWORD = 'Get Validate New Password',
    SAVE_VALIDATE_NEW_PASSWORD = 'Save Validate New Password',
    SET_NEW_PASSWORD = 'Set New Password',
    GET_ROLE_LIST_BY_USER_ID = 'Get Role List By User Id',
    ASSIGN_ROLE_TO_USER_ID = 'Assign role To User',
    DELETE_USER_ROLE = 'Delete User Role',
    GET_USER_CUSTOMER_GROUP_LIST = 'Get All User Customer Group List',
    GET_USER_CUSTOMER_GROUP_LIST_OF_LOGGED_IN_USERS = 'Get All User Customer Group List Of Logged in User',
    GET_USER_CUSTOMER_GROUP_BY_ID = 'Get User Customer Group By Id',
    SAVE_USER_CUSTOMER_GROUP = 'Save User Customer Group',
    DELETE_USER_CUSTOMER_GROUP = 'Delete User Customer Group',
    GET_OPT_OUT_LIST = 'Get Opt Out List',
    GET_OPT_OUT_BY_ID = 'Get Opt Out By Id',
    SAVE_OPT_OUT = 'Save Opt Out',
    DELETE_OPT_OUT = 'Delete Opt Out',
    GET_ELECTRICITY_RATE_PLAN = 'Get Electricity Rate Plan',
    GET_HEATING_RATE_PLAN = 'Get Heating Rate Plan',
    GET_WEATHER_STATION_BY_CUSTOMER_ID = 'Get Weather Station by ',
    CUSTOMER_ERROR = 'Customer Error',
    REORDER_CUSTOMER_BILLS = 'Reorder Customer Bills',
    OPENED_UTILIY_CREDENTIALS = 'Open Utility Credentials',
    OPEN_UTILITY_CREDENTIAL_BY_ID = 'Open Utility Credentials by ID',
    RESCRAPE_DATE_FOR_CUSTOMER = 'RESCRAPE DATE FOR CUSTOMER'
}
export class GetCustomerListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_LIST;
    constructor(readonly force: boolean, readonly filter: any, readonly viewType: number) {
    }
}

export class GetCustomerViewConfigurationListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_VIEW_CONFIGURATION_LIST;
    constructor(readonly viewConfigurationId: any, readonly filter: any) {
    }
}

export class GetCustomerByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveCustomerAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER;
    constructor(readonly customer: any) {
    }
}

export class SaveCustomerUsingFileAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_USING_FILE;
    constructor(readonly customer: any) {
    }
}

export class UpdateCustomerAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER;
    constructor(readonly id: number, readonly customer: any) {
    }
}

export class DeleteCustomerByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_BY_ID;
    constructor(readonly id: number) {
    }
}

export class DeleteBatchCustomerAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_BATCH_CUSTOMER;
    constructor(readonly customerList: any) {
    }
}

export class CustomerError {
    static readonly type: SystemActionTypes = SystemActionTypes.CUSTOMER_ERROR;
    constructor(readonly error: Error) {
    }
}

export class GetStaffListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_STAFF_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetStaffByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_STAFF_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveStaffAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_STAFF;
    constructor(readonly staff: any) {
    }
}

export class UpdateStaffAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_STAFF;
    constructor(readonly id: number, readonly staff: any) {
    }
}

export class DeleteStaffByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_STAFF_BY_ID;
    constructor(readonly id: number, readonly params: HttpParams) {
    }
}

export class GetUtilityCredentialListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_UTILITY_CREDENTIAL_LIST;
    constructor(readonly customerId: any) {
    }
}

export class GetUtilityCredentialByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_UTILITY_CREDENTIAL_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class OpenUtilityCredentialsByIdAction{
    static readonly type = SystemActionTypes.OPEN_UTILITY_CREDENTIAL_BY_ID;
    constructor(readonly customerId: any, readonly credendtiaId: any) {
    }
}

export class OpenUtilityCredentialsAction{
    static readonly type = SystemActionTypes.OPENED_UTILIY_CREDENTIALS;
    constructor(readonly customerId: any, readonly subscriptionId: any) {
    }
}

export class UsagePointsAction{
    static readonly type : SystemActionTypes = SystemActionTypes.USAGE_POINTS; 
    constructor(readonly customerCredentialsCode : string , readonly subscriptionId : string){}
}

export class RescrapeDateForCustomerAction{
    static readonly type : SystemActionTypes = SystemActionTypes.RESCRAPE_DATE_FOR_CUSTOMER;
    constructor(readonly customerId : string){}
}

export class SaveUtilityCredentialAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_UTILITY_CREDENTIAL;
    constructor(readonly customerId: any, readonly utilityCredential: any) {
    }
}

export class UpdateUtilityCredentialAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_UTILITY_CREDENTIAL;
    constructor(readonly customerId: any, readonly id: number, readonly utilityCredential: any) {
    }
}

export class DeleteUtilityCredentialByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_UTILITY_CREDENTIAL_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class GetCustomerEventListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_EVENT_LIST;
    constructor(readonly customerId: any) {
    }
}

export class GetCustomerEventByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_EVENT_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class GetCustomerEventListByCodeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_EVENT_LIST_BY_CODE;
    constructor(readonly customerId: any, readonly eventCode: number) {
    }
}

export class SaveCustomerEventAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_EVENT;
    constructor(readonly customerId: any, readonly customerEvent: any) {
    }
}

export class UpdateCustomerEventAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER_EVENT;
    constructor(readonly customerId: any, readonly id: number, readonly customerEvent: any) {
    }
}

export class DeleteCustomerEventByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_EVENT_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class GetAlertListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_ALERT_LIST;
    constructor(readonly customerId: any) {
    }
}

export class GetAlertByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_ALERT_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class SaveAlertAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_ALERT;
    constructor(readonly customerId: any, readonly alert: any) {
    }
}

export class UpdateAlertAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_ALERT;
    constructor(readonly customerId: any, readonly id: number, readonly alert: any) {
    }
}

export class DeleteAlertByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_ALERT_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class GetStaffNoteListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_STAFF_NOTE_LIST;
    constructor(readonly customerId: any) {
    }
}

export class GetStaffNoteByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_STAFF_NOTE_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class SaveStaffNoteAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_STAFF_NOTE;
    constructor(readonly customerId: any, readonly staffNote: any) {
    }
}

export class UpdateStaffNoteAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_STAFF_NOTE;
    constructor(readonly customerId: any, readonly id: number, readonly staffNote: any) {
    }
}

export class DeleteStaffNoteByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_STAFF_NOTE_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class GetCustomerFileListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_FILE_LIST;
    constructor(readonly customerId: any) {
    }
}

export class GetCustomerFileByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_FILE_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}

export class SaveCustomerFileAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_FILE;
    constructor(readonly customerId: any, readonly customerFile: any, readonly description: any) {
    }
}

export class UpdateCustomerFileAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER_FILE;
    constructor(readonly customerId: any, readonly customerFile: any, readonly params: any) {
    }
}

export class DeleteCustomerFileByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_FILE_BY_ID;
    constructor(readonly customerId: any, readonly fileName: number) {
    }
}

export class GetEmailSettingListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_EMAIL_SETTING_LIST;
    constructor(readonly customerId: any) {
    }
}

export class SendActivationMailMessageAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SEND_ACTIVATION_MAIL_MESSAGE;
    constructor(readonly mailObject: any) {
    }
}

export class ClearCustomerValueCacheAction {
    static readonly type: SystemActionTypes = SystemActionTypes.CLEAR_CUSTOMER_VALUE_CACHE;
    constructor(readonly customerId: any) {
    }
}

export class RecalculateCustomerVariableAction {
    static readonly type: SystemActionTypes = SystemActionTypes.RECALCULATE_CUSTOMER_VARIABLE;
    constructor(readonly customerId: any) {
    }
}

export class RescrapeCustomerUsageAction {
    static readonly type: SystemActionTypes = SystemActionTypes.RESCRAPE_CUSTOMER_USAGE;
    constructor(readonly customerId: any, readonly credentialId: any, readonly params: any) {
    }
}

export class RescrapeCustomerBillsAction {
    static readonly type: SystemActionTypes = SystemActionTypes.RESCRAPE_CUSTOMER_BILLS;
    constructor(readonly customerId: any, readonly credentialId: any,readonly smartMeterId: any, readonly params: any) {
    }
}

export class ValidateUtilityCredentialDataAction {
    static readonly type: SystemActionTypes = SystemActionTypes.VALIDATE_UTILITY_CREDENTIAL_DATA;
    constructor(readonly customerId: any, readonly credentialId: any) {
    }
}

export class GetPasswordValidationRuleAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PASSWORD_VALIDATION_RULE;
}

export class GetValidateNewPasswordAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_VALIDATE_NEW_PASSWORD;
    constructor(readonly password: any) {
    }
}

export class SaveValidateNewPasswordAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_VALIDATE_NEW_PASSWORD;
    constructor(readonly params: any) {
    }
}

export class SetNewPasswordAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SET_NEW_PASSWORD;
    constructor(readonly userId: any, readonly params: any) {
    }
}

export class GetRoleListByUserIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_ROLE_LIST_BY_USER_ID;
    constructor(readonly force: boolean, readonly userId: any) {
    }
}

export class AssignRoleToUserAction {
    static readonly type: SystemActionTypes = SystemActionTypes.ASSIGN_ROLE_TO_USER_ID;
    constructor(readonly userId: any, readonly roleCode: any) {
    }
}

export class DeleteUserRoleAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_USER_ROLE;
    constructor(readonly userId: any, readonly roleCode: any) {
    }
}

export class GetUserCustomerGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_USER_CUSTOMER_GROUP_LIST;
    constructor(readonly userId: any) {
    }
}

export class GetUserCustomerGroupListOfLoggedInUserAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_USER_CUSTOMER_GROUP_LIST_OF_LOGGED_IN_USERS;
    constructor(readonly userId: any) {
    }
}


export class GetUserCustomerGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_USER_CUSTOMER_GROUP_BY_ID;
    constructor(readonly userId: any, readonly customerGroupId: number) {
    }
}

export class SaveUserCustomerGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_USER_CUSTOMER_GROUP;
    constructor(readonly userId: any, readonly customerGroupId: any) {
    }
}

export class DeleteUserCustomerGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_USER_CUSTOMER_GROUP;
    constructor(readonly userId: any, readonly customerGroupId: any) {
    }
}

export class GetOptOutListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_OPT_OUT_LIST;
    constructor(readonly customerId: any) {
    }
}

export class GetOptOutByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_OPT_OUT_BY_ID;
    constructor(readonly customerId: any, readonly mailDescriptionId: number) {
    }
}

export class SaveOptOutAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_OPT_OUT;
    constructor(readonly customerId: any, readonly mailDescriptionId: any) {
    }
}

export class DeleteOptOutByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_OPT_OUT;
    constructor(readonly customerId: any, readonly mailDescriptionId: any) {
    }
}

export class GetElectricityRatePlanAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_ELECTRICITY_RATE_PLAN;
    constructor(readonly customerId: any) {
    }
}

export class GetHeatingRatePlanAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_HEATING_RATE_PLAN;
    constructor(readonly customerId: any) {
    }
}

export class GetWeatherStationByCustomerIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_WEATHER_STATION_BY_CUSTOMER_ID;
    constructor(readonly customerId: any) {
    }
}

export class ReorderCustomerBillAction {
    static readonly type: SystemActionTypes = SystemActionTypes.REORDER_CUSTOMER_BILLS;
    constructor(readonly userId: any) {
    }
}
