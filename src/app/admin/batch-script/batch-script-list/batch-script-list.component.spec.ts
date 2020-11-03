import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchScriptListComponent } from './batch-script-list.component';

describe('BatchScriptListComponent', () => {
  let component: BatchScriptListComponent;
  let fixture: ComponentFixture<BatchScriptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchScriptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchScriptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
