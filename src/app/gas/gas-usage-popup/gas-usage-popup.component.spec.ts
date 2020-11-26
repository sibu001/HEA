import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasUsagePopupComponent } from './gas-usage-popup.component';

describe('GasUsagePopupComponent', () => {
  let component: GasUsagePopupComponent;
  let fixture: ComponentFixture<GasUsagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasUsagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasUsagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
