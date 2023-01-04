export interface CustomerManagementModel {
    customerList: any;
    customerViewConfigurationList: any;
    customer: any;
    customerDataSource: any;
    staffList: any;
    staff: any;
    utilityCredentialList: any;
    utilityCredentialDataSourceList: any;
    openedUtilityCredential : any
    openedUtilityCredentialById : any; 
    usagePoints : any;
    utilityCredential: any;
    customerEventList: any;
    customerEventListByCode: any;
    customerEvent: any;
    alertList: any;
    alert: any;
    staffNoteList: any;
    staffNote: any;
    customerFileList: any;
    customerFile: any;
    emailSettingList: any;
    sendActivationMail: any;
    clearCustomerValueCache: any;
    recalculateCustomerVariable: any;
    reorderCustomerBill: any,
    rescrapeCustomerUsage: any;
    validateCustomerData: any;
    passwordValidationRule: any;
    validateNewPassword: any;
    saveValidatePassword: any;
    setNewPassword: any;
    roleListByUserId: any;
    userCustomerGroupList: any;
    userCustomerGroup: any;
    optOutList: any;
    optOut: any;
    electricityRatePlan: any;
    heatingRatePlan: any;
    weatherStation: any;
    error: Error;
    rescrapeDateData : any;
}
