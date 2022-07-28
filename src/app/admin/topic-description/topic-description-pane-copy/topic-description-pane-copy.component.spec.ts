import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDescriptionPaneCopyComponent } from './topic-description-pane-copy.component';

describe('TopicDescriptionPaneCopyComponent', () => {
  let component: TopicDescriptionPaneCopyComponent;
  let fixture: ComponentFixture<TopicDescriptionPaneCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDescriptionPaneCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDescriptionPaneCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
