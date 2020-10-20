export enum SystemActionTypes {
    GET_CUSTOMER_LIST = 'Get All Customer List',
    CUSTOMER_ERROR = 'Customer Error'
}
export class GetCustomerListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_LIST;
    constructor(readonly force: boolean, readonly filter: string, readonly viewType: number) {
    }
}


export class CustomerError {
    static readonly type: SystemActionTypes = SystemActionTypes.CUSTOMER_ERROR;
    constructor(readonly error: Error) {
    }
}
