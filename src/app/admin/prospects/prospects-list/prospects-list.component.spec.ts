import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectsListComponent } from './prospects-list.component';

describe('ProspectsListComponent', () => {
  let component: ProspectsListComponent;
  let fixture: ComponentFixture<ProspectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
