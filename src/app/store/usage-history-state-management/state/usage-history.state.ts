import { Injectable } from '@angular/core';
import { Action, Actions, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AppConstant } from 'src/app/utility/app.constant';
import { UsageHistoryTransformer } from '../transformer/transformer';
import {
    DeleteShareMyDataByIdAction,
    GetShareMyDataListAction,
    GetShareMyDataByIdAction,
    UpdateShareMyDataAction,
    GetGasListAction,
    GetGasByIdAction,
    DeleteGasByIdAction,
    UpdateGasAction,
    GetGasChargeListAction,
    GetGasChargeByIdAction,
    DeleteGasChargeByIdAction,
    UpdateGasChargeAction,
    GetGasSmartMeterListAction,
    GetGasSmartMeterByIdAction,
    DeleteGasSmartMeterByIdAction,
    UpdateGasSmartMeterAction,
    GetElectricityListAction,
    GetElectricityByIdAction,
    DeleteElectricityByIdAction,
    UpdateElectricityAction,
    GetElectricityChargeByIdAction,
    GetElectricityChargeListAction,
    DeleteElectricityChargeByIdAction,
    UpdateElectricityChargeAction,
    GetElectricitySmartMeterByIdAction,
    GetElectricitySmartMeterListAction,
    DeleteElectricitySmartMeterByIdAction,
    UpdateElectricitySmartMeterAction,
    GetElectricityDailySmartMeterByIdAction,
    GetElectricityDailySmartMeterListAction,
    DeleteElectricityDailySmartMeterByIdAction,
    UpdateElectricityDailySmartMeterAction,
    GetWaterChargeListAction,
    GetWaterChargeByIdAction,
    UpdateWaterChargeAction,
    DeleteWaterChargeByIdAction,
    GetWaterListAction,
    GetWaterByIdAction,
    UpdateWaterAction,
    DeleteWaterByIdAction,
    GetWaterSmartMeterListAction,
    GetWaterSmartMeterByIdAction,
    UpdateWaterSmartMeterAction,
    DeleteWaterSmartMeterByIdAction
} from './usage-history.action';
import { UsageHistoryManagementModel } from './usage-history.model';

@State<UsageHistoryManagementModel>({
    name: 'usageHistoryManagement',
    defaults: {
        shareMyDataList: undefined,
        shareMyData: undefined,
        gasList: undefined,
        gas: undefined,
        gasChargeList: undefined,
        gasCharge: undefined,
        gasSmartMeter: undefined,
        gasSmartMeterList: undefined,
        electricityList: undefined,
        electricity: undefined,
        electricityChargeList: undefined,
        electricityCharge: undefined,
        electricitySmartMeterList: undefined,
        electricitySmartMeter: undefined,
        electricityDailySmartMeterList: undefined,
        electricityDailySmartMeter: undefined,
        waterList: undefined,
        water: undefined,
        waterChargeList: undefined,
        waterCharge: undefined,
        waterSmartMeterList: undefined,
        waterSmartMeter: undefined,
    },
})
@Injectable()
export class UsageHistoryManagementState {
    constructor(
        private readonly loginService: LoginService,
        private readonly utilityService: UtilityService
    ) { }

    // share my data selector
    @Selector()
    static getShareMyDataList(state: UsageHistoryManagementModel): any {
        return state.shareMyDataList;
    }

    // gas selector
    @Selector()
    static getGasList(state: UsageHistoryManagementModel): any {
        return state.gasList;
    }

    // gas charge selector
    @Selector()
    static getGasChargeList(state: UsageHistoryManagementModel): any {
        return state.gasChargeList;
    }

    // gas smart meter selector
    @Selector()
    static getGasSmartMeterList(state: UsageHistoryManagementModel): any {
        return state.gasSmartMeterList;
    }

    // electricity selector
    @Selector()
    static getElectricityList(state: UsageHistoryManagementModel): any {
        return state.electricityList;
    }

    // electricity charge selector
    @Selector()
    static getElectricityChargeList(state: UsageHistoryManagementModel): any {
        return state.electricityChargeList;
    }

    // electricity smart meter selector
    @Selector()
    static getElectricitySmartMeterList(state: UsageHistoryManagementModel): any {
        return state.electricitySmartMeterList;
    }

    // electricity daily smart meter selector
    @Selector()
    static getElectricityDailySmartMeterList(state: UsageHistoryManagementModel): any {
        return state.electricityDailySmartMeterList;
    }

    // water charge selector
    @Selector()
    static getWaterChargeList(state: UsageHistoryManagementModel): any {
        return state.waterChargeList;
    }

    // water selector
    @Selector()
    static getWaterList(state: UsageHistoryManagementModel): any {
        return state.waterList;
    }

    // water selector
    @Selector()
    static getWaterSmartMeterList(state: UsageHistoryManagementModel): any {
        return state.waterSmartMeterList;
    }

    // Share my data action

    @Action(GetShareMyDataListAction)
    getShareMyDataListAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetShareMyDataListAction
    ): Actions {
        const force: boolean =
            action.force ||
            UsageHistoryManagementState.getShareMyDataList(ctx.getState()) ===
            undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService
                .performGet(AppConstant.shareMyDataList + action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                shareMyDataList: response,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetShareMyDataByIdAction)
    getShareMyDataByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetShareMyDataByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performGet(AppConstant.shareMyData + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        ctx.patchState({
                            shareMyData: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(DeleteShareMyDataByIdAction)
    deleteShareMyDataByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteShareMyDataByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.shareMyData + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateShareMyDataAction)
    updateShareMyDataAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateShareMyDataAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.shareMyData, AppConstant.shareMyData + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            shareMyData: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }


    // Gas Action
    @Action(GetGasListAction)
    getGasListAction(ctx: StateContext<UsageHistoryManagementModel>, action: GetGasListAction): Actions {
        const force: boolean = action.force || UsageHistoryManagementState.getGasList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.users + '/' + action.userId + '/usage/' + AppConstant.gasList, action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            const res = UsageHistoryTransformer.transformGasList(response);
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                gasList: res,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetGasByIdAction)
    getGasByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetGasByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.gas + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        gas: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteGasByIdAction)
    deleteGasByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteGasByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.gas + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateGasAction)
    updateGasAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateGasAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.gas, AppConstant.gas + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            gas: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    // Gas Charge Action
    @Action(GetGasChargeListAction)
    getGasChargeListAction(ctx: StateContext<UsageHistoryManagementModel>, action: GetGasChargeListAction): Actions {
        const force: boolean = action.force || UsageHistoryManagementState.getGasChargeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.users + '/' + action.userId + '/usage/' + AppConstant.gasList, action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            const res = UsageHistoryTransformer.transformGasList(response);
                            ctx.patchState({
                                gasChargeList: res,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetGasChargeByIdAction)
    getGasChargeByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetGasChargeByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.gasCharge + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        gasCharge: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteGasChargeByIdAction)
    deleteGasChargeByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteGasChargeByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.gasCharge + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateGasChargeAction)
    updateGasChargeAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateGasChargeAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.gasCharge, AppConstant.gasCharge + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            gasCharge: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    // Gas Smart Meter Action
    @Action(GetGasSmartMeterListAction)
    getGasSmartMeterListAction(ctx: StateContext<UsageHistoryManagementModel>, action: GetGasSmartMeterListAction): Actions {
        const force: boolean = action.force || UsageHistoryManagementState.getGasSmartMeterList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.users + '/' + action.userId + '/' + AppConstant.smartMeterGas, action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                gasSmartMeterList: response,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetGasSmartMeterByIdAction)
    getGasSmartMeterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetGasSmartMeterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.smartMeterGas + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        gasSmartMeter: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteGasSmartMeterByIdAction)
    deleteGasSmartMeterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteGasSmartMeterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.smartMeterGas + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateGasSmartMeterAction)
    updateGasSmartMeterAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateGasSmartMeterAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.gasSmartMeter, AppConstant.smartMeterGas + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            gasSmartMeter: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    // Electricity action
    @Action(GetElectricityListAction)
    getElectricityListAction(ctx: StateContext<UsageHistoryManagementModel>, action: GetElectricityListAction): Actions {
        const force: boolean = action.force || UsageHistoryManagementState.getElectricityList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.users + '/' + action.userId + '/usage/' + AppConstant.electricity, action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            const res = UsageHistoryTransformer.transformGasList(response);
                            ctx.patchState({
                                electricityList: res,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetElectricityByIdAction)
    getElectricityByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetElectricityByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.electricity + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        electricity: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteElectricityByIdAction)
    deleteElectricityByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteElectricityByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.electricity + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateElectricityAction)
    updateElectricityAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateElectricityAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.electricity, AppConstant.electricity + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            electricity: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    // Electricity Charge Action
    @Action(GetElectricityChargeListAction)
    getElectricityChargeListAction(ctx: StateContext<UsageHistoryManagementModel>, action: GetElectricityChargeListAction): Actions {
        const force: boolean = action.force || UsageHistoryManagementState.getElectricityChargeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.users + '/' + action.userId + '/usage/' + AppConstant.electricity, action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                electricityChargeList: response,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetElectricityChargeByIdAction)
    getElectricityChargeByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetElectricityChargeByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.electricityCharge + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        electricityCharge: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteElectricityChargeByIdAction)
    deleteElectricityChargeByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteElectricityChargeByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.electricityCharge + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateElectricityChargeAction)
    updateElectricityChargeAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateElectricityChargeAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.electricityCharge, AppConstant.electricityCharge + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            electricityCharge: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }


    // Electricity Smart Meter Action
    @Action(GetElectricitySmartMeterListAction)
    getElectricitySmartMeterListAction(ctx: StateContext<UsageHistoryManagementModel>, action: GetElectricitySmartMeterListAction): Actions {
        const force: boolean = action.force || UsageHistoryManagementState.getElectricitySmartMeterList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.users + '/' + action.userId + '/' + AppConstant.smartMeterElectric, action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                electricitySmartMeterList: response,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetElectricitySmartMeterByIdAction)
    getElectricitySmartMeterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetElectricitySmartMeterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.electricitySmartMeter + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        electricitySmartMeter: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteElectricitySmartMeterByIdAction)
    deleteElectricitySmartMeterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteElectricitySmartMeterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.electricitySmartMeter + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateElectricitySmartMeterAction)
    updateElectricitySmartMeterAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateElectricitySmartMeterAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.electricitySmartMeter, AppConstant.electricitySmartMeter + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            electricitySmartMeter: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    // Electricity Daily Smart Meter Action
    @Action(GetElectricityDailySmartMeterListAction)
    getElectricityDailySmartMeterListAction(ctx: StateContext<UsageHistoryManagementModel>, action: GetElectricityDailySmartMeterListAction): Actions {
        const force: boolean = action.force || UsageHistoryManagementState.getElectricityDailySmartMeterList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService.performGetWithParams(AppConstant.users + '/' + action.userId + '/' + AppConstant.smartMeterElectricDaily, action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                electricityDailySmartMeterList: response,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetElectricityDailySmartMeterByIdAction)
    getElectricityDailySmartMeterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetElectricityDailySmartMeterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.smartMeterElectricDaily + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        electricityDailySmartMeter: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteElectricityDailySmartMeterByIdAction)
    deleteElectricityDailySmartMeterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteElectricityDailySmartMeterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.smartMeterElectricDaily + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateElectricityDailySmartMeterAction)
    updateElectricityDailySmartMeterAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateElectricityDailySmartMeterAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.electricityDailySmartMeter, AppConstant.smartMeterElectricDaily + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            electricityDailySmartMeter: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    // Water Charge Action
    @Action(GetWaterChargeListAction)
    getWaterChargeListAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetWaterChargeListAction
    ): Actions {
        const force: boolean =
            action.force ||
            UsageHistoryManagementState.getWaterChargeList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService
                .performGet(AppConstant.waterChargeList + action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                waterChargeList: response,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetWaterChargeByIdAction)
    getWaterChargeByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetWaterChargeByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.waterCharge + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        waterCharge: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteWaterChargeByIdAction)
    deleteWaterChargeByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteWaterChargeByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.waterCharge + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateWaterChargeAction)
    updateWaterChargeAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateWaterChargeAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.waterCharge, AppConstant.waterCharge + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            waterCharge: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }


    // Water Action
    @Action(GetWaterListAction)
    getWaterListAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetWaterListAction
    ): Actions {
        const force: boolean =
            action.force ||
            UsageHistoryManagementState.getWaterList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService
                .performGet(AppConstant.waterList + action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                waterList: response,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetWaterByIdAction)
    getWaterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetWaterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.water + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        water: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteWaterByIdAction)
    deleteWaterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteWaterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.water + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateWaterAction)
    updateWaterAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateWaterAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.water, AppConstant.water + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            water: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }


    // Water Smart Meter Action
    @Action(GetWaterSmartMeterListAction)
    getWaterSmartMeterListAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetWaterSmartMeterListAction
    ): Actions {
        const force: boolean =
            action.force ||
            UsageHistoryManagementState.getWaterSmartMeterList(ctx.getState()) === undefined;
        let result: Actions;
        if (force) {
            document.getElementById('loader').classList.add('loading');
            result = this.loginService
                .performGet(AppConstant.waterSmartMeterList + action.filter)
                .pipe(
                    tap(
                        (response: any) => {
                            document.getElementById('loader').classList.remove('loading');
                            ctx.patchState({
                                waterSmartMeterList: response,
                            });
                        },
                        (error) => {
                            document.getElementById('loader').classList.remove('loading');
                            this.utilityService.showErrorMessage(error.errorMessage);
                        }
                    )
                );
        }
        return result;
    }

    @Action(GetWaterSmartMeterByIdAction)
    getWaterSmartMeterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: GetWaterSmartMeterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService.performGet(AppConstant.waterSmartMeter + '/' + action.id).pipe(
            tap(
                (response: any) => {
                    document.getElementById('loader').classList.remove('loading');
                    ctx.patchState({
                        waterSmartMeter: response,
                    });
                },
                (error) => {
                    document.getElementById('loader').classList.remove('loading');
                    this.utilityService.showErrorMessage(error.error.errorMessage);
                }
            )
        );
    }

    @Action(DeleteWaterSmartMeterByIdAction)
    deleteWaterSmartMeterByIdAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: DeleteWaterSmartMeterByIdAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performDelete(AppConstant.waterSmartMeter + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Deleted Successfully');
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }

    @Action(UpdateWaterSmartMeterAction)
    updateWaterSmartMeterAction(
        ctx: StateContext<UsageHistoryManagementModel>,
        action: UpdateWaterSmartMeterAction
    ): Actions {
        document.getElementById('loader').classList.add('loading');
        return this.loginService
            .performPut(action.waterSmartMeter, AppConstant.waterSmartMeter + '/' + action.id)
            .pipe(
                tap(
                    (response: any) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showSuccessMessage('Updated Successfully');
                        ctx.patchState({
                            waterSmartMeter: response,
                        });
                    },
                    (error) => {
                        document.getElementById('loader').classList.remove('loading');
                        this.utilityService.showErrorMessage(error.error.errorMessage);
                    }
                )
            );
    }


}
