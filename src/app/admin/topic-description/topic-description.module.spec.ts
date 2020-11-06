import { TopicDescriptionModule } from './topic-description.module';

describe('TopicDescriptionModule', () => {
  let topicDescriptionModule: TopicDescriptionModule;

  beforeEach(() => {
    topicDescriptionModule = new TopicDescriptionModule();
  });

  it('should create an instance', () => {
    expect(topicDescriptionModule).toBeTruthy();
  });
});
