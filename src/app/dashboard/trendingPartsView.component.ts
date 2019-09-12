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
  colors6: string = "#76ba19";
  colors7: string = "#76ba19";

  useType: any[] = [];
  useTypeUse: any[] = [];
  trendingData: any[] = [];
  typeNumber: number;
  typeName: string;
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
    this.users.lookupValue = value;
    this.loginService.setUser(this.users);
    this.getTrendingPart(this.users.trendingPartResource[this.users.resourceType].resourceType, this.users.trendingPartResource[this.users.resourceType].unitTypes[this.users.unitType].unitType, this.users.lookupValue)
  }
  changeUnitType(number) {
    if (number == 0) {
      this.colors4 = "#000";
      this.colors5 = "#76ba19";
    } else if (number == 1) {
      this.colors5 = "#000";
      this.colors4 = "#76ba19";
    }
    this.users.unitType = number;
    this.changeResource(this.typeName,this.typeNumber);
  }
  changeResource(resourceType,number) {
    this.typeName=resourceType;
    this.typeNumber=number;
    if (resourceType == "electricity") {
      this.colors1 = "#000"
      this.colors2 = "#76ba19";
      this.colors3 = "#76ba19";
      this.colors6 = "#76ba19";
      this.colors7 = "#76ba19";
    } else if (resourceType == "hhe") {
      this.colors2 = "#000"
      this.colors1 = "#76ba19";
      this.colors3 = "#76ba19";
      this.colors6 = "#76ba19";
      this.colors7 = "#76ba19";
    } else if (resourceType == "naturalGas") {
      this.colors3 = "#000";
      this.colors2 = "#76ba19";
      this.colors1 = "#76ba19";
      this.colors6 = "#76ba19";
      this.colors7 = "#76ba19";
    } else if (resourceType == "ghg") {
      this.colors6 = "#000";
      this.colors1 = "#76ba19";
      this.colors3 = "#76ba19";
      this.colors2 = "#76ba19";
      this.colors7 = "#76ba19";
    } else if (resourceType == "water") {
      this.colors7 = "#000";
      this.colors2 = "#76ba19";
      this.colors1 = "#76ba19";
      this.colors6 = "#76ba19";
      this.colors3 = "#76ba19";
    }
    this.users.resourceType = number;
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
        let arrayObject = response.data;
        this.users.trendingPartResource = arrayObject.sort(function (a, b) {
          return b.unitTypes[0].used - a.unitTypes[0].used || b.unitTypes[1].used - a.unitTypes[1].used;
        })
        // this.users.trendingPartResource = response.data;
        this.typeNumber = this.users.resourceType;
        this.typeName=response.data[this.users.resourceType].resourceType;
        this.useType = response.data[this.users.resourceType].unitTypes[this.users.unitType].useTypes;
        this.unitType = response.data[this.users.resourceType].unitTypes;
        this.users.treadingLoadsValue = response.data[this.users.resourceType].unitTypes[this.users.unitType].useTypes[0].lookupValue;
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
    var param = "resourceUse=" + resourcesUse + "&unitType=" + unitType + "&useType=" + useType;
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/trendingParts?" + param).subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
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