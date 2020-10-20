export enum SystemActionTypes {
    GET_CUSTOMER_GROUP_LIST = 'Get All Customer Group List',
    GET_VIEW_CONFIGURATION_LIST = 'Get All View Configuration List',
    GET_PROGRAM_GROUP_LIST = 'Get All Program Group List',
    GET_CUSTOMER_ALERT_TYPE_LIST = 'Get All Customer AlertType List',
    GET_CREDENTIAL_TYPE_LIST = 'Get All Credential Type List',
    GET_COACH_USER_LIST_LIST = 'Get Coach User List',
    CUSTOMER_GROUP_ERROR = 'Customer Error'
}
export class GetCustomerGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_GROUP_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetProgramGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PROGRAM_GROUP_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetCustomerAlertTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_ALERT_TYPE_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetViewConfigurationListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_VIEW_CONFIGURATION_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetCredentialTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CREDENTIAL_TYPE_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetCoachUserListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_COACH_USER_LIST_LIST;
    constructor(readonly force: boolean, readonly filter: string) {
    }
}

export class CustomerGroupError {
    static readonly type: SystemActionTypes = SystemActionTypes.CUSTOMER_GROUP_ERROR;
    constructor(readonly error: Error) {
    }
}
