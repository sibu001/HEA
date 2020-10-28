import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEventTypeComponent } from './customer-event-type.component';

describe('CustomerEventTypeComponent', () => {
  let component: CustomerEventTypeComponent;
  let fixture: ComponentFixture<CustomerEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
