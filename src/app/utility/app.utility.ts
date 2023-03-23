import { PaginateModel } from "../interface/paginate-model";
import { AllowedMenuList } from "./app.allowedMenuList";

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
}
