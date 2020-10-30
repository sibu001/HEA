export enum SystemActionTypes {
    GET_PLACE_LIST = 'Get All Place List',
    GET_PLACE_BY_ID = 'Get Place By Id',
    UPDATE_PLACE = 'Update Place',
    SAVE_PLACE = 'Save Place',
    DELETE_PLACE_BY_ID = 'Delete Place By Id',
    GET_CUSTOMER_EVENT_TYPE_LIST = 'Get All Customer Event Type List',
    GET_CUSTOMER_EVENT_TYPE_BY_ID = 'Get Customer Event Type By Id',
    UPDATE_CUSTOMER_EVENT_TYPE = 'Update Customer Event Type',
    SAVE_CUSTOMER_EVENT_TYPE = 'Save Customer Event Type',
    DELETE_CUSTOMER_EVENT_TYPE_BY_ID = 'Delete Customer Event Type By Id',
    GET_CUSTOMER_COMPARISON_GROUP_LIST = 'Get All Customer Comparison Group List',
    GET_CUSTOMER_COMPARISON_GROUP_BY_ID = 'Get Customer Comparison Group By Id',
    UPDATE_CUSTOMER_COMPARISON_GROUP = 'Update Customer Comparison Group',
    SAVE_CUSTOMER_COMPARISON_GROUP = 'Save Customer Comparison Group',
    DELETE_CUSTOMER_COMPARISON_GROUP_BY_ID = 'Delete Customer Comparison Group By Id',
}
export class GetPlaceListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PLACE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetPlaceByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PLACE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdatePlaceAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_PLACE;
    constructor(readonly id: number, readonly place: any) {
    }
}

export class SavePlaceAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_PLACE;
    constructor(readonly place: any) {
    }
}

export class DeletePlaceByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_PLACE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetCustomerEventTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_EVENT_TYPE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetCustomerEventTypeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_EVENT_TYPE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateCustomerEventTypeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER_EVENT_TYPE;
    constructor(readonly id: number, readonly customerEventType: any) {
    }
}

export class SaveCustomerEventTypeAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_EVENT_TYPE;
    constructor(readonly customerEventType: any) {
    }
}

export class DeleteCustomerEventTypeByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_EVENT_TYPE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetCustomerComparisonGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_COMPARISON_GROUP_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetCustomerComparisonGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_COMPARISON_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateCustomerComparisonGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_CUSTOMER_COMPARISON_GROUP;
    constructor(readonly id: number, readonly customerComparisonGroup: any) {
    }
}

export class SaveCustomerComparisonGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_CUSTOMER_COMPARISON_GROUP;
    constructor(readonly customerComparisonGroup: any) {
    }
}

export class DeleteCustomerComparisonGroupByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_CUSTOMER_COMPARISON_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}

