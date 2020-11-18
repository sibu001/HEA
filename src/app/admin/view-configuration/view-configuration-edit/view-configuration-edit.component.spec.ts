import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfigurationEditComponent } from './view-configuration-edit.component';

describe('ViewConfigurationEditComponent', () => {
  let component: ViewConfigurationEditComponent;
  let fixture: ComponentFixture<ViewConfigurationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConfigurationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
