import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDescriptionPreviewComponent } from './mail-description-preview.component';

describe('MailDescriptionPreviewComponent', () => {
  let component: MailDescriptionPreviewComponent;
  let fixture: ComponentFixture<MailDescriptionPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailDescriptionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDescriptionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
