export enum SystemActionTypes {
    GET_CUSTOMER_GROUP_LIST = 'Get All Customer Group List',
    GET_CUSTOMER_GROUP_BY_ID = 'Get Customer Group By Id',
    UPDATE_CUSTOMER_GROUP = 'Update Customer Group',
    SAVE_CUSTOMER_GROUP = 'Save Customer Group',
    DELETE_CUSTOMER_GROUP_BY_ID = 'Delete Customer Group By Id',
    GET_VIEW_CONFIGURATION_LIST = 'Get All View Configuration List',
    GET_PROGRAM_GROUP_LIST = 'Get All Program Group List',
    GET_PROGRAM_GROUP_BY_ID = 'Get Program Group By Id',
    UPDATE_PROGRAM_GROUP = 'Update Program Group',
    SAVE_PROGRAM_GROUP = 'Save Program Group',
    DELETE_PROGRAM_GROUP_BY_ID = 'Delete Program Group By Id',
    GET_CUSTOMER_ALERT_TYPE_LIST = 'Get All Customer AlertType List',
    GET_CUSTOMER_ALERT_TYPE_BY_ID = 'Get Customer AlertType By Id',
    UPDATE_CUSTOMER_ALERT_TYPE = 'Update Customer AlertType',
    SAVE_CUSTOMER_ALERT_TYPE = 'Save Customer AlertType',
    DELETE_CUSTOMER_ALERT_TYPE_BY_ID = 'Delete Customer AlertType By Id',
    GET_CREDENTIAL_TYPE_LIST = 'Get All Credential Type List',
    GET_CREDENTIAL_TYPE_BY_ID = 'Get Credential Type By Id',
    UPDATE_CREDENTIAL_TYPE = 'Update Credential Type',
    SAVE_CREDENTIAL_TYPE = 'Save Credential Type',
    DELETE_CREDENTIAL_TYPE_BY_ID = 'Delete Credential Type By Id',
    GET_COACH_USER_LIST_LIST = 'Get Coach User List',
    CUSTOMER_GROUP_ERROR = 'Customer Error'
}
export class GetCustomerGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_GROUP_LIST;
    constructor(readonly force: boolean,readonly filter: any) {
    }
}

export class GetCustomerGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateCustomerGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER_GROUP;
    constructor(readonly id: number, readonly customerGroup: any) {
    }
}

export class SaveCustomerGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_GROUP;
    constructor(readonly customerGroup: any) {
    }
}

export class DeleteCustomerGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetProgramGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PROGRAM_GROUP_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetProgramGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PROGRAM_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}

export class UpdateProgramGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_PROGRAM_GROUP;
    constructor(readonly id: number, readonly programGroup: any) {
    }
}

export class SaveProgramGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_PROGRAM_GROUP;
    constructor(readonly programGroup: any) {
    }
}

export class DeleteProgramGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_PROGRAM_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetCustomerAlertTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_ALERT_TYPE_LIST;
    constructor(readonly force: boolean, readonly filter: boolean) {
    }
}

export class GetCustomerAlertTypeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_ALERT_TYPE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class UpdateCustomerAlertTypeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER_ALERT_TYPE;
    constructor(readonly id: number, readonly customerAlertType: any) {
    }
}

export class SaveCustomerAlertTypeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_ALERT_TYPE;
    constructor(readonly customerAlertType: any) {
    }
}

export class DeleteCustomerAlertTypeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_ALERT_TYPE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetViewConfigurationListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_VIEW_CONFIGURATION_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetCredentialTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CREDENTIAL_TYPE_LIST;
    constructor(readonly force: boolean, readonly filter: string) {
    }
}

export class GetCredentialTypeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CREDENTIAL_TYPE_BY_ID;
    constructor(readonly id: string) {
    }
}

export class UpdateCredentialTypeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CREDENTIAL_TYPE;
    constructor(readonly id: number, readonly credentialType: any) {
    }
}

export class SaveCredentialTypeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CREDENTIAL_TYPE;
    constructor(readonly credentialType: any) {
    }
}

export class DeleteCredentialTypeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CREDENTIAL_TYPE_BY_ID;
    constructor(readonly id: number) {
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
