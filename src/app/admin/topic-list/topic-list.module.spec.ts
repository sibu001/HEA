import { TopicListModule } from './topic-list.module';

describe('TopicListModule', () => {
  let topicListModule: TopicListModule;

  beforeEach(() => {
    topicListModule = new TopicListModule();
  });

  it('should create an instance', () => {
    expect(topicListModule).toBeTruthy();
  });
});
