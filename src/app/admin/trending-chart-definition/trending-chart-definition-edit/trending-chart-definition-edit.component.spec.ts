import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingChartDefinitionEditComponent } from './trending-chart-definition-edit.component';

describe('TrendingChartDefinitionEditComponent', () => {
  let component: TrendingChartDefinitionEditComponent;
  let fixture: ComponentFixture<TrendingChartDefinitionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingChartDefinitionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingChartDefinitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
