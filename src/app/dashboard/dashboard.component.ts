import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/user';
import { LoginService } from './../services/login.service';
declare var $: any;
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hides = true;
  count = 0;
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
  topicdescription: string;
  surveyCode: string;
  surveyId: number;
  trendingHomeChart: any;
  trendingHomeChartCopy: any;
  trendingParts: any[] = [];
  users: Users = new Users();
  globalM = 0;
  globalK = 0;
  constructor(private router: Router,
    private loginService: LoginService
  ) {
    this.users = this.loginService.getUser();
    this.count = 0;
    if (this.users.outhMeResponse === undefined) {
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
    if (this.users.recommendationList.length <= 0 || this.users.recommendationStatusChange || this.users.leakList.length <= 0) {
      this.getLeaksAndRecommendation();
    } else {
      this.getRecommendationList(this.users.recommendationList);
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
    });
    this.scrollTop();
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
      this.leakPriceValueSum = this.users.leakList[index].priceValue + this.leakPriceValueSum;
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
        this.users.myReportsData = response;
        this.myReportsList = this.users.myReportsData;
        this.loginService.setUser(this.users);
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }
  getNextSurvey() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys/nextSurvey').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        if (response.data != null) {
          this.nextTopic = response.data.surveyDescription.label;
          this.topicdescription = response.data.surveyDescription.description;
          this.surveyCode = response.data.surveyDescription.surveyCode;
          this.surveyId = response.data.surveyId;
        }
      },
      error => {
        console.log(JSON.parse(JSON.stringify(error)));
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
  getRecommendationList(recommendationList: any): void {
    this.recommendationList = new Array;
    let i = 0;
    for (let index = 0; index < recommendationList.length; index++) {
      if (recommendationList[index].parentLeakId !== null) {
        i++;
      }
      if ((recommendationList[index].status === 'N' || recommendationList[index].status === 'L') && recommendationList[index].parentLeakId != null) {
        this.recommendationList.push(recommendationList[index]);
      }
    }
    this.recommendationLength = i;
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
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/mails').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.users.customerMailList = response.data;
        this.loginService.setUser(this.users);
      },
      error => {
        const response = JSON.parse(JSON.parse(JSON.stringify(error))._body);
        this.errorMessage = response.error_description;
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
  surveyView(surveyCode, surveyId) {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys/' + surveyCode + '/' + surveyId).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.users.paneNumber = 0;
        this.users.currentPaneNumber = response.data;
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
        const response = JSON.parse(JSON.stringify(data));
        this.trendingHomeChart = response.data;
        this.trendingHomeChartCopy = JSON.parse(JSON.stringify(this.trendingHomeChart));
        /* tslint:disable:no-unused-variable */
        const line1: Array<any> = new Array;
        /* tslint:disable:no-unused-variable */
        const line2: Array<any> = new Array;
        /* tslint:disable:no-unused-variable */
        const line3: Array<any> = new Array;
        /* tslint:disable:no-unused-variable */
        const line4: Array<any> = new Array;
        /* tslint:disable:no-unused-variable */
        const line5: Array<any> = new Array;
        /* tslint:disable:no-unused-variable */
        const line6: Array<any> = new Array;
        let i = 0;
        for (const areaSeries of response.data.chart.series) {
          if (i === 0) {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line1.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i === 1) {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line2.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i === 2) {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line3.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i === 3) {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line4.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i === 4) {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line5.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (i === 5) {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line6.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          }
          i++;
        }
        console.log(line1 + '' + line2 + '' + line3 + '' + line4 + '' + line5 + '' + line6);
        setTimeout(function () {
          eval(response.data.chart.freeChartConfigurationJS);
        }, 100);
        if (this.users.recommendationList != null && this.users.recommendationList.length > 0 && !this.users.recommendationStatusChange) {
          document.getElementById('loader').classList.remove('loading');
        }
        setTimeout(function () {
          $($('#chartSeasonalStack tr.jqplot-table-legend td.jqplot-table-legend').get(10)).hide();
        }, 100);
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const self = this;
    self.globalM++;
    this.trendingHomeChart = undefined;
    setTimeout(function () {
      self.globalK++;
      const line1: Array<any> = new Array;
      const line2: Array<any> = new Array;
      const line3: Array<any> = new Array;
      const line4: Array<any> = new Array;
      const line5: Array<any> = new Array;
      const line6: Array<any> = new Array;
      let i = 0;
      for (const areaSeries of self.trendingHomeChartCopy.chart.series) {
        if (i === 0) {
          for (const areaSeriesValue of areaSeries.seriesValues) {
            line1.push([areaSeriesValue.label, areaSeriesValue.value]);
          }
        } else if (i === 1) {
          for (const areaSeriesValue of areaSeries.seriesValues) {
            line2.push([areaSeriesValue.label, areaSeriesValue.value]);
          }
        } else if (i === 2) {
          for (const areaSeriesValue of areaSeries.seriesValues) {
            line3.push([areaSeriesValue.label, areaSeriesValue.value]);
          }
        } else if (i === 3) {
          for (const areaSeriesValue of areaSeries.seriesValues) {
            line4.push([areaSeriesValue.label, areaSeriesValue.value]);
          }
        } else if (i === 4) {
          for (const areaSeriesValue of areaSeries.seriesValues) {
            line5.push([areaSeriesValue.label, areaSeriesValue.value]);
          }
        } else if (i === 5) {
          for (const areaSeriesValue of areaSeries.seriesValues) {
            line6.push([areaSeriesValue.label, areaSeriesValue.value]);
          }
        }
        i++;
      }
      console.log(line1 + '' + line2 + '' + line3 + '' + line4 + '' + line5 + '' + line6);
      if (self.globalM === self.globalK) {
        self.trendingHomeChart = self.trendingHomeChartCopy;
      }
      setTimeout(function () {
        if (self.globalM === self.globalK) {
          eval(self.trendingHomeChartCopy.chart.freeChartConfigurationJS);
          self.globalM = 0;
          self.globalK = 0;
        }
      }, 100);
      if (self.users.recommendationList != null && self.users.recommendationList.length > 0 && !self.users.recommendationStatusChange) {
        document.getElementById('loader').classList.remove('loading');
      }
      setTimeout(function () {
        $($('#chartSeasonalStack tr.jqplot-table-legend td.jqplot-table-legend').get(10)).hide();
      }, 100);
      i++;
    }, 1000);
  }
  getTrendingProfileChart() {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/trendingHome/trendingParts').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.trendingParts = response.data;
        console.log(response.data);
        setTimeout(function () {
          for (const areaSeries of response.data[0].trendingCharts) {
            if (areaSeries.chart.freeChartConfigurationJS != null) {
              eval(areaSeries.chart.freeChartConfigurationJS);
            }
          }
          document.getElementById('loader').classList.remove('loading');
        }, 100);
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

  scrollTop() {
    window.scroll(0, 0);
  }
}
