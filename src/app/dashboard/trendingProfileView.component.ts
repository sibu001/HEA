import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Users } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: 'trendingProfileView',
  templateUrl: './trendingProfileView.component.html',
  styleUrls: ['./trendingProfileView.component.css']
})
export class TrendingProfileViewComponent implements OnInit, AfterViewInit {
  // colors1: string = "#000";
  // colors2: string = "#76ba19";
  // colors3: string = "#76ba19";
  // colors6: string = "#76ba19";
  // colors7: string = "#76ba19";
  colors: any = {};
  hideHelps: boolean = false;
  useType: any[] = [];
  unitType: any[] = [];
  unitTypeNumber: number = 0;
  resourceTypeNumber: number = 0;
  typeNumber: number;
  typeName: string;
  profileUnitType: string;
  profileUseType: string;
  profileLookupValue: string;
  profileResourceType: string;
  trendingProfileData: any;
  trendingProfile: any;
  users: Users = new Users();
  constructor(private location: Location, private loginService: LoginService, private router: Router) {
    this.users = this.loginService.getUser();
    this.getTrendingProfileResource();
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
  home() {
    this.router.navigate(["/dashboard"]);
  }
  changeLookupValue(value) {
    this.getTrendingPart(this.profileResourceType, this.profileUnitType, value);
  }
  energyChange(resourceType, number) {
    this.typeNumber = number;
    this.typeName = resourceType;
    if (resourceType == "naturalGas") {
      this.colors.colors1 = "#000"
      this.colors.colors2 = "#76ba19";
      this.colors.colors3 = "#76ba19";
      this.colors.colors6 = "#76ba19";
      this.colors.colors7 = "#76ba19";
      this.trendingProfile.color = this.colors;
    } else if (resourceType == "electricity") {
      this.colors.colors2 = "#000"
      this.colors.colors1 = "#76ba19";
      this.colors.colors3 = "#76ba19";
      this.colors.colors6 = "#76ba19";
      this.colors.colors7 = "#76ba19";
      this.trendingProfile.color = this.colors;
    } else if (resourceType == "hhe") {
      this.colors.colors2 = "#76ba19";
      this.colors.colors3 = "#000";
      this.colors.colors1 = "#76ba19";
      this.colors.colors6 = "#76ba19";
      this.colors.colors7 = "#76ba19";
      this.trendingProfile.color = this.colors;
    } else if (resourceType == "ghg") {
      this.colors.colors6 = "#000";
      this.colors.colors1 = "#76ba19";
      this.colors.colors3 = "#76ba19";
      this.colors.colors2 = "#76ba19";
      this.colors.colors7 = "#76ba19";
      this.trendingProfile.color = this.colors;
    } else if (resourceType == "water") {
      this.colors.colors7 = "#000";
      this.colors.colors2 = "#76ba19";
      this.colors.colors1 = "#76ba19";
      this.colors.colors6 = "#76ba19";
      this.colors.colors3 = "#76ba19";
      this.trendingProfile.color = this.colors;
    }

    this.profileResourceType = this.users.trendingProfileResource[number].resourceType;
    this.profileUnitType = this.users.trendingProfileResource[number].unitTypes[this.unitTypeNumber].unitType;
    this.profileLookupValue = this.users.trendingProfileResource[number].unitTypes[this.unitTypeNumber].useTypes[this.resourceTypeNumber].lookupValue;
    this.unitType = this.users.trendingProfileResource[number].unitTypes;
    this.useType = this.users.trendingProfileResource[number].unitTypes[this.unitTypeNumber].useTypes;

    // set data to localstorage
    this.trendingProfile.profileResourceType = this.profileResourceType;
    this.trendingProfile.profileUnitType = this.profileUnitType;
    this.trendingProfile.profileLookupValue = this.profileLookupValue;
    this.trendingProfile.useType = this.useType;
    this.trendingProfile.unitType = this.unitType;
    this.trendingProfile.typeName = this.typeName;
    this.trendingProfile.typeNumber = this.typeNumber;
    localStorage.setItem('trendingProfile', JSON.stringify(this.trendingProfile));
    this.getTrendingPart(this.profileResourceType, this.profileUnitType, this.profileLookupValue);
  }
  changeUnitType(number) {
    if (number == 0) {
      this.trendingProfile.unitTypecolor1 = "#000";
      this.trendingProfile.unitTypecolor2 = "#76ba19";
    } else if (number == 1) {
      this.trendingProfile.unitTypecolor1 = "#76ba19";
      this.trendingProfile.unitTypecolor2 = "#000";
    }
    this.unitTypeNumber = number;
    this.resourceTypeNumber = 0;
    this.energyChange(this.typeName, this.typeNumber);
  }
  getTrendingProfileResource() {
    this.useType = new Array;
    this.unitType = new Array;
    document.getElementById("loader").classList.add('loading');
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/trendingProfileChart/resources").subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
        let arrayObject = response.data.reverse();
        this.users.trendingProfileResource = arrayObject.sort(function (a, b) {
          return b.unitTypes[0].used - a.unitTypes[0].used || b.unitTypes[1].used - a.unitTypes[1].used;
        })
        this.trendingProfile = JSON.parse(localStorage.getItem('trendingProfile'));
        if (this.trendingProfile != null && this.trendingProfile != undefined) {
          this.profileResourceType = this.trendingProfile.profileResourceType;
          this.profileUnitType = this.trendingProfile.profileUnitType;
          this.profileLookupValue = this.trendingProfile.profileLookupValue;
          this.useType = this.trendingProfile.useType;
          this.unitType = this.trendingProfile.unitType;
          this.typeName = this.trendingProfile.typeName;
          this.typeNumber = this.trendingProfile.typeNumber;
          this.colors = this.trendingProfile.color;
        }
        else {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].unitTypes[0].used && response.data[i].unitTypes[1].used) {
              this.typeNumber = i;
              this.typeName = response.data[i].resourceType;
              this.unitType = response.data[i].unitTypes;
              this.useType = response.data[i].unitTypes[this.unitTypeNumber].useTypes;
              this.profileResourceType = response.data[i].resourceType;
              this.profileUnitType = response.data[i].unitTypes[this.unitTypeNumber].unitType;
              this.profileLookupValue = response.data[i].unitTypes[this.unitTypeNumber].useTypes[0].lookupValue;
              if (this.profileResourceType == "hhe") {
                this.colors.colors3 = "#000";
                this.colors.colors1 = "#76ba19";
              } else if (this.profileResourceType == "electricity") {
                this.colors.colors2 = "#000";
                this.colors.colors1 = "#76ba19";
              } else if (this.profileResourceType == "ghg") {
                this.colors.colors6 = "#000";
                this.colors.colors1 = "#76ba19";
              } else if (this.profileResourceType == "water") {
                this.colors.colors7 = "#000";
                this.colors.colors1 = "#76ba19";
              }
              // setting data to localstorage 
              this.trendingProfile = {};
              this.trendingProfile.profileResourceType = this.profileResourceType;
              this.trendingProfile.profileUnitType = this.profileUnitType;
              this.trendingProfile.profileLookupValue = this.profileLookupValue;
              this.trendingProfile.useType = this.useType;
              this.trendingProfile.unitType = this.unitType;
              this.trendingProfile.typeName = this.typeName;
              this.trendingProfile.typeNumber = this.typeNumber;
              this.trendingProfile.unitTypecolor1 = "#000";
              this.trendingProfile.unitTypecolor2 = "#76ba19";
              this.trendingProfile.color = this.colors;
              localStorage.setItem('trendingProfile', JSON.stringify(this.trendingProfile));
              break;
            }
          }
        }
        document.getElementById("loader").classList.remove('loading');
        this.getTrendingPart(this.profileResourceType, this.profileUnitType, this.profileLookupValue);
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
    var param = "resourceType=" + resourcesUse + "&unitType=" + unitType + "&useType=" + useType;
    this.loginService.performGetMultiPartData("customers/" + this.users.outhMeResponse.customerId + "/trendingProfileChart?" + param).subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
        this.trendingProfileData = response.data;
        var line1 = new Array;
        var lineV = new Array;
        var line2 = new Array;
        var line3 = new Array;
        var line4 = new Array;
        var line5 = new Array;
        var line6 = new Array;
        let i = 0;
        for (let areaSeries of response.data.chart.series) {
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
          } else if (areaSeries.chartSeries.field == "lineV") {
            for (let areaSeriesValue of areaSeries.seriesValues) {
              lineV.push([areaSeriesValue.label, areaSeriesValue.value]);
            }
          }
          i++;
        }
        setTimeout(function () {
          eval(response.data.chart.freeChartConfigurationJS);
          document.getElementById("trendingProfileChartLegendSection").classList.add('table-responsive');
        }, 100);
        document.getElementById("loader").classList.remove('loading');
      },
      errors => {
        console.log(errors);
        let response = JSON.parse(JSON.stringify(errors))._body;
        document.getElementById("loader").classList.remove('loading');
      }
    );
    this.trendingProfile.profileLookupValue = useType;
    localStorage.setItem('trendingProfile', JSON.stringify(this.trendingProfile));
  }
}