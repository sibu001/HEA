import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAlertTypeEditComponent } from './customer-alert-type-edit.component';

describe('CustomerAlertTypeEditComponent', () => {
  let component: CustomerAlertTypeEditComponent;
  let fixture: ComponentFixture<CustomerAlertTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAlertTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAlertTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
