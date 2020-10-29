import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEventListComponent } from './customer-event-list.component';

describe('CustomerEventListComponent', () => {
  let component: CustomerEventListComponent;
  let fixture: ComponentFixture<CustomerEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerEventListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
