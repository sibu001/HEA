import { Component, AfterViewInit, ElementRef, ViewChild, Renderer, HostListener, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, AfterViewInit {
  @ViewChild('inp1') inp1: ElementRef;
  @ViewChild('panel') public panel: ElementRef;
  inputErrorMessage: string;
  disableButton = false;
  qusHide: boolean;
  chartHelpHide: boolean;
  hideBlockArrow: boolean;
  chartDiv: any;
  chartDivSecond: any;
  paneList: any;
  divHeight: any;
  colors: string;
  paneCharts: any;
  currentPaneAnswers: any[] = [];
  totalPanes: any[] = [];
  selectDate: Date;
  users: Users = new Users();
  globalM = 0;
  globalK = 0;
  constructor(private loginService: LoginService, private router: Router, private renderer: Renderer) {
    this.users = this.loginService.getUser();

    if (this.users.currentPaneNumber.currentPane == null || this.users.currentPaneNumber.currentPane == undefined) {
      this.router.navigate(['/login']);
    }
    this.helpHides();
    if (this.users.currentPaneNumber.survey.surveyDescription.showLeaks) {
      // this.border = "";
      if (this.users.leakList.length <= 0) {
        this.getSurveyLeak(this.users.currentPaneNumber.survey.surveyId);
      }
    }
    this.progressShow();
  }
  ngOnInit() {
    this.users = this.loginService.getUser();
    this.users.isSurvey = true;
    this.loginService.setUser(this.users);
    const self = this;
    setTimeout(function () {
      self.chartDataConfiguration();
    }, 100);
  }
  ngAfterViewInit() {
    if (this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'Profile') {
      if (document.getElementById('_home')) {
        document.getElementById('_home').classList.add('header_menu_none');
      }
      if (document.getElementById('all_topic')) {
        document.getElementById('all_topic').classList.add('header_menu_none');
      }
      if (document.getElementById('_account')) {
        document.getElementById('_account').classList.add('header_menu_none');
      }
      if (document.getElementById('menu_option')) {
        document.getElementById('menu_option').classList.add('header_menu_none');
      }
      if (document.getElementById('_home1')) {
        document.getElementById('_home1').classList.add('header_menu_none');
      }
      if (document.getElementById('all_topic1')) {
        document.getElementById('all_topic1').classList.add('header_menu_none');
      }
      if (document.getElementById('menu_option1')) {
        document.getElementById('menu_option1').classList.add('header_menu_none');
      }
      if (document.getElementById('menu_option2')) {
        document.getElementById('menu_option2').classList.add('header_menu_none');
      }
    }
    this.scrollTop();
    this.hsSliderValue();
    if (this.users.currentPaneNumber.paneCode === 'fdb_Intro') {
      setTimeout(function () {
        document.getElementById('fdbRecommendations').classList.add('table-responsive');
      }, 100);
    }

  }
  hover(value: any, fields: any) {
    for (const answer of this.users.currentPaneNumber.currentPaneAnswers) {
      if (answer.dataField.inputType == 'hslider') {
        $('#' + fields + ' .hslider' + answer.value).removeClass('active');
        $(this).toggleClass('active');
      }
    }
    $('#' + fields + ' .hslider' + value).addClass('active');
    return value + '';
  }
  helpHides() {
    for (let i = 0; i < this.users.currentPaneNumber.currentPaneAnswers.length; i++) {
      this.users.currentPaneNumber.currentPaneAnswers[i].helpHide = false;
    }
  }
  chartDataConfiguration() {
    this.paneCharts = JSON.parse(JSON.stringify(this.users.currentPaneNumber.paneCharts));
    let line1: Array<any>;
    let line2: Array<any>;
    let line3: Array<any>;
    let line4: Array<any>;
    let line5: Array<any>;
    let line6: Array<any>;
    let line7: Array<any>;
    if (this.users.currentPaneNumber.paneCharts.length > 0) {
      const panechart = this.users.currentPaneNumber.paneCharts;
      for (const paneCharts of panechart) {
        line1 = new Array;
        line2 = new Array;
        line3 = new Array;
        line4 = new Array;
        line5 = new Array;
        line6 = new Array;
        line7 = new Array;
        for (const areaSeries of paneCharts.chart.series) {
          if (areaSeries.chartSeries.field == 'line1') {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line1.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == 'line2') {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line2.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == 'line3') {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line3.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == 'line4') {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line4.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == 'line5') {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line5.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == 'line6') {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line6.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == 'line7') {
            for (const areaSeriesValue of areaSeries.seriesValues) {
              line7.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          }
        }
        console.log(line1 + '' + line2 + '' + line3 + '' + line4 + '' + line5 + '' + line6 + '' + line7);
        /* tslint:disable:no-unused-variable */
        // tslint:disable-next-line: prefer-const
        let i, plot1, pieplot, loadIdle, loadStandby, data1, s, stackplot;
        // tslint:disable-next-line: no-eval
        eval(paneCharts.chart.freeChartConfigurationJS);
        if (paneCharts.chart.freeChartDiv.indexOf('<script>') != -1) {
          const scriptTag = paneCharts.chart.freeChartDiv.substring(paneCharts.chart.freeChartDiv.indexOf('<script>'), paneCharts.chart.freeChartDiv.indexOf('</script>'));
          const news = scriptTag.replace('<script>', '');
          $('#content').bind(
            // tslint:disable-next-line: no-eval
            eval(news)
          );
        }
        if (paneCharts.chart.freeChartDiv.indexOf('<script type="text/javascript" language="javascript">') != -1) {
          const scriptTag = paneCharts.chart.freeChartDiv.substring(paneCharts.chart.freeChartDiv.indexOf('<script type="text/javascript" language="javascript">'), paneCharts.chart.freeChartDiv.indexOf('</script>'));
          const news = scriptTag.replace('<script type="text/javascript" language="javascript">', '');
          $('#content').bind(
            // tslint:disable-next-line: no-eval
            eval(news)
          );
        }
      }
    }
    if (this.users.currentPaneNumber.currentPane.htmPageText != null) {
      if (this.users.currentPaneNumber.currentPane.htmPageText.indexOf('<script type="text/javascript">') != -1) {
        const scriptTag = this.users.currentPaneNumber.currentPane.htmPageText.substring(this.users.currentPaneNumber.currentPane.htmPageText.indexOf('<script type="text/javascript">'),
          this.users.currentPaneNumber.currentPane.htmPageText.indexOf('// ]]></script>'));
        const news = scriptTag.replace('<script type="text/javascript">', '');
        // tslint:disable-next-line: no-eval
        eval(news);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const self = this;
    self.globalM++;
    this.users.currentPaneNumber.paneCharts = undefined;
    setTimeout(function () {
      self.globalK++;
      if (self.paneCharts.length > 0) {
        const panechart = self.paneCharts;
        const j = 0;
        console.log(self.globalM === self.globalK);
        if (self.globalM === self.globalK) {
          self.users.currentPaneNumber.paneCharts = self.paneCharts;
          setTimeout(function () {
            let line1;
            let line2;
            let line3;
            let line4;
            let line5;
            let line6;
            let line7;
            for (const paneCharts of panechart) {
              line1 = new Array;
              line2 = new Array;
              line3 = new Array;
              line4 = new Array;
              line5 = new Array;
              line6 = new Array;
              line7 = new Array;
              for (const areaSeries of paneCharts.chart.series) {
                if (areaSeries.chartSeries.field == 'line1') {
                  for (const areaSeriesValue of areaSeries.seriesValues) {
                    line1.push([areaSeriesValue.label, areaSeriesValue.value]);
                  }
                } else if (areaSeries.chartSeries.field == 'line2') {
                  for (const areaSeriesValue of areaSeries.seriesValues) {
                    line2.push([areaSeriesValue.label, areaSeriesValue.value]);
                  }
                } else if (areaSeries.chartSeries.field == 'line3') {
                  for (const areaSeriesValue of areaSeries.seriesValues) {
                    line3.push([areaSeriesValue.label, areaSeriesValue.value]);
                  }
                } else if (areaSeries.chartSeries.field == 'line4') {
                  for (const areaSeriesValue of areaSeries.seriesValues) {
                    line4.push([areaSeriesValue.label, areaSeriesValue.value]);
                  }
                } else if (areaSeries.chartSeries.field == 'line5') {
                  for (const areaSeriesValue of areaSeries.seriesValues) {
                    line5.push([areaSeriesValue.label, areaSeriesValue.value]);
                  }
                } else if (areaSeries.chartSeries.field == 'line6') {
                  for (const areaSeriesValue of areaSeries.seriesValues) {
                    line6.push([areaSeriesValue.label, areaSeriesValue.value]);
                  }
                } else if (areaSeries.chartSeries.field == 'line7') {
                  for (const areaSeriesValue of areaSeries.seriesValues) {
                    line7.push([areaSeriesValue.label, areaSeriesValue.value]);
                  }
                }
              }
              // tslint:disable-next-line: prefer-const
              let i, plot1, pieplot, loadIdle, loadStandby, data1, s, stackplot;
              console.log(line1 + '' + line2 + '' + line3 + '' + line4 + '' + line5 + '' + line6);
              // tslint:disable-next-line: no-eval
              eval(paneCharts.chart.freeChartConfigurationJS);
              self.globalM = 0;
              self.globalK = 0;
              if (paneCharts.chart.freeChartDiv.indexOf('<script>') != -1) {
                const scriptTag = paneCharts.chart.freeChartDiv.substring(paneCharts.chart.freeChartDiv.indexOf('<script>'), paneCharts.chart.freeChartDiv.indexOf('</script>'));
                const news = scriptTag.replace('<script>', '');
                $('#content').bind(
                  // tslint:disable-next-line: no-eval
                  eval(news)
                );
              }
              if (paneCharts.chart.freeChartDiv.indexOf('<script type="text/javascript" language="javascript">') != -1) {
                const scriptTag = paneCharts.chart.freeChartDiv.substring(paneCharts.chart.freeChartDiv.indexOf('<script type="text/javascript" language="javascript">'), paneCharts.chart.freeChartDiv.indexOf('</script>'));
                const news = scriptTag.replace('<script type="text/javascript" language="javascript">', '');
                $('#content').bind(
                  // tslint:disable-next-line: no-eval
                  eval(news)
                );
              }
            }
          }, 200);
        }
      }
      if (self.users.currentPaneNumber.currentPane.htmPageText != null) {
        if (self.users.currentPaneNumber.currentPane.htmPageText.indexOf('<script type="text/javascript">') != -1) {
          const scriptTag = self.users.currentPaneNumber.currentPane.htmPageText.substring(self.users.currentPaneNumber.currentPane.htmPageText.indexOf('<script type="text/javascript">'),
            self.users.currentPaneNumber.currentPane.htmPageText.indexOf('// ]]></script>'));
          const news = scriptTag.replace('<script type="text/javascript">', '');
          // tslint:disable-next-line: no-eval
          eval(news);
        }
      }
    }, 1500);
  }
  progressShow() {
    this.totalPanes = new Array;
    for (let i = 0; i < this.users.currentPaneNumber.totalPane; i++) {
      this.totalPanes.push(i);
    }
  }
  next(id: any, paneNumber: any) {
    this.qusHide = false;
    this.chartHelpHide = false;
    this.users.allSurveyCheck = true;
    this.loginService.setUser(this.users);
    this.inputErrorMessage = undefined;
    if (this.users.currentPaneNumber.currentPane.paneCode == 'fdb_Thanks') {
      this.router.navigate(['/topicshistory']);
    } else {
      if (this.users.currentPaneNumber.currentPaneAnswers.length > 0 || this.users.currentPaneNumber.currentPaneBlocks.length > 0) {
        this.postSurveyAnswerData(this.users.currentPaneNumber.currentPaneAnswers, this.users.currentPaneNumber.currentPaneBlocks, id, false, '');
      } else {
        this.nextPane(this.users.currentPaneNumber);
      }
      document.getElementById('loader').classList.add('loading');
    }
  }
  prev(id: any, paneNumber: any) {
    this.users.allSurveyCheck = true;
    this.chartHelpHide = false;
    this.loginService.setUser(this.users);
    if (this.users.currentPaneNumber.currentPaneAnswers.length > 0) {
      this.postSurveyAnswerData(this.users.currentPaneNumber.currentPaneAnswers, this.users.currentPaneNumber.currentPaneBlocks, id, false, '');
    } else {
      this.previousPane(this.users.currentPaneNumber);
    }
    document.getElementById('loader').classList.add('loading');
  }

  surveyRecommendationList(number: any) {
    this.users.recommendationNo = number;
    this.loginService.setUser(this.users);
    this.router.navigate(['/surveyRecommendationList']);
  }
  postSurveyAnswerData(currentPaneAnswers: any, currentPaneBlocks: any, id: any, value: any, event?: any) {
    if ((id == 'change' && value) || id == 'next' || id == 'prev') {
      document.getElementById('loader').classList.add('loading');
      let dataObj;
      if (id == 'next') {
        if (currentPaneAnswers.length >= 1 && this.users.currentPaneNumber.firstPage && this.users.currentPaneNumber.lastPage && (currentPaneAnswers[0].value == 'false'
          || currentPaneAnswers[0].value == 'N' || currentPaneAnswers[0].value == 'No' || currentPaneAnswers[0].value == '0')) {
          dataObj = { 'currentPaneAnswers': currentPaneAnswers, 'currentPaneBlocks': currentPaneBlocks, 'nextPane': true, 'skipAnswers': false };
        } else {
          dataObj = { 'currentPaneAnswers': currentPaneAnswers, 'currentPaneBlocks': currentPaneBlocks, 'nextPane': true };
        }
      } else {
        dataObj = { 'currentPaneAnswers': currentPaneAnswers, 'currentPaneBlocks': currentPaneBlocks };
      }
      this.loginService.performPostMultiPartDataPost(dataObj, 'customers/' + this.users.currentPaneNumber.survey.customerId + '/surveys/' +
        this.users.currentPaneNumber.survey.surveyDescription.surveyCode + '/panes/' + this.users.currentPaneNumber.currentPane.paneCode + '/answers').subscribe(
          data => {
            const response = JSON.parse(JSON.stringify(data));
            if (response.data.errors != null) {
              this.users.currentPaneNumber = response.data;
              this.loginService.setUser(this.users);
              this.colors = 'red';
              this.scrollTop();
              document.getElementById('loader').classList.remove('loading');
            } else {
              if (id == 'next') {
                this.nextPaneWithAnswer(response.data);
                document.getElementById('loader').classList.remove('loading');
              } else if (id == 'prev') {
                this.previousPane(response.data);
              } else if (id == 'change') {
                this.users.currentPaneNumber = response.data;
                this.loginService.setUser(this.users);
                document.getElementById('loader').classList.remove('loading');
              }
            }
          },
          errors => {
            console.log(errors);
            this.scrollTop();
            this.inputErrorMessage = errors.error.errorMessage;
            document.getElementById('loader').classList.remove('loading');
          }
        );
    } else if (this.users.currentPaneNumber.currentPane.paneCode === 'prf_welcome') {
      if (event !== 'Y') {
        this.disableButton = true;
      } else {
        this.disableButton = false;
      }
    }
  }

  nextPaneWithAnswer(data: any) {
    this.getSessionPendingMessage();
    const currentPaneCode = this.users.currentPaneNumber.currentPane.paneCode;
    this.users.currentPaneNumber = data;
    this.loginService.setUser(this.users);
    if (this.users.currentPaneNumber.currentPane != null) {
      if (currentPaneCode == this.users.currentPaneNumber.currentPane.paneCode) {
        this.router.navigate(['/topicshistory']);
      } else {
        if (this.users.currentPaneNumber.survey.surveyDescription.showLeaks) {
          if (this.users.currentPaneNumber.firstPage) {
            this.getSurveyLeak(this.users.currentPaneNumber.survey.surveyId);
          }
        }
        if (this.users.surveyLength === 3 && this.users.currentPaneNumber.firstPage && this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'LeaksIntro') {
          this.getAllSurvey();
        } else if (this.users.surveyLength > 3 && this.users.currentPaneNumber.survey.surveyDescription.surveyCode !== 'Profile') {
          if (document.getElementById('_home')) {
            document.getElementById('_home').classList.remove('header_menu_none');
          }
          if (document.getElementById('all_topic')) {
            document.getElementById('all_topic').classList.remove('header_menu_none');
          }
          if (document.getElementById('_account')) {
            document.getElementById('_account').classList.remove('header_menu_none');
          }
          if (document.getElementById('menu_option')) {
            document.getElementById('menu_option').classList.remove('header_menu_none');
          }
          if (document.getElementById('_home1')) {
            document.getElementById('_home1').classList.remove('header_menu_none');
          }
          if (document.getElementById('all_topic1')) {
            document.getElementById('all_topic1').classList.remove('header_menu_none');
          }
          if (document.getElementById('_account1')) {
            document.getElementById('_account1').classList.remove('header_menu_none');
          }
          if (document.getElementById('menu_option1')) {
            document.getElementById('menu_option1').classList.remove('header_menu_none');
          }
          if (document.getElementById('menu_option2')) {
            document.getElementById('menu_option2').classList.remove('header_menu_none');
          }
        }
        const self1 = this;
        setTimeout(function () {
          self1.chartDataConfiguration();
        }, 500);

        this.helpHides();
        this.progressShow();
      }
    } else {
      this.router.navigate(['/topicshistory']);
    }
    const self = this;
    setTimeout(function () {
      self.hsSliderValue();
    }, 500);
    if (this.users.currentPaneNumber.paneCode == 'fdb_Intro') {
      setTimeout(function () {
        document.getElementById('fdbRecommendations').classList.add('table-responsive');
      }, 100);
    }
    document.getElementById('loader').classList.remove('loading');
    this.scrollTop();

  }

  nextPane(currentPaneNumber: any) {
    const object = {};
    this.loginService.performPostMultiPartDataPost(object, 'customers/' + this.users.outhMeResponse.customerId + '/surveys/nextPane').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.getSessionPendingMessage();
        this.users.currentPaneNumber = response.data;
        this.loginService.setUser(this.users);
        if (this.users.currentPaneNumber.currentPane != null) {
          if (this.users.currentPaneNumber.survey.surveyDescription.showLeaks) {
            if (this.users.currentPaneNumber.firstPage) {
              this.getSurveyLeak(this.users.currentPaneNumber.survey.surveyId);
            }
          }
          if (this.users.surveyLength === 3 && this.users.currentPaneNumber.firstPage && this.users.currentPaneNumber.survey.surveyDescription.surveyCode == 'LeaksIntro') {
            this.getAllSurvey();
          } else if (this.users.surveyLength > 3 && this.users.currentPaneNumber.survey.surveyDescription.surveyCode !== 'Profile') {
            if (document.getElementById('_home')) {
              document.getElementById('_home').classList.remove('header_menu_none');
            }
            if (document.getElementById('all_topic')) {
              document.getElementById('all_topic').classList.remove('header_menu_none');
            }
            if (document.getElementById('_account')) {
              document.getElementById('_account').classList.remove('header_menu_none');
            }
            if (document.getElementById('menu_option')) {
              document.getElementById('menu_option').classList.remove('header_menu_none');
            }
            if (document.getElementById('_home1')) {
              document.getElementById('_home1').classList.remove('header_menu_none');
            }
            if (document.getElementById('all_topic1')) {
              document.getElementById('all_topic1').classList.remove('header_menu_none');
            }
            if (document.getElementById('_account1')) {
              document.getElementById('_account1').classList.remove('header_menu_none');
            }
            if (document.getElementById('menu_option1')) {
              document.getElementById('menu_option1').classList.remove('header_menu_none');
            }
            if (document.getElementById('menu_option2')) {
              document.getElementById('menu_option2').classList.remove('header_menu_none');
            }
          }
          const self1 = this;
          setTimeout(function () {
            self1.chartDataConfiguration();
          }, 500);

          this.helpHides();
          this.progressShow();
        } else {
          this.router.navigate(['/topicshistory']);
        }
        const self = this;
        setTimeout(function () {
          self.hsSliderValue();
        }, 500);
        if (this.users.currentPaneNumber.paneCode == 'fdb_Intro') {
          setTimeout(function () {
            document.getElementById('fdbRecommendations').classList.add('table-responsive');
          }, 100);
        }
        this.scrollTop();
        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        this.scrollTop();
        this.inputErrorMessage = errors.error.errorMessage;
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
  previousPane(currentPaneNumber: any) {
    const object = {};
    this.loginService.performPostMultiPartDataPost(object, 'customers/' + this.users.outhMeResponse.customerId + '/surveys/previousPane').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        if (response.data.currentPane != null) {
          if (response.data.currentPane.paneCode == this.users.currentPaneNumber.currentPane.paneCode) {
            this.router.navigate(['/topicshistory']);
          } else {
            this.users.currentPaneNumber = response.data;
            this.loginService.setUser(this.users);
            if (this.users.currentPaneNumber.survey.surveyDescription.showLeaks) {
              if (this.users.currentPaneNumber.last) {
                this.getSurveyLeak(this.users.currentPaneNumber.survey.surveyId);
              }
            }
            if (this.users.currentPaneNumber.survey.surveyDescription.surveyCode === 'Profile') {
              if (document.getElementById('_home')) {
                document.getElementById('_home').classList.add('header_menu_none');
              }
              if (document.getElementById('all_topic')) {
                document.getElementById('all_topic').classList.add('header_menu_none');
              }
              if (document.getElementById('_account')) {
                document.getElementById('_account').classList.add('header_menu_none');
              }
              if (document.getElementById('menu_option')) {
                document.getElementById('menu_option').classList.add('header_menu_none');
              }
              if (document.getElementById('_home1')) {
                document.getElementById('_home1').classList.add('header_menu_none');
              }
              if (document.getElementById('all_topic1')) {
                document.getElementById('all_topic1').classList.add('header_menu_none');
              }
              if (document.getElementById('_account1')) {
                document.getElementById('_account1').classList.add('header_menu_none');
              }
              if (document.getElementById('menu_option1')) {
                document.getElementById('menu_option1').classList.add('header_menu_none');
              }
              if (document.getElementById('menu_option2')) {
                document.getElementById('menu_option2').classList.add('header_menu_none');
              }
            }
            const self = this;
            setTimeout(function () {
              self.chartDataConfiguration();
            }, 500);
            this.scrollTop();
            this.helpHides();
            this.progressShow();
          }
        } else {
          this.router.navigate(['/topicshistory']);
        }
        this.scrollTop();
        if (this.users.currentPaneNumber.currentPane.paneCode == 'fdb_Intro') {
          setTimeout(function () {
            document.getElementById('fdbRecommendations').classList.add('table-responsive');
          }, 100);
        }

        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        this.scrollTop();
        this.inputErrorMessage = errors.error.errorMessage;
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  getSurveyLeak(surveyId: any) {
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys/' + surveyId + '/leaks').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.users.leakList = response.data;
        this.loginService.setUser(this.users);
        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
  change(value: any) {
    if (value == 'true') {
      return 'false';
    } else if (value == 'false') {
      return 'true';
    } else if (value == '1') {
      return '0';
    } else if (value == '0') {
      return '1';
    } else if (value == 'Y') {
      return 'N';
    } else if (value == 'N') {
      return 'Y';
    }
  }
  getAllSurvey() {
    //  this.router.navigate(["/topicshistory"]);
    this.users.surveyCode = new Array;
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/surveys').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        document.getElementById('loader').classList.remove('loading');
        this.users.surveyLength = Object.keys(response.data).length;
        this.users.surveyList = response.data;
        this.loginService.setUser(this.users);
        if (document.getElementById('_home')) {
          document.getElementById('_home').classList.remove('header_menu_none');
        }
        if (document.getElementById('all_topic')) {
          document.getElementById('all_topic').classList.remove('header_menu_none');
        }
        if (document.getElementById('menu_option')) {
          document.getElementById('menu_option').classList.remove('header_menu_none');
        }
        if (document.getElementById('_account')) {
          document.getElementById('_account').classList.remove('header_menu_none');
        }
        if (document.getElementById('_home1')) {
          document.getElementById('_home1').classList.remove('header_menu_none');
        }
        if (document.getElementById('all_topic1')) {
          document.getElementById('all_topic1').classList.remove('header_menu_none');
        }
        if (document.getElementById('_account1')) {
          document.getElementById('_account1').classList.remove('header_menu_none');
        }
        if (document.getElementById('menu_option1')) {
          document.getElementById('menu_option1').classList.remove('header_menu_none');
        }
        if (document.getElementById('menu_option2')) {
          document.getElementById('menu_option2').classList.remove('header_menu_none');
        }
      },
      error => {
        const response = JSON.parse(JSON.stringify(error));
        console.log(response);
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  getSessionPendingMessage() {
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/sessionPendingMessage').subscribe(
      data => {
        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  leakView(id: number) {
    this.users.leakFocusId = id;
    this.loginService.setUser(this.users);
    this.router.navigate(['/leakListView']);
  }
  goToSurvey(surveyCode, surveyId, paneList, index) {
    let paneCode;
    if (index < this.users.currentPaneNumber.currentPaneProgress) {
      paneCode = paneList[index].pane.paneCode;
      document.getElementById('loader').classList.add('loading');
      const object = {};
      this.loginService.performPostMultiPartData(object, 'customers/' + this.users.outhMeResponse.customerId + '/surveys/' + surveyCode + '/' + surveyId + '/panes/' + paneCode).subscribe(
        data => {
          const response = JSON.parse(JSON.stringify(data));
          console.log(response);
          document.getElementById('loader').classList.remove('loading');
          if (response.errorCode == null && response.errorMessage == null) {
            this.users.currentPaneNumber = response.data;
            this.users.paneNumber = index;
            this.loginService.setUser(this.users);
            const self = this;
            setTimeout(function () {
              self.chartDataConfiguration();
            }, 500);
          } else {
            this.inputErrorMessage = response.errorMessage;
          }

        },
        errors => {
          console.log(errors);
          document.getElementById('loader').classList.remove('loading');
        }
      );
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  hsSliderValue() {
    if (this.users.currentPaneNumber.currentPane.paneCode === 'fdb_Questions') {
      for (const answer of this.users.currentPaneNumber.currentPaneAnswers) {
        if (answer.dataField.inputType === 'hslider') {
          $('#' + answer.field + ' .hslider' + answer.value).addClass('active');
          $(this).toggleClass('active');
        }
      }
    }
  }

  addDataBlockRow() {
    console.log(this.users.currentPaneNumber.currentPaneBlocks);
    this.users.currentPaneNumber.currentPaneBlocks.forEach(element => {
      if (element.blockCount <= element.dataBlock.maxRows) {
        const surveyBlock = JSON.parse(JSON.stringify(element.surveyAnswerBlocks[0]));
        surveyBlock.surveyAnswers.forEach(e => {
          e.value = null;
        });
        element.blockCount = element.blockCount + 1;
        element.currentBlockCount = element.currentBlockCount + 1;
        element.surveyAnswerBlocks.push(surveyBlock);
      }
    });
    // this.postSurveyAnswerData(this.users.currentPaneNumber.currentPaneAnswers, this.users.currentPaneNumber.currentPaneBlocks,
    //   'change', true);
  }
  deleteDataBlockRow(index: any) {
    console.log(this.users.currentPaneNumber.currentPaneBlocks);
    this.users.currentPaneNumber.currentPaneBlocks.forEach(element => {
      if (element.blockCount >= element.dataBlock.minRows) {
        element.surveyAnswerBlocks.splice(index, 1);
        element.blockCount = element.blockCount - 1;
        element.currentBlockCount = element.currentBlockCount - 1;
      }
    });
    // this.postSurveyAnswerData(this.users.currentPaneNumber.currentPaneAnswers, this.users.currentPaneNumber.currentPaneBlocks,
    //   'change', true);
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowRight') {
      this.next('next', this.users.paneNumber);
    }
    if (event.code === 'ArrowLeft') {
      this.prev('prev', this.users.paneNumber);
    }
  }
}
