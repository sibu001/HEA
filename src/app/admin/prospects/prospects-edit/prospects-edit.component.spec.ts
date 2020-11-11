import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectsEditComponent } from './prospects-edit.component';

describe('ProspectsEditComponent', () => {
  let component: ProspectsEditComponent;
  let fixture: ComponentFixture<ProspectsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
