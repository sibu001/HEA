import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfigurationAttributesComponent } from './view-configuration-attributes.component';

describe('ViewConfigurationAttributesComponent', () => {
  let component: ViewConfigurationAttributesComponent;
  let fixture: ComponentFixture<ViewConfigurationAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConfigurationAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConfigurationAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
