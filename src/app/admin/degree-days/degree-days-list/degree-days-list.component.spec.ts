import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeDaysListComponent } from './degree-days-list.component';

describe('DegreeDaysListComponent', () => {
  let component: DegreeDaysListComponent;
  let fixture: ComponentFixture<DegreeDaysListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeDaysListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeDaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
