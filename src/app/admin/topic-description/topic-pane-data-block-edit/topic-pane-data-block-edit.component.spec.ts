import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPaneDataBlockEditComponent } from './topic-pane-data-block-edit.component';

describe('TopicPaneDataBlockEditComponent', () => {
  let component: TopicPaneDataBlockEditComponent;
  let fixture: ComponentFixture<TopicPaneDataBlockEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPaneDataBlockEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPaneDataBlockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
