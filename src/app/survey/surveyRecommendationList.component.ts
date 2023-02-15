import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
declare var $: any;
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'surveyRecommendationList',
  templateUrl: './surveyRecommendationList.component.html',
  styleUrls: ['./surveyRecommendationList.component.css']
})
// tslint:disable-next-line: class-name
export class surveyRecommendationListComponent implements OnInit, AfterViewInit {
  recommendationList: any[] = [];
  users: Users = new Users();
  savingColor = '#000';
  titleColor = '76ba19';
  statusColor = '76ba19';
  sortingBy = '-priceValue';
  recommendationPriceValueSum = 0;
  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    this.users = this.loginService.getUser();
    this.getLeak();
  }

  ngOnInit() {
    this.recommendationList = this.users.recommendationList;
   }

  ngAfterViewInit() {
    if (this.recommendationList.length <= 0 || this.users.recommendationStatusChange) {
      this.getRecommendation();
    }else{
      this.scrollToRecommendation();
    }
  }

  scrollToRecommendation(){
    const selectedRecommendation = document.querySelector('[href="#collapse' + this.users.recommendationNo +'"]');
    if(!this.users.recommendationNo || !selectedRecommendation){
      return ;
    }

    $('#collapse' + this.users.recommendationNo).addClass('in');
    const selectedDiv = document.querySelector('[href="#collapse' + this.users.recommendationNo +'"]');
    selectedDiv.setAttribute('aria-expanded','true');
    selectedDiv.classList.remove('collapsed');
    selectedDiv.scrollIntoView();
    setTimeout(() => {
      window.scrollBy(0,-100);
    },100);
  }

  back() {
    this.location.back();
  }

  onChange(recommendationId, status, surveyId) {
    document.getElementById('loader').classList.add('loading');
    const body = 'userId=' + this.users.outhMeResponse.userId + '&recommendationId=' + recommendationId + '&status=' + status + '&surveyId=' + surveyId;
    this.loginService.performPostMultiPartData(body, 'surveyRecommendationAction.do').subscribe(
      data => {
        this.users.recommendationStatusChange = true;
        this.users.isLeakChange = true;
        this.loginService.setUser(this.users);
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log('error');
        console.log(JSON.parse(JSON.stringify(error)));
      });
  }

  leakView(id) {
    this.users.leakFocusId = id;
    this.loginService.setUser(this.users);
    this.router.navigate(['leakListView'],{fragment : id});
  }

  questionHelp(instruction) {
    this.users.instructionHtml = instruction;
    this.loginService.setUser(this.users);
    window.open(window.location.origin + '/smartAudit/#/recommendationInstruction');
    return;
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
        this.recommendationList = array;
        for (let index = 0; index < this.recommendationList.length; index++) {
          this.recommendationPriceValueSum = this.recommendationList[index].priceValue + this.recommendationPriceValueSum;
        }
        this.users.recommendationList = array;
        this.users.recommendationStatusChange = false;
        this.loginService.setUser(this.users);
        document.getElementById('loader').classList.remove('loading');
      },
      error => {
        document.getElementById('loader').classList.remove('loading');
        console.log(JSON.parse(JSON.stringify(error)));
      },() =>{
        setTimeout(() =>{ this.scrollToRecommendation(); },300);
      });
  }

  sortAccordingTo(ids: any) {
    switch (ids) {
      case 1:
        this.titleColor = '#76ba19';
        this.statusColor = '#76ba19';
        this.savingColor = '#000';
        this.sortingBy = '-priceValue';
        this.getLeak();
        break;
      case 2:
        this.titleColor = '#000';
        this.statusColor = '#76ba19';
        this.savingColor = '#76ba19';
        this.sortingBy = 'recommendation';
        break;
      case 3:
        this.titleColor = '#76ba19';
        this.statusColor = '#000';
        this.savingColor = '#76ba19';
        this.sortingBy = 'status';
        break;
      default:
        break;
    }
  }

  getLeak() {
    const newList = _.reverse(this.users.recommendationList);
    const groups = _.groupBy(newList, 'recommendationId');
    const array = [];
    _.forOwn(groups, function (value, key) {
      array.push(value[0]);
    });
    this.users.recommendationList = array;
  }
}
