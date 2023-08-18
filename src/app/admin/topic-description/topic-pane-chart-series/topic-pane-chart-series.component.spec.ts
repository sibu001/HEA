import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPaneChartSeriesComponent } from './topic-pane-chart-series.component';

describe('TopicPaneChartSeriesComponent', () => {
  let component: TopicPaneChartSeriesComponent;
  let fixture: ComponentFixture<TopicPaneChartSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPaneChartSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPaneChartSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
