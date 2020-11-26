import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasSmartMeterComponent } from './gas-smart-meter.component';

describe('GasSmartMeterComponent', () => {
  let component: GasSmartMeterComponent;
  let fixture: ComponentFixture<GasSmartMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasSmartMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasSmartMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
