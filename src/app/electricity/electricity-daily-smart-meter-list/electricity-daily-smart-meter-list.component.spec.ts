import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityDailySmartMeterListComponent } from './electricity-daily-smart-meter-list.component';

describe('ElectricityDailySmartMeterListComponent', () => {
  let component: ElectricityDailySmartMeterListComponent;
  let fixture: ComponentFixture<ElectricityDailySmartMeterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricityDailySmartMeterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityDailySmartMeterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
