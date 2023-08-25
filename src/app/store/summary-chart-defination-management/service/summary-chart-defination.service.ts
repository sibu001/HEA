import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { DeleteChartSeriesParameterAction, DeleteSummaryChartDefinationAction, DeleteSummaryChartSeriesAction, GetChartSeriesParameterAction, GetSummaryChartDefinationByIdAction, GetSummaryChartSeriesByIdAction, LoadSummaryChartDefinationListAction, SaveChartSeriesParameterAction, SaveSummaryChartDefinationAction, SaveSummaryChartSeriesAction, SummaryChartDefinationCopyAction, UpdateSummaryChartDefinationAction, UpdateSummaryChartSeriesAction } from "../state/summary-chart-defination.action";
import { SummaryChartDefinationState } from "../state/summary-chart-defination.state";

@Injectable({
    providedIn : 'root'
})
export class SummaryChartDefinationService {
    constructor(private readonly store : Store){}

    loadSummaryChartDefinationList(force : boolean, params : HttpParams) : Observable<any>{
        return this.store.dispatch( new LoadSummaryChartDefinationListAction(force, params));
    }

    getSummaryChartDefinationList() : Observable<any> {
        return this.store.select(SummaryChartDefinationState.getSummaryChartDefinationList);
    }

    loadSummaryChartDefinationById(force : boolean, id : number) : Observable<any>{
        return this.store.dispatch(new GetSummaryChartDefinationByIdAction(force,id));
    }

    saveSummaryChartDefination(requestBody : any) : Observable<any>{
        return this.store.dispatch(new SaveSummaryChartDefinationAction(requestBody));
    }

    updateSummaryChartDefination(id : number ,requestBody : any) : Observable<any>{
        return this.store.dispatch(new UpdateSummaryChartDefinationAction(id, requestBody));
    }

    deleteSummaryChartDefination(id : number) : Observable<any>{
        return this.store.dispatch(new DeleteSummaryChartDefinationAction(id));
    }

    copySummaryChartDefination(summaryChartId : number, params : HttpParams){
        return this.store.dispatch( new SummaryChartDefinationCopyAction(summaryChartId, params));
    } 

    getSummaryChartDefination() : Observable<any>{
        return this.store.select(SummaryChartDefinationState.getSummaryChartDefination);
    }


    loadSummaryChartDefinationSeriesById(force : boolean ,  summaryChartId : number, id : number) {
        return this.store.dispatch( new GetSummaryChartSeriesByIdAction(force, summaryChartId, id))
    }

    saveSummaryChartDefinationSeries(summaryChartId : number, requestBody : any){
        return this.store.dispatch( new SaveSummaryChartSeriesAction(summaryChartId, requestBody));
    }

    updateSummaryChartDefinationSeries(summaryChartId : number, id : number, requestBody : any){
        return this.store.dispatch( new UpdateSummaryChartSeriesAction(summaryChartId, id, requestBody));
    }

    deleteSummaryChartDefinatioSeries(summaryChartId : number, id : number) {
        return this.store.dispatch( new DeleteSummaryChartSeriesAction(summaryChartId, id));
    }

    getSummaryChartDefinationSeries() : Observable<any> {
        return this.store.select(SummaryChartDefinationState.getSummaryChartDefinationSeries)
    }

    getChartSeriesParameterList() : Observable<any> {
        return this.store.select(SummaryChartDefinationState.getChartSeriesParameterList)
    }

    loadChartSeriesParamterList(force : boolean , summaryChartId : number, seriesId : number) : Observable<any> {
        return this.store.dispatch( new GetChartSeriesParameterAction(force, summaryChartId, seriesId));
    }

    SaveChartSeriesParamter( summaryChartId : number, seriesId : number, requestBody : any) : Observable<any> {
        return this.store.dispatch( new SaveChartSeriesParameterAction( summaryChartId, seriesId,requestBody));
    }

    deleteChartSeriesParamter( summaryChartId : number, seriesId : number, id : number) : Observable<any> {
        return this.store.dispatch( new DeleteChartSeriesParameterAction( summaryChartId, seriesId,id));
    }
}