import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPaneReportsEditComponent } from './topic-pane-reports-edit.component';

describe('TopicPaneReportsEditComponent', () => {
  let component: TopicPaneReportsEditComponent;
  let fixture: ComponentFixture<TopicPaneReportsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPaneReportsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPaneReportsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
