import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Users } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
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
  errorMessage: any;
  trendingParts: any = {
    activeResource: 'electricity',
    unitType: 'cost',
    useTypes: 'all'
  };
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

  changesLookupValue(value: any) {
    this.getTrendingPart(this.trendingParts.activeResource, this.trendingParts.unitType, value);
  }

  changeUnitType(number: any, useTypes: any) {
    this.trendingParts.unitType = useTypes;
    this.unitType.forEach(elements => {
      if (elements.unitType === useTypes) {
        this.useType = elements.useTypes;
        elements.unitTypeColor = '#000';
      } else {
        elements.unitTypeColor = '#76ba19';
      }
    });
    this.users.unitType = number;
    this.changeResource(this.trendingParts.activeResource, true);
  }

  changeResource(resourceType: any, isActive?: boolean) {
    if (!isActive) {
      return;
    }
    this.trendingParts.activeResource = resourceType;
    this.users.trendingPartResource.forEach(element => {
      if (this.trendingParts.activeResource === element.resourceType) {
        this.unitType = element.unitTypes;
        element.color = '#000';
        this.unitType.forEach(elements => {
          if (elements.unitType === this.trendingParts.unitType) {
            this.useType = elements.useTypes;
            elements.unitTypeColor = '#000';
          } else {
            elements.unitTypeColor = '#76ba19';
          }
        });
      } else {
        if (element.usedCost && element.usedUse) {
          element.color = '#76ba19';
        } else {
          element.color = '';
        }
      }
    });
    this.calculateUseType();
    this.loginService.setUser(this.users);
    this.getTrendingPart(this.trendingParts.activeResource, this.trendingParts.unitType, this.trendingParts.useTypes);
  }

  getTrendingPartResource() {
    this.trendingParts = JSON.parse(localStorage.getItem('trendingParts')) ? JSON.parse(localStorage.getItem('trendingParts')) : this.trendingParts;
    this.useType = new Array;
    this.unitType = new Array;
    const resourceType = this.trendingParts.activeResource;
    document.getElementById('loader').classList.add('loading');
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/trendingParts/resources').subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        const arrayObject = response.data;
        this.users.trendingPartResource = arrayObject.sort(function (a, b) {
          return b.unitTypes[0].used - a.unitTypes[0].used || b.unitTypes[1].used - a.unitTypes[1].used;
        });
        this.users.trendingPartResource.forEach(element => {
          for (let index = 0; index < element.unitTypes.length; index++) {
            if (element.unitTypes[index].unitType === 'cost') {
              element.usedCost = element.unitTypes[index].used;
              element.useTypesCost = element.unitTypes[index].useTypes.length;
              element.unitTypes[index].unitTypeColor = '#76ba19';
            } else if (element.unitTypes[index].unitType === 'use') {
              element.usedUse = element.unitTypes[index].used;
              element.useTypesUse = element.unitTypes[index].useTypes.length;
              element.unitTypes[index].unitTypeColor = '#76ba19';
            }
          }
          element.isActive = true;
          if (resourceType === element.resourceType) {
            this.unitType = element.unitTypes;
            element.color = '#000';
          } else {
            if (!this.unitType) {
              this.trendingParts.activeResource = element.resourceType;
              this.unitType = element.unitTypes;
            }
            if (element.usedCost && element.usedUse) {
              element.color = '#76ba19';
            } else {
              element.isActive = false;
              element.color = '';
            }
          }
          switch (element.resourceType) {
            case 'electricity':
              element.resourceTypeLabel = 'Electricity Only';
              break;
            case 'hhe':
              element.resourceTypeLabel = 'Household Energy';
              break;
            case 'naturalGas':
              element.resourceTypeLabel = 'Natural Gas Only';
              break;
            case 'ghg':
              element.resourceTypeLabel = 'GHG';
              break;
            case 'water':
              element.resourceTypeLabel = 'Water';
              break;
            default:
              break;
          }
        });
        const i = this.unitType.findIndex((item: any) => item.unitType === this.trendingParts.unitType);
        if (i !== -1) {
          this.useType = this.unitType[i].useTypes;
          this.unitType[i].unitTypeColor = '#000';
        } else if (this.useType.length > 0) {
          this.trendingParts.unitType = this.unitType[0].unitType;
          this.useType = this.unitType[0].useTypes;
          this.unitType[0].unitTypeColor = '#000';
        }
        this.calculateUnitType();
        this.calculateUseType();
        document.getElementById('loader').classList.remove('loading');
        this.getTrendingPart(this.trendingParts.activeResource, this.trendingParts.unitType, this.trendingParts.useTypes);
      },
      errors => {
        console.log(errors);
        this.errorMessage = errors.error.errorMessage;
        document.getElementById('loader').classList.remove('loading');
      }
    );
  }

  calculateUnitType() {
    const i = this.unitType.findIndex((item: any) => item.unitType === this.trendingParts.unitType);
    if (i !== -1) {
      this.useType = this.unitType[i].useTypes;
      this.unitType[i].unitTypeColor = '#000';
    } else if (this.useType.length > 0) {
      this.trendingParts.unitType = this.unitType[0].unitType;
      this.useType = this.unitType[0].useTypes;
      this.unitType[0].unitTypeColor = '#000';
    }
  }

  calculateUseType() {
    const i = this.useType.findIndex((item: any) => item.lookupValue === this.trendingParts.useTypes);
    if (i === -1 && this.useType.length > 0) {
      this.trendingParts.useTypes = this.useType[0].lookupValue;
    }
  }
  getTrendingPart(resourcesUse: any, unitType: any, useType: any) {
    document.getElementById('loader').classList.add('loading');
    this.trendingParts.activeResource = resourcesUse;
    this.trendingParts.unitType = unitType;
    this.trendingParts.useTypes = this.partLookupValue = useType;
    localStorage.setItem('trendingParts', JSON.stringify(this.trendingParts));
    const param = 'resourceUse=' + resourcesUse + '&unitType=' + unitType + '&useType=' + useType;
    this.loginService.performGetMultiPartData('customers/' + this.users.outhMeResponse.customerId + '/trendingParts?' + param).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data));
        this.trendingData = response.data;
        for (const newData of response.data) {
          setTimeout(function () {
            const F = new Function(newData.trendingCharts[0].chart.freeChartConfigurationJS);
            return (F());
            // eval(response.data[0].trendingCharts[0].chart.freeChartConfigurationJS);
          }, 1000);
        }
        document.getElementById('loader').classList.remove('loading');
      },
      errors => {
        console.log(errors);
        this.errorMessage = errors.error.errorMessage;
        document.getElementById('loader').classList.remove('loading');
      }
    );
    this.trendingParts.partLookupValue = useType;
    localStorage.setItem('trendingParts', JSON.stringify(this.trendingParts));
  }
}
