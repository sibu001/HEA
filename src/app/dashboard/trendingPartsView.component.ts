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
  colors: any = {};
  useType: any[] = [];
  useTypeUse: any[] = [];
  trendingData: any[] = [];
  typeNumber: number;
  typeName: string;
  unitType: any[] = [];
  users: Users = new Users();
  partResourceType: string;
  partLookupValue: string;
  partUnitType: string;
  trendingParts: any;

  constructor(private location: Location, private loginService: LoginService) {
    this.users = this.loginService.getUser();
    this.getTrendingPartResource();
    this.colors.colors1 = "#000";
    this.colors.colors2 = "#76ba19";
    this.colors.colors3 = "#76ba19";
    this.colors.colors6 = "#76ba19";
    this.colors.colors7 = "#76ba19";
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
      this.trendingParts.unitTypecolor1 = "#000";
      this.trendingParts.unitTypecolor2 = "#76ba19";
    } else if (number == 1) {
      this.trendingParts.unitTypecolor1 = "#76ba19";
      this.trendingParts.unitTypecolor2 = "#000";
    }
    this.users.unitType = number;
    this.changeResource(this.typeName, this.typeNumber);
  }
  changeResource(resourceType, number) {
    this.typeName = resourceType;
    this.typeNumber = number;
    if (resourceType == "electricity") {
      this.colors.colors1 = "#000"
      this.colors.colors2 = "#76ba19";
      this.colors.colors3 = "#76ba19";
      this.colors.colors6 = "#76ba19";
      this.colors.colors7 = "#76ba19";
      this.trendingParts.color = this.colors;
    } else if (resourceType == "hhe") {
      this.colors.colors2 = "#000"
      this.colors.colors1 = "#76ba19";
      this.colors.colors3 = "#76ba19";
      this.colors.colors6 = "#76ba19";
      this.colors.colors7 = "#76ba19";
      this.trendingParts.color = this.colors;
    } else if (resourceType == "naturalGas") {
      this.colors.colors3 = "#000";
      this.colors.colors2 = "#76ba19";
      this.colors.colors1 = "#76ba19";
      this.colors.colors6 = "#76ba19";
      this.colors.colors7 = "#76ba19";
      this.trendingParts.color = this.colors;
    } else if (resourceType == "ghg") {
      this.colors.colors6 = "#000";
      this.colors.colors1 = "#76ba19";
      this.colors.colors3 = "#76ba19";
      this.colors.colors2 = "#76ba19";
      this.colors.colors7 = "#76ba19";
      this.trendingParts.color = this.colors;
    } else if (resourceType == "water") {
      this.colors.colors7 = "#000";
      this.colors.colors2 = "#76ba19";
      this.colors.colors1 = "#76ba19";
      this.colors.colors6 = "#76ba19";
      this.colors.colors3 = "#76ba19";
      this.trendingParts.color = this.colors;
    }
    this.users.resourceType = number;
    this.loginService.setUser(this.users);
    this.useType = this.users.trendingPartResource[this.users.resourceType].unitTypes[this.users.unitType].useTypes;
    this.unitType = this.users.trendingPartResource[this.users.resourceType].unitTypes;
    this.partResourceType = this.users.trendingPartResource[number].resourceType;
    this.partUnitType = this.users.trendingPartResource[this.users.resourceType].unitTypes[this.users.unitType].unitType;
    this.partLookupValue = this.users.trendingPartResource[this.users.resourceType].unitTypes[this.users.unitType].useTypes[0].lookupValue;
    this.getTrendingPart(this.partResourceType, this.partUnitType, this.partLookupValue);

    // set data to localstorage
    this.trendingParts.partResourceType = this.partResourceType;
    this.trendingParts.partUnitType = this.partUnitType;
    this.trendingParts.partLookupValue = this.partLookupValue;
    this.trendingParts.useType = this.useType;
    this.trendingParts.unitType = this.unitType;
    this.trendingParts.typeName = this.typeName;
    this.trendingParts.typeNumber = this.typeNumber;
    localStorage.setItem('trendingParts', JSON.stringify(this.trendingParts));
    this.getTrendingPart(this.partResourceType, this.partUnitType, this.partLookupValue);
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
        this.trendingParts = JSON.parse(localStorage.getItem('trendingParts'));
        if (this.trendingParts != null && this.trendingParts != undefined) {
          this.partResourceType = this.trendingParts.partResourceType;
          this.partUnitType = this.trendingParts.partUnitType;
          this.partLookupValue = this.trendingParts.partLookupValue;
          this.useType = this.trendingParts.useType;
          this.unitType = this.trendingParts.unitType;
          this.typeName = this.trendingParts.typeName;
          this.typeNumber = this.trendingParts.typeNumber;
          this.colors = this.trendingParts.color;
        }
        else {
          this.typeNumber = this.users.resourceType;
          this.typeName = response.data[this.users.resourceType].resourceType;
          this.useType = response.data[this.users.resourceType].unitTypes[this.users.unitType].useTypes;
          this.unitType = response.data[this.users.resourceType].unitTypes;
          this.partResourceType = this.typeName;
          this.partUnitType = response.data[this.users.resourceType].unitTypes[this.users.unitType].unitType;
          this.partLookupValue = response.data[this.users.resourceType].unitTypes[this.users.unitType].useTypes[0].lookupValue;

          if (this.partResourceType == "naturalgas") {
            this.colors.colors3 = "#000";
            this.colors.colors1 = "#76ba19";
          } else if (this.partResourceType == "hhe") {
            this.colors.colors2 = "#000";
            this.colors.colors1 = "#76ba19";
          } else if (this.partResourceType == "ghg") {
            this.colors.colors6 = "#000";
            this.colors.colors1 = "#76ba19";
          } else if (this.partResourceType == "water") {
            this.colors.colors7 = "#000";
            this.colors.colors1 = "#76ba19";
          }

          // setting data to localstorage 
          this.trendingParts = {};
          this.trendingParts.partResourceType = this.partResourceType;
          this.trendingParts.partUnitType = this.partUnitType;
          this.trendingParts.partLookupValue = this.partLookupValue;
          this.trendingParts.useType = this.useType;
          this.trendingParts.unitType = this.unitType;
          this.trendingParts.typeName = this.typeName;
          this.trendingParts.typeNumber = this.typeNumber;
          this.trendingParts.unitTypecolor1 = "#000";
          this.trendingParts.unitTypecolor2 = "#76ba19";
          this.trendingParts.color = this.colors;
          localStorage.setItem('trendingParts', JSON.stringify(this.trendingParts));
        }
        document.getElementById("loader").classList.remove('loading');
        this.getTrendingPart(this.partResourceType, this.partUnitType, this.partLookupValue);
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
            // eval(response.data[0].trendingCharts[0].chart.freeChartConfigurationJS);
          }, 1000);
        }
        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        let response = JSON.parse(JSON.stringify(errors))._body;
        document.getElementById("loader").classList.remove('loading');
      }
    );
    this.trendingParts.partLookupValue = useType;
    localStorage.setItem('trendingParts', JSON.stringify(this.trendingParts));
  }
}