import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptDebugConsoleComponent } from './script-debug-console.component';

describe('ScriptDebugConsoleComponent', () => {
  let component: ScriptDebugConsoleComponent;
  let fixture: ComponentFixture<ScriptDebugConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptDebugConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptDebugConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
