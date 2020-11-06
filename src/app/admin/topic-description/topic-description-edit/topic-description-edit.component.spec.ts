import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDescriptionEditComponent } from './topic-description-edit.component';

describe('TopicDescriptionEditComponent', () => {
  let component: TopicDescriptionEditComponent;
  let fixture: ComponentFixture<TopicDescriptionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDescriptionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDescriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
