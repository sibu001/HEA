import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDescriptionVariableEditComponent } from './topic-description-variable-edit.component';

describe('TopicDescriptionVariableEditComponent', () => {
  let component: TopicDescriptionVariableEditComponent;
  let fixture: ComponentFixture<TopicDescriptionVariableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDescriptionVariableEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDescriptionVariableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
