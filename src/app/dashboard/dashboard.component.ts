import { Component, OnInit, ContentChild, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from "src/app/models/user";
import { LoginService } from './../services/login.service';
declare var $: any;
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as _ from "lodash";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('inp1') inp1: ElementRef;
  hides: boolean = true;
  count: number = 0;
  leakPriceValueSum: number = 0;
  recommendationPriceValueSum: number = 0;
  chartOptions: any;
  errorMessage: string;
  data: any;
  float: string;
  hideMsgs: boolean = true;
  hideHelps: boolean = false;
  myReportsList: any[] = [];
  recommendationList: any[] = [];
  leakList: any[] = [];
  nextTopic: string;
  topicdescription: string;
  surveyCode: string;
  surveyId: number;
  trendingHomeChart: any;
  trendingParts: any[] = [];
  users: Users = new Users();
  constructor(private router: Router, private renderer: Renderer, private route: ActivatedRoute, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    this.count = 0;
    if (this.users.outhMeResponse == undefined) {
      this.loginService.logout();
    }
    this.getNextSurvey();
    this.getTrendingHomeChart();
    this.getTrendingProfileChart();
    if (this.users.myReportsData != null && this.users.myReportsData.length >= 1) {
      this.myReportsList = this.users.myReportsData;
    } else {
      this.getMyReport();
    }
    if (this.users.customerMailList.length <= 0) {
      this.getMailList();
    }
    // if (this.users.recommendationList.length <= 0 || this.users.recommendationStatusChange) {
    //   this.getRecommendation();
    // } else {
    //   this.getRecomendationList(this.users.recommendationList);
    //   for (let index = 0; index < this.users.recommendationList.length; index++) {
    //     this.recommendationPriceValueSum = this.users.recommendationList[index].priceValue + this.recommendationPriceValueSum;
    //   }
    // }
    // if (this.users.leakList.length <= 0) {
    //   this.getLeake();
    // } else {
    //   this.leakCalculation();
    // }
    if (this.users.recommendationList.length <= 0 || this.users.recommendationStatusChange||this.users.leakList.length <= 0) {
      this.getLeaksAndRecommendation();
    } else {
      this.getRecomendationList(this.users.recommendationList);
      for (let index = 0; index < this.users.recommendationList.length; index++) {
        this.recommendationPriceValueSum = this.users.recommendationList[index].priceValue + this.recommendationPriceValueSum;
      }
      this.leakCalculation();
    }

  }

  ngOnInit() {
    /* for demonstration purposes only */
    $('.navbar-toggle').click(function () {
      if ($(this).hasClass('collapsed')) {
        $(this).removeClass('collapsed');
      } else {
        $(this).addClass('collapsed');
      }
    })
    this.renderer.invokeElementMethod(this.inp1.nativeElement, 'focus');
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
      this.float = "right";
    } else {
      this.float = "left";
    }
  }
  leakCalculation() {
    // for (let i = 0; i < this.users.leakList.length - 1; i++) {
    //  var imgName=this.users.leakList[i].recommendation.takebackIcon.split('.');
    //  this.users.leakList[i].recommendation.takebackIcon=imgName+".svg";
    // }
    var j = 0, count = 0;
    let counts = new Array;
    this.leakList = new Array;
    for (let i = 0; i < this.users.leakList.length - 1; i++) {
      var distinct = false;
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
      var counter = 0;
      for (let j = 0; j <= this.users.leakList.length - 1; j++) {
        if (JSON.stringify(this.leakList[i].recommendation.takebackIcon) === JSON.stringify(this.users.leakList[j].recommendation.takebackIcon)) {
          counter++;
        }
        this.leakList[i].repeat = counter;
      }
    }
    for (let index = 0; index < this.users.leakList.length; index++) {
      this.leakPriceValueSum = this.users.leakList[index].priceValue + this.leakPriceValueSum;
    }
  }
  leakView(id) {
    this.users.leakFocusId = id;
    this.loginService.setUser(this.users);
    this.router.navigate(["leakListView"]);
  }
  surveyRecommendationList(number) {
    this.users.recomandationNo = number;
    this.loginService.setUser(this.users);
    this.router.navigate(["/surveyRecommendationList"]);

  }
  calculateFunction(counts) {
    this.count = counts + 1;
  }

  getMyReport() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/user-reports").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.users.myReportsData = response;
        this.myReportsList = this.users.myReportsData;
        this.loginService.setUser(this.users);
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }
  getNextSurvey() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/surveys/nextSurvey").subscribe(
      data => {
        // let response = JSON.parse(JSON.parse(JSON.stringify(data))._body);
        let response = JSON.parse(JSON.stringify(data));
        // console.log(response.data);
        if (response.data != null) {
          this.nextTopic = response.data.surveyDescription.label;
          this.topicdescription = response.data.surveyDescription.description;
          this.surveyCode = response.data.surveyDescription.surveyCode;
          this.surveyId = response.data.surveyId;
        }
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
  getRecomendationList(recommendationList) {
    this.recommendationList = new Array;
    for (var index = 0; index < recommendationList.length; index++) {
      if ((recommendationList[index].status == 'N' || recommendationList[index].status == 'L')&&recommendationList[index].parentLeakId!=null)
        this.recommendationList.push(recommendationList[index]);
    }
  }
  getRecommendation() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/recommendations").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        // console.log(response.data);
        var newList = _.reverse(response.data);
        var groups = _.groupBy(newList, "recommendationId");
        var array = [];
        _.forOwn(groups, function (value, key) {
          array.push(value[0]);
        });
        let recommendationsList = array;
        for (let index = 0; index < recommendationsList.length; index++) {
          this.recommendationPriceValueSum = recommendationsList[index].priceValue + this.recommendationPriceValueSum;
        }
        this.users.recommendationList = array;
        this.users.recommendationStatusChange = false;
        this.loginService.setUser(this.users);
         this.getRecomendationList(this.users.recommendationList);
        document.getElementById("loader").classList.remove('loading');
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));

      }
    );
  }

  getLeake() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/leaks").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.leakList = response.data;
        this.users.leakList = response.data;
        this.loginService.setUser(this.users);
        this.leakCalculation();
        // for (let index = 0; index < response.data.length; index++) {
        //   this.leakPriceValueSum = response.data[index].priceValue + this.leakPriceValueSum;
        // }

        document.getElementById("loader").classList.remove('loading');
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }
  getLeaksAndRecommendation() {
    // document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/recommendationsAndLeaks").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        // console.log(response.data);
        var newList = _.reverse(response.data.recommendations);
        var groups = _.groupBy(newList, "recommendationId");
        var array = [];
        _.forOwn(groups, function (value, key) {
          array.push(value[0]);
        });
        let recommendationsList = array;
        for (let index = 0; index < recommendationsList.length; index++) {
          this.recommendationPriceValueSum = recommendationsList[index].priceValue + this.recommendationPriceValueSum;
        }
        this.users.recommendationList = array;
        this.users.recommendationStatusChange = false;
        // this.loginService.setUser(this.users);
         this.getRecomendationList(this.users.recommendationList);
         this.leakList = response.data.leaks;
         this.users.leakList = response.data.leaks;
         this.loginService.setUser(this.users);
         this.leakCalculation();

        document.getElementById("loader").classList.remove('loading');
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }

  getMailList() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/mails").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.users.customerMailList = response.data;
        this.loginService.setUser(this.users);
      },
      error => {
        let response = JSON.parse(JSON.parse(JSON.stringify(error))._body);
        this.errorMessage = response.error_description;
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
  surveyView(surveyCode, surveyId) {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/surveys/" + surveyCode + "/" + surveyId).subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        // console.log(response);
        this.users.paneNumber = 0;
        this.users.currentPaneNumber = response.data;
        this.loginService.setUser(this.users);
        this.router.navigate(["/surveyView"]);
        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        let response = JSON.parse(JSON.stringify(errors))._body;
        document.getElementById("loader").classList.remove('loading');
        // document.getElementById("loader").classList.remove('loading');
        // this.errorMessage = response.error;
      }
    );
  }

  getTrendingHomeChart() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/trendingHomeChart").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.trendingHomeChart = response.data;
        var line1 = new Array;
        var line2 = new Array;
        var line3 = new Array;
        var line4 = new Array;
        var line5 = new Array;
        var line6 = new Array;
        let i = 0;
        for (let areaSeries of response.data.chart.series) {
          if (i == 0) {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line1.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i == 1) {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line2.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i == 2) {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line3.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i == 3) {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line4.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i == 4) {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line5.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i == 5) {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line6.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          }
          i++;
        }
        setTimeout(function () {
          eval(response.data.chart.freeChartConfigurationJS);
        }, 100);
        if (this.users.recommendationList != null && this.users.recommendationList.length > 0 && !this.users.recommendationStatusChange) {
          document.getElementById("loader").classList.remove('loading');
        }
        setTimeout(function () {
          $($("#chartSeasonalStack tr.jqplot-table-legend td.jqplot-table-legend").get(10)).hide();
        }, 100);
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }
  getTrendingProfileChart() {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/trendingHome/trendingParts").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.trendingParts = response.data;
        console.log(response.data);
        setTimeout(function () {
          for (let areaSeries of response.data[0].trendingCharts) {
            if (areaSeries.chart.freeChartConfigurationJS != null) {
              eval(areaSeries.chart.freeChartConfigurationJS);
            }
          }
          document.getElementById("loader").classList.remove('loading');
        }, 100);
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }
  questionHelp(){
    window.open("https://hea-docs.s3.amazonaws.com/HomeChartHelp.html");
    return;
    }
}