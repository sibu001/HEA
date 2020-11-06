import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemJobsListComponent } from './system-jobs-list.component';

describe('SystemJobsListComponent', () => {
  let component: SystemJobsListComponent;
  let fixture: ComponentFixture<SystemJobsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemJobsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
