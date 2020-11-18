import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingChartDefinitionSeriesComponent } from './trending-chart-definition-series.component';

describe('TrendingChartDefinitionSeriesComponent', () => {
  let component: TrendingChartDefinitionSeriesComponent;
  let fixture: ComponentFixture<TrendingChartDefinitionSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingChartDefinitionSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingChartDefinitionSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
