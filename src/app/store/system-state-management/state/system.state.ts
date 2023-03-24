import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { SystemTransformer } from '../transformer/transformer';
import {
    AssignPlaceToCustomerGroupAction,
    AssignProgramGroupToCustomerGroupAction,
    CustomerGroupError,
    DeleteCredentialTypeByIdAction,
    DeleteCustomerAlertTypeByIdAction,
    DeleteCustomerGroupByIdAction,
    DeletePlaceOfCustomerGroupAction,
    DeleteProgramGroupByIdAction,
    DeleteProgramGroupOfCustomerGroupAction,
    DeleteRoleByIdAction,
    GetCoachUserListAction,
    GetCredentialTypeByIdAction,
    GetCredentialTypeListAction,
    GetCustomerAlertTypeByIdAction,
    GetCustomerAlertTypeListAction,
    GetCustomerGroupByIdAction,
    GetCustomerGroupListAction,
    GetPlaceListByCustomerGroupIdAction,
    GetProgramGroupByIdAction,
    GetProgramGroupListAction,
    GetProgramGroupListByCustomerGroupIdAction,
    GetRoleByIdAction,
    GetRoleListAction,
    GetLookupValueScrapingPeriodListAction,
    GetLookupValueBatchPeriodListAction,
    GetThemesListAction,
    GetViewConfigurationListAction,
    SaveCredentialTypeAction,
    SaveCustomerAlertTypeAction,
    SaveCustomerGroupAction,
    SaveProgramGroupAction,
    SaveRoleAction,
    UpdateCredentialTypeAction,
    UpdateCustomerAlertTypeAction,
    UpdateCustomerGroupAction,
    UpdateProgramGroupAction,
    UpdateRoleAction,
    GetLookupValueHomeOccupancyListAction,
    GetLookupValueHomeTypeListAction,
    GetLookupValueHomeSizeListAction,
    GetLookupValueComparisonCodeListAction,
    GetLookupValueLotSizeListAction,
    GetLookupValueCalculationTypeListAction,
    GetLookupValueScrapingUtilityListAction,
    GetReportTypeListAction,
    SetDebugConsoleData,
    GetMailPeriodListAction,
    GetContentTypeListAction,
    RecommendationsLeakAndUniqueAction,
    LoadRecommendationsLeakAndUniqueByIdAction,
    LoadRelatedRecommendationListAction,
    DeleteRecommendationUniqueLeakById,
    LoadRelatedLeakListAction,
    SaveRecommendationLeakAction,
    SaveRelatedLeakAction,
    SaveRelatedRecommendationAction,
    DeleteRelatedRecommendationAction,
    DeleteRelatedLeakAction,
    SaveCustomerGoupToList,
    RemoveCustomerGroupList,
    LoadProgramGroupByCustomerGroup,
    LoadSelectedTopicGroupListAction
} from './system.action';
import { SystemManagementModel } from './system.model';

@State<SystemManagementModel>({
    name: 'systemManagement',
    defaults: {
        customerGroupList: undefined,
        customerGroup: undefined,
        placeListByCustomerGroupId: undefined,
        programGroupListByCustomerGroupId: undefined,
        viewConfigurationList: undefined,
        programGroupList: undefined,
        programGroup: undefined,
        customerAlertTypeList: undefined,
        customerAlertType: undefined,
        credentialTypeList: undefined,
        credentialType: undefined,
        coachUserList: undefined,
        roleList: undefined,
        role: undefined,
        themesList: undefined,
        batchPeriod: undefined,
        scrapingPeriod: undefined,
        homeType: undefined,
        homeOccupancy: undefined,
        homeSize: undefined,
        comparisonCode: undefined,
        lotSize: undefined,
        calculationType: undefined,
        scrapingUtility: undefined,
        reportType: undefined,
        debugConsoleData: undefined,
        mailPeriod: undefined,
        contentType: undefined,
        error: undefined,
        recommendation: undefined,
        recommendationList: undefined,
        relatedRecommendationList: undefined,
        relatedLeakList: undefined,
        customerProgramGroupList : undefined,     
        selectedTopicGroupList : undefined, 
    }

})

@Injectable()
export class SystemManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getCustomerGroupList(state: SystemManagementModel): any {
        return state.customerGroupList;
    }

    @Selector()
    static getCustomerGroupById(state: SystemManagementModel): any {
        return state.customerGroup;
    }

    @Selector()
    static getPlaceListByCustomerGroupId(state: SystemManagementModel): any {
        return state.programGroupListByCustomerGroupId;
    }

    @Selector()
    static getProgramGroupListByCustomerGroupId(state: SystemManagementModel): any {
        return state.placeListByCustomerGroupId;
    }

    @Selector()
    static getViewConfigurationList(state: SystemManagementModel): any {
        return state.viewConfigurationList;
    }

    @Selector()
    static getProgramGroupList(state: SystemManagementModel): any {
        return state.programGroupList;
    }

    @Selector()
    static getProgramGroupById(state: SystemManagementModel): any {
        return state.programGroup;
    }

    @Selector()
    static getCustomerAlertTypeList(state: SystemManagementModel): any {
        return state.customerAlertTypeList;
    }

    @Selector()
    static getCustomerAlertTypeById(state: SystemManagementModel): any {
        return state.customerAlertType;
    }

    @Selector()
    static getCredentialTypeList(state: SystemManagementModel): any {
        return state.credentialTypeList;
    }

    @Selector()
    static getCredentialTypeById(state: SystemManagementModel): any {
        return state.credentialType;
    }

    @Selector()
    static getCoachUserList(state: SystemManagementModel): any {
        return state.coachUserList;
    }

    @Selector()
    static getRoleList(state: SystemManagementModel): any {
        return state.roleList;
    }

    @Selector()
    static getRoleById(state: SystemManagementModel): any {
        return state.role;
    }

    @Selector()
    static getThemeList(state: SystemManagementModel): any {
        return state.themesList;
    }

    @Selector()
    static getBatchPeriodList(state: SystemManagementModel): any {
        return state.batchPeriod;
    }

    @Selector()
    static getScrapingPeriodList(state: SystemManagementModel): any {
        return state.scrapingPeriod;
    }

    @Selector()
    static getCalculationTypeList(state: SystemManagementModel): any {
        return state.calculationType;
    }

    @Selector()
    static getScrapingUtilityList(state: SystemManagementModel): any {
        return state.scrapingUtility;
    }

    @Selector()
    static getHomeTypeList(state: SystemManagementModel): any {
        return state.homeType;
    }

    @Selector()
    static getHomeOccupancyList(state: SystemManagementModel): any {
        return state.homeOccupancy;
    }

    @Selector()
    static getHomeSizeList(state: SystemManagementModel): any {
        return state.homeSize;
    }

    @Selector()
    static getComparisonCodeList(state: SystemManagementModel): any {
        return state.comparisonCode;
    }

    @Selector()
    static getLotSizeList(state: SystemManagementModel): any {
        return state.lotSize;
    }

    @Selector()
    static getReportTypeList(state: SystemManagementModel): any {
        return state.reportType;
    }

    @Selector()
    static getDebugConsoleData(state: SystemManagementModel): any {
        return state.debugConsoleData;
    }

    @Selector()
    static getMailPeriod(state: SystemManagementModel): any {
        return state.mailPeriod;
    }

    @Selector()
    static getContentType(state: SystemManagementModel): any {
        return state.contentType;
    }

    @Selector()
    static getRecommendatonLeakAndUnique(state: SystemManagementModel) {
        return state.recommendationList
    }

    @Selector()
    static getRecommendatonLeakAndUniqueById(state: SystemManagementModel) {
        return state.recommendation
    }

    @Selector()
    static getRelatedRecommendatonById(state: SystemManagementModel) {
        return state.relatedRecommendationList;
    }


    @Selector()
    static getrelatedLeaksById(state: SystemManagementModel) {
        return state.relatedLeakList;
    }

    @Selector()
    static getCustomerProgramGroupList(state: SystemManagementModel){
        return state.customerProgramGroupList;
    }

    @Selector()
    static getSelectedTopicGroupList(state: SystemManagementModel) : any {
        return state.selectedTopicGroupList;
    }

    @Action(GetCustomerGroupListAction)
    getAllCustomerGroup(ctx: StateContext<SystemManagementModel>, action: GetCustomerGroupListAction): Actions {
        // const force: boolean = action.force || SystemManagementState.getCustomerGroupList(ctx.getState()) === undefined;
        // const force = ctx.getState().customerGroupList ;
        const force = true;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.customerGroups, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            customerGroupList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                            ctx.dispatch(new CustomerGroupError(error));
                        }));
        }
        return result;
    }

    @Action(GetCustomerGroupByIdAction)
    getCustomerGroupById(ctx: StateContext<SystemManagementModel>, action: GetCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteCustomerGroupByIdAction)
    deleteCustomerGroupById(ctx: StateContext<SystemManagementModel>, action: DeleteCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveCustomerGroupAction)
    saveCustomerGroup(ctx: StateContext<SystemManagementModel>, action: SaveCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerGroup, AppConstant.customerGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCustomerGroupAction)
    updateCustomerGroup(ctx: StateContext<SystemManagementModel>, action: UpdateCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customerGroup, AppConstant.customerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetPlaceListByCustomerGroupIdAction)
    getPlaceListByCustomerGroupId(ctx: StateContext<SystemManagementModel>, action: GetPlaceListByCustomerGroupIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.programGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        placeListByCustomerGroupId: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.errorMessage);
                        ctx.dispatch(new CustomerGroupError(error));
                    }));
    }

    @Action(DeletePlaceOfCustomerGroupAction)
    deletePlaceOfCustomerGroup(ctx: StateContext<SystemManagementModel>, action: DeletePlaceOfCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.places + '/' + action.placeCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(AssignPlaceToCustomerGroupAction)
    assignPlaceToCustomerGroup(ctx: StateContext<SystemManagementModel>, action: AssignPlaceToCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost({}, AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.places + '/' + action.placeCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetProgramGroupListByCustomerGroupIdAction)
    getProgramGroupListByCustomerGroupId(ctx: StateContext<SystemManagementModel>, action: GetProgramGroupListByCustomerGroupIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.programGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        programGroupListByCustomerGroupId: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.errorMessage);
                        ctx.dispatch(new CustomerGroupError(error));
                    }));
    }

    @Action(DeleteProgramGroupOfCustomerGroupAction)
    deleteProgramGroupOfCustomerGroup(ctx: StateContext<SystemManagementModel>, action: DeleteProgramGroupOfCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.programGroups + '/' + action.programGroupId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(AssignProgramGroupToCustomerGroupAction)
    assignProgramGroupToCustomerGroup(ctx: StateContext<SystemManagementModel>, action: AssignProgramGroupToCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost({}, AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.programGroups + '/' + action.programGroupId)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetViewConfigurationListAction)
    getAllViewConfiguration(ctx: StateContext<SystemManagementModel>, action: GetViewConfigurationListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getViewConfigurationList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.viewConfigurations)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            viewConfigurationList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }
    @Action(GetProgramGroupListAction)
    getAllProgramGroup(ctx: StateContext<SystemManagementModel>, action: GetProgramGroupListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getProgramGroupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.programGroups, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            programGroupList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(LoadProgramGroupByCustomerGroup)
    loadProgramGroupByCustomerGroup(ctx: StateContext<SystemManagementModel>, action: LoadProgramGroupByCustomerGroup) : Actions{
        document.getElementById('loader').classList.add('loading');
        let result = this.loginService.performGet('/' + AppConstant.customerGroups + '/' + action.customerGroupId + '/' + AppConstant.programGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerProgramGroupList: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    
        return result;
    }


    @Action(GetProgramGroupByIdAction)
    getAllProgramGroupById(ctx: StateContext<SystemManagementModel>, action: GetProgramGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.programGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        programGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteProgramGroupByIdAction)
    deleteProgramGroupById(ctx: StateContext<SystemManagementModel>, action: DeleteProgramGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.programGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveProgramGroupAction)
    saveProgramGroup(ctx: StateContext<SystemManagementModel>, action: SaveProgramGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.programGroup, AppConstant.programGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        programGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateProgramGroupAction)
    updateProgramGroup(ctx: StateContext<SystemManagementModel>, action: UpdateProgramGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.programGroup, AppConstant.programGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        programGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }


    @Action(GetCustomerAlertTypeListAction)
    getAllCustomerAlertType(ctx: StateContext<SystemManagementModel>, action: GetCustomerAlertTypeListAction): Actions {
        const force = ctx.getState().customerAlertTypeList;

        // const force: boolean = action.force || SystemManagementState.getCustomerAlertTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force == undefined) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.customerAlertTypes, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            customerAlertTypeList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetCustomerAlertTypeByIdAction)
    getCustomerAlertTypeById(ctx: StateContext<SystemManagementModel>, action: GetCustomerAlertTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.customerAlertTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        customerAlertType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteCustomerAlertTypeByIdAction)
    deleteCustomerAlertTypeById(ctx: StateContext<SystemManagementModel>, action: DeleteCustomerAlertTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.customerAlertTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveCustomerAlertTypeAction)
    saveCustomerAlertType(ctx: StateContext<SystemManagementModel>, action: SaveCustomerAlertTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.customerAlertType, AppConstant.customerAlertTypes)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        customerAlertType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCustomerAlertTypeAction)
    updateCustomerAlertType(ctx: StateContext<SystemManagementModel>, action: UpdateCustomerAlertTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.customerAlertType, AppConstant.customerAlertTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        customerAlertType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }



    @Action(GetCredentialTypeListAction)
    getAllCredentialType(ctx: StateContext<SystemManagementModel>, action: GetCredentialTypeListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCredentialTypeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.credentialTypes, action.filter)
                .pipe(
                    tap((response: any) => {
                        const res = SystemTransformer.transformCredentialType(response);
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            credentialTypeList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetCredentialTypeByIdAction)
    getCredentialTypesById(ctx: StateContext<SystemManagementModel>, action: GetCredentialTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.credentialTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        credentialType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }


    @Action(DeleteCredentialTypeByIdAction)
    deleteCredentialTypeById(ctx: StateContext<SystemManagementModel>, action: DeleteCredentialTypeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.credentialTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveCredentialTypeAction)
    saveCredentialType(ctx: StateContext<SystemManagementModel>, action: SaveCredentialTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.credentialType, AppConstant.credentialTypes)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        credentialType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateCredentialTypeAction)
    updateCredentialType(ctx: StateContext<SystemManagementModel>, action: UpdateCredentialTypeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.credentialType, AppConstant.credentialTypes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        credentialType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetCoachUserListAction)
    getAllCoachUser(ctx: StateContext<SystemManagementModel>, action: GetCoachUserListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getCoachUserList(ctx.getState()) !== undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.users + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            coachUserList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetRoleListAction)
    getAllRole(ctx: StateContext<SystemManagementModel>, action: GetRoleListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getRoleList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.roles, action.params)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        const res = SystemTransformer.transformRole(response.data);
                        ctx.patchState({
                            roleList: res,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetRoleByIdAction)
    getRolesById(ctx: StateContext<SystemManagementModel>, action: GetRoleByIdAction) {
        return this.loginService.performGet(AppConstant.roles + '/' + action.roleCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        role: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }


    @Action(DeleteRoleByIdAction)
    deleteRoleById(ctx: StateContext<SystemManagementModel>, action: DeleteRoleByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.roles + '/' + action.roleCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(SaveRoleAction)
    saveRole(ctx: StateContext<SystemManagementModel>, action: SaveRoleAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.role, AppConstant.roles)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        role: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateRoleAction)
    updateRole(ctx: StateContext<SystemManagementModel>, action: UpdateRoleAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.role, AppConstant.roles + '/' + action.roleCode)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        role: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetLookupValueBatchPeriodListAction)
    getAllBatchPeriodList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueBatchPeriodListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/BATCH_PERIOD')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        batchPeriod: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }

    @Action(GetLookupValueScrapingPeriodListAction)
    getAllScrapingPeriodList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueScrapingPeriodListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/SCRAPING_PERIOD')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        scrapingPeriod: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetThemesListAction)
    getAllThemesList(ctx: StateContext<SystemManagementModel>, action: GetThemesListAction): Actions {
        const force: boolean = action.force || SystemManagementState.getThemeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.themes)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            themesList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetLookupValueHomeTypeListAction)
    getAllHomeTypeList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueHomeTypeListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/HOME_TYPE')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        homeType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetLookupValueHomeOccupancyListAction)
    getAllHomeOccupancyList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueHomeOccupancyListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/HOME_OCCUPANCY')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        homeOccupancy: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetLookupValueHomeSizeListAction)
    getAllHomeSizeList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueHomeSizeListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/HOME_SIZE')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        homeSize: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetLookupValueComparisonCodeListAction)
    getAllComparisonCodeList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueComparisonCodeListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/COMPARISON_CODE')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        comparisonCode: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetLookupValueLotSizeListAction)
    getAllLotSizeList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueLotSizeListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/LOT_SIZE')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        lotSize: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetLookupValueCalculationTypeListAction)
    getAllCalculationTypeList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueLotSizeListAction): Actions {

        if (ctx.getState().calculationType)
            return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/CALCULATION_TYPE')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        calculationType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetLookupValueScrapingUtilityListAction)
    getAllScrapingUtilityList(ctx: StateContext<SystemManagementModel>, action: GetLookupValueScrapingUtilityListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/SCRAPING_UTILITY')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        scrapingUtility: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetReportTypeListAction)
    getAllReportTypeList(ctx: StateContext<SystemManagementModel>, action: GetReportTypeListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/REPORT_TYPE')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        reportType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetMailPeriodListAction)
    getAllMailPeriodList(ctx: StateContext<SystemManagementModel>, action: GetMailPeriodListAction): Actions {
        document.getElementById('loader').classList.add('loading');

        const mailPeriod = ctx.getState().mailPeriod;
        if(mailPeriod){
            return null;
        }

        return this.loginService.performGet(AppConstant.lookupValues + '/MAIL_PERIOD')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        mailPeriod: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetContentTypeListAction)
    getAllContentTypeList(ctx: StateContext<SystemManagementModel>, action: GetContentTypeListAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.lookupValues + '/CONTENT_TYPE')
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        contentType: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(CustomerGroupError)
    loadCustomerGroupError(ctx: StateContext<SystemManagementModel>, action: CustomerGroupError): void {
        /* istanbul ignore next */
        ctx.patchState({
            error: action.error,
            customerGroupList: undefined
        });
    }

    @Action(SetDebugConsoleData)
    setDebugConsoleData(ctx: StateContext<SystemManagementModel>, action: SetDebugConsoleData): void {
        /* istanbul ignore next */
        ctx.patchState({
            debugConsoleData: action.debugData
        });
    }


    @Action(LoadRecommendationsLeakAndUniqueByIdAction)
    loadRecommendationsLeakAndUniqueByIdAction(ctx: StateContext<SystemManagementModel>, action: LoadRecommendationsLeakAndUniqueByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');

        const recommendation = ctx.getState().recommendation;
        if (recommendation && recommendation.id == action.id)
            return null;

        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' + AppConstant.recommendations + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        recommendation: response,
                    })
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(RecommendationsLeakAndUniqueAction)
    recommendationsLeakAndUniqueAction(ctx: StateContext<SystemManagementModel>, action: RecommendationsLeakAndUniqueAction) {
        document.getElementById('loader').classList.add('loading')

        //    const recommendationList = ctx.getState().recommendationList;
        //     if(recommendationList && recommendationList[0] && recommendationList[0].surveyDescriptionId == action.id )
        //         return null;

        return this.loginService.performGetWithParams(AppConstant.topicDescription + '/' + action.id + '/' + 'recommendations',action.params)
            .subscribe(
                response => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        recommendationList: response
                    })
                }, error => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
    }

    @Action(LoadRelatedRecommendationListAction)
    loadRelatedRecommendationListAction(ctx: StateContext<SystemManagementModel>, action: LoadRelatedRecommendationListAction): Actions {

        const relatedRecommendationList =  ctx.getState().relatedRecommendationList;
        if(relatedRecommendationList && relatedRecommendationList[0] && relatedRecommendationList[0].relativeCaller == action.id)
            return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' + AppConstant.recommendations + '/' + action.id + '/' + AppConstant.recommendations)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    if(response[0]){
                        response[0].relativeCaller = action.id;
                    }

                    ctx.patchState({
                        relatedRecommendationList: response,
                    })
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(LoadRelatedLeakListAction)
    loadRelatedLeakListAction(ctx: StateContext<SystemManagementModel>, action: LoadRelatedLeakListAction): Actions {

        const relatedLeakList = ctx.getState().relatedLeakList;
        if(relatedLeakList && relatedLeakList[0] && relatedLeakList[0].relativeCaller == action.id)
            return null;

        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' + AppConstant.recommendations + '/' + action.id + '/' + AppConstant.leaks)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    if(response[0]){
                        response[0].relativeCaller = action.id;
                    }

                    ctx.patchState({
                        relatedLeakList: response,
                    })
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteRecommendationUniqueLeakById)
    deleteRecommendationUniqueLeakById(ctx: StateContext<SystemManagementModel>, action: DeleteRecommendationUniqueLeakById): Actions {
        let recommendationList = ctx.getState().recommendationList;
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' + AppConstant.recommendations + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // if(recommendationList){
                    //     recommendationList = recommendationList.filter( (recommendation) => recommendation.id != action.id);
                    //     ctx.patchState({
                    //         recommendationList : recommendationList
                    //     })
                    // }
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }


    @Action(SaveRecommendationLeakAction)
    saveRecommendationLeakAction(ctx: StateContext<SystemManagementModel>, action: SaveRecommendationLeakAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.body, AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' + AppConstant.recommendations)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        recommendation: response,
                    })
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }

    @Action(SaveRelatedLeakAction)
    saveRelatedLeakAction(ctx: StateContext<SystemManagementModel>, action: SaveRelatedLeakAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost({}, AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' 
        + AppConstant.recommendations + '/' + action.recommendationId + '/' + AppConstant.leaks + '/' + action.leak.id )
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    const relatedLeakList= ctx.getState().relatedLeakList;
                    if(relatedLeakList){
                        relatedLeakList.push(action.leak);
                        ctx.patchState({
                            relatedLeakList : [...relatedLeakList]
                        })
                    } else{
                        ctx.patchState({
                            relatedLeakList : [action.leak]
                        })
                    }
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }


    @Action(SaveRelatedRecommendationAction)
    saveRelatedRecommendationAction(ctx: StateContext<SystemManagementModel>, action: SaveRelatedRecommendationAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost({}, AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' 
        + AppConstant.recommendations + '/' + action.leakId + '/' + AppConstant.recommendations + '/' + action.recommendation.id )
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    const relatedRecommendationList= ctx.getState().relatedRecommendationList;
                    if(relatedRecommendationList){
                        relatedRecommendationList.push(action.recommendation);
                        ctx.patchState({
                            relatedRecommendationList : [...relatedRecommendationList]
                        })
                    } else{
                        ctx.patchState({
                            relatedRecommendationList : [action.recommendation]
                        })
                    }
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }

    @Action(DeleteRelatedLeakAction)
    deleteRelatedLeakAction(ctx: StateContext<SystemManagementModel>, action: DeleteRelatedLeakAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' 
        + AppConstant.recommendations + '/' + action.recommendationId + '/' + AppConstant.leaks + '/' + action.leak.id )
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    let relatedLeakList = ctx.getState().relatedLeakList;
                    if(relatedLeakList){
                        relatedLeakList = relatedLeakList.filter(ele => ele.id != action.leak.id);
                        ctx.patchState({relatedLeakList : relatedLeakList})
                    }
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }


    @Action(DeleteRelatedRecommendationAction)
    deleteRelatedRecommendationAction(ctx: StateContext<SystemManagementModel>, action: DeleteRelatedRecommendationAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' 
        + AppConstant.recommendations + '/' + action.leakId + '/' + AppConstant.recommendations + '/' + action.recommendation.id )
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    let relatedRecommendationList = ctx.getState().relatedRecommendationList;
                    if(relatedRecommendationList){
                        relatedRecommendationList = relatedRecommendationList.filter(ele => ele.id != action.recommendation.id );
                        ctx.patchState( { relatedRecommendationList : relatedRecommendationList})
                    }
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }

    @Action(SaveCustomerGoupToList)
    saveCustomerGoupToList(ctx: StateContext<SystemManagementModel>, action: SaveCustomerGoupToList): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPostWithParam({},AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' 
        +  AppConstant.topicDescriptionGroups, new HttpParams().append('customerGroupId', action.customerGroupId.toString()))
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    const globalState = ctx.getState();
                    const customerGroupList = globalState.customerGroupList;
                    let selectedCustomerGroupList = globalState.selectedTopicGroupList;
                    
                    const customerGroupObject =  customerGroupList.find((item) => item.id == response.customerGroupId);

                    if(selectedCustomerGroupList == undefined){
                        selectedCustomerGroupList = [];
                    }
                    
                    response.customerGroup = customerGroupObject;
                    selectedCustomerGroupList.push(response);

                    ctx.patchState({
                        selectedTopicGroupList : [...selectedCustomerGroupList]
                    })


                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }

    @Action(RemoveCustomerGroupList)
    removeCustomerGroupList(ctx: StateContext<SystemManagementModel>, action: RemoveCustomerGroupList): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDeleteWithParams(AppConstant.topicDescription + '/' + action.topicDescriptionId + '/' 
        +  AppConstant.topicDescriptionGroups, new HttpParams().append('customerGroupId', action.customerGroupId.toString()))
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    const globalState = ctx.getState();
                    let selectedCustomerGroupList = globalState.selectedTopicGroupList;

                    selectedCustomerGroupList = 
                    selectedCustomerGroupList.filter( data => data.customerGroupId != action.customerGroupId);

                    ctx.patchState({
                        selectedTopicGroupList : [...selectedCustomerGroupList]
                    })

                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));

    }


    @Action(LoadSelectedTopicGroupListAction)
    getSelectedTopicGroupListAction(ctx : StateContext<SystemManagementModel>, action: LoadSelectedTopicGroupListAction) : Actions{

        const selectedTopicGroupList = ctx.getState().selectedTopicGroupList;

        if(selectedTopicGroupList && action.id == selectedTopicGroupList[0].surveyDescriptionId){
            return;
        }

        return this.loginService.performGet(AppConstant.topicDescription + '/' + action.id + '/surveyDescriptionGroups')
        .pipe(
            tap((response: any) => {
                document.getElementById('loader').classList.remove('loading');
                ctx.patchState({
                    selectedTopicGroupList: response,
                });
            },
                error => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.message);
            })
        )

    }
}
