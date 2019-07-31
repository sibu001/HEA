import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
declare var $: any;
@Component({
  selector: 'trendingPartsView',
  templateUrl: './trendingPartsView.component.html',
  styleUrls: ['./trendingPartsView.component.css']
})
export class TrendingPartsViewComponent implements OnInit, AfterViewInit {
  colors1: string = "#000";
  colors2: string = "#76ba19";
  colors3: string = "#76ba19";
  colors4: string = "#000";
  colors5: string = "#76ba19";

  useType: any[] = [];
  useTypeUse: any[] = [];
  trendingData: any[] = [];

  unitType: any[] = [];
  users: Users = new Users();

  constructor(private location: Location, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    this.getTrendingPartResource();
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  back() {
    this.location.back();
  }
  changesLookupValue(value) {
   this.users.lookupValue=value;
   this.loginService.setUser(this.users);
   this.getTrendingPart(this.users.trendingPartResource[this.users.resourceType].resourceType, this.users.trendingPartResource[this.users.resourceType].unitTypes[this.users.unitType].unitType,this.users.lookupValue)
  }
  changeUnitType(number){
     if (number == 0) {
      this.colors4 = "#000";
      this.colors5 = "#76ba19";
    } else if (number == 1) {
      this.colors5 = "#000";
      this.colors4 = "#76ba19";
    }
    this.users.unitType=number;
    this.changeResource(0);
  }
  changeResource(number) {
     if (number == 0) {
      this.colors1 = "#000"
      this.colors2 = "#76ba19";
      this.colors3 = "#76ba19";
    } else if (number == 1) {
      this.colors2 = "#000"
      this.colors1 = "#76ba19";
      this.colors3 = "#76ba19";
    } else if (number == 2) {
      this.colors3 = "#000";
      this.colors2 = "#76ba19";
      this.colors1 = "#76ba19";
    }
    this.users.resourceType=number;
    this.loginService.setUser(this.users);
    this.useType = this.users.trendingPartResource[this.users.resourceType].unitTypes[this.users.unitType].useTypes;
    this.unitType = this.users.trendingPartResource[this.users.resourceType].unitTypes;
    this.getTrendingPart(this.users.trendingPartResource[this.users.resourceType].resourceType, this.users.trendingPartResource[this.users.resourceType].unitTypes[this.users.unitType].unitType, this.users.trendingPartResource[this.users.resourceType].unitTypes[this.users.unitType].useTypes[0].lookupValue)
  }
  getTrendingPartResource() {
    this.useType = new Array;
    this.unitType = new Array;
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/trendingParts/resources").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
        this.users.trendingPartResource = response.data;
        this.useType = response.data[this.users.resourceType].unitTypes[this.users.unitType].useTypes;
        this.unitType = response.data[this.users.resourceType].unitTypes;
        this.users.treadingLoadsValue=response.data[this.users.resourceType].unitTypes[this.users.unitType].useTypes[0].lookupValue;
        this.getTrendingPart(response.data[this.users.resourceType].resourceType, response.data[this.users.resourceType].unitTypes[this.users.unitType].unitType, response.data[this.users.resourceType].unitTypes[this.users.unitType].useTypes[0].lookupValue);
      },
      errors => {
        console.log(errors);
        let response = JSON.parse(JSON.stringify(errors))._body;
        document.getElementById("loader").classList.remove('loading');
      }
    );
  }
  getTrendingPart(resourcesUse, unitType, useType) {
     document.getElementById("loader").classList.add('loading');
    // let content = new URLSearchParams();
    // content.set('resourceUse', resourcesUse);
    // content.set('unitType', unitType);
    // content.set('useType', useType);
    // let body = content.toString();
    // let body="resourceUse="+resourcesUse+"&unitType="+unitType+"&unitType="+useType;
        var param = "resourceUse=" + resourcesUse + "&unitType=" + unitType + "&useType=" + useType;
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/trendingParts?" + param).subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
        this.trendingData = response.data;
        for (let data of response.data) {
          setTimeout(function () {
            var F = new Function(data.trendingCharts[0].chart.freeChartConfigurationJS);
            return (F());
            //  eval(response.data[0].trendingCharts[0].chart.freeChartConfigurationJS);
          }, 100);
        }
        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        let response = JSON.parse(JSON.stringify(errors))._body;
        document.getElementById("loader").classList.remove('loading');

      }
    );
  }
}