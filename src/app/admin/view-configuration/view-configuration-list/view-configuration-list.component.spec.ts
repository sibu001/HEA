import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfigurationListComponent } from './view-configuration-list.component';

describe('ViewConfigurationListComponent', () => {
  let component: ViewConfigurationListComponent;
  let fixture: ComponentFixture<ViewConfigurationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConfigurationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
