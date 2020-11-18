import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingChartDefinitionListComponent } from './trending-chart-definition-list.component';

describe('TrendingChartDefinitionListComponent', () => {
  let component: TrendingChartDefinitionListComponent;
  let fixture: ComponentFixture<TrendingChartDefinitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingChartDefinitionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingChartDefinitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
