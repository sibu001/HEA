import { Injectable } from "@angular/core";
import { Action, Actions, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { LoginService } from "src/app/services/login.service";
import { UtilityService } from "src/app/services/utility.service";
import { AppConstant } from "src/app/utility/app.constant";
import { AppUtility } from "src/app/utility/app.utility";
import { DeleteChartSeriesParameterAction, DeleteSummaryChartDefinationAction, DeleteSummaryChartSeriesAction, GetChartSeriesParameterAction, GetSummaryChartDefinationByIdAction, GetSummaryChartSeriesByIdAction, LoadSummaryChartDefinationListAction, SaveChartSeriesParameterAction, SaveSummaryChartDefinationAction, SaveSummaryChartSeriesAction, SummaryChartDefinationCopyAction, UpdateSummaryChartDefinationAction, UpdateSummaryChartSeriesAction } from "./summary-chart-defination.action";
import { SummaryChartDefinationModel } from "./summary-chart-defination.model";

@State<SummaryChartDefinationModel>({
    name : 'summaryChartManagementState',
    defaults : {
        summaryChartDefinationList : undefined,
        summaryChartDefination : undefined,
        summaryChartDefinationSeries : undefined,
        chartSeriesParmaterList : undefined

    }
})

@Injectable()
export class SummaryChartDefinationState{
    constructor(private readonly loginService : LoginService,
                private readonly utilityService : UtilityService) {}



    @Selector()
    static getSummaryChartDefinationList(state : SummaryChartDefinationModel) : any{
        return state.summaryChartDefinationList;
    }

    @Action(LoadSummaryChartDefinationListAction)
    loadSummaryChartDefinationList(ctx : StateContext<SummaryChartDefinationModel>, action : LoadSummaryChartDefinationListAction) : Actions {

        const force = action.force || !ctx.getState().summaryChartDefinationList;

        if(!force) return;

        return this.loginService.performGetWithParams(AppConstant.summaryCharts,action.params)
            .pipe(tap((response : any) =>{
                ctx.patchState({summaryChartDefinationList : response});
            },this.utilityService.errorCallbak))
    }

    @Selector()
    static getSummaryChartDefination(state : SummaryChartDefinationModel) : any{
        return state.summaryChartDefination;
    }

    @Action(GetSummaryChartDefinationByIdAction)
    getSummaryChartDefinationById(ctx : StateContext<SummaryChartDefinationModel>, action : GetSummaryChartDefinationByIdAction) : Actions {

        const summaryChartDefination =  ctx.getState().summaryChartDefination;
        const force = action.force || !summaryChartDefination || summaryChartDefination.id != action.id; 

        if(!force) return;

        return this.loginService.performGetWithParams(AppUtility.endPointGenerator([AppConstant.summaryCharts,action.id]))
            .pipe(tap((response : any) =>{
                ctx.patchState({summaryChartDefination : response});
            },this.utilityService.errorCallbak))
    }

    @Action(SaveSummaryChartDefinationAction)
    saveSummaryChartDefination(ctx : StateContext<SummaryChartDefinationModel>, action : SaveSummaryChartDefinationAction) : Actions {

        return this.loginService.performPost(action.requestBody,AppUtility.endPointGenerator([AppConstant.summaryCharts]))
            .pipe(tap((response : any) =>{
                ctx.patchState({summaryChartDefination : response,
                    summaryChartDefinationList : undefined});
            },this.utilityService.errorCallbak))
    }

    @Action(UpdateSummaryChartDefinationAction)
    updateSummaryChartDefination(ctx : StateContext<SummaryChartDefinationModel>, action : UpdateSummaryChartDefinationAction) : Actions {

        return this.loginService.performPut(action.requestBody,AppUtility.endPointGenerator([AppConstant.summaryCharts,action.id]))
            .pipe(tap((response : any) =>{
                ctx.patchState({summaryChartDefination : response,
                    summaryChartDefinationList : undefined });
            },this.utilityService.errorCallbak))
    }


    @Action(DeleteSummaryChartDefinationAction)
    deleteSummaryChartDefination(ctx : StateContext<SummaryChartDefinationModel>, action : DeleteSummaryChartDefinationAction) : Actions {

        return this.loginService.performDelete(AppUtility.endPointGenerator([AppConstant.summaryCharts,action.id]))
            .pipe(tap((response : any) =>{
                ctx.patchState({summaryChartDefination : undefined});
            },this.utilityService.errorCallbak))
    }

    @Action(SummaryChartDefinationCopyAction)
    summaryChartDefinationCopy(ctx : StateContext<SummaryChartDefinationModel>, action : SummaryChartDefinationCopyAction) : Actions {

        return this.loginService.performPostWithParam({},AppUtility
                .endPointGenerator([AppConstant.summaryCharts,action.summaryChartId,'copy']), action.params)
            .pipe(tap((response : any) =>{
                ctx.patchState({summaryChartDefination : response });
            },this.utilityService.errorCallbak))
    }

    @Selector()
    static getSummaryChartDefinationSeries(state : SummaryChartDefinationModel) : any{
        return state.summaryChartDefinationSeries;
    }

    @Action(GetSummaryChartSeriesByIdAction)
    getSummaryChartSeriesById(ctx : StateContext<SummaryChartDefinationModel>, action : GetSummaryChartSeriesByIdAction) : Actions {

        const summaryChartDefinationSeries : any = ctx.getState().summaryChartDefinationSeries;
        const force : boolean = action.force || !summaryChartDefinationSeries || summaryChartDefinationSeries.id != action.id;

        if(!force) return;

        return this.loginService.performGet(AppUtility
            .endPointGenerator([AppConstant.summaryCharts,action.summaryChartId,AppConstant.series,action.id]))
            .pipe(tap((response : any) =>{
                ctx.patchState({ summaryChartDefinationSeries : response});
            },this.utilityService.errorCallbak))
    }

    @Action(SaveSummaryChartSeriesAction)
    saveSummaryChartSeries(ctx : StateContext<SummaryChartDefinationModel>, action : SaveSummaryChartSeriesAction) : Actions {

        return this.loginService.performPost(action.requestBody,AppUtility
            .endPointGenerator([AppConstant.summaryCharts,action.summaryChartId,AppConstant.series]))
            .pipe(tap((response : any) =>{
                ctx.patchState({ summaryChartDefinationSeries : response});
            },this.utilityService.errorCallbak))
    }

    @Action(UpdateSummaryChartSeriesAction)
    updateSummaryChartSeries(ctx : StateContext<SummaryChartDefinationModel>, action : UpdateSummaryChartSeriesAction) : Actions {

        return this.loginService.performPut(action.requestBody,AppUtility
            .endPointGenerator([AppConstant.summaryCharts,action.summaryChartId,AppConstant.series,action.id]))
            .pipe(tap((response : any) =>{
                ctx.patchState({ summaryChartDefinationSeries : response});
            },this.utilityService.errorCallbak))
    }

    @Action(DeleteSummaryChartSeriesAction)
    deleteSummaryChartSeries(ctx : StateContext<SummaryChartDefinationModel>, action : DeleteSummaryChartSeriesAction) : Actions {

        return this.loginService.performDelete(AppUtility
            .endPointGenerator([AppConstant.summaryCharts,action.summaryChartId,AppConstant.series,action.id]))
            .pipe(tap((response : any) =>{
                ctx.patchState({ summaryChartDefinationSeries : undefined});
            },this.utilityService.errorCallbak))
    }


    @Selector()
    static getChartSeriesParameterList(state : SummaryChartDefinationModel) : any {
        return state.chartSeriesParmaterList.response
    }

    @Action(GetChartSeriesParameterAction)
    getChartSeriesParameter(ctx : StateContext<SummaryChartDefinationModel>, action : GetChartSeriesParameterAction) : Actions {

        const chartSeriesParmaterList = ctx.getState().chartSeriesParmaterList;
        if(chartSeriesParmaterList && chartSeriesParmaterList.id == action.seriesId){
            return;
        } 

        return this.loginService.performGet(AppUtility
            .endPointGenerator([AppConstant.summaryCharts,action.summaryChartId,AppConstant.series,action.seriesId,AppConstant.parameters]))
            .pipe(tap((response : any) =>{

                ctx.patchState({ chartSeriesParmaterList : AppUtility.addCustomIdentifierForReducer({response :  response},action.seriesId)});
            },this.utilityService.errorCallbak))
    }

    @Action(SaveChartSeriesParameterAction)
    saveChartSeriesParameter(ctx : StateContext<SummaryChartDefinationModel>, action : SaveChartSeriesParameterAction) : Actions {

        return this.loginService.performPost(action.requestBody,AppUtility
            .endPointGenerator([AppConstant.summaryCharts,action.summaryChartId,AppConstant.series,action.seriesId,AppConstant.parameters]))
            .pipe(tap((response : any) =>{

                const chartSeriesParmaterList = ctx.getState().chartSeriesParmaterList;
                if(chartSeriesParmaterList){
                    chartSeriesParmaterList.response.push(response);
                    ctx.patchState({chartSeriesParmaterList : {...chartSeriesParmaterList, response : [...chartSeriesParmaterList.response] }});
                }

            },this.utilityService.errorCallbak))
    }

    @Action(DeleteChartSeriesParameterAction)
    deleteChartSeriesParameter(ctx : StateContext<SummaryChartDefinationModel>, action : DeleteChartSeriesParameterAction) : Actions {

        return this.loginService.performDelete(AppUtility
            .endPointGenerator([AppConstant.summaryCharts,action.summaryChartId,AppConstant.series,action.seriesId,AppConstant.parameters,action.id]))
            .pipe(tap((response : any) =>{

                const chartSeriesParmaterList = ctx.getState().chartSeriesParmaterList;
                if(chartSeriesParmaterList){
                    chartSeriesParmaterList.response = chartSeriesParmaterList.response.filter(data => data.id != action.id);
                    ctx.patchState({chartSeriesParmaterList : {...chartSeriesParmaterList, response : [...chartSeriesParmaterList.response] }});
                }

            },this.utilityService.errorCallbak))
    }
}