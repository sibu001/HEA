import { HttpParams } from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { PaginateModel } from "../interface/paginate-model";
import { AdminFilter, ScriptDebugConsoleData } from "../models/filter-object";
import { AllowedMenuList } from "./app.allowedMenuList";
import { AppConstant } from "./app.constant";

declare var initPendingMessages : any;

export class AppUtility {

    public static isnavBarCollapsed = false;
    public static isEmptyString(str): boolean {
        return (!str || 0 === str.length);
    }

    public static isEmptyObject(object): boolean {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    public static scrollTop(x:number =0, y:number=0){
        window.scroll(x,y);
    }

    public static convertMillisecondToTime(millisecond: any) {
        let dayValue: any = '';
        if (millisecond > 86400000) {
            const tmpValue: any = millisecond / 86400000;
            dayValue = Number(parseFloat(tmpValue).toFixed(0)) + ' days ';
            millisecond = (millisecond % 86400000);
        }
        let seconds: any = parseInt((millisecond / 1000) % 60 + '', 10);
        let minutes: any = parseInt(((millisecond / (1000 * 60)) % 60) + '', 10);
        let hours: any = parseInt((millisecond / (1000 * 60 * 60)) % 24 + '', 10);
        let timeValue = '';

        // if (withHour) {
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        timeValue = hours + ':' + minutes + ':' + seconds;
        // }

        return dayValue + timeValue;
    }

    static getDateFromMilllis(millisecond: any) {

        if(millisecond == undefined || millisecond == undefined) return '';

        const date = new Date(millisecond)
        var d = AppUtility.getFormated(date.getMonth() + 1)
        +'/'+ AppUtility.getFormated(date.getDate())
        +'/'+AppUtility.getFormated(date.getFullYear())
        +' '+AppUtility.getFormated(date.getHours()) + 
        ':' + AppUtility.getFormated(date.getMinutes()) + 
        ':' + AppUtility.getFormated(date.getSeconds());
        return d;
      }

      static getDateOnlyFromMilllis(millisecond: any) {

        if(millisecond == undefined || millisecond == undefined) return '';

        const date = new Date(millisecond)
        var d = AppUtility.getFormated(date.getMonth() + 1)
        +'/'+ AppUtility.getFormated(date.getDate())
        +'/'+AppUtility.getFormated(date.getFullYear());

        return d;
      }

    public static isDateValid(date : string) : boolean {
        // const validDateRegex = /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}:\d{2}$/;
        const validDateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}(?:\s([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])?$/;
        
        if (!date.match(validDateRegex)) {
          return false ;
        }
    
        return true;
    }

    public static inputFieldNumberValidator(control: FormControl) : any {
        return new Promise((resolve) => {
            const inputValue = control.value;
            // Use a regular expression to check if the input value contains only numbers
            const validNumberRegex = /^[0-9]*$/;
        
            if (!inputValue.match(validNumberRegex)) {
              resolve({ notANumber : true });
            } else {
              resolve(null); // Resolve with null if the input value is valid
            }
          });
      }


    private static getFormated(num){
        return num < 10 ? '0' + num : num;
    }

    public static removeJqplotPlugins(freeChartConfigurationJS : string) : string{
       
        // below line to romve '$.jqplot.config.enablePlugins=true' that create conflict with other chart(seasonal chart)
        // and make data-highlight property not work well i.e.. making data-highlighter appears on corners. 
                
        const commentIndex = freeChartConfigurationJS.indexOf('$.jqplot.config.enablePlugins');
        freeChartConfigurationJS = freeChartConfigurationJS.slice(0,commentIndex) + '//' + freeChartConfigurationJS.slice(commentIndex);
        return freeChartConfigurationJS;
    }

    public static setAllowedMenuList(allowedMenuList : Array<string>) : AllowedMenuList{
  
        const allowedMenus = new AllowedMenuList();
    
        for(let menu of allowedMenuList){
            switch(menu){
                case 'surveyHistoryList':{
                    allowedMenus.TOPIC_HISTORY = true;
                    break;
                }

                case 'customerEvents':{
                    allowedMenus.EVENT_HISTORY = true;
                    break;
                }

                case 'recommendations':{
                    allowedMenus.RECOMMENDATIONS = true;
                    break;
                }

                case 'mailArchiveList':{
                    allowedMenus.MAIL_ARCHIVE = true;
                    break;
                }

                case 'usageHistory.electricDaily':{
                    allowedMenus.USAGE_HISTORY.ELECTRICITY_DAILY_SMART_METER = true;
                    break;
                }
                case 'usageHistory.gasCharge':{
                    allowedMenus.USAGE_HISTORY.GAS_CHARGE = true;
                    break;
                }
                case 'usageHistory.electricity':{
                    allowedMenus.USAGE_HISTORY.ELECTRICITY = true;
                    break;
                }
                case 'usageHistory.gasDetail':{
                    allowedMenus.USAGE_HISTORY.GAS_SMART_METER = true;
                    break;
                }
                case 'usageHistory.electricDetail':{
                    allowedMenus.USAGE_HISTORY.ELECTRICITY_SMART_METER = true;
                    break;
                }
                case 'usageHistory.electricityCharge':{
                    allowedMenus.USAGE_HISTORY.ELECTRICITY_CHARGE = true;
                    break;
                }
                case 'usageHistory.gas':{
                    allowedMenus.USAGE_HISTORY.GAS = true;
                    break;
                }
                case 'usageHistory.waterDetail':{
                    allowedMenus.USAGE_HISTORY.WATER_SMART_METER = true;
                    break;
                }
                case 'usageHistory.waterCharge':{
                    allowedMenus.USAGE_HISTORY.WATER_CHARGE = true;
                    break;
                }
                case 'usageHistory.water':{
                    allowedMenus.USAGE_HISTORY.WATER = true;
                    break;
                }
            }

        }
        return allowedMenus;
    }

    public static createAndDownlodCSVFile(fileData: string[]) {    

        const blob = new Blob(fileData, { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'file.csv');
        a.click();
    }

    public static formatUsageHistoryDialogbox(){
        const trList = document.getElementsByTagName('tr');
        
        let tr : Element;
        for(let i = 0; tr = trList[i], i < trList.length; i++){
            tr.classList.add('row');
            tr.children[0].classList.add('col-sm-4');
            tr.children[1].classList.add('col-sm-3');
            const newTrElement : Element = document.createElement('td');
            newTrElement.classList.add('col-sm-5')
            tr.appendChild(newTrElement);
        }
    }

    public static getLinkedPersonByType(linkedPersonType : number) : string{

        if(linkedPersonType == 1){
            return "Customer";
        }else if(linkedPersonType == 2){
            return "Staff";
        }else if(linkedPersonType == 3){
            return "Partner";
        }
    }

    //  utility method for pagination , if no pagination-data(example pageSize,totalElement etc...) is returned by rest service.
    //  ***** Note disable the last button in the table component(eg.. [disableLastButton]='true') if use this method for pagination purpose.
    // and use the attribute used in componentRef(in below method) in the component to control the pagination (for example see place-list.component.ts).
    public static paginateData(data : PaginateModel, componentRef){

        let { dataList, dataSource, pageSize, pageIndex, currentIndex, disableNextButton, newFilterSearch} = data;

        if(dataList.length == pageSize){
            dataSource = [...dataList];
            pageIndex = currentIndex;
            disableNextButton = false;
          } else {
            disableNextButton = true;
            if(dataList.length > 0){
              dataSource = [...dataList];
              pageIndex = currentIndex;
            } else {
            if(newFilterSearch)
                dataSource = [...dataList];
            pageIndex = currentIndex -1;
          }}  
          newFilterSearch = false;

        componentRef.dataSource = dataSource; 
        componentRef.pageIndex = pageIndex;
        componentRef.disableNextButton = disableNextButton;
        componentRef.newFilterSearch = newFilterSearch;
    }


    public static showLoader(){
        document.getElementById('global-loader').classList.add('loading');
    }

    public static removeLoader(){
        document.getElementById('global-loader').classList.remove('loading');
    }

    public static scrollToTableTop(tableScrollPoint : ElementRef): void{
        if(!tableScrollPoint) return;
        setTimeout(()=>{ tableScrollPoint.nativeElement.scrollIntoView({behavior: 'smooth', inline : 'start'}); },50);
    }

    // method to restrict loader to show on screen.
    public static addNoLoaderParam(params ?: HttpParams) : HttpParams{
        if(!params) params = new HttpParams();
        return params.set(AppConstant.SHOW_NO_LOADER,true.toString());
    }

    public static getScriptDebugConsoleData() : ScriptDebugConsoleData{
        const scriptDebugConsoleData : ScriptDebugConsoleData
                = JSON.parse(localStorage.getItem('scriptDebugConsoleData')) as ScriptDebugConsoleData;
        
        return scriptDebugConsoleData ? scriptDebugConsoleData : new ScriptDebugConsoleData(); 
    }

    public static setScriptDebugConsoleData(scriptDebugConsoleData : ScriptDebugConsoleData) : void{
        localStorage.setItem('scriptDebugConsoleData', JSON.stringify(scriptDebugConsoleData));
    }

    public static isAddIsLikeSearchParam(formValues : any) : string{

        const ValueArray : Array<any> = Object.values(formValues);
        for(const value of ValueArray){
            if(value.toString().includes('%'))
            return 'true';
        }

        return 'false';
    }

    public static forceParamToBoolean(forceParam : string) : boolean{
        return forceParam == 'true'
    }

    public static validateAndHighlightReactiveFrom(formGroup : FormGroup) : boolean{
        let isFormValid : boolean = true;
        for (const key of Object.keys(formGroup.controls)) {
            
            // check for the nested form.
            if(formGroup.controls[key] instanceof FormGroup)
                AppUtility.validateAndHighlightReactiveFrom(formGroup.controls[key] as FormGroup);

            if (formGroup.controls[key].invalid) {
                isFormValid = false;
                formGroup.controls[key].markAsTouched();
                const invalidControl = document.querySelector('[formControlName="' + key + '"]') as HTMLInputElement;
                invalidControl.focus();
            }
        }
        return isFormValid;
    }

    public static showErrorMessageOnErrorField(formControl : { [key: string]: AbstractControl; }, formControlName: string) : boolean{
        return formControl[formControlName].invalid && (formControl[formControlName].dirty || formControl[formControlName].touched);
    }

    // Noter*** Re-render the form after the successfull save or update value 
    // because without re-rendering will highlight the old invalid value which valid. 
    // for example see topic-description-pane screen.
    public static errorFieldHighlighterCallBack = async (errResposne : any) =>{
        for(let error of errResposne.error.errors){
            const errorfield = document.querySelector(`[formControlName="${error.field}"]`) as HTMLElement;
            errorfield.focus();
            errorfield.style.border = '1px solid red';
          }
    }

    public static checkForAdminFilter(subFilter : string) : AdminFilter{
        const adminFilter : AdminFilter = JSON.parse(localStorage.getItem('adminFilter'));
        if (adminFilter === undefined || adminFilter === null || adminFilter[subFilter] === null) {
          return new AdminFilter();
        }

        return adminFilter;
    }

    public static saveAdminFilter(adminFilter: AdminFilter) : void {
        localStorage.setItem('adminFilter', JSON.stringify(adminFilter));
    }

    public static addCustomIdentifierForReducer(responseObject : any, lastRequestedId : any) : {response : any, id : number}{
        responseObject.id = lastRequestedId;
        return responseObject;
    }

    public static initPendingMessagesService(userId : string){
        initPendingMessages(userId,{});
    }

    public static multicastPendingMessages(userId : string){
        const globalObject : any = window;
        if(!globalObject.pendingMessages)
            AppUtility.initPendingMessagesService(userId);
        
        globalObject.pendingMessagesClient.multicastPendingMessages(userId);
        globalObject.pendingMessagesClient.subscribe(userId);
    }

    //  get newlySelected and newly removed elements from checkbox table.
    public static getNewlySelectedAndRemovedList(newlySelectedCheckbox : Array<any>, oldSelected : Array<any>, selectedElmentId : string) : {newlySelected: Array<any>, newlyRemoved: Array<any>}{

        const newlySelectedElements : Array<any> = [];
        const removedElements : Array<any> = [];
    
        oldSelected.forEach((data) =>{
            const index = newlySelectedCheckbox.findIndex((element) => element[selectedElmentId] == data );
            if(index == -1)  removedElements.push(data);
        });
    
        newlySelectedCheckbox.forEach((data) =>{
          const index = oldSelected.findIndex((elements) => elements == data[selectedElmentId]);
          if(index == -1) newlySelectedElements.push(data[selectedElmentId]);
        });
        
        return { newlySelected : newlySelectedElements , newlyRemoved : removedElements };
    }

    public static deleteConfirmatonBox() : boolean{
        return confirm('Are you sure you want to delete?');
    }   

    // Note*** provide chunks in sequence
    public static endPointGenerator(chunks : Array<string | number>): string{
        return chunks.join('/');
    }

}
