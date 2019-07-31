import { Component, OnInit, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as _ from "lodash";
import { SortGridPipe } from "src/app/pipes/sorting";

declare var $: any;
@Component({
  selector: 'surveyRecommendationList',
  templateUrl: './surveyRecommendationList.component.html',
  styleUrls: ['./surveyRecommendationList.component.css']
})
export class surveyRecommendationListComponent implements OnInit, AfterViewInit {
  recommendationList: any[] = [];
  users: Users = new Users();
  savingColor: string = "#000";
  titleColor: string = "76ba19";
  statusColor: string = "76ba19";
  sortingBy: string = "-priceValue";
  recommendationPriceValueSum: number = 0;
  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    this.recommendationList = this.users.recommendationList;
    if (this.recommendationList.length <= 0 || this.users.recommendationStatusChange) {
      this.getRecommendation();
    }
    this.getLeake();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    $('#collapse' + this.users.recomandationNo).addClass('in');
  }
  back() {
    this.location.back();
  }
  onChange(recommendationId, status, surveyId) {
    document.getElementById("loader").classList.add('loading');
      let body="userId="+ this.users.outhMeResponse.userId+"&recommendationId="+recommendationId+"&status="+status+"&surveyId="+surveyId;
    this.loginService.performPostMultiPartData(body,"surveyRecommendationAction.do").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        this.users.recommendationStatusChange = true;
        this.loginService.setUser(this.users);
        document.getElementById("loader").classList.remove('loading');
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log("error");
        console.log(JSON.parse(JSON.stringify(error)));

      }
    );
    //  this.loginService.setUser(this.users);
  }
  leakView(id) {
    this.users.leakFocusNo = id;
    this.loginService.setUser(this.users);
    this.router.navigate(["leakListView"]);
  }
  questionHelp(instruction) {
    this.users.instructionHtml = instruction;
    this.loginService.setUser(this.users);
    window.open("https://sandbox.hea.com/#/recommendationInstruction");
    return;
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
        this.recommendationList = array;
        for (let index = 0; index < this.recommendationList.length; index++) {
          this.recommendationPriceValueSum = this.recommendationList[index].priceValue + this.recommendationPriceValueSum;
        }
        this.users.recommendationList = array;
        this.users.recommendationStatusChange = false;
        this.loginService.setUser(this.users);
        document.getElementById("loader").classList.remove('loading');
      },
      error => {
        document.getElementById("loader").classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));

      }
    );
  }
  sortAccordingTo(ids) {
    if (ids == 1) {
      this.savingColor = "#000"
      this.titleColor = "#76ba19";
      this.statusColor = "#76ba19";
      this.sortingBy = '-priceValue';
      this.getLeake();
    } else if (ids == 2) {
      this.titleColor = "#000"
      this.savingColor = "#76ba19";
      this.statusColor = "#76ba19";
      this.sortingBy = 'recommendation';
      //this.changes(1);
    } else if (ids == 3) {
      this.statusColor = "#000";
      this.titleColor = "#76ba19";
      this.savingColor = "#76ba19";
      this.sortingBy = 'status';
      // this.changes(1);
    }

  }

  getLeake() {
    var newList = _.reverse(this.users.recommendationList);
    var groups = _.groupBy(newList, "recommendationId");
    var array = [];
    _.forOwn(groups, function (value, key) {
      array.push(value[0]);
    });

    this.users.recommendationList = array;

  }
}
