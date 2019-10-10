import { Component, AfterViewInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements AfterViewInit {
  @ViewChild('inp1') inp1: ElementRef;
  @ViewChild('panel') public panel: ElementRef;
  inputErrorMessage: string;
  qusHide: boolean;
  hideBlockArrow: boolean;
  chartDiv: any;
  chartDivSecond: any;
  paneList: any;
  divHeight: any;
  colors: string;
  currentPaneAnswers: any[] = [];
  totalPanes: any[] = [];
  // border: string;
  selectDate: Date;
  users: Users = new Users();
  constructor(private loginService: LoginService, private router: Router, private renderer: Renderer) {
    this.users = this.loginService.getUser();

    if (this.users.currentPaneNumber.currentPane == null || this.users.currentPaneNumber.currentPane == undefined) {
      this.router.navigate(["/login"]);
    }
    this.helpHides();
    if (this.users.currentPaneNumber.survey.surveyDescription.showLeaks) {
      // this.border = "";
      if (this.users.leakList.length <= 0) {
        this.getSurveyLeak(this.users.currentPaneNumber.survey.surveyId);
      }
    }
    if (this.users.currentPaneNumber.survey.surveyDescription.surveyCode == "Profile") {
      document.getElementById("_home").classList.add('header_menu_none');
      document.getElementById("all_topic").classList.add('header_menu_none');
      document.getElementById("menu_option").classList.add('header_menu_none');
      if (document.getElementById("_home1")) {
        document.getElementById("_home1").classList.add('header_menu_none');
      }
      if (document.getElementById("all_topic1")) {
        document.getElementById("all_topic1").classList.add('header_menu_none');
      }
      if (document.getElementById("menu_option1")) {
        document.getElementById("menu_option1").classList.add('header_menu_none');
      }
      if (document.getElementById("menu_option2")) {
        document.getElementById("menu_option2").classList.add('header_menu_none');
      }
    }
    this.progressShow();
  }
  ngOnInit() {
    this.users = this.loginService.getUser();
    var fc = $.fullCalendar;
    var self = this;
    setTimeout(function () {
      self.chartDataConfiguration();
    }, 100);
  }
  ngAfterViewInit() {
    var self = this;
    setTimeout(() => self.inp1.nativeElement.focus(), 0);
    this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
    this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    for (let answer of this.users.currentPaneNumber.currentPaneAnswers) {
      if (answer.dataField.inputType == 'hslider') {
        $("#" + answer.field + " .hslider" + answer.value).addClass('active');
        $(this).toggleClass('active');
      }
    }
    if (this.users.currentPaneNumber.paneCode == "fdb_Intro") {
      setTimeout(function () {
        document.getElementById("fdbRecommendations").classList.add('table-responsive');
      }, 100);
    }

  }
  hover(value, fields) {
    for (let answer of this.users.currentPaneNumber.currentPaneAnswers) {
      if (answer.dataField.inputType == 'hslider') {
        $("#" + fields + " .hslider" + answer.value).removeClass('active');
        $(this).toggleClass('active');
      }
    }
    $("#" + fields + " .hslider" + value).addClass('active');
    return value + "";
  }
  helpHides() {
    for (var i = 0; i < this.users.currentPaneNumber.currentPaneAnswers.length; i++) {
      this.users.currentPaneNumber.currentPaneAnswers[i].helpHide = false;
    }
  }
  chartDataConfiguration() {
    var line1;
    var line2;
    var line3;
    var line4;
    var line5;
    var line6;
    if (this.users.currentPaneNumber.paneCharts.length > 0) {
      var panechart = this.users.currentPaneNumber.paneCharts;
      var j = 0;
      for (let paneCharts of panechart) {
        line1 = new Array;
        line2 = new Array;
        line3 = new Array;
        line4 = new Array;
        line5 = new Array;
        line6 = new Array;
        for (let areaSeries of paneCharts.chart.series) {
          if (areaSeries.chartSeries.field == "line1") {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line1.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == "line2") {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line2.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == "line3") {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line3.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == "line4") {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line4.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == "line5") {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line5.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          } else if (areaSeries.chartSeries.field == "line6") {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              line6.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          }
        }
        var i, plot1, pieplot, loadIdle, loadStandby, data1, s, stackplot;
        eval(paneCharts.chart.freeChartConfigurationJS);
        if (paneCharts.chart.freeChartDiv.indexOf("<script>") != -1) {
          var scriptTag = paneCharts.chart.freeChartDiv.substring(paneCharts.chart.freeChartDiv.indexOf("<script>"), paneCharts.chart.freeChartDiv.indexOf("</script>"));
          var news = scriptTag.replace("<script>", "");
          $('#content').bind(
            eval(news)
          );
        }
        if (paneCharts.chart.freeChartDiv.indexOf('<script type="text/javascript" language="javascript">') != -1) {
          var scriptTag = paneCharts.chart.freeChartDiv.substring(paneCharts.chart.freeChartDiv.indexOf('<script type="text/javascript" language="javascript">'), paneCharts.chart.freeChartDiv.indexOf("</script>"));
          var news = scriptTag.replace('<script type="text/javascript" language="javascript">', "");
          $('#content').bind(
            eval(news)
          );
        }
      }
    }
    if (this.users.currentPaneNumber.currentPane.htmPageText != null) {
      if (this.users.currentPaneNumber.currentPane.htmPageText.indexOf('<script type="text/javascript">') != -1) {
        var scriptTag = this.users.currentPaneNumber.currentPane.htmPageText.substring(this.users.currentPaneNumber.currentPane.htmPageText.indexOf('<script type="text/javascript">'), this.users.currentPaneNumber.currentPane.htmPageText.indexOf("// ]]></script>"));
        var news = scriptTag.replace('<script type="text/javascript">', "");
        eval(news)
      }
    }
  }
  progressShow() {
    this.totalPanes = new Array;
    for (var i = 0; i < this.users.currentPaneNumber.totalPane; i++) {
      this.totalPanes.push(i);
    }
  }
  next(id, paneNumber) {
    this.qusHide = false;
    this.users.allSurveyCheck = true;
    this.loginService.setUser(this.users);
    this.inputErrorMessage = undefined;
    if (this.users.currentPaneNumber.currentPane.paneCode == "fdb_Thanks") {
      this.router.navigate(["/topicshistory"]);
    } else {
      if (this.users.currentPaneNumber.currentPaneAnswers.length > 0) {
        this.postSurveyAnswerData(this.users.currentPaneNumber.currentPaneAnswers, this.users.currentPaneNumber.currentPaneBlocks, id, false);
      } else {
        this.nextPane(this.users.currentPaneNumber);
      }
      document.getElementById("loader").classList.add('loading');
    }
  }
  prev(id, paneNumber) {
    this.users.allSurveyCheck = true;
    this.loginService.setUser(this.users);
    if (this.users.currentPaneNumber.currentPaneAnswers.length > 0) {
      this.postSurveyAnswerData(this.users.currentPaneNumber.currentPaneAnswers, this.users.currentPaneNumber.currentPaneBlocks, id, false);
    } else {
      this.previousPane(this.users.currentPaneNumber);
    }
    document.getElementById("loader").classList.add('loading');
  }

  surveyRecommendationList(number) {
    this.users.recomandationNo = number;
    this.loginService.setUser(this.users);
    this.router.navigate(["/surveyRecommendationList"]);
  }
  postSurveyAnswerData(currentPaneAnswers, currentPaneBlocks, id, value) {
    if ((id == 'change' && value) || id == 'next' || id == 'prev') {
      document.getElementById("loader").classList.add('loading');
      var data;
      if (id == 'next') {
        if (currentPaneAnswers.length >= 1 && this.users.currentPaneNumber.firstPage && this.users.currentPaneNumber.lastPage && (currentPaneAnswers[0].value == 'false' || currentPaneAnswers[0].value == 'N' || currentPaneAnswers[0].value == 'No' || currentPaneAnswers[0].value == '0')) {
          data = { "currentPaneAnswers": currentPaneAnswers, "currentPaneBlocks": currentPaneBlocks, "nextPane": true, "skipAnswers": false };
        } else {
          data = { "currentPaneAnswers": currentPaneAnswers, "currentPaneBlocks": currentPaneBlocks, "nextPane": true };
        }
      } else {
        data = { "currentPaneAnswers": currentPaneAnswers, "currentPaneBlocks": currentPaneBlocks };
      }
      this.loginService.performPostMultiPartDataPost(data, "customers/" + this.users.currentPaneNumber.survey.customerId + "/surveys/" + this.users.currentPaneNumber.survey.surveyDescription.surveyCode + "/panes/" + this.users.currentPaneNumber.currentPane.paneCode + "/answers").subscribe(
        data => {
          let response = JSON.parse(JSON.stringify(data));
          //  console.log(response);
          if (response.data.errors != null) {
            this.users.currentPaneNumber.errors = response.data.errors;
            this.colors = "red";
            var self = this;
            setTimeout(() => self.inp1.nativeElement.focus(), 0);
            this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
            this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
            document.getElementById("loader").classList.remove('loading');
          } else {
            if (id == 'next') {
              this.nextPaneWithAnswer(response.data);
              document.getElementById("loader").classList.remove('loading');
              //  this.nextPane(response.data);
            } else if (id == 'prev') {
              this.previousPane(response.data);
            } else if (id == 'change') {
              this.users.currentPaneNumber = response.data;
              this.loginService.setUser(this.users);
              document.getElementById("loader").classList.remove('loading');
            }
          }
        },
        errors => {
          console.log(errors);
          var self = this;
          setTimeout(() => self.inp1.nativeElement.focus(), 0);
          this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
          this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
          this.inputErrorMessage = errors.error.errorMessage;
          document.getElementById("loader").classList.remove('loading');
        }
      );
    }
  }

  nextPaneWithAnswer(data) {
    this.getSessionPendingMessage();
    this.users.currentPaneNumber = data;
    this.loginService.setUser(this.users);
    if (this.users.currentPaneNumber.currentPane != null) {
      if (this.users.currentPaneNumber.survey.surveyDescription.showLeaks) {
        if (this.users.currentPaneNumber.firstPage) {
          this.getSurveyLeak(this.users.currentPaneNumber.survey.surveyId);
        }
      }
      if (this.users.surveyLenght == 3 && this.users.currentPaneNumber.firstPage && this.users.currentPaneNumber.survey.surveyDescription.surveyCode == "LeaksIntro") {
        this.getAllSurvey();
      } else if (this.users.surveyLenght > 3 && this.users.currentPaneNumber.survey.surveyDescription.surveyCode != "Profile") {
        document.getElementById("_home").classList.remove('header_menu_none');
        document.getElementById("all_topic").classList.remove('header_menu_none');
        document.getElementById("menu_option").classList.remove('header_menu_none');
        if (document.getElementById("_home1")) {
          document.getElementById("_home1").classList.remove('header_menu_none');
        }
        if (document.getElementById("all_topic1")) {
          document.getElementById("all_topic1").classList.remove('header_menu_none');
        }
        if (document.getElementById("menu_option1")) {
          document.getElementById("menu_option1").classList.remove('header_menu_none');
        }
        if (document.getElementById("menu_option2")) {
          document.getElementById("menu_option2").classList.remove('header_menu_none');
        }
      }
      var self = this;
      setTimeout(function () {
        self.chartDataConfiguration();
      }, 500);

      this.helpHides();
      this.progressShow();
    } else {
      this.router.navigate(["/topicshistory"]);
    }
    if (this.users.currentPaneNumber.currentPane.paneCode == "fdb_Questions") {
      for (let answer of this.users.currentPaneNumber.currentPaneAnswers) {
        if (answer.dataField.inputType == 'hslider') {
          $("#" + answer.field + " .hslider" + answer.value).addClass('active');
          $(this).toggleClass('active');
        }
      }
    }
    if (this.users.currentPaneNumber.paneCode == "fdb_Intro") {
      setTimeout(function () {
        document.getElementById("fdbRecommendations").classList.add('table-responsive');
      }, 100);
    }
    document.getElementById("loader").classList.remove('loading');
    var self = this;
    setTimeout(() => self.inp1.nativeElement.focus(), 0);
    this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
    this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });

  }

  nextPane(currentPaneNumber) {
    var object = {};
    this.loginService.performPostMultiPartDataPost(object, "customers/" + this.users.outhMeResponse.customerId + "/surveys/nextPane").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.getSessionPendingMessage();
        this.users.currentPaneNumber = response.data;
        this.loginService.setUser(this.users);
        if (this.users.currentPaneNumber.currentPane != null) {
          if (this.users.currentPaneNumber.survey.surveyDescription.showLeaks) {
            if (this.users.currentPaneNumber.firstPage) {
              this.getSurveyLeak(this.users.currentPaneNumber.survey.surveyId);
            }
          }
          if (this.users.surveyLenght == 3 && this.users.currentPaneNumber.firstPage && this.users.currentPaneNumber.survey.surveyDescription.surveyCode == "LeaksIntro") {
            this.getAllSurvey();
          } else if (this.users.surveyLenght > 3 && this.users.currentPaneNumber.survey.surveyDescription.surveyCode != "Profile") {
            document.getElementById("_home").classList.remove('header_menu_none');
            document.getElementById("all_topic").classList.remove('header_menu_none');
            document.getElementById("menu_option").classList.remove('header_menu_none');
            if (document.getElementById("_home1")) {
              document.getElementById("_home1").classList.remove('header_menu_none');
            }
            if (document.getElementById("all_topic1")) {
              document.getElementById("all_topic1").classList.remove('header_menu_none');
            }
            if (document.getElementById("menu_option1")) {
              document.getElementById("menu_option1").classList.remove('header_menu_none');
            }
            if (document.getElementById("menu_option2")) {
              document.getElementById("menu_option2").classList.remove('header_menu_none');
            }
          }
          var self = this;
          setTimeout(function () {
            self.chartDataConfiguration();
          }, 500);

          this.helpHides();
          this.progressShow();
        } else {
          this.router.navigate(["/topicshistory"]);
        }
        if (this.users.currentPaneNumber.paneCode == "fdb_Questions") {
          for (let answer of this.users.currentPaneNumber.currentPaneAnswers) {
            if (answer.dataField.inputType == 'hslider') {
              $("#" + answer.field + " .hslider" + answer.value).addClass('active');
              $(this).toggleClass('active');
            }
          }
        }
        if (this.users.currentPaneNumber.paneCode == "fdb_Intro") {
          setTimeout(function () {
            document.getElementById("fdbRecommendations").classList.add('table-responsive');
          }, 100);
        }
        var self = this;
        setTimeout(() => self.inp1.nativeElement.focus(), 0);
        this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
        this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        var self = this;
        setTimeout(() => self.inp1.nativeElement.focus(), 0);
        this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
        this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        this.inputErrorMessage = errors.error.errorMessage;
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
  previousPane(currentPaneNumber) {
    var object = {};
    this.loginService.performPostMultiPartDataPost(object, "customers/" + this.users.outhMeResponse.customerId + "/surveys/previousPane").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
        if (response.data.currentPane != null) {
          if (response.data.currentPane.paneCode == this.users.currentPaneNumber.currentPane.paneCode) {
            this.router.navigate(["/topicshistory"]);
          } else {
            this.users.currentPaneNumber = response.data;
            this.loginService.setUser(this.users);
            if (this.users.currentPaneNumber.survey.surveyDescription.showLeaks) {
              if (this.users.currentPaneNumber.last) {
                this.getSurveyLeak(this.users.currentPaneNumber.survey.surveyId);
              }
            }
            if (this.users.currentPaneNumber.survey.surveyDescription.surveyCode == "Profile") {
              document.getElementById("_home").classList.add('header_menu_none');
              document.getElementById("all_topic").classList.add('header_menu_none');
              document.getElementById("menu_option").classList.add('header_menu_none');
              if (document.getElementById("_home1")) {
                document.getElementById("_home1").classList.add('header_menu_none');
              }
              if (document.getElementById("all_topic1")) {
                document.getElementById("all_topic1").classList.add('header_menu_none');
              }
              if (document.getElementById("menu_option1")) {
                document.getElementById("menu_option1").classList.add('header_menu_none');
              }
              if (document.getElementById("menu_option2")) {
                document.getElementById("menu_option2").classList.add('header_menu_none');
              }
            }
            var self = this;
            setTimeout(function () {
              self.chartDataConfiguration();
            }, 500);
            setTimeout(() => self.inp1.nativeElement.focus(), 0);
            this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
            this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
            this.helpHides();
            this.progressShow();
          }
        } else {
          this.router.navigate(["/topicshistory"]);
        }
        var self = this;
        setTimeout(() => self.inp1.nativeElement.focus(), 0);
        this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
        this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        if (this.users.currentPaneNumber.currentPane.paneCode == "fdb_Intro") {
          setTimeout(function () {
            document.getElementById("fdbRecommendations").classList.add('table-responsive');
          }, 100);
        }

        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        var self = this;
        setTimeout(() => self.inp1.nativeElement.focus(), 0);
        this.renderer.invokeElementMethod(self.inp1.nativeElement, 'focus');
        this.inp1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });

        this.inputErrorMessage = errors.error.errorMessage;
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }

  getSurveyLeak(surveyId) {
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/surveys/" + surveyId + "/leaks").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.users.leakList = response.data;
        this.loginService.setUser(this.users);
        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        let response = JSON.parse(JSON.stringify(errors))._body;
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
  change(value) {
    if (value == 'true') {
      return value = 'false';
    } else if (value == 'false') {
      return value = 'true';
    } else if (value == '1') {
      return value = '0';
    } else if (value == '0') {
      return value = '1';
    } else if (value == 'Y') {
      return value = 'N';
    } else if (value == 'N') {
      return value = 'Y';
    }
  }
  getAllSurvey() {
    //  this.router.navigate(["/topicshistory"]);
    this.users.surveyCode = new Array;
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/surveys").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        document.getElementById("loader").classList.remove('loading');
        var surveylength = Object.keys(response.data).length;
        this.users.surveyLenght = surveylength;
        this.users.surveyList = response.data;
        this.loginService.setUser(this.users);
        document.getElementById("_home").classList.remove('header_menu_none');
        document.getElementById("all_topic").classList.remove('header_menu_none');
        document.getElementById("menu_option").classList.remove('header_menu_none');
        if (document.getElementById("_home1")) {
          document.getElementById("_home1").classList.remove('header_menu_none');
        }
        if (document.getElementById("all_topic1")) {
          document.getElementById("all_topic1").classList.remove('header_menu_none');
        }
        if (document.getElementById("menu_option1")) {
          document.getElementById("menu_option1").classList.remove('header_menu_none');
        }
        if (document.getElementById("menu_option2")) {
          document.getElementById("menu_option2").classList.remove('header_menu_none');
        }
      },
      error => {
        let response = JSON.parse(JSON.stringify(error));
        console.log(response);
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }

  getSessionPendingMessage() {
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/sessionPendingMessage").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        let response = JSON.parse(JSON.stringify(errors))._body;
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }

  leakView() {
    this.router.navigate(["/leakListView"]);
  }
  goToSurvey(surveyCode, surveyId, paneList, index) {
    var paneCode;
    if (index < this.users.currentPaneNumber.currentPaneProgress) {
      paneCode = paneList[index].paneCode;
      document.getElementById("loader").classList.add('loading');
      var object = {};
      this.loginService.performPostMultiPartData(object, "customers/" + this.users.outhMeResponse.customerId + "/surveys/" + surveyCode + "/" + surveyId + "/panes/" + paneCode).subscribe(
        data => {
          let response = JSON.parse(JSON.stringify(data));
          console.log(response);
          document.getElementById("loader").classList.remove('loading');
          if (response.errorCode == null && response.errorMessage == null) {
            this.users.currentPaneNumber = response.data;
            this.users.paneNumber = index;
            this.loginService.setUser(this.users);
          } else {
            this.inputErrorMessage = response.errorMessage;
          }

        },
        errors => {
          console.log(errors);
          let response = JSON.parse(JSON.stringify(errors))._body;
          document.getElementById("loader").classList.remove('loading');
        }
      );
    }
  }
}