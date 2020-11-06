import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPaneDataFieldEditComponent } from './topic-pane-data-field-edit.component';

describe('TopicPaneDataFieldEditComponent', () => {
  let component: TopicPaneDataFieldEditComponent;
  let fixture: ComponentFixture<TopicPaneDataFieldEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPaneDataFieldEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPaneDataFieldEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
