import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAlertComponent } from './customer-alert.component';

describe('CustomerAlertComponent', () => {
  let component: CustomerAlertComponent;
  let fixture: ComponentFixture<CustomerAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
