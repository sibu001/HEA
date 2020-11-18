import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSmartMeterComponent } from './water-smart-meter.component';

describe('WaterSmartMeterComponent', () => {
  let component: WaterSmartMeterComponent;
  let fixture: ComponentFixture<WaterSmartMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterSmartMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterSmartMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
