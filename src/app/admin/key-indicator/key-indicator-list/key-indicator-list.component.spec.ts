import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyIndicatorListComponent } from './key-indicator-list.component';

describe('KeyIndicatorListComponent', () => {
  let component: KeyIndicatorListComponent;
  let fixture: ComponentFixture<KeyIndicatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyIndicatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyIndicatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
