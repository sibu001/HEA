import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherStationEditComponent } from './weather-station-edit.component';

describe('WeatherStationEditComponent', () => {
  let component: WeatherStationEditComponent;
  let fixture: ComponentFixture<WeatherStationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherStationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
