import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDescriptionRecommendationEditComponent } from './topic-description-recommendation-edit.component';

describe('TopicDescriptionRecommendationEditComponent', () => {
  let component: TopicDescriptionRecommendationEditComponent;
  let fixture: ComponentFixture<TopicDescriptionRecommendationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDescriptionRecommendationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDescriptionRecommendationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
