export enum MailActionTypes {
    GET_MAIL_DESCRIPTION_LIST = 'Get All MailDescription List',
    GET_MAIL_DESCRIPTION_BY_ID = 'Get MailDescription By Id',
    SAVE_MAIL_DESCRIPTION = 'Save MailDescription',
    UPDATE_MAIL_DESCRIPTION = 'Update MailDescription',
    DELETE_MAIL_DESCRIPTION_BY_ID = 'Delete MailDescription By Id',
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
}

export class GetMailDescriptionListAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_DESCRIPTION_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
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

export class GetContextVariableListAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_CONTEXT_VARIABLE_LIST;
    constructor() {
    }
}

export class GetContextVariableByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_CONTEXT_VARIABLE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveContextVariableAction {
    static readonly type: MailActionTypes = MailActionTypes.SAVE_CONTEXT_VARIABLE;
    constructor(readonly contextVariable: any) {
    }
}

export class UpdateContextVariableAction {
    static readonly type: MailActionTypes = MailActionTypes.UPDATE_CONTEXT_VARIABLE;
    constructor(readonly id: number, readonly contextVariable: any) {
    }
}

export class DeleteContextVariableByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.DELETE_CONTEXT_VARIABLE_BY_ID;
    constructor(readonly id: number) {
    }
}

export class GetMailContentPartListAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_CONTENT_PART_LIST;
    constructor() {
    }
}

export class GetMailContentPartByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.GET_MAIL_CONTENT_PART_BY_ID;
    constructor(readonly id: number) {
    }
}

export class SaveMailContentPartAction {
    static readonly type: MailActionTypes = MailActionTypes.SAVE_MAIL_CONTENT_PART;
    constructor(readonly mailContentPart: any) {
    }
}

export class UpdateMailContentPartAction {
    static readonly type: MailActionTypes = MailActionTypes.UPDATE_MAIL_CONTENT_PART;
    constructor(readonly id: number, readonly mailContentPart: any) {
    }
}

export class DeleteMailContentPartByIdAction {
    static readonly type: MailActionTypes = MailActionTypes.DELETE_MAIL_CONTENT_PART_BY_ID;
    constructor(readonly id: number) {
    }
}
