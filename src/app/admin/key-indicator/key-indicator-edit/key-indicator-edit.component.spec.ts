import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyIndicatorEditComponent } from './key-indicator-edit.component';

describe('KeyIndicatorEditComponent', () => {
  let component: KeyIndicatorEditComponent;
  let fixture: ComponentFixture<KeyIndicatorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyIndicatorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyIndicatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
