import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAlertTypeListComponent } from './customer-alert-type-list.component';

describe('CustomerAlertTypeListComponent', () => {
  let component: CustomerAlertTypeListComponent;
  let fixture: ComponentFixture<CustomerAlertTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAlertTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAlertTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
