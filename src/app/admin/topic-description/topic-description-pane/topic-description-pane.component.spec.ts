import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDescriptionPaneComponent } from './topic-description-pane.component';

describe('TopicDescriptionPaneComponent', () => {
  let component: TopicDescriptionPaneComponent;
  let fixture: ComponentFixture<TopicDescriptionPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDescriptionPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDescriptionPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
