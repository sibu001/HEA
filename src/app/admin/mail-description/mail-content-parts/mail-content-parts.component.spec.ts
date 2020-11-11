import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailContentPartsComponent } from './mail-content-parts.component';

describe('MailContentPartsComponent', () => {
  let component: MailContentPartsComponent;
  let fixture: ComponentFixture<MailContentPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailContentPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailContentPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
