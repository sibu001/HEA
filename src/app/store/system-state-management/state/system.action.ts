import { HttpParams } from "@angular/common/http";

export enum SystemActionTypes {
    GET_CUSTOMER_GROUP_LIST = 'Get All Customer Group List',
    GET_CUSTOMER_GROUP_BY_ID = 'Get Customer Group By Id',
    ADD_CUSTOMER_GROUP_TO_TOPIC_DESCRIPTION = 'Add Customer Group To List',
    REMOVE_CUSTOMER_GROUP_TO_TOPIC_DESCRIPTION = 'Remove Customer Group To List',
    UPDATE_CUSTOMER_GROUP = 'Update Customer Group',
    SAVE_CUSTOMER_GROUP = 'Save Customer Group',
    DELETE_CUSTOMER_GROUP_BY_ID = 'Delete Customer Group By Id',
    GET_PLACE_LIST_BY_CUSTOMER_GROUP_ID = 'Get Place List by Customer Group Id',
    ASSIGN_PLACE_TO_CUSTOMER_GROUP = 'Assign Place to Customer Group',
    DELETE_PLACE_OF_CUSTOMER_GROUP = 'Delete Place of Customer Group',
    GET_PROGRAM_GROUP_LIST_BY_CUSTOMER_GROUP_ID = 'Get Program Group List by Customer Group Id',
    ASSIGN_PROGRAM_GROUP_TO_CUSTOMER_GROUP = 'Assign Program Group to Customer Group',
    DELETE_PROGRAM_GROUP_OF_CUSTOMER_GROUP = 'Delete Program Group of Customer Group',
    GET_VIEW_CONFIGURATION_LIST = 'Get All View Configuration List',
    GET_PROGRAM_GROUP_LIST = 'Get All Program Group List',
    GET_PROGRAM_GROUP_BY_ID = 'Get Program Group By Id',
    GET_PROGRAM_GROUP_BY_CUSTOMER_GROUP_ID = 'Get Customer Group By Id',
    UPDATE_PROGRAM_GROUP = 'Update Program Group',
    SAVE_PROGRAM_GROUP = 'Save Program Group',
    DELETE_PROGRAM_GROUP_BY_ID = 'Delete Program Group By Id',
    GET_CUSTOMER_ALERT_TYPE_LIST = 'Get All Customer AlertType List',
    GET_CUSTOMER_ALERT_TYPE_LIST_COUNT = 'Get All Customer AlertType List Count',
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
    GET_ROLE_LIST = 'Get Role List',
    GET_ROLE_BY_ID = 'Get Role By Id',
    SAVE_ROLE = 'Save Role',
    UPDATE_ROLE = 'Update Role',
    DELETE_ROLE = 'Delete Role',
    GET_THEMES_LIST = 'Get All Theme List',
    GET_BATCH_PERIOD_LIST = 'Get Batch Period List',
    GET_SCRAPING_UTILITY_LIST = 'Get Scraping Utility List',
    GET_CALCULATION_TYPE_LIST = 'Get Calculation Type List',
    GET_HOME_TYPE_LIST = 'Get Home Type List',
    GET_HOME_OCCUPANCY_LIST = 'Get Home Occupancy List',
    GET_HOME_SIZE_LIST = 'Get Home Size List',
    GET_COMPARISON_CODE_LIST = 'Get Comparison Code List',
    GET_LOT_SIZE_LIST = 'Get Lot Size List',
    GET_SCRAPING_PERIOD_LIST = 'Get Scraping Period List',
    GET_REPORT_TYPE_LIST = 'Get Report Type List',
    GET_MAIL_PERIOD_LIST = 'Get Mail Period List',
    GET_CONTENT_TYPE_LIST = 'Get Content Type List',
    CUSTOMER_GROUP_ERROR = 'Customer Error',
    SET_DEBUG_CONSOLE_DATA = 'Set Debug Console Data',
    RECOMMENDATION_LEAK_UNIQUE = 'Recommendation Leak and Unique',
    LOAD_RECOMMENDATION_LEAK_UNIQUE_BY_ID = 'Load Recommendation Leak and Unique By Id',
    LOAD_RELATED_RECOMMENDATION_LIST_BY_ID = 'Related Recommendation List By Id',
    DELETE_RECOMMENDATION_BY_ID = 'Delete Recommendation By Id',
    LOAD_RELATED_LEAKS_BY_ID = 'Load Related Leaks By Id',
    SAVE_RECOMMENDATION_LEAK_ACTION = 'Save Recommendation Leak and Unique',
    SAVE_RELATED_LEAK_ACTION = 'Save Related Leaks',
    SAVE_RELATED_RECOMMENDATION_ACTION = 'Save Related Recommendations',
    DELETE_RELATED_RECOMMENDATION_ACTION = 'Delete Related Recommendations',
    DELETE_RELATED_LEAK_ACTION = 'Delete Related Leaks',
    LOAD_SELECTED_TOPIC_GROUP_LIST_BY_ID = 'Load Selected Topic Group List By ID'

}
export class GetCustomerGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_GROUP_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
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

export class RecommendationsLeakAndUniqueAction{
    static readonly type : SystemActionTypes = SystemActionTypes.RECOMMENDATION_LEAK_UNIQUE;
    constructor(readonly id : number, readonly params : HttpParams){}
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

export class GetPlaceListByCustomerGroupIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PLACE_LIST_BY_CUSTOMER_GROUP_ID;
    constructor(readonly customerGroupId: any) {
    }
}

export class AssignPlaceToCustomerGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.ASSIGN_PLACE_TO_CUSTOMER_GROUP;
    constructor(readonly customerGroupId: any, readonly placeCode: any) {
    }
}

export class DeletePlaceOfCustomerGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_PLACE_OF_CUSTOMER_GROUP;
    constructor(readonly customerGroupId: any, readonly placeCode: any) {
    }
}

export class GetProgramGroupListByCustomerGroupIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PROGRAM_GROUP_LIST_BY_CUSTOMER_GROUP_ID;
    constructor(readonly customerGroupId: any) {
    }
}

export class AssignProgramGroupToCustomerGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.ASSIGN_PROGRAM_GROUP_TO_CUSTOMER_GROUP;
    constructor(readonly customerGroupId: any, readonly programGroupId: any) {
    }
}

export class DeleteProgramGroupOfCustomerGroupAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_PROGRAM_GROUP_OF_CUSTOMER_GROUP;
    constructor(readonly customerGroupId: any, readonly programGroupId: any) {
    }
}

export class GetProgramGroupListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_PROGRAM_GROUP_LIST;
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

// export class LoadProgramGroupByCustomerGroup{
//     static readonly type: SystemActionTypes = SystemActionTypes.GET_PROGRAM_GROUP_BY_CUSTOMER_GROUP_ID
//     constructor(readonly customerGroupId: Number){}
// }

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
    constructor(readonly force: boolean, readonly filter: any) {
    }
}

export class GetCustomerAlertTypeListCountAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CUSTOMER_ALERT_TYPE_LIST_COUNT;
    constructor(readonly force: boolean, readonly filter: any) {
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
    constructor(readonly force: boolean, readonly filter: any) {
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

export class GetRoleListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_ROLE_LIST;
    constructor(readonly force: boolean, readonly params: any) {
    }
}

export class GetRoleByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_ROLE_BY_ID;
    constructor(readonly roleCode: string) {
    }
}

export class UpdateRoleAction {
    static readonly type: SystemActionTypes = SystemActionTypes.UPDATE_ROLE;
    constructor(readonly roleCode: string, readonly role: any) {
    }
}

export class SaveRoleAction {
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_ROLE;
    constructor(readonly role: any) {
    }
}

export class DeleteRoleByIdAction {
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_ROLE;
    constructor(readonly roleCode: string) {
    }
}

export class GetThemesListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_THEMES_LIST;
    constructor(readonly force: boolean) {
    }
}

export class GetLookupValueBatchPeriodListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_BATCH_PERIOD_LIST;
}

export class GetLookupValueScrapingUtilityListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_SCRAPING_UTILITY_LIST;
}

export class GetLookupValueCalculationTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CALCULATION_TYPE_LIST;
}

export class GetLookupValueHomeTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_HOME_TYPE_LIST;
}

export class GetLookupValueHomeOccupancyListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_HOME_OCCUPANCY_LIST;
}

export class GetLookupValueHomeSizeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_HOME_SIZE_LIST;
}

export class GetLookupValueComparisonCodeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_COMPARISON_CODE_LIST;
}

export class GetLookupValueLotSizeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_LOT_SIZE_LIST;
}

export class GetLookupValueScrapingPeriodListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_SCRAPING_PERIOD_LIST;
}

export class GetReportTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_REPORT_TYPE_LIST;
}

export class GetMailPeriodListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_MAIL_PERIOD_LIST;
}

export class GetContentTypeListAction {
    static readonly type: SystemActionTypes = SystemActionTypes.GET_CONTENT_TYPE_LIST;
}

export class CustomerGroupError {
    static readonly type: SystemActionTypes = SystemActionTypes.CUSTOMER_GROUP_ERROR;
    constructor(readonly error: Error) {
    }
}

export class SetDebugConsoleData {
    static readonly type: SystemActionTypes = SystemActionTypes.SET_DEBUG_CONSOLE_DATA;
    constructor(readonly debugData: Error) {
    }
}

export class LoadRecommendationsLeakAndUniqueByIdAction{
    static readonly type: SystemActionTypes = SystemActionTypes.LOAD_RECOMMENDATION_LEAK_UNIQUE_BY_ID;
    constructor(readonly topicDescriptionId : number, readonly id : number) {
    }
}

export class LoadRelatedRecommendationListAction{
    static readonly type: SystemActionTypes = SystemActionTypes.LOAD_RELATED_RECOMMENDATION_LIST_BY_ID;
    constructor(readonly topicDescriptionId : number, readonly id : number) {
    }
}
export class DeleteRecommendationUniqueLeakById{
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_RECOMMENDATION_BY_ID;
    constructor(readonly topicDescriptionId : number, readonly id : number) {
    }
}

export class LoadRelatedLeakListAction{
    static readonly type: SystemActionTypes = SystemActionTypes.LOAD_RELATED_LEAKS_BY_ID;
    constructor(readonly topicDescriptionId : number, readonly id : number) {
    }
}

export class SaveRecommendationLeakAction{
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_RECOMMENDATION_LEAK_ACTION;
    constructor(readonly topicDescriptionId : number, readonly body : any) {
    }
}

export class SaveRelatedLeakAction{
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_RELATED_LEAK_ACTION;
    constructor(readonly topicDescriptionId : number, readonly leak : any ,readonly recommendationId : number) {
    }
}

export class SaveRelatedRecommendationAction{
    static readonly type: SystemActionTypes = SystemActionTypes.SAVE_RELATED_RECOMMENDATION_ACTION;
    constructor(readonly topicDescriptionId : number, readonly leakId : number ,readonly recommendation : any) {
    }
}

export class DeleteRelatedRecommendationAction{
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_RELATED_RECOMMENDATION_ACTION;
    constructor(readonly topicDescriptionId : number,readonly recommendation : any, readonly leakId : number ) {
    }
}

export class DeleteRelatedLeakAction{
    static readonly type: SystemActionTypes = SystemActionTypes.DELETE_RELATED_LEAK_ACTION;
    constructor(readonly topicDescriptionId : number, readonly leak : any ,readonly recommendationId : number) {
    }
}

export class SaveCustomerGoupToList{
    static readonly type: SystemActionTypes = SystemActionTypes.ADD_CUSTOMER_GROUP_TO_TOPIC_DESCRIPTION;
    constructor(readonly topicDescriptionId : number,readonly customerGroupId : number) {
    }
}

export class RemoveCustomerGroupList{
    static readonly type: SystemActionTypes = SystemActionTypes.REMOVE_CUSTOMER_GROUP_TO_TOPIC_DESCRIPTION;
    constructor(readonly topicDescriptionId : number,readonly customerGroupId : number) {
    }
}

export class LoadSelectedTopicGroupListAction{
    static readonly type: SystemActionTypes = SystemActionTypes.LOAD_SELECTED_TOPIC_GROUP_LIST_BY_ID;
    constructor(readonly id: number){}
}

