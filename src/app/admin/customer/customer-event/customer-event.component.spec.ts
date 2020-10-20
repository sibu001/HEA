import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEventComponent } from './customer-event.component';

describe('CustomerEventComponent', () => {
  let component: CustomerEventComponent;
  let fixture: ComponentFixture<CustomerEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
