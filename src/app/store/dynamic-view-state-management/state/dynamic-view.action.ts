export enum DynamicViewActionTypes {
    GET_JAVA_SCRIPT_PAGE_LIST = 'Get All Java Script Page List',
    GET_JAVA_SCRIPT_PAGE_BY_ID = 'Get Java Script Page By Id',
    UPDATE_JAVA_SCRIPT_PAGE = 'Update Java Script Page',
    SAVE_JAVA_SCRIPT_PAGE = 'Save Java Script Page',
    DELETE_JAVA_SCRIPT_PAGE_BY_ID = 'Delete Java Script Page By Id',
    GET_JAVA_SCRIPT_CUSTOMER_GROUP_LIST = 'Get All Java Script Customer Group List',
    GET_JAVA_SCRIPT_CUSTOMER_GROUP_BY_ID = 'Get Java Script Customer Group By Id',
    UPDATE_JAVA_SCRIPT_CUSTOMER_GROUP = 'Update Java Script Customer Group',
    SAVE_JAVA_SCRIPT_CUSTOMER_GROUP = 'Save Java Script Customer Group',
    DELETE_JAVA_SCRIPT_CUSTOMER_GROUP_BY_ID = 'Delete Java Script Customer Group By Id',
    GET_DYNAMIC_VIEW_LIST = 'Get All Dynamic View List',
    GET_DYNAMIC_VIEW_BY_ID = 'Get Dynamic View By Id',
    UPDATE_DYNAMIC_VIEW = 'Update Dynamic View',
    SAVE_DYNAMIC_VIEW = 'Save Dynamic View',
    DELETE_DYNAMIC_VIEW_BY_ID = 'Delete Dynamic View By Id',
    GET_ATTRIBUTE_LIST = 'Get All Attribute List',
    GET_ATTRIBUTE_BY_ID = 'Get Attribute By Id',
    UPDATE_ATTRIBUTE_ = 'Update Attribute',
    SAVE_ATTRIBUTE_ = 'Save Attribute',
    DELETE_ATTRIBUTE_BY_ID = 'Delete Attribute By Id',

}
export class GetJavaScriptPageListAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.GET_JAVA_SCRIPT_PAGE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetJavaScriptPageByIdAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.GET_JAVA_SCRIPT_PAGE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateJavaScriptPageAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.UPDATE_JAVA_SCRIPT_PAGE;
    constructor(readonly id: number, readonly javaScriptPage: any) {
    }
}

export class SaveJavaScriptPageAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.SAVE_JAVA_SCRIPT_PAGE;
    constructor(readonly javaScriptPage: any) {
    }
}

export class DeleteJavaScriptPageByIdAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.DELETE_JAVA_SCRIPT_PAGE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetJavaScriptCustomerGroupListAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.GET_JAVA_SCRIPT_CUSTOMER_GROUP_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetJavaScriptCustomerGroupByIdAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.GET_JAVA_SCRIPT_CUSTOMER_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateJavaScriptCustomerGroupAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.UPDATE_JAVA_SCRIPT_CUSTOMER_GROUP;
    constructor(readonly id: number, readonly javaScriptCustomerGroup: any) {
    }
}

export class SaveJavaScriptCustomerGroupAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.SAVE_JAVA_SCRIPT_CUSTOMER_GROUP;
    constructor(readonly javaScriptCustomerGroup: any) {
    }
}

export class DeleteJavaScriptCustomerGroupByIdAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.DELETE_JAVA_SCRIPT_CUSTOMER_GROUP_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetDynamicViewListAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.GET_DYNAMIC_VIEW_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetDynamicViewByIdAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.GET_DYNAMIC_VIEW_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateDynamicViewAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.UPDATE_DYNAMIC_VIEW;
    constructor(readonly id: number, readonly dynamicView: any) {
    }
}

export class SaveDynamicViewAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.SAVE_DYNAMIC_VIEW;
    constructor(readonly dynamicView: any) {
    }
}

export class DeleteDynamicViewByIdAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.DELETE_DYNAMIC_VIEW_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetAttributeListAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.GET_ATTRIBUTE_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetAttributeByIdAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.GET_ATTRIBUTE_BY_ID;
    constructor(readonly id: number) {
    }
}
export class UpdateAttributeAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.UPDATE_ATTRIBUTE_;
    constructor(readonly id: number, readonly attribute: any) {
    }
}

export class SaveAttributeAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.SAVE_ATTRIBUTE_;
    constructor(readonly attribute: any) {
    }
}

export class DeleteAttributeByIdAction {
    static readonly type: DynamicViewActionTypes = DynamicViewActionTypes.DELETE_ATTRIBUTE_BY_ID;
    constructor(readonly id: number) {
    }
}


