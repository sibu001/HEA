export interface CustomerManagementModel {
    customerList: any;
    customerViewConfigurationList: any;
    customer: any;
    customerDataSource: any;
    staffList: any;
    staff: any;
    utilityCredentialList: any;
    utilityCredentialDataSourceList: any;
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
    sendActivationMail: any;
    clearCustomerValueCache: any;
    recalculateCustomerVariable: any;
    rescrapeCustomerUsage: any;
    validateCustomerData: any;
    error: Error;
}
