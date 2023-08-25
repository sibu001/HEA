import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryChartDefinationCopyComponent } from './summary-chart-defination-copy.component';

describe('SummaryChartDefinationCopyComponent', () => {
  let component: SummaryChartDefinationCopyComponent;
  let fixture: ComponentFixture<SummaryChartDefinationCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryChartDefinationCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryChartDefinationCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
