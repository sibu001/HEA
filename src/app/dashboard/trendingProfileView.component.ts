import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AppUtility } from '../utility/app.utility';
declare var $: any;
declare const plotChartWithParams : any;
@Component({
  selector: 'trendingProfileView',
  templateUrl: './trendingProfileView.component.html',
  styleUrls: ['./trendingProfileView.component.css']
})
export class TrendingProfileViewComponent implements OnInit {
  colors: any = {};
  hideHelps = false;
  useType: any[] = [];
  unitType: any[] = [];
  unitTypeNumber = 0;
  resourceTypeNumber = 0;
  typeNumber: number;
  typeName: string;
  profileUnitType: string;
  profileUseType: string;
  profileLookupValue: string;
  profileResourceType: string;
  trendingProfileData: any;
  trendingProfile: any;
  errorMessage: any;
  users: Users = new Users();
  constructor(private loginService: LoginService, private router: Router) {
    this.users = this.loginService.getUser();
    this.getTrendingProfileResource();
    this.colors.colors1 = '#000';
    this.colors.colors2 = '#76ba19';
    this.colors.colors3 = '#76ba19';
    this.colors.colors6 = '#76ba19';
    this.colors.colors7 = '#76ba19';
  }

  ngOnInit() {
    AppUtility.removeAllPreviousCanvasElements();
  }

  home() {
    this.router.navigate(['/dashboard']);
  }
  changeLookupValue(value: any) {
    this.getTrendingPart(this.profileResourceType, this.profileUnitType, value);
  }
  energyChange(resourceType: any, number: any) {
    this.typeNumber = number;
    this.typeName = resourceType;
    if (resourceType === 'naturalGas') {
      this.colors.colors1 = '#000';
      this.colors.colors2 = '#76ba19';
      this.colors.colors3 = '#76ba19';
      this.colors.colors6 = '#76ba19';
      this.colors.colors7 = '#76ba19';
      this.trendingProfile.color = this.colors;
    } else if (resourceType === 'electricity') {
      this.colors.colors2 = '#000';
      this.colors.colors1 = '#76ba19';
      this.colors.colors3 = '#76ba19';
      this.colors.colors6 = '#76ba19';
      this.colors.colors7 = '#76ba19';
      this.trendingProfile.color = this.colors;
    } else if (resourceType === 'hhe') {
      this.colors.colors2 = '#76ba19';
      this.colors.colors3 = '#000';
      this.colors.colors1 = '#76ba19';
      this.colors.colors6 = '#76ba19';
      this.colors.colors7 = '#76ba19';
      this.trendingProfile.color = this.colors;
    } else if (resourceType === 'ghg') {
      this.colors.colors6 = '#000';
      this.colors.colors1 = '#76ba19';
      this.colors.colors3 = '#76ba19';
      this.colors.colors2 = '#76ba19';
      this.colors.colors7 = '#76ba19';
      this.trendingProfile.color = this.colors;
    } else if (resourceType === 'water') {
      this.colors.colors7 = '#000';
      this.colors.colors2 = '#76ba19';
      this.colors.colors1 = '#76ba19';
      this.colors.colors6 = '#76ba19';
      this.colors.colors3 = '#76ba19';
      this.trendingProfile.color = this.colors;
    }

    this.profileResourceType = this.users.trendingProfileResource[number].resourceType;
    this.profileUnitType = this.users.trendingProfileResource[number].unitTypes[this.unitTypeNumber].unitType;
    this.profileLookupValue = this.users.trendingProfileResource[number].unitTypes[this.unitTypeNumber].useTypes[this.resourceTypeNumber].lookupValue;
    this.unitType = this.users.trendingProfileResource[number].unitTypes;
    this.useType = this.users.trendingProfileResource[number].unitTypes[this.unitTypeNumber].useTypes;

    // set data to local storage
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

  changeUnitType(number: any) {
    if (number === 0) {
      this.trendingProfile.unitTypecolor1 = '#76ba19';
      this.trendingProfile.unitTypecolor2 = '#000';
    } else if (number === 1) {
      this.trendingProfile.unitTypecolor1 = '#000';
      this.trendingProfile.unitTypecolor2 = '#76ba19';
    }
    this.unitTypeNumber = number;
    this.resourceTypeNumber = 0;
    this.energyChange(this.typeName, this.typeNumber);
  }
  getTrendingProfileResource() {
    this.useType = new Array;
    this.unitType = new Array;
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/trendingProfileChart/resources').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        console.log(response);
        const arrayObject = response.data.reverse();
        this.users.trendingProfileResource = arrayObject.sort(function (a, b) {
          return b.unitTypes[0].used - a.unitTypes[0].used || b.unitTypes[1].used - a.unitTypes[1].used;
        });
        this.trendingProfile = JSON.parse(localStorage.getItem('trendingProfile'));
        if (this.trendingProfile != null && this.trendingProfile !== undefined && this.trendingProfile.customerId == this.users.outhMeResponse.customerId ) {
          this.profileResourceType = this.trendingProfile.profileResourceType;
          this.profileUnitType = this.trendingProfile.profileUnitType;
          this.profileLookupValue = this.trendingProfile.profileLookupValue;
          this.useType = this.trendingProfile.useType;
          this.unitType = this.trendingProfile.unitType;
          this.typeName = this.trendingProfile.typeName;
          this.typeNumber = this.trendingProfile.typeNumber;
          this.colors = this.trendingProfile.color;
        } else {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].resourceType == 'hhe') {
              this.typeNumber = i;
              this.typeName = response.data[i].resourceType;
              this.unitType = response.data[i].unitTypes;
              this.useType = response.data[i].unitTypes[this.unitTypeNumber].useTypes;
              this.profileResourceType = response.data[i].resourceType;
              this.profileUnitType = response.data[i].unitTypes[this.unitTypeNumber].unitType;
              this.profileLookupValue = response.data[i].unitTypes[this.unitTypeNumber].useTypes[0].lookupValue;
              if (this.profileResourceType === 'hhe') {
                this.colors.colors3 = '#000';
                this.colors.colors1 = '#76ba19';
              } else if (this.profileResourceType === 'electricity') {
                this.colors.colors2 = '#000';
                this.colors.colors1 = '#76ba19';
              } else if (this.profileResourceType === 'ghg') {
                this.colors.colors6 = '#000';
                this.colors.colors1 = '#76ba19';
              } else if (this.profileResourceType === 'water') {
                this.colors.colors7 = '#000';
                this.colors.colors1 = '#76ba19';
              }
              // setting data to local storage
              this.trendingProfile = {};
              this.trendingProfile.profileResourceType = this.profileResourceType;
              this.trendingProfile.profileUnitType = this.profileUnitType;
              this.trendingProfile.profileLookupValue = this.profileLookupValue;
              this.trendingProfile.useType = this.useType;
              this.trendingProfile.unitType = this.unitType;
              this.trendingProfile.typeName = this.typeName;
              this.trendingProfile.typeNumber = this.typeNumber;
              this.trendingProfile.unitTypecolor1 = '#76ba19';
              this.trendingProfile.unitTypecolor2 = '#000';
              this.trendingProfile.color = this.colors;
              this.trendingProfile.customerId = this.users.outhMeResponse.customerId;
              localStorage.setItem('trendingProfile', JSON.stringify(this.trendingProfile));
              break;
            }
          }
        }
        document.getElementById('loader').classList.remove('loading');
        this.getTrendingPart(this.profileResourceType, this.profileUnitType, this.profileLookupValue);
      },
      errors => {
        console.log(errors);
        this.errorMessage = errors.error.errorMessage;
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }
  getTrendingPart(resourcesUse, unitType, useType) {
    document.getElementById('loader').classList.add('loading');
    const param = 'resourceType=' + resourcesUse + '&unitType=' + unitType + '&useType=' + useType;
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/trendingProfileChart?' + param).subscribe(
      data => {

        AppUtility.removeAllPreviousCanvasElements();
        // check for removing the double text label on the graph
        const rootEle = document.getElementById('trendingProfileView');
        if(rootEle)
          rootEle.innerHTML = this.trendingProfileData.chart.freeChartDiv;

        const response = JSON.parse(JSON.stringify(data));
        this.trendingProfileData = response.data;
        setTimeout(() =>  {
          plotChartWithParams(response.data.chart.freeChartConfigurationJS,this.trendingProfileData.chart.series);
          document.getElementById('trendingProfileChartLegendSection').classList.add('table-responsive');
        }, 100);
        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        this.errorMessage = errors.error.errorMessage;
        document.getElementById('loader').classList.remove('loading');
      }
    );
    this.trendingProfile.profileLookupValue = useType;
    localStorage.setItem('trendingProfile', JSON.stringify(this.trendingProfile));
  }
}
