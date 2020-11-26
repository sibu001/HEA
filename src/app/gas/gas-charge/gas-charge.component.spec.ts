import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasChargeComponent } from './gas-charge.component';

describe('GasChargeComponent', () => {
  let component: GasChargeComponent;
  let fixture: ComponentFixture<GasChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
