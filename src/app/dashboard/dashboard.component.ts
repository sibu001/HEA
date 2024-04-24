import { AppUtility } from 'src/app/utility/app.utility';
import { CustomerService } from './../store/customer-state-management/service/customer.service';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
declare var $: any;
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as html2pdf from 'html2pdf.js';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged, filter, skipWhile } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { AppConstant } from '../utility/app.constant';
import { AdminFilter, UsageHistoryFilter } from '../models/filter-object';
import { SubscriptionUtil } from '../utility/subscription-utility';

declare const plotChartWithParams : any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  liveOrNot : string;
  helpHide : any;
  hides = true;
  count = 0;
  public adminFilter:AdminFilter;
  leakPriceValueSum = 0;
  recommendationPriceValueSum = 0;
  recommendationLength = 0;
  chartOptions: any;
  errorMessage: string;
  data: any;
  float: string;
  hideMsgs = true;
  hideHelps = false;
  myReportsList: any[] = [];
  recommendationList: any[] = [];
  leakList: any[] = [];
  nextTopic: string;
  topicDescription: string;
  surveyCode: string;
  surveyId: number;
  trendingHomeChart: any;
  trendingHomeChartCopy: any;
  trendingParts: any[];
  users: Users = new Users();
  globalM = 0;
  globalK = 0;
  public totalUnreadMail : number = 0;  
  customer : any = { user : { name : ''}, auditId : ''};
  subject$ : Subject<any> = new Subject();
  private readonly subscriptions: Subscription = new Subscription();
  public dataListForSuggestions = [];

  constructor(private router: Router,
    private loginService: LoginService,
    private readonly customerService: CustomerService,
    private http: HttpClient,
  ) {
    AppUtility.removeLoader();
    this.users = this.loginService.getUser();
    this.customer = JSON.parse(JSON.stringify(this.users.outhMeResponse));

    this.count = 0;
    if (this.users.outhMeResponse === undefined) {
      this.loginService.logout();
    }

    if(this.users.role == 'USERS' && this.users.currentPaneNumber && this.users.currentPaneNumber.currentPane &&
     ( this.users.currentPaneNumber.currentPane.paneCode == 'prf_onHold' ||  this.users.surveyLength <= 3))
      this.router.navigate(['/surveyView']);

    this.findCustomer();

    this.adminFilter = JSON.parse(localStorage.getItem('adminFilter'));
    if (this.adminFilter === undefined || this.adminFilter === null) {
      this.adminFilter = new AdminFilter();
    }
  }


  ngOnDestroy(): void {
    SubscriptionUtil.unsubscribe(this.subscriptions);
  }

  ngOnInit() {
    AppUtility.removeAllPreviousCanvasElements();

    // for re-initialization after selecting different customer
    this.trendingParts = [];
    this.trendingHomeChart = undefined;
    this.trendingHomeChartCopy = undefined;

    this.getNextSurvey();
    this.getTrendingHomeChart();
    this.getTrendingProfileChart();
    if (this.users.myReportsData && this.users.myReportsData.customerId == this.users.outhMeResponse.customerId) {
      this.myReportsList = this.users.myReportsData.data;
    } else {
      this.getMyReport();
    }
    // if (this.users.customerMailList.length <= 0) {
      this.getMailList();
    // }else{
    //   this.getUnreadMessageCount();
    // }
    if (this.users.recommendationList.length <= 0 || this.users.recommendationStatusChange || this.users.leakList.length <= 0) {
      this.getLeaksAndRecommendation();
    } else {
      this.getRecommendationList(this.users.recommendationList);
      for (let index = 0; index < this.users.recommendationList.length; index++) {
        this.recommendationPriceValueSum = this.users.recommendationList[index].priceValue + this.recommendationPriceValueSum;
      }
      this.leakCalculation();
    } 

    document.getElementById('loader').classList.add('loading');
    /* for demonstration purposes only */
    $('.navbar-toggle').click(function () {
      if ($(this).hasClass('collapsed')) {
        $(this).removeClass('collapsed');
      } else {
        $(this).addClass('collapsed');
      }
    });
    this.scrollTop();
    // if (this.users.isFirstTime) {
    //   this.users.isFirstTime = false;
    //   document.getElementById('dashboard_info').classList.add('show-info');
    // }

    AppUtility.appendAuditIdToCustomerFilter(this.users);
    this.checkLiveServer();
  }
  hideMsg() {
    this.hideMsgs = false;
  }
  hideHelp() {
    this.hideHelps = false;
  }
  hide() {
    this.hides = !this.hides;
    if (this.hides) {
      this.float = 'right';
    } else {
      this.float = 'left';
    }
  }
  leakCalculation() {
    let count = 0;
    this.leakList = new Array;
    for (let i = 0; i < this.users.leakList.length; i++) {
      let distinct = false;
      for (let j = 0; j < i; j++) {
        if (JSON.stringify(this.users.leakList[i].recommendation.takebackIcon) === JSON.stringify(this.users.leakList[j].recommendation.takebackIcon)) {
          distinct = true;
          break;
        }
      }
      if (!distinct) {
        this.leakList[count++] = this.users.leakList[i];
      }
    }
    for (let i = 0; i < count; i++) {
      let counter = 0;
      for (let j = 0; j <= this.users.leakList.length - 1; j++) {
        if (JSON.stringify(this.leakList[i].recommendation.takebackIcon) === JSON.stringify(this.users.leakList[j].recommendation.takebackIcon)) {
          counter++;
        }
        this.leakList[i].repeat = counter;
      }
    }
    for (let index = 0; index < this.users.leakList.length; index++) {
      this.leakPriceValueSum = Math.floor(this.users.leakList[index].priceValue) + this.leakPriceValueSum;
    }
  }
  leakView(id) {
    this.users.leakFocusId = id;
    this.loginService.setUser(this.users);
    this.router.navigate(['leakListView']);
  }
  surveyRecommendationList(number) {
    this.users.recommendationNo = number;
    this.loginService.setUser(this.users);
    this.router.navigate(['/surveyRecommendationList']);

  }
  calculateFunction(counts) {
    this.count = counts + 1;
  }

  getMyReport() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/user-reports').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));

        this.users.myReportsData = {
          customerId : this.users.outhMeResponse.customerId,
          data : response
        };
        this.myReportsList = this.users.myReportsData.data;
        this.loginService.setUser(this.users);
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }
  
  async setUpValueInUsageHitoryFilter(customer){
    let usageHistoryFilter = new UsageHistoryFilter();
    usageHistoryFilter.formValue = { "auditId" : customer.auditId , "customerName" : customer.user.name };
    localStorage.setItem('usageHistoryFilter',JSON.stringify(usageHistoryFilter));
  }

  getNextSurvey() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys/nextTopic').subscribe(
      data => {
        this.setUpValueInUsageHitoryFilter(this.users.outhMeResponse);
        const response = JSON.parse(JSON.stringify(data));
        if (response.data != null) {
          this.nextTopic = response.data.surveyDescription.label;
          this.topicDescription = response.data.surveyDescription.description;
          this.surveyCode = response.data.surveyDescription.surveyCode;
          this.surveyId = response.data.surveyId;
        }
          this.users.nextSurvey = response.data;
          this.loginService.setUser(this.users);
        
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
  getRecommendationList(recommendationList: any): void {

    for (let index = 0; index < recommendationList.length; index++) {
      if (recommendationList[index].parentLeakId !== null) {
        this.recommendationList.push(recommendationList[index]);
      }
    }
    this.recommendationLength = this.recommendationList.length;

    // this.recommendationList = [...recommendationList];
    // this.recommendationLength = recommendationList.length;
    // this.recommendationList = new Array;
    // let i = 0;
    //   if ((recommendationList[index].status === 'N' || recommendationList[index].status === 'L') && recommendationList[index].parentLeakId != null) {
    //   }
    // }
    // this.recommendationLength = i;
  }
  getRecommendation() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/recommendations').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        const newList = _.reverse(response.data);
        const groups = _.groupBy(newList, 'recommendationId');
        const array = [];
        _.forOwn(groups, function (value, key) {
          array.push(value[0]);
        });
        const recommendationsList = array;
        for (let index = 0; index < recommendationsList.length; index++) {
          this.recommendationPriceValueSum = recommendationsList[index].priceValue + this.recommendationPriceValueSum;
        }
        this.users.recommendationList = array;
        this.users.recommendationStatusChange = false;
        this.loginService.setUser(this.users);
        this.getRecommendationList(this.users.recommendationList);
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));

      }
    );
  }

  getLeak() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/leaks').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.leakList = response.data;
        this.users.leakList = response.data;
        this.loginService.setUser(this.users);
        this.leakCalculation();
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      });
  }
  getLeaksAndRecommendation() {
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/recommendationsAndLeaks').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        const newList = _.reverse(response.data.recommendations);
        const groups = _.groupBy(newList, 'recommendationId');
        const array = [];
        _.forOwn(groups, function (value, key) {
          array.push(value[0]);
        });
        const recommendationsList = array;
        for (let index = 0; index < recommendationsList.length; index++) {
          this.recommendationPriceValueSum = recommendationsList[index].priceValue + this.recommendationPriceValueSum;
        }
        this.users.recommendationList = array;
        this.users.recommendationStatusChange = false;
        this.getRecommendationList(this.users.recommendationList);
        this.leakList = response.data.leaks;
        this.users.leakList = response.data.leaks;
        this.loginService.setUser(this.users);
        this.leakCalculation();

        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }

  getMailList() {
    const params = new HttpParams()
      .append('systemMessage','false'); 
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetWithParams('customers/' + this.users.outhMeResponse.customerId + '/mails',params).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.users.customerMailList = response.data;
        this.loginService.setUser(this.users);
        this.getUnreadMessageCount();
      },
      error => {
        const response = JSON.parse(JSON.parse(JSON.stringify(error))._body);
        this.errorMessage = response.error_description;
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  getUnreadMessageCount(){
    this.users.customerMailList.forEach(data =>{
      if(!data.wasOpened){
        this.totalUnreadMail++;
      }
    });
  }

  surveyView(surveyCode, surveyId) {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys/' + surveyCode + '/' + surveyId).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.users.paneNumber = 0;
        this.users.currentPaneNumber = response.data;
        this.users.isDashboard = true;
        this.loginService.setUser(this.users);
        this.router.navigate(['/surveyView']);
        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  getTrendingHomeChart() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/trendingHomeChart').subscribe(
      data => {
        document.getElementById('loader').classList.remove('loading');
        const response = JSON.parse(JSON.stringify(data));
        this.trendingHomeChart = response.data;
        this.trendingHomeChartCopy = JSON.parse(JSON.stringify(this.trendingHomeChart));
        // /* tslint:disable:no-unused-variable */
        // const line1: Array<any> = new Array;
        // /* tslint:disable:no-unused-variable */
        // const line2: Array<any> = new Array;
        // /* tslint:disable:no-unused-variable */
        // const line3: Array<any> = new Array;
        // /* tslint:disable:no-unused-variable */
        // const line4: Array<any> = new Array;
        // /* tslint:disable:no-unused-variable */
        // const line5: Array<any> = new Array;
        // /* tslint:disable:no-unused-variable */
        // const line6: Array<any> = new Array;
        // let i = 0;
        // for (const areaSeries of response.data.chart.series) {
        //   if (i === 0) {
        //     for (const areaSeriesValue of areaSeries.seriesValues) {
        //       line1.push([areaSeriesValue.label, areaSeriesValue.value]);
        //     }
        //   } else if (i === 1) {
        //     for (const areaSeriesValue of areaSeries.seriesValues) {
        //       line2.push([areaSeriesValue.label, areaSeriesValue.value]);
        //     }
        //   } else if (i === 2) {
        //     for (const areaSeriesValue of areaSeries.seriesValues) {
        //       line3.push([areaSeriesValue.label, areaSeriesValue.value]);
        //     }
        //   } else if (i === 3) {
        //     for (const areaSeriesValue of areaSeries.seriesValues) {
        //       line4.push([areaSeriesValue.label, areaSeriesValue.value]);
        //     }
        //   } else if (i === 4) {
        //     for (const areaSeriesValue of areaSeries.seriesValues) {
        //       line5.push([areaSeriesValue.label, areaSeriesValue.value]);
        //     }
        //   } else if (i === 5) {
        //     for (const areaSeriesValue of areaSeries.seriesValues) {
        //       line6.push([areaSeriesValue.label, areaSeriesValue.value]);
        //     }
        //   }
        //   i++;
        // }
        // console.log(line1 + '' + line2 + '' + line3 + '' + line4 + '' + line5 + '' + line6);
        // utility function created in chartPlotUtility.js
        setTimeout(() => plotChartWithParams(response.data.chart.freeChartConfigurationJS,response.data.chart.series), 100);
        // this.getTrendingProfileChart(); // get data for trending chart
        if (this.users.recommendationList != null && this.users.recommendationList.length > 0 && !this.users.recommendationStatusChange) {
          document.getElementById('loader').classList.remove('loading');
        }
        setTimeout(function () {
          $($('#chartSeasonalStack tr.jqplot-table-legend td.jqplot-table-legend').get(10)).hide();
        }, 80);
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(navigator.userAgent);
    const ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      console.log('Mobile');
    } else {
      if (event.type === 'resize') {
        const self = this;
        self.globalM++;
        this.trendingHomeChart = undefined;
        setTimeout(() => {
          self.globalK++;
          // const line1: Array<any> = new Array;
          // const line2: Array<any> = new Array;
          // const line3: Array<any> = new Array;
          // const line4: Array<any> = new Array;
          // const line5: Array<any> = new Array;
          // const line6: Array<any> = new Array;
          // let i = 0;
          // for (const areaSeries of self.trendingHomeChartCopy.chart.series) {
          //   if (i === 0) {
          //     for (const areaSeriesValue of areaSeries.seriesValues) {
          //       line1.push([areaSeriesValue.label, areaSeriesValue.value]);
          //     }
          //   } else if (i === 1) {
          //     for (const areaSeriesValue of areaSeries.seriesValues) {
          //       line2.push([areaSeriesValue.label, areaSeriesValue.value]);
          //     }
          //   } else if (i === 2) {
          //     for (const areaSeriesValue of areaSeries.seriesValues) {
          //       line3.push([areaSeriesValue.label, areaSeriesValue.value]);
          //     }
          //   } else if (i === 3) {
          //     for (const areaSeriesValue of areaSeries.seriesValues) {
          //       line4.push([areaSeriesValue.label, areaSeriesValue.value]);
          //     }
          //   } else if (i === 4) {
          //     for (const areaSeriesValue of areaSeries.seriesValues) {
          //       line5.push([areaSeriesValue.label, areaSeriesValue.value]);
          //     }
          //   } else if (i === 5) {
          //     for (const areaSeriesValue of areaSeries.seriesValues) {
          //       line6.push([areaSeriesValue.label, areaSeriesValue.value]);
          //     }
          //   }
          //   i++;
          // }
          // console.log(line1 + '' + line2 + '' + line3 + '' + line4 + '' + line5 + '' + line6);          
          if (self.globalM === self.globalK) {
            self.trendingHomeChart = self.trendingHomeChartCopy;
          }
          setTimeout(()=> {
            if (self.globalM === self.globalK) {
              plotChartWithParams(self.trendingHomeChartCopy.chart.freeChartConfigurationJS, self.trendingHomeChartCopy.chart.series);
               self.globalM = 0;
               self.globalK = 0;
            }
          }, 50);
          if (self.users.recommendationList != null && self.users.recommendationList.length > 0 && !self.users.recommendationStatusChange) {
            document.getElementById('loader').classList.remove('loading');
          }
          setTimeout(function () {
            $($('#chartSeasonalStack tr.jqplot-table-legend td.jqplot-table-legend').get(10)).hide();
          }, 50);
          // i++;
        }, 20);          // self.renderTrendingProfileChart();

      }
    }
  }


  getTrendingProfileChart() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/trendingHome/trendingParts').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.trendingParts = response.data;
        const self = this;
        setTimeout(function () {
          for (let areaSeries of response.data[0].trendingCharts) {
            if (areaSeries.chart.freeChartConfigurationJS != null) {
              let freeChartConfigurationJS = AppUtility.removeJqplotPlugins(areaSeries.chart.freeChartConfigurationJS);
              eval(freeChartConfigurationJS);
                $('#trendingChart' + areaSeries.id + '>div .jqplot-target').click(function(event){
                  if($(document).width() <= 786) return;

                  self.router.navigate(['/trendingPartsView'],{queryParams : {activeResource : areaSeries.resourceUse, unitType : areaSeries.unitType
                    , useTypes : areaSeries.useType}})
                }).css('cursor', 'pointer');

              
                // added anchor element to trendingParts for redirection to view details in small screen.
                if($('#trendingChart' + areaSeries.id).text().trim().length != 0){
                  const div = document.createElement('div');
                  const para = document.createElement("a");
                  const node = document.createTextNode("view chart details");
                  para.classList.add('anchorTag');
                  para.appendChild(node);
                  para.setAttribute('id','anchor'+areaSeries.id);
                  div.appendChild(para);
                  div.classList.add('trending-charts-redirection')
                  $('#trendingChart' + areaSeries.id + '>div:first-child>div:first-child').before(div);     
                }

                  $('#anchor'+areaSeries.id).click(
                    function(event){
                      self.router.navigate(['/trendingPartsView'],{queryParams : {activeResource : areaSeries.resourceUse, unitType : areaSeries.unitType
                        , useTypes : areaSeries.useType}})
                    }
                  ).css('cursor', 'pointer');
                //
            }
          }                           
        }, 100);
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }
  questionHelp() {
    window.open('https://hea-docs.s3.amazonaws.com/HomeChartHelp.html');
    return;
  }

  // continue(): void {
  //   document.getElementById('dashboard_info').classList.remove('show-info');
  // }

  scrollTop() {
    window.scroll(0, 0);
  }

  highlightHelp(){
    document.getElementById('knowTopics').style.visibility = 'visible';
  }

  hidelightHelp(){
    document.getElementById('knowTopics').style.visibility = 'hidden';
  }

  nextTopicHelpOnClick(){
    const helpInfo = document.getElementById('knowTopics');
    if(helpInfo.style.visibility == 'visible'){
      helpInfo.style.visibility = 'hidden';
    }else{
      helpInfo.style.visibility = 'visible'; 
    }
  }


  // search functionality for customer

  findCustomerByAuditIdOrCustomerName(calledBy, value){
   
    let filters = new HttpParams();
    
    if(calledBy == 'auditId'){
      filters = filters.set('auditId',value);
      this.customer.user.name = '';
    }else{
      filters = filters.set('customerName',value);
      this.customer.auditId = '';
    }

    filters = AppUtility.addNoLoaderParam(filters);
    filters = filters.set('useLike','true');

    this.subject$.next(filters);

  }

  findCustomer(){
    this.subscriptions.add(this.subject$
      .pipe(
       debounceTime(AppConstant.debounceTime)  
      , distinctUntilChanged())
      .switchMap((filters : HttpParams) => this.loginService.customerSuggestionListRequest(filters))
      .subscribe(
        (response) =>{
          if(!response) return null;
          this.dataListForSuggestions = response.slice(0,100);
          if(this.dataListForSuggestions.length == 1){
            this.selectedSuggestion(this.dataListForSuggestions[0]);
            this.dataListForSuggestions = [];
          }

        }, error =>{
           console.log(error);
        }
      ))
}

selectedSuggestion(event : any){

  this.customer = event;
  this.users.outhMeResponse = this.customer;
  this.users.theme = this.customer.customerGroup.theme;
  this.users.recommendationStatusChange = true;
  this.loginService.setUser(this.users);

  this.ngOnInit();

}
// for better understanding check-https://xp-dev.com/trac/HEA/ticket/1204#comment:16
checkAndShowAlert(reportLink: string):void{
  if(this.liveOrNot === 'live' && reportLink.includes('monthlyEnergy') && this.users.role != 'USERS'){
       const confirm = AppUtility.liveServerAlertText();
      if(confirm){
        window.open(reportLink, '_blank');
      }
  }
  else{
    window.open(reportLink, '_blank');
  }
}

// check server is live or sandbox
checkLiveServer(){

  this.loginService.performGet('conf/'+'server').subscribe(
    (data) => {
     this.liveOrNot = data.data;
    }
  )
}

initializeShowEyeIcon() {
  for (let i = 0; i < this.myReportsList.length; i++) {
      this.myReportsList[i].showEyeIcon = false;
  }
}

pdfIconClicked(report:any){
  this.initializeShowEyeIcon();
  report.showEyeIcon = true;
  this.loginService.performGet(`userreports/html2pdf`).subscribe(
    data=>{
      if(data.data.useHtml2PdfRocket){
       this.useHtml2PdfJs(report); 
       //this.useHtml2PdfRocket(report);
      }else if(data.data.useHtml2PdfJs){
          this.useHtml2PdfJs(report); 
      }else if(data.data.useHtml2PdfRocket && data.data.useHtml2PdfJs ){
        this.useHtml2PdfRocket(report);
      }else{
        this.useHtml2PdfRocket(report);
      }
    }
  )
}

useHtml2PdfJs(report:any) {
  let link = report.reportLink;
  link = this.modifyReportLink(link);
  const url = link;
  const specificPart = url.substring(url.indexOf('userReportLink'));

this.loginService.performGetForBlob(`${specificPart}`, { responseType: 'blob' }).subscribe(
  (data: HttpResponse<Blob>)=>{
    const reader = new FileReader();
    reader.onload = () => {
      const htmlContent: string = reader.result as string;
      this.html2PDFUtilityCreateIframePDF(htmlContent,report);
    };
    reader.readAsText(data.body);
  }
)
}




private html2PDFUtilityCreateIframePDF(iframeSrc : string, report : any) : void {

  // added loader for better user interface.
  AppUtility.showLoader();

  // creating temprory HTML Document 
  const parser = new DOMParser();
  const parsedDocument : Document = parser.parseFromString(iframeSrc,'text/html');

  const origin = location.host.startsWith("localhost")  || location.host.startsWith("sandbox") ?  
    AppConstant.classicVersionPrefixSandbox : AppConstant.classicVersionPrefixLive;

  // rewriting the src for the all the script tags(CDN only), only prefix it with origin so that they can be found on the server.
  Array.from(parsedDocument.querySelectorAll('script'))
  .filter(script => script.getAttribute('src') && script.getAttribute('src').startsWith("."))
  .forEach(script =>{
      const src = script.getAttribute('src');
      script.setAttribute('src', `${origin}${src.substring(1)}`);
  })

  // rewriting the herf for the all the link tags(CDN only), only prefix it with origin so that they can be found on the server.
  Array.from(parsedDocument.querySelectorAll('link'))
  .filter(link => link.getAttribute('href') && link.getAttribute('href').startsWith("."))
  .forEach(link =>{
      const src = link.getAttribute('href');
      link.setAttribute('href', `${origin}${src.substring(1)}`);
  })

  // getting the new formatted content in iframeSrc variable.
  iframeSrc = parsedDocument.documentElement.outerHTML;

  // creating an Iframe to load all the formatted content so that complete PDF can be generated. 
  const iframe : HTMLIFrameElement = document.createElement('iframe');
  iframe.classList.add('visible-hidden');
  const auditId = this.users.outhMeResponse.auditId;

  // appending Iframe to the DOM.
  document.body.appendChild(iframe);
  
  // callback to be called when the Iframe fully loaded.
  iframe.onload = function(){

    // injecting the formatted content in the iframe. 
    iframe.contentDocument.write(iframeSrc);
    iframe.contentDocument.close();

    // // Apply CSS for page breaks
    if(report.reportLabel!=='Natural Gas Regression' && report.reportLabel!=='Electric Regression'){
    const style = iframe.contentDocument.createElement('style');
    style.textContent = `
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }
  `;
    iframe.contentDocument.head.appendChild(style);
  }
    const pageBreakStyle = iframe.contentDocument.createElement('style');
// pageBreakStyle.textContent = `
//   @media screen {
//     .sectiondivider { page-break-after: avoid; !important; }
//   }
// `;
// iframe.contentDocument.head.appendChild(pageBreakStyle);

    // Find all elements that should trigger page breaks
    // const pageBreakElements = iframe.contentDocument.querySelectorAll('.sectiondivider');

    // // Add a page break after each element
    // pageBreakElements.forEach(element => {
    //   element.classList.remove('sectiondivider'); // Remove class to avoid multiple breaks
    //   const wrapper = iframe.contentDocument.createElement('div');
    //   wrapper.appendChild(element.cloneNode(true)); // Clone element to avoid removing it from original position
    //   wrapper.classList.add('sectiondivider');
    //   iframe.contentDocument.body.appendChild(wrapper);
    // });
    // passing PDF configuration for library use.
    const options = report.reportLabel === 'Natural Gas Regression' || report.reportLabel === 'Electric Regression'
    ? {
        margin: [0, 0.5, 0.5, 0],
        filename: `${report.reportLabel}- ${auditId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2,imageTimeout : 2000 },
        jsPDF: { unit: 'in', format: 'a3', orientation: 'l' }
      }
    : {
        margin:1,
        filename: `${report.reportLabel}- ${auditId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2,imageTimeout : 2000},
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'p' }

      };
    
    setTimeout(() => {

      //  due to some reason adding all the script tag to the body.
      Array.from(iframe.contentDocument.querySelectorAll('style, link'))
        .forEach(ele => iframe.contentDocument.body.appendChild(ele));
        console.log('baba',iframe.contentDocument.body);
      html2pdf().set(options).from(iframe.contentDocument.body).save();
      
      // removing the IFrame from the DOM after use.
      document.body.removeChild(iframe);

      // removing the loadet as process in completed.
      AppUtility.removeLoader();
    },6000);
    report.showEyeIcon = false;

  }
  
}

modifyReportLink(link: string): string {
  let modifiedLink = link.includes('?') ? link.replace('?', '?formAction=report&') : link + '?formAction=report';
  modifiedLink += '&prepareForm=true';
  return modifiedLink;
}

useHtml2PdfRocket(report: any) {
  if (!report || !this.users || !this.users.outhMeResponse) {
      return;
  }
   this.initializeShowEyeIcon();
   report.showEyeIcon = true;
  let modifiedLink = report.reportLink;
  modifiedLink = this.modifyReportLink(modifiedLink);

  //file name for the PDF
  const fileName = `${report.reportLabel}- ${this.users.outhMeResponse.auditId}.pdf`;
  const urlPram = report.reportLabel == 'Natural Gas Regression'|| report.reportLabel == 'Electric Regression'?encodeURIComponent(`MarginLeft=5&MarginRight=5&UseLandscape=true`):encodeURIComponent(`MarginLeft=10`);
  const apiUrl = `userreports/html2pdf/rocket?fileName=${fileName}&pdfApiParams=${urlPram}&url=${encodeURIComponent(modifiedLink)}`;
  this.loginService.performGetForBlob(apiUrl).subscribe(
      (response: HttpResponse<Blob>) => {
          const file = new Blob([response.body], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          saveAs(fileURL, fileName);
          report.showEyeIcon = false; 
      },
      (error) => {
          console.error('Error fetching PDF:', error);
      }
  );
}

}
