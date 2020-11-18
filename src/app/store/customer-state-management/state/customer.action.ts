export enum SystemActionTypes {
    GET_CUSTOMER_LIST = 'Get All Customer List',
    GET_CUSTOMER_VIEW_CONFIGURATION_LIST = 'Get All Customer view configuration List',
    GET_CUSTOMER_BY_ID = 'Get Customer By Id',
    SAVE_CUSTOMER = 'Save Customer',
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
    DELETE_UTILITY_CREDENTIAL_BY_ID = 'Delete Utility Credential By Id',
    GET_CUSTOMER_EVENT_LIST = 'Get All Customer Event List',
    GET_CUSTOMER_EVENT_BY_ID = 'Get Customer Event By Id',
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
    DELETE_CUSTOMER_FILE_BY_ID = 'Delete Customer File By Id',
    CUSTOMER_ERROR = 'Customer Error'
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
    constructor(readonly id: number) {
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
    constructor(readonly customerId: any, readonly customerFile: any) {
    }
}

export class DeleteCustomerFileByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_FILE_BY_ID;
    constructor(readonly customerId: any, readonly id: number) {
    }
}
