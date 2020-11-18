import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfigurationAttributesEditComponent } from './view-configuration-attributes-edit.component';

describe('ViewConfigurationAttributesEditComponent', () => {
  let component: ViewConfigurationAttributesEditComponent;
  let fixture: ComponentFixture<ViewConfigurationAttributesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConfigurationAttributesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConfigurationAttributesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
