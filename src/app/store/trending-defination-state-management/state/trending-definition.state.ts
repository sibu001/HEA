import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { AppUtility } from 'src/app/utility/app.utility';
import {
    DeleteKeyIndicatorByIdAction,
    RemoveKeyIndicatorCustomerGroupByIdAction,
    DeleteKeyIndicatorVariableByIdAction,
    DeleteTrendingPartsByIdAction,
    GetKeyIndicatorByIdAction,
    GetKeyIndicatorCustomerGroupByIdAction,
    GetKeyIndicatorCustomerGroupListAction,
    GetKeyIndicatorListAction,
    GetKeyIndicatorVariableByIdAction,
    GetKeyIndicatorVariableListAction,
    GetTrendingPartsByIdAction,
    GetTrendingPartsListAction,
    SaveKeyIndicatorAction,
    AddKeyIndicatorCustomerGroupAction,
    SaveKeyIndicatorVariableAction,
    SaveTrendingPartsAction,
    UpdateKeyIndicatorAction,
    UpdateKeyIndicatorCustomerGroupAction,
    UpdateKeyIndicatorVariableAction,
    UpdateTrendingPartsAction
} from './trending-definition.action';

import { TrendingDefinitionModel } from './trending-definition.model';


@State<TrendingDefinitionModel>({
    name: 'trendingDefinationManagement',
    defaults: {
        keyIndicatorList: undefined,
        keyIndicator: undefined,
        keyIndicatorCustomerGroupList: undefined,
        keyIndicatorCustomerGroup: undefined,
        trendingPartsList: undefined,
        trendingParts: undefined,
        keyIndicatorVariableList: undefined,
        keyIndicatorVariable: undefined,
    }
})

@Injectable()
export class TrendingDefinitionState {

    constructor(private readonly loginService: LoginService, private readonly utilityService: UtilityService) { }

    @Selector()
    static getKeyIndicatorList(state: TrendingDefinitionModel): any {
        return state.keyIndicatorList;
    }

    @Selector()
    static getKeyIndicatorById(state: TrendingDefinitionModel): any {
        return state.keyIndicator;
    }

    @Selector()
    static getKeyIndicatorVariableList(state: TrendingDefinitionModel): any {
        return state.keyIndicatorVariableList;
    }

    @Selector()
    static getKeyIndicatorVariable(state: TrendingDefinitionModel): any {
        return state.keyIndicatorVariable;
    }

    @Selector()
    static getKeyIndicatorCustomerGroupList(state: TrendingDefinitionModel): any {
        return state.keyIndicatorCustomerGroupList;
    }

    @Selector()
    static getKeyIndicatorCustomerGroupById(state: TrendingDefinitionModel): any {
        return state.keyIndicatorCustomerGroup;
    }

    @Selector()
    static getTrendingPartsList(state: TrendingDefinitionModel): any {
        return state.trendingPartsList;
    }

    @Selector()
    static getTrendingPartsById(state: TrendingDefinitionModel): any {
        return state.trendingParts;
    }

    @Action(GetKeyIndicatorListAction)
    getAllKeyIndicator(ctx: StateContext<TrendingDefinitionModel>, action: GetKeyIndicatorListAction): Actions {
        const force: boolean = action.force || TrendingDefinitionState.getKeyIndicatorList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.keyIndicator,action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            keyIndicatorList: response.data,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetKeyIndicatorByIdAction)
    getKeyIndicatorById(ctx: StateContext<TrendingDefinitionModel>, action: GetKeyIndicatorByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.keyIndicator + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        keyIndicator: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteKeyIndicatorByIdAction)
    deleteKeyIndicatorById(ctx: StateContext<TrendingDefinitionModel>, action: DeleteKeyIndicatorByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.keyIndicator + '/' + action.id)
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

    @Action(SaveKeyIndicatorAction)
    saveKeyIndicator(ctx: StateContext<TrendingDefinitionModel>, action: SaveKeyIndicatorAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.keyIndicator, AppConstant.keyIndicator)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        keyIndicator: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateKeyIndicatorAction)
    updateKeyIndicator(ctx: StateContext<TrendingDefinitionModel>, action: UpdateKeyIndicatorAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.keyIndicator, AppConstant.keyIndicator + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        keyIndicator: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetKeyIndicatorVariableListAction)
    getAllKeyIndicatorVariable(ctx: StateContext<TrendingDefinitionModel>, action: GetKeyIndicatorVariableListAction): Actions {
        const force: boolean = action.force || TrendingDefinitionState.getKeyIndicatorVariableList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppUtility
                .endPointGenerator([AppConstant.keyIndicator,action.keyIndicatorId,AppConstant.variables]),action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            keyIndicatorVariableList: response.data,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetKeyIndicatorVariableByIdAction)
    getKeyIndicatorVariableById(ctx: StateContext<TrendingDefinitionModel>, action: GetKeyIndicatorVariableByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(
                AppUtility.endPointGenerator([AppConstant.keyIndicator,action.keyIndicatorId,AppConstant.variables,action.id]))
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        keyIndicatorVariable: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteKeyIndicatorVariableByIdAction)
    deleteKeyIndicatorVariableById(ctx: StateContext<TrendingDefinitionModel>, action: DeleteKeyIndicatorVariableByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete( 
            AppUtility.endPointGenerator([AppConstant.keyIndicator,action.keyIndicatorId,AppConstant.variables,action.id]))
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

    @Action(SaveKeyIndicatorVariableAction)
    saveKeyIndicatorVariable(ctx: StateContext<TrendingDefinitionModel>, action: SaveKeyIndicatorVariableAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.keyIndicatorVariable, 
                AppUtility.endPointGenerator([AppConstant.keyIndicator,action.keyIndicatorId,AppConstant.variables]))
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        keyIndicatorVariable: response.data,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateKeyIndicatorVariableAction)
    updateKeyIndicatorVariable(ctx: StateContext<TrendingDefinitionModel>, action: UpdateKeyIndicatorVariableAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.keyIndicatorVariable,
            AppUtility.endPointGenerator([AppConstant.keyIndicator,action.keyIndicatorId,AppConstant.variables,action.id]))
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        keyIndicatorVariable: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetKeyIndicatorCustomerGroupListAction)
    getAllKeyIndicatorCustomerGroup(ctx: StateContext<TrendingDefinitionModel>, action: GetKeyIndicatorCustomerGroupListAction): Actions {
        const force: boolean = action.force || TrendingDefinitionState.getKeyIndicatorCustomerGroupList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(
                AppUtility.endPointGenerator([AppConstant.keyIndicator,action.keyIndicatorId.toString(),AppConstant.customerGroups]), action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            keyIndicatorCustomerGroupList: response.data.list,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetKeyIndicatorCustomerGroupByIdAction)
    getKeyIndicatorCustomerGroupById(ctx: StateContext<TrendingDefinitionModel>, action: GetKeyIndicatorCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.keyIndicatorCustomerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        keyIndicatorCustomerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(AddKeyIndicatorCustomerGroupAction)
    deleteKeyIndicatorCustomerGroupById(ctx: StateContext<TrendingDefinitionModel>, action: AddKeyIndicatorCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost({},AppUtility.endPointGenerator(
            [AppConstant.keyIndicator,action.keyIndicatorId,AppConstant.customerGroups,action.customerGroupId]))
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Deleted Successfully');

                    const newKeyIndicatorCustomerGroupList = ctx.getState().keyIndicatorCustomerGroupList;
                    newKeyIndicatorCustomerGroupList.push({...response.data});
                    ctx.patchState({ keyIndicatorCustomerGroupList : [...newKeyIndicatorCustomerGroupList] });

                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(RemoveKeyIndicatorCustomerGroupByIdAction)
    saveKeyIndicatorCustomerGroup(ctx: StateContext<TrendingDefinitionModel>, action: RemoveKeyIndicatorCustomerGroupByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppUtility.endPointGenerator(
            [AppConstant.keyIndicator,action.keyIndicatorId,AppConstant.customerGroups,action.customerGroupId]))
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');

                    const newKeyIndicatorCustomerGroupList =  ctx.getState().keyIndicatorCustomerGroupList
                        .filter(((customerGroup : any) => customerGroup.customerGroupId != action.customerGroupId));

                    ctx.patchState({ keyIndicatorCustomerGroupList: newKeyIndicatorCustomerGroupList });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateKeyIndicatorCustomerGroupAction)
    updateKeyIndicatorCustomerGroup(ctx: StateContext<TrendingDefinitionModel>, action: UpdateKeyIndicatorCustomerGroupAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.keyIndicatorCustomerGroup, AppConstant.keyIndicatorCustomerGroups + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        keyIndicatorCustomerGroup: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(GetTrendingPartsListAction)
    getAllTrendingParts(ctx: StateContext<TrendingDefinitionModel>, action: GetTrendingPartsListAction): Actions {
        const force: boolean = action.force || TrendingDefinitionState.getTrendingPartsList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGet(AppConstant.trendingParts + action.filter)
                .pipe(
                    tap((response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            trendingPartsList: response,
                        });
                    },
                        error => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }));
        }
        return result;
    }

    @Action(GetTrendingPartsByIdAction)
    getTrendingPartsById(ctx: StateContext<TrendingDefinitionModel>, action: GetTrendingPartsByIdAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.trendingParts + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        trendingParts: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(DeleteTrendingPartsByIdAction)
    deleteTrendingPartsById(ctx: StateContext<TrendingDefinitionModel>, action: DeleteTrendingPartsByIdAction):
        Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performDelete(AppConstant.trendingParts + '/' + action.id)
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

    @Action(SaveTrendingPartsAction)
    saveTrendingParts(ctx: StateContext<TrendingDefinitionModel>, action: SaveTrendingPartsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPost(action.trendingParts, AppConstant.trendingParts)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Save Successfully');
                    ctx.patchState({
                        trendingParts: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }

    @Action(UpdateTrendingPartsAction)
    updateTrendingParts(ctx: StateContext<TrendingDefinitionModel>, action: UpdateTrendingPartsAction): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performPut(action.trendingParts, AppConstant.trendingParts + '/' + action.id)
            .pipe(
                tap((response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    // this.utilityService.showSuccessMessage('Updated Successfully');
                    ctx.patchState({
                        trendingParts: response,
                    });
                },
                    error => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }));
    }
}
