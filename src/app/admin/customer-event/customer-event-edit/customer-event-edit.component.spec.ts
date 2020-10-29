import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEventEditComponent } from './customer-event-edit.component';

describe('CustomerEventEditComponent', () => {
  let component: CustomerEventEditComponent;
  let fixture: ComponentFixture<CustomerEventEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEventEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
