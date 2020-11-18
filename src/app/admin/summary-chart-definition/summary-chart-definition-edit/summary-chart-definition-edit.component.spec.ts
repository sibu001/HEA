import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryChartDefinitionEditComponent } from './summary-chart-definition-edit.component';

describe('SummaryChartDefinitionEditComponent', () => {
  let component: SummaryChartDefinitionEditComponent;
  let fixture: ComponentFixture<SummaryChartDefinitionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryChartDefinitionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryChartDefinitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
