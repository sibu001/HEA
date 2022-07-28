import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDescriptionEditCopyComponent } from './topic-description-edit-copy.component';

describe('TopicDescriptionEditCopyComponent', () => {
  let component: TopicDescriptionEditCopyComponent;
  let fixture: ComponentFixture<TopicDescriptionEditCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDescriptionEditCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDescriptionEditCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
