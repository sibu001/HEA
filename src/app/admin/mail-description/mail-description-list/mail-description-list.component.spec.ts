import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDescriptionListComponent } from './mail-description-list.component';

describe('MailDescriptionListComponent', () => {
  let component: MailDescriptionListComponent;
  let fixture: ComponentFixture<MailDescriptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailDescriptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
