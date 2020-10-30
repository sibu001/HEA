import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TableColumnData } from 'src/app/data/common-data';
import { TABLECOLUMN } from 'src/app/interface/table-column.interface';

@Component({
  selector: 'app-weather-station-list',
  templateUrl: './weather-station-list.component.html',
  styleUrls: ['./weather-station-list.component.css']
})
export class WeatherStationListComponent implements OnInit {

  id: any;
  public keys: Array<TABLECOLUMN>;
  public dataSource: any;
  public totalElement = 0;
  public weatherStationData = {
    content: [],
    totalElements: 0,
  };
  weatherStationForm: FormGroup = this.fb.group({
    stationId: [''],
    stationName: ['']
  });
  constructor(public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    document.getElementById('loader').classList.remove('loading');
    this.keys = TableColumnData.WEATHER_STATION_KEYS;
    this.findWeatherStation();
  }

  findWeatherStation(event?: any): any {

  }

  goToEditWeatherStation(event: any): any {
    this.router.navigate(['/admin/weatherStation/weatherStationEdit'], { queryParams: { 'id': event.id } });
  }

  addWeatherStation(): any {
    this.router.navigate(['/admin/weatherStation/weatherStationEdit']);
  }
}
