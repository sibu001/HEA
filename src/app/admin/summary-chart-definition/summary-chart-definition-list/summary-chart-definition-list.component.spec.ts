import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryChartDefinitionListComponent } from './summary-chart-definition-list.component';

describe('SummaryChartDefinitionListComponent', () => {
  let component: SummaryChartDefinitionListComponent;
  let fixture: ComponentFixture<SummaryChartDefinitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryChartDefinitionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryChartDefinitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
