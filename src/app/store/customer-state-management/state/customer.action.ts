export enum SystemActionTypes {
    GET_CUSTOMER_LIST = 'Get All Customer List',
    GET_CUSTOMER_BY_ID = 'Get Customer By Id',
    SAVE_CUSTOMER = 'Save Customer',
    UPDATE_CUSTOMER = 'Update Customer',
    DELETE_CUSTOMER_BY_ID = 'Delete Customer By Id',
    DELETE_BATCH_CUSTOMER = 'Delete Batch Customer',
    GET_STAFF_LIST = 'Get All STAFF List',
    GET_STAFF_BY_ID = 'Get STAFF By Id',
    SAVE_STAFF = 'Save STAFF',
    UPDATE_STAFF = 'Update STAFF',
    DELETE_STAFF_BY_ID = 'Delete STAFF By Id',
    CUSTOMER_ERROR = 'Customer Error'
}
export class GetCustomerListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_LIST;
    constructor(readonly force: boolean, readonly filter: any, readonly viewType: number) {
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
