import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDialogboxComponent } from './survey-dialogbox.component';

describe('SurveyDialogboxComponent', () => {
  let component: SurveyDialogboxComponent;
  let fixture: ComponentFixture<SurveyDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
