import { LoginService } from './../../../services/login.service';
import { LoadLookUpCalculationPeriodAction, LoadTopicVariablesAction, LoadSelectedTopicDescriptionVariableAction, LoadTopicPaneVariableById, LoadDataBlockByPaneId, LoadDataBlockById, LoadDataFiledByPaneId, LoadDataFieldById, LoadPaneListByTopicDescriptionId, SaveDataFieldByPaneIdAction, DeleteDataFieldByIdAction, LoadLookUpValueByType, LoadFieldValuesForDataField, DeleteFieldValuesForDataField, SaveFieldValuesForDataField, LoadAllPossibleColorForChartAction, LoadAllPossibleStyleForChartAction, LoadAllAvaliableFontFamiliesNamesForChartAction, LoadPanesForSelectionAsNext, LoadPaneReportsByPaneId, LoadPaneReportById, SaveNewPaneReport, SaveExistingPaneReportAction, DeletePaneReportByIdAction, GetAppPaneChartByPaneIdAction, LoadPaneChartByIdAction, DeletePaneChartByIdAction, SaveNewPaneChartAction, SaveExistingPaneChartAction, LoadChartSeriesDefinationById, SaveNewChartSeriesAction, SaveExistingChartSeriesAction, DeleteChartSeriesAction, SaveNewOrExistingPaneChartParameter, DeletePaneChartParameter, GetTopicDescriptionListCountAction, GetAllPossibleTopicDescriptionListAction, SaveNewPaneAction, UpdadePaneByIdAction, CopyCreateTopicDescriptionFromIdAction, DeletePaneByIdAction, CreateCopyPaneByIdAction, SaveDataBlockByPaneIdAction, UpdateDataBlockByPaneIdAction, DeleteDataBlockByIdAction, GetDataFieldsbyDataBlockAction, GetDataBlockDataFieldByIdAction, SaveDataBlockDataFieldAction, UpdateDataBlockDataFieldByIdAction, UpdateDateFieldByPaneIdAction, DeleteDataBlockDataFieldByIdAction, GetDataBlockDataFieldFieldValues, SaveDataBlockDataFieldFieldValues, DeleteDataBlockDataFieldFieldValues } from './../state/topic.action';
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
  
  getAllPossibletopicDescriptionList(): Observable<any> {
    return this.store.select(TopicManagementState.getAllPossibletopicDescriptionList);
  }

  getTopicDescriptionListCount() : Observable<number> {
    return this.store.select(TopicManagementState.getTopicDescriptionListCount);
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

  loadAllPossibleTopicDescriptionList(force: boolean): Observable<TopicManagementState> {
    return this.store.dispatch(new GetAllPossibleTopicDescriptionListAction(force));
  }

  loadTopicDescriptionListCount(force: boolean, filter: any): Observable<TopicManagementState> {
    return this.store.dispatch(new GetTopicDescriptionListCountAction(force, filter));
  }

  loadTopicDescriptionById(id: number): Observable<TopicManagementState> {
    return this.store.dispatch(new GetTopicDescriptionByIdAction(id));
  }

  CopyCreateTopicDescriptionFromId(topicDescriptionId : number, params : HttpParams) : Observable<any>{
    return this.store.dispatch( new CopyCreateTopicDescriptionFromIdAction(topicDescriptionId,params))
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
  
  saveDataBlockByPaneId(body : any, paneId : number){
    return this.store.dispatch(new SaveDataBlockByPaneIdAction(body, paneId));
  }

  deleteDataBlockById(paneId : number, id : number) {
    return this.store.dispatch(new DeleteDataBlockByIdAction(paneId, id));
  }

  loadDataFieldsByDataBlock(force : boolean, paneId : number, dataBlockId : number) : Observable<any>{
    return this.store.dispatch(new GetDataFieldsbyDataBlockAction(force,paneId , dataBlockId));
  }

  getDataBlockDataFields() : Observable<any>{
    return this.store.select(TopicManagementState.getDataBlockDataFields);
  }

  loadDataBlockDataFieldsById(paneId : number, dataBlockId : number, dataFieldId : number ) : Observable<any>{
    return this.store.dispatch(new GetDataBlockDataFieldByIdAction(paneId,dataBlockId,dataFieldId));
  }

  getDataBlockDataFieldsById(){
    return this.store.select(TopicManagementState.getDataBlockDataFieldById);
  }

  saveDataBlockDataField(paneId : number, dataBlockId : number, body : any ) : Observable<any> {
    return this.store.dispatch(new SaveDataBlockDataFieldAction(paneId,dataBlockId,body));
  }

  updateDataBlockDataFieldById(paneId : number, dataBlockId : number , id : number, body : any ) : Observable<any>{
    return this.store.dispatch(new UpdateDataBlockDataFieldByIdAction(paneId,dataBlockId,id,body));
  }

  deleteDataBlockDataFieldById(paneId : number, dataBlockId : number, id : number) : Observable<any> {
    return this.store.dispatch(new DeleteDataBlockDataFieldByIdAction(paneId, dataBlockId, id));
  }

  updateDataBlockById(body : any, paneId : number, id : number){
    return this.store.dispatch(new UpdateDataBlockByPaneIdAction(body,id,paneId));
  }

  loadDataBlockDataFieldFieldValues(paneId : number, dataBlockId : number, dataFieldId : number) : Observable<any>{
    return this.store.dispatch(new GetDataBlockDataFieldFieldValues(paneId, dataBlockId, dataFieldId));
  }

  saveDataBlockDataFieldFieldValues(paneId : number, dataBlockId : number, dataFieldId : number, body : any) : Observable<any>{
    return this.store.dispatch(new SaveDataBlockDataFieldFieldValues(paneId,dataBlockId, dataFieldId,body));
  }
  
  deleteDataBlockDataFieldFieldValues(paneId : number, dataBlockId : number, dataFieldId : number, fieldValueId : number): Observable<any>{
    return this.store.dispatch(new DeleteDataBlockDataFieldFieldValues(paneId, dataBlockId, dataFieldId, fieldValueId));
  }

  getDataBlockDataFieldFieldValues() : Observable<any>{ 
    return this.store.select(TopicManagementState.getDataBlockDataFieldFieldValues)
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

  saveDataFiedlByPaneId(paneId: number, body: any) {
    return this.store.dispatch(new SaveDataFieldByPaneIdAction(paneId, body))
  }

  updateDataFieldByPaneId(paneId : number, id : number, body : any) : Observable<any> {
    return this.store.dispatch(new UpdateDateFieldByPaneIdAction(paneId,id,body));
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

  getChartSeriesQueryColorLookUp(){
    return this.store.select(TopicManagementState.getChartSeriesQueryLookup);
  }

  getChartColorLookUp(){
    return this.store.select(TopicManagementState.getChartSeriesColorLookup);
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

  saveNewOrExistingPaneChartParamenter(paneId : number, paneChartId : number, chartSeriesId : number, body : any) {
    return this.store.dispatch(new SaveNewOrExistingPaneChartParameter(paneId,paneChartId,chartSeriesId,body));
  }

  deletePaneChartParameter(paneId : number, paneChartId : number, chartSeriesId : number,chartParameterId : number) {
    return this.store.dispatch(new DeletePaneChartParameter(paneId,paneChartId,chartSeriesId,chartParameterId));
  }

  saveNewPane(body : any, surveyDescriptionId : number) : Observable<any>{
    return this.store.dispatch(new SaveNewPaneAction(body,surveyDescriptionId))
  }

  UpdadePaneById(body : any,surveyDescriptionId : number, paneId : number) : Observable<any>{
    return this.store.dispatch(new UpdadePaneByIdAction(body,surveyDescriptionId, paneId))
  }

  deletePaneById(topicDescriptionId : number, paneId : number) : Observable<any>{
    return this.store.dispatch(new DeletePaneByIdAction(topicDescriptionId, paneId));
  }

  createPaneCopyFromPaneId(topicDescriptionId : number, paneId : number, params : HttpParams) : Observable<any>{
    return this.store.dispatch(new CreateCopyPaneByIdAction(topicDescriptionId, paneId, params));
  }
}
