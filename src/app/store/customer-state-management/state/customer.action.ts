export enum SystemActionTypes {
    GET_CUSTOMER_LIST = 'Get All Customer List',
    GET_CUSTOMER_BY_ID = 'Get Customer By Id',
    SAVE_CUSTOMER = 'Save Customer',
    UPDATE_CUSTOMER = 'Update Customer',
    DELETE_CUSTOMER_BY_ID = 'Delete Customer By Id',
    DELETE_BATCH_CUSTOMER = 'Delete Batch Customer',
    CUSTOMER_ERROR = 'Customer Error'
}
export class GetCustomerListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_LIST;
    constructor(readonly force: boolean, readonly filter: string, readonly viewType: number) {
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
