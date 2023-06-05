import { HttpParams } from "@angular/common/http";

export enum MailActionTypes {
    GET_MAIL_DESCRIPTION_LIST = 'Get All MailDescription List',
    GET_MAIL_DESCRIPTION_COUNT = 'Get All MailDescription Count',
    GET_MAIL_DESCRIPTION_BY_ID = 'Get MailDescription By Id',
    SAVE_MAIL_DESCRIPTION = 'Save MailDescription',
    UPDATE_MAIL_DESCRIPTION = 'Update MailDescription',
    DELETE_MAIL_DESCRIPTION_BY_ID = 'Delete MailDescription By Id',
    GET_MAIL_CONFIGURATIONS_LIST = 'Get Mail Configuration List',
    GET_CONTEXT_VARIABLE_LIST = 'Get All Context Variable List',
    GET_CONTEXT_VARIABLE_BY_ID = 'Get Context Variable By Id',
    SAVE_CONTEXT_VARIABLE = 'Save Context Variable',
    UPDATE_CONTEXT_VARIABLE = 'Update Context Variable',
    DELETE_CONTEXT_VARIABLE_BY_ID = 'Delete Context Variable By Id',
    GET_MAIL_CONTENT_PART_LIST = 'Get All Mail Content Part List',
    GET_MAIL_CONTENT_PART_BY_ID = 'Get Mail Content Part By Id',
    SAVE_MAIL_CONTENT_PART = 'Save Mail Content Part',
    UPDATE_MAIL_CONTENT_PART = 'Update Mail Content Part',
    DELETE_MAIL_CONTENT_PART_BY_ID = 'Delete Mail Content Part By Id',
    GENERATE_EMBED_IMAGE = 'Generate Embed Image',
    GET_CUSTOMER_GROUP_LIST_BY_MAIL_DESCRIPTION_ID = 'Fet Customer Group List By Mail Description Id',
    ASSIGN_CUSTOMER_GROUP_TO_MAIL_DESCRIPTION = 'Assign Customer Group To Mail Description',
    DELETE_MAIL_DESCRIPTION_CUSTOMER_GROUP = 'Delete Customer Group Of Mail Description',
    MAIL_DESCRIPTION_PROCESS = 'Mail Description Process',
    GET_CUSTOMER_GROUP_MAIL_PART_LIST = 'Get All Customer Group Mail Part List',
    GET_CUSTOMER_GROUP_MAIL_PART_LIST_COUNT = 'Get All Customer Group Mail Part List Count',
    GET_CUSTOMER_GROUP_MAIL_PART_BY_ID = 'Get Customer Group Mail Part By Id',
    SAVE_CUSTOMER_GROUP_MAIL_PART = 'Save Customer Group Mail Part',
    UPDATE_CUSTOMER_GROUP_MAIL_PART = 'Update Customer Group Mail Part',
    DELETE_CUSTOMER_GROUP_MAIL_PART_BY_ID = 'Delete Customer Group Mail Part By Id',
    GET_MAIL_PREVIEW_BY_ID = 'Get Mail Preview By Id'
}

export class GetMailDescriptionListAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_DESCRIPTION_LIST;
    constructor(readonly force: boolean, readonly filter: any,readonly getAll : boolean) {
    }
}

export class GetMailDescriptionCountAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_DESCRIPTION_COUNT;
    constructor(readonly force : boolean, readonly filter: any) {
    }
}

export class GetMailDescriptionByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_DESCRIPTION_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveMailDescriptionAction {
    static readonly type: MailActionTypes = MailActionTypes.SAVE_MAIL_DESCRIPTION;
    constructor(readonly mailDescription: any) {
    }
}

export class UpdateMailDescriptionAction {
    static readonly type: MailActionTypes = MailActionTypes.UPDATE_MAIL_DESCRIPTION;
    constructor(readonly id: number, readonly mailDescription: any) {
    }
}

export class DeleteMailDescriptionByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.DELETE_MAIL_DESCRIPTION_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetMailConfigurationListAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_CONFIGURATIONS_LIST;
}

export class GetContextVariableListAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_CONTEXT_VARIABLE_LIST;
    constructor(readonly mailDescriptionId: any) {
    }
}

export class GetContextVariableByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_CONTEXT_VARIABLE_BY_ID;
    constructor(readonly mailDescriptionId: any, readonly mailVariableId: number) {
    }
}

export class SaveContextVariableAction {
    static readonly type: MailActionTypes = MailActionTypes.SAVE_CONTEXT_VARIABLE;
    constructor(readonly mailDescriptionId: any, readonly contextVariableObj: any) {
    }
}

export class UpdateContextVariableAction {
    static readonly type: MailActionTypes = MailActionTypes.UPDATE_CONTEXT_VARIABLE;
    constructor(readonly mailDescriptionId: any, readonly mailVariableId: number, readonly contextVariableObj: any) {
    }
}

export class DeleteContextVariableByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.DELETE_CONTEXT_VARIABLE_BY_ID;
    constructor(readonly mailDescriptionId: any, readonly mailVariableId: number) {
    }
}

export class GetMailContentPartListAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_CONTENT_PART_LIST;
    constructor(readonly mailDescriptionId: any) {
    }
}

export class GetMailContentPartByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_CONTENT_PART_BY_ID;
    constructor(readonly mailDescriptionId: any, readonly mailContentId: number) {
    }
}

export class SaveMailContentPartAction {
    static readonly type: MailActionTypes = MailActionTypes.SAVE_MAIL_CONTENT_PART;
    constructor(readonly mailDescriptionId: any, readonly mailContentObj: any) {
    }
}

export class UpdateMailContentPartAction {
    static readonly type: MailActionTypes = MailActionTypes.UPDATE_MAIL_CONTENT_PART;
    constructor(readonly mailDescriptionId: any, readonly mailContentId: number, readonly mailContentObj: any) {
    }
}

export class DeleteMailContentPartByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.DELETE_MAIL_CONTENT_PART_BY_ID;
    constructor(readonly mailDescriptionId: any, readonly mailContentId: number) {
    }
}

export class GenerateEmbedImageAction {
    static readonly type: MailActionTypes = MailActionTypes.GENERATE_EMBED_IMAGE;
    constructor(readonly mailDescriptionId: any, readonly mailContentId: number, readonly fileObj: any, readonly params: any) {
    }
}

export class GetCustomerGroupListByMailDescriptionIdAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_CUSTOMER_GROUP_LIST_BY_MAIL_DESCRIPTION_ID;
    constructor(readonly mailDescriptionId: any) {
    }
}

export class AssignCustomerGroupToMailDescriptionAction {
    static readonly type: MailActionTypes = MailActionTypes.ASSIGN_CUSTOMER_GROUP_TO_MAIL_DESCRIPTION;
    constructor(readonly mailDescriptionId: any, readonly groupCode: any, readonly params: any) {
    }
}

export class DeleteMailDescriptionCustomerGroupAction {
    static readonly type: MailActionTypes = MailActionTypes.DELETE_MAIL_DESCRIPTION_CUSTOMER_GROUP;
    constructor(readonly mailDescriptionId: any, readonly groupCode: any) {
    }
}

export class MailDescriptionProcessAction {
    static readonly type: MailActionTypes = MailActionTypes.MAIL_DESCRIPTION_PROCESS;
    constructor(readonly mailDescriptionId: any) {
    }
}

export class GetCustomerGroupMailPartListAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_CUSTOMER_GROUP_MAIL_PART_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetCustomerGroupMailPartCountAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_CUSTOMER_GROUP_MAIL_PART_LIST_COUNT;
    constructor(readonly filter: any) {
    }
}

export class GetCustomerGroupMailPartByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_CUSTOMER_GROUP_MAIL_PART_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveCustomerGroupMailPartAction {
    static readonly type: MailActionTypes = MailActionTypes.SAVE_CUSTOMER_GROUP_MAIL_PART;
    constructor(readonly customerGroupMailPart: any) {
    }
}

export class UpdateCustomerGroupMailPartAction {
    static readonly type: MailActionTypes = MailActionTypes.UPDATE_CUSTOMER_GROUP_MAIL_PART;
    constructor(readonly id: number, readonly customerGroupMailPart: any) {
    }
}

export class DeleteCustomerGroupMailPartByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.DELETE_CUSTOMER_GROUP_MAIL_PART_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetMailPreviewByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_PREVIEW_BY_ID;
    constructor(readonly previewId: number,readonly params : HttpParams) {
    }
}
