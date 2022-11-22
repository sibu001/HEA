import { LoginService } from './../../../services/login.service';
import { LoadLookUpCalculationPeriodAction, LoadTopicVariablesAction, LoadSelectedTopicDescriptionVariableAction, LoadTopicPaneVariableById, LoadDataBlockByPaneId, LoadDataBlockById, LoadDataFiledByPaneId, LoadDataFieldById, LoadPaneListByTopicDescriptionId, SaveDataFieldByPaneIdAction, DeleteDataFieldByIdAction, LoadLookUpValueByType, LoadFieldValuesForDataField, DeleteFieldValuesForDataField, SaveFieldValuesForDataField, LoadAllPossibleColorForChartAction, LoadAllPossibleStyleForChartAction, LoadAllAvaliableFontFamiliesNamesForChartAction, LoadPanesForSelectionAsNext, LoadPaneReportsByPaneId, LoadPaneReportById, SaveNewPaneReport, SaveExistingPaneReportAction, DeletePaneReportByIdAction, GetAppPaneChartByPaneIdAction, LoadPaneChartByIdAction, DeletePaneChartByIdAction, SaveNewPaneChartAction, SaveExistingPaneChartAction, LoadChartSeriesDefinationById, SaveNewChartSeriesAction, SaveExistingChartSeriesAction, DeleteChartSeriesAction } from './../state/topic.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import {
  GetTopicDescriptionListAction,
  GetTopicDescriptionByIdAction,
  SaveTopicDescriptionAction,
  UpdateTopicDescriptionAction,
  DeleteTopicDescriptionByIdAction,
  GetContextMethodListAction,
  ScriptDebugAction,
  GetPaidServiceListAction,
  // LoadTopicDescriptionPaneByIdAction
} from '../state/topic.action';
import { TopicManagementState } from '../state/topic.state';
import { AppConstant } from 'src/app/utility/app.constant';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private readonly store: Store,
    private readonly loginService: LoginService) { }

  getTopicDescriptionList(): Observable<any> {
    return this.store.select(TopicManagementState.getTopicDescriptionList);
  }

  getTopicDescriptionById(): Observable<any> {
    return this.store.select(TopicManagementState.getTopicDescriptionById);
  }

  getContextMethodList(): Observable<any> {
    return this.store.select(TopicManagementState.getContextMethodList);
  }

  getScriptDebug(): Observable<any> {
    return this.store.select(TopicManagementState.getScriptDebug);
  }

  getPaidServiceList(): Observable<any> {
    return this.store.select(TopicManagementState.getPaidServiceList);
  }

  loadTopicDescriptionList(force: boolean, filter: any): Observable<TopicManagementState> {
    return this.store.dispatch(new GetTopicDescriptionListAction(force, filter));
  }

  loadTopicDescriptionById(id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new GetTopicDescriptionByIdAction(id));
  }

  getLookUpCalculationPeriod(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getCalculationPeriod)
  }

  loadLookUpCalculationPeriod(type: string): Observable<TopicManagementState> {
    return this.store.dispatch(new LoadLookUpCalculationPeriodAction(type));
  }

  loadSelectedTopicDescriptionVariable(surveyDescriptionId: string, id: string): Observable<any> {
    return this.store.dispatch(new LoadSelectedTopicDescriptionVariableAction(id, surveyDescriptionId));
  }

  getSeletedTopicDescriptionVariable(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getSelectedTopicVariable)
  }

  getSelectedTopicPaneById() {
    return this.store.select(TopicManagementState.getSelectedTopicPane)
  }

  loadSelectedTopicPaneById(surveyDescriptionId, paneId): Observable<any> {
    return this.store.dispatch(new LoadTopicPaneVariableById(surveyDescriptionId, paneId))
  }

  loadDataBlockById(id: number, paneId: number) {
    return this.store.dispatch(new LoadDataBlockById(id, paneId));
  }

  getDataBlockByPaneId() {
    return this.store.select(TopicManagementState.getDataBlockByPaneId);
  }

  LoadDataBlocksForPaneById(paneId: number) {
    return this.store.dispatch(new LoadDataBlockByPaneId(paneId))
  }

  getDataBlockListByPaneId() {
    return this.store.select(TopicManagementState.getDataBlockListByPaneId);
  }

  loadDataFieldByPaneId(paneId: number) {
    return this.store.dispatch(new LoadDataFiledByPaneId(paneId))
  }

  getDataFieldByPaneId() {
    return this.store.select(TopicManagementState.getDataFieldByPaneId);
  }

  loadDataFieldById(id: number, paneId: number) {
    return this.store.dispatch(new LoadDataFieldById(id, paneId))
  }

  getDataFieldById() {
    return this.store.select(TopicManagementState.getDataFieldById)
  }

  getTopicVariable(): Observable<any> {
    return this.store.select(TopicManagementState.getTopicVariables);
  }

  loadTopicVariables(id: number, params: any) {
    return this.store.dispatch(new LoadTopicVariablesAction(id, params))
  }

  saveTopicDescription(customer: any): Observable<TopicManagementState> {
    return this.store.dispatch(new SaveTopicDescriptionAction(customer));
  }

  updateTopicDescription(id: number, customer: any): Observable<TopicManagementState> {
    return this.store.dispatch(new UpdateTopicDescriptionAction(id, customer));
  }

  deleteTopicDescriptionById(id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new DeleteTopicDescriptionByIdAction(id));
  }

  loadContextMethodList(): Observable<TopicManagementState> {
    return this.store.dispatch(new GetContextMethodListAction());
  }

  scriptDebug(scriptDebug: any): Observable<TopicManagementState> {
    return this.store.dispatch(new ScriptDebugAction(scriptDebug));
  }

  loadPaidServiceList(): Observable<TopicManagementState> {
    return this.store.dispatch(new GetPaidServiceListAction());
  }

  loadPaneListByTopicDescriptionId(id: number, params: HttpParams) {
    return this.store.dispatch(new LoadPaneListByTopicDescriptionId(id, params))
  }

  getPaneListByTopicDescriptionId() {
    return this.store.select(TopicManagementState.getPaneListByTopicDescriptionId)
  }

  saveDataFiedlById(paneId: number, body: any) {
    return this.store.dispatch(new SaveDataFieldByPaneIdAction(paneId, body))
  }

  deleteDataFieldById(paneId: number, id: number) {
    return this.store.dispatch(new DeleteDataFieldByIdAction(paneId, id))
  }

  getLookUpValues(lookUpCode: string) {
    return this.loginService.performGet(AppConstant.lookup + '/' + lookUpCode + '/' + AppConstant.lookupValues)
  }

  loadLookUpValuesByType(type: string) {
    return this.store.dispatch(new LoadLookUpValueByType(type))
  }

  getLookValueForCalculationType() {
    return this.store.select(TopicManagementState.getCalculationTypeLookUp)
  }

  getLookValueForCalculationEvent() {
    return this.store.select(TopicManagementState.getCalculationEventLookUp)
  }

  getLookValueForDataType() {
    return this.store.select(TopicManagementState.getDataTypeLookUp)
  }

  getLookValueForInputType() {
    return this.store.select(TopicManagementState.getInputTypeLookUp)
  }

  getLookValueForSource() {
    return this.store.select(TopicManagementState.getSourceLookUp)
  }

  getLookValueForTakeBackType() {
    return this.store.select(TopicManagementState.getTakeBackTypeLookUp)
  }

  getLookUpForActionType() {
    return this.store.select(TopicManagementState.getActionTypeLookUp)
  }

  getLookUpForTakeBackImage() {
    return this.store.select(TopicManagementState.getTakeBackImageLookUp)
  }

  getLookUpForTakeBackIcon() {
    return this.store.select(TopicManagementState.getTakeBackIconLookUp)
  }

  getLookUpForConservationCategory() {
    return this.store.select(TopicManagementState.getConservationCategoryLookUp)
  }

  getLookUpForVariablePeriod() {
    return this.store.select(TopicManagementState.getVariablePeriodTypeLookUp);
  }

  getChartTypeLookUp() {
    return this.store.select(TopicManagementState.getChartTypeLookUp);
  }

  loadAllFieldValuesForDataField(paneId: number, dataFieldId: number) {
    return this.store.dispatch(new LoadFieldValuesForDataField(paneId, dataFieldId));
  }

  getFieldValuesForDataField() {
    return this.store.select(TopicManagementState.getFieldValueListForDataField);
  }

  deleteFieldValuesForDataField(paneId: number, dataFieldId: number, id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new DeleteFieldValuesForDataField(paneId, dataFieldId, id))
  }

  saveDataFieldValue(body: any, paneId: number, dataFieldId: number): Observable<TopicManagementState> {
    return this.store.dispatch(new SaveFieldValuesForDataField(body, paneId, dataFieldId))
  }

  loadAllPossibleColorsForCharts(): Observable<TopicManagementState> {
    return this.store.dispatch(new LoadAllPossibleColorForChartAction());
  }

  getAllPossibleColorsForChart(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getAllPossibleColorsForChart);
  }

  loadAllPossibleStyleForCharts(): Observable<TopicManagementState> {
    return this.store.dispatch(new LoadAllPossibleStyleForChartAction());
  }

  getAllPossibleStyleForChart(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getAllPossibleStyleForChart);
  }

  loadAllPossibleFontFamilyNames(): Observable<TopicManagementState> {
    return this.store.dispatch(new LoadAllAvaliableFontFamiliesNamesForChartAction());
  }

  getAllPossibleFontFamilyNames(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getAllPossibleFontFamilyNames);
  }

  loadPanesForSelectionAsNext(surveyDescriptionId: number, paneId: number): Observable<TopicManagementState> {
    return this.store.dispatch(new LoadPanesForSelectionAsNext(surveyDescriptionId, paneId))
  }

  getPanesForSelectionAsNext(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getSelectionForPaneAsNext);
  }

  loadPaneReportsByPaneId(paneId: number): Observable<TopicManagementState> {
    return this.store.dispatch(new LoadPaneReportsByPaneId(paneId))
  }

  getPaneReportByPaneId(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getPaneReportsByPaneId);
  }

  loadPaneReportById(paneId: number, id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new LoadPaneReportById(paneId, id))
  }

  getPaneReportById(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getPaneReportById);
  }

  saveNewPaneReport(paneId, body): Observable<TopicManagementState> {
    return this.store.dispatch(new SaveNewPaneReport(paneId, body))
  }

  SaveExistingPaneReport(paneId: number, body: any, id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new SaveExistingPaneReportAction(paneId, body, id));
  }

  deletePaneReportById(paneId: number, id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new DeletePaneReportByIdAction(paneId, id));
  }

  LoadAllPaneChartByPaneId(paneId: number): Observable<TopicManagementState> {
    return this.store.dispatch(new GetAppPaneChartByPaneIdAction(paneId));
  }

  GetAllPaneChartByPaneId(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getPaneChartListByPaneId)
  }

  loadPaneChartById(paneId: number, id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new LoadPaneChartByIdAction(paneId, id));
  }

  getPaneChartById(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getPaneChart);
  }

  deletePaneChart(paneId: number, chartId: number): Observable<TopicManagementState> {
    return this.store.dispatch(new DeletePaneChartByIdAction(paneId, chartId));
  }

  saveNewPaneChart(paneId: number, chartBody: any): Observable<TopicManagementState> {
    return this.store.dispatch(new SaveNewPaneChartAction(paneId, chartBody));
  }

  SaveExistingPaneChart(paneId: number, chartId: number, chartBody: any) {
    return this.store.dispatch(new SaveExistingPaneChartAction(paneId, chartId, chartBody))
  }

  loadChartSerisesById(paneId: number, chartId: number, id: number) {
    return this.store.dispatch(new LoadChartSeriesDefinationById(paneId, chartId, id));
  }

  getChartSeriesById(): Observable<TopicManagementState> {
    return this.store.select(TopicManagementState.getChartSeries);
  }

  saveNewChartSeries(paneId: number, paneChartId: number, body: any) {
    return this.store.dispatch(new SaveNewChartSeriesAction(paneId, paneChartId, body))
  }

  saveExistingChartSeries(paneId: number, paneChartId: number, id: number, body: any) {
    return this.store.dispatch(new SaveExistingChartSeriesAction(paneId, paneChartId, id, body))
  }

  deleteChartSeries(paneId: number, chartId: number, id: number) {
    return this.store.dispatch(new DeleteChartSeriesAction(paneId, chartId, id));
  }

}
