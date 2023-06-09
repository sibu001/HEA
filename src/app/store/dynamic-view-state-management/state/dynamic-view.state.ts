import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import { TopicUtilityTransformer } from '../../topic-state-management/transformer/transformer';
import {
    GetAttributeListAction,
    GetAttributeByIdAction,
    DeleteAttributeByIdAction,
    SaveAttributeAction,
    UpdateAttributeAction,
    DeleteJavaScriptPageByIdAction,
    GetJavaScriptPageByIdAction,
    SaveJavaScriptPageAction,
    UpdateJavaScriptPageAction,
    GetJavaScriptPageListAction,
    DeleteJavaScriptCustomerGroupByIdAction,
    GetJavaScriptCustomerGroupByIdAction,
    GetJavaScriptCustomerGroupListAction,
    SaveJavaScriptCustomerGroupAction,
    UpdateJavaScriptCustomerGroupAction,
    DeleteDynamicViewByIdAction,
    GetDynamicViewByIdAction,
    GetDynamicViewListAction,
    SaveDynamicViewAction,
    UpdateDynamicViewAction,
    GetJavaScriptPageCountAction,
} from './dynamic-view.action';
import { DynamicViewManagementModel } from './dynamic-view.model';


@State<DynamicViewManagementModel>({
    name: 'dynamicViewManagement',
    defaults: {
        JavaScriptPageList: undefined,
        JavaScriptPageCount : 0,
        JavaScriptPage: undefined,
        dynamicViewList: undefined,
        dynamicView: undefined,
        attributeList: undefined,
        attribute: undefined,
        javaScriptCustomerGroupList: undefined,
        javaScriptCustomerGroup: undefined,
    }
})

@Injectable()
export class DynamicViewManagementState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getJavaScriptPageList(state: DynamicViewManagementModel): any {
        return state.JavaScriptPageList.response;
    }

    @Selector()
    static getJavaScriptPageCount(state: DynamicViewManagementModel): any {
        return state.JavaScriptPageCount.response;
    }

    @Selector()
    static getJavaScriptPageById(state: DynamicViewManagementModel): any {
        return state.JavaScriptPage;
    }

    @Selector()
    static getJavaScriptCustomerGroupList(state: DynamicViewManagementModel): any {
        return state.javaScriptCustomerGroupList;
    }

    @Selector()
    static getJavaScriptCustomerGroup(state: DynamicViewManagementModel): any {
        return state.javaScriptCustomerGroup;
    }

    @Selector()
    static getDynamicViewList(state: DynamicViewManagementModel): any {
        return state.dynamicViewList;
    }

    @Selector()
    static getDynamicViewById(state: DynamicViewManagementModel): any {
        return state.dynamicView;
    }

    @Selector()
    static getAttributeList(state: DynamicViewManagementModel): any {
        return state.attributeList;
    }

    @Selector()
    static getAttributeById(state: DynamicViewManagementModel): any {
        return state.attribute;
    }

    @Action(GetJavaScriptPageListAction)
    getAllJavaScriptPage(ctx: StateContext<DynamicViewManagementModel>, action: GetJavaScriptPageListAction): Actions {
        
        const JavaScriptPageList = ctx.getState().JavaScriptPageList;
        let force: boolean = action.force 
            || (!JavaScriptPageList || !AppUtility.isRequestAndStateParamsSame(action.filter,JavaScriptPageList.requestParams));

        if (force) {
            document.getElementById('loader').classList.add('loading');
            return this.loginService.performGetWithParams(AppConstant.javaScriptPages, action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            JavaScriptPageList: AppUtility.addRequestParamsToObjectState({response : response}, action.filter),
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return;
    }

    @Action(GetJavaScriptPageCountAction)
    getJavaScriptPageCount(ctx: StateContext<DynamicViewManagementModel>, action: GetJavaScriptPageCountAction): Actions {
        
        const JavaScriptPageCount = ctx.getState().JavaScriptPageCount;
        let force: boolean = action.force 
            || (!JavaScriptPageCount || !AppUtility.isRequestAndStateParamsSame(action.filter,JavaScriptPageCount.requestParams));

        if (force) {
            document.getElementById('loader').classList.add('loading');
            return this.loginService.performGetWithParams(
                AppUtility.endPointGenerator([AppConstant.javaScriptPages,'count']), action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            JavaScriptPageCount: AppUtility.addRequestParamsToObjectState({response : response}, action.filter),
                        });
                    },this.utilityService.errorCallbak));
        }
        return;
    }

    @Action(GetJavaScriptPageByIdAction)
    getJavaScriptPageById(ctx: StateContext<DynamicViewManagementModel>, action: GetJavaScriptPageByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.javaScriptPages + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        JavaScriptPage: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteJavaScriptPageByIdAction)
    deleteJavaScriptPageById(ctx: StateContext<DynamicViewManagementModel>, action: DeleteJavaScriptPageByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.javaScriptPages + '/' + action.id)
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

    @Action(SaveJavaScriptPageAction)
    saveJavaScriptPage(ctx: StateContext<DynamicViewManagementModel>, action: SaveJavaScriptPageAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.javaScriptPage, AppConstant.javaScriptPages)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        JavaScriptPage: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        if (error.error.errorMessage == "org.hibernate.exception.ConstraintViolationException: could not execute statement")
                            this.utilityService.showErrorMessage("Duplicate entry '" + action.javaScriptPage.code + "' for key 'CODE'");
                        else 
                            this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateJavaScriptPageAction)
    updateJavaScriptPage(ctx: StateContext<DynamicViewManagementModel>, action: UpdateJavaScriptPageAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.javaScriptPage, AppConstant.javaScriptPages + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        JavaScriptPage: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetDynamicViewListAction)
    getAllDynamicView(ctx: StateContext<DynamicViewManagementModel>, action: GetDynamicViewListAction): Actions {
        const force: boolean = action.force || DynamicViewManagementState.getDynamicViewList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.dynamicViews,action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        response = TopicUtilityTransformer.transformDynamicFilterList(response);
                        ctx.patchState({
                            dynamicViewList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetJavaScriptCustomerGroupListAction)
    getAllJavaScriptCustomerGroup(ctx: StateContext<DynamicViewManagementModel>, action: GetJavaScriptCustomerGroupListAction): Actions {
        const force: boolean = action.force || DynamicViewManagementState.getJavaScriptCustomerGroupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.javaScriptCustomerGroups + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            javaScriptCustomerGroupList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetJavaScriptCustomerGroupByIdAction)
    getJavaScriptCustomerGroupById(ctx: StateContext<DynamicViewManagementModel>, action: GetJavaScriptCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.javaScriptCustomerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        javaScriptCustomerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteJavaScriptCustomerGroupByIdAction)
    deleteJavaScriptCustomerGroupById(ctx: StateContext<DynamicViewManagementModel>, action: DeleteJavaScriptCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.javaScriptCustomerGroups + '/' + action.id)
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

    @Action(SaveJavaScriptCustomerGroupAction)
    saveJavaScriptCustomerGroup(ctx: StateContext<DynamicViewManagementModel>, action: SaveJavaScriptCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.javaScriptCustomerGroup, AppConstant.javaScriptCustomerGroups)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        javaScriptCustomerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateJavaScriptCustomerGroupAction)
    updateJavaScriptCustomerGroup(ctx: StateContext<DynamicViewManagementModel>, action: UpdateJavaScriptCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.javaScriptCustomerGroup, AppConstant.javaScriptCustomerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        javaScriptCustomerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetDynamicViewByIdAction)
    getDynamicViewById(ctx: StateContext<DynamicViewManagementModel>, action: GetDynamicViewByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.dynamicViews + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        dynamicView: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteDynamicViewByIdAction)
    deleteDynamicViewById(ctx: StateContext<DynamicViewManagementModel>, action: DeleteDynamicViewByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.dynamicViews + '/' + action.id)
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

    @Action(SaveDynamicViewAction)
    saveDynamicView(ctx: StateContext<DynamicViewManagementModel>, action: SaveDynamicViewAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.dynamicView, AppConstant.dynamicViews)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        dynamicView: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateDynamicViewAction)
    updateDynamicView(ctx: StateContext<DynamicViewManagementModel>, action: UpdateDynamicViewAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.dynamicView, AppConstant.dynamicViews + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        dynamicView: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetAttributeListAction)
    getAllAttribute(ctx: StateContext<DynamicViewManagementModel>, action: GetAttributeListAction): Actions {
        const force: boolean = action.force || DynamicViewManagementState.getAttributeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.attributes + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            attributeList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetAttributeByIdAction)
    getAttributeById(ctx: StateContext<DynamicViewManagementModel>, action: GetAttributeByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.attributes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        attribute: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteAttributeByIdAction)
    deleteAttributeById(ctx: StateContext<DynamicViewManagementModel>, action: DeleteAttributeByIdAction):
        Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.attributes + '/' + action.id)
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

    @Action(SaveAttributeAction)
    saveAttribute(ctx: StateContext<DynamicViewManagementModel>, action: SaveAttributeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.attribute, AppConstant.attributes)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        attribute: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateAttributeAction)
    updateAttribute(ctx: StateContext<DynamicViewManagementModel>, action: UpdateAttributeAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.attribute, AppConstant.attributes + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        attribute: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }
}
