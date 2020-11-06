import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPaneChartsEditComponent } from './topic-pane-charts-edit.component';

describe('TopicPaneChartsEditComponent', () => {
  let component: TopicPaneChartsEditComponent;
  let fixture: ComponentFixture<TopicPaneChartsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPaneChartsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPaneChartsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
