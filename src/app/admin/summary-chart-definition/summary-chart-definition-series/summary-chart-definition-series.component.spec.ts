import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryChartDefinitionSeriesComponent } from './summary-chart-definition-series.component';

describe('SummaryChartDefinitionSeriesComponent', () => {
  let component: SummaryChartDefinitionSeriesComponent;
  let fixture: ComponentFixture<SummaryChartDefinitionSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryChartDefinitionSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryChartDefinitionSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
