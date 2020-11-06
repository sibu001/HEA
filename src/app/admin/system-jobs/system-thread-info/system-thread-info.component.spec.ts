import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemThreadInfoComponent } from './system-thread-info.component';

describe('SystemThreadInfoComponent', () => {
  let component: SystemThreadInfoComponent;
  let fixture: ComponentFixture<SystemThreadInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemThreadInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemThreadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
