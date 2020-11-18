import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingChartEditComponent } from './trending-chart-edit.component';

describe('TrendingChartEditComponent', () => {
  let component: TrendingChartEditComponent;
  let fixture: ComponentFixture<TrendingChartEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingChartEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingChartEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
