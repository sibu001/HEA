import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDescriptionEditComponent } from './mail-description-edit.component';

describe('MailDescriptionEditComponent', () => {
  let component: MailDescriptionEditComponent;
  let fixture: ComponentFixture<MailDescriptionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailDescriptionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDescriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
