export enum UserReportActionTypes {
    GET_USR_REPORT_DEFINITION_LIST = 'Get All User Report Definition List',
    GET_USR_REPORT_DEFINITION_BY_ID = 'Get User Report Definition By Id',
    UPDATE_USR_REPORT_DEFINITION = 'Update User Report Definition',
    SAVE_USR_REPORT_DEFINITION = 'Save User Report Definition',
    DELETE_USR_REPORT_DEFINITION_BY_ID = 'Delete User Report Definition By Id',
    GET_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE_LIST = 'Get All User Report Definition Context Variable Type List',
    GET_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE_BY_ID = 'Get User Report Definition Context Variable Type By Id',
    UPDATE_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE = 'Update User Report Definition Context Variable Type',
    SAVE_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE = 'Save User Report Definition Context Variable Type',
    DELETE_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE_BY_ID = 'Delete User Report Definition Context Variable Type By Id',
    GET_CUSTOMER_COMPARISON_GROUP_LIST = 'Get All User Report Definition Content Part List',
    GET_CUSTOMER_COMPARISON_GROUP_BY_ID = 'Get User Report Definition Content Part By Id',
    UPDATE_CUSTOMER_COMPARISON_GROUP = 'Update User Report Definition Content Part',
    SAVE_CUSTOMER_COMPARISON_GROUP = 'Save User Report Definition Content Part',
    DELETE_CUSTOMER_COMPARISON_GROUP_BY_ID = 'Delete User Report Definition Content Part By Id',
}
export class GetUserReportDefinitionListAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.GET_USR_REPORT_DEFINITION_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetUserReportDefinitionByIdAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.GET_USR_REPORT_DEFINITION_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateUserReportDefinitionAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.UPDATE_USR_REPORT_DEFINITION;
    constructor(readonly id: number, readonly userReportDefinition: any) {
    }
}

export class SaveUserReportDefinitionAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.SAVE_USR_REPORT_DEFINITION;
    constructor(readonly userReportDefinition: any) {
    }
}

export class DeleteUserReportDefinitionByIdAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.DELETE_USR_REPORT_DEFINITION_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetUserReportDefinitionContextVariableTypeListAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.GET_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetUserReportDefinitionContextVariableTypeByIdAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.GET_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateUserReportDefinitionContextVariableTypeAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.UPDATE_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE;
    constructor(readonly id: number, readonly userReportDefinitionContextVariableType: any) {
    }
}

export class SaveUserReportDefinitionContextVariableTypeAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.SAVE_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE;
    constructor(readonly userReportDefinitionContextVariableType: any) {
    }
}

export class DeleteUserReportDefinitionContextVariableTypeByIdAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.DELETE_USER_REPORT_DEFINITION_CONTEXT_VARIABLE_TYPE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetUserReportDefinitionContentPartListAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.GET_CUSTOMER_COMPARISON_GROUP_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetUserReportDefinitionContentPartByIdAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.GET_CUSTOMER_COMPARISON_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateUserReportDefinitionContentPartAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.UPDATE_CUSTOMER_COMPARISON_GROUP;
    constructor(readonly id: number, readonly userReportDefinitionContentPart: any) {
    }
}

export class SaveUserReportDefinitionContentPartAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.SAVE_CUSTOMER_COMPARISON_GROUP;
    constructor(readonly userReportDefinitionContentPart: any) {
    }
}

export class DeleteUserReportDefinitionContentPartByIdAction {
    static readonly type: UserReportActionTypes = UserReportActionTypes.DELETE_CUSTOMER_COMPARISON_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}