import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchScriptEditComponent } from './batch-script-edit.component';

describe('BatchScriptEditComponent', () => {
  let component: BatchScriptEditComponent;
  let fixture: ComponentFixture<BatchScriptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchScriptEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchScriptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
