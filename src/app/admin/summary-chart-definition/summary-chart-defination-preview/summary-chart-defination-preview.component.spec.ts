import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryChartDefinationPreviewComponent } from './summary-chart-defination-preview.component';

describe('SummaryChartDefinationPreviewComponent', () => {
  let component: SummaryChartDefinationPreviewComponent;
  let fixture: ComponentFixture<SummaryChartDefinationPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryChartDefinationPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryChartDefinationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
