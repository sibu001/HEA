import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyIndicatorVariableComponent } from './key-indicator-variable.component';

describe('KeyIndicatorVariableComponent', () => {
  let component: KeyIndicatorVariableComponent;
  let fixture: ComponentFixture<KeyIndicatorVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyIndicatorVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyIndicatorVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
