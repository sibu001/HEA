import { ShareMyDataModule } from './share-my-data.module';

describe('ShareMyDataModule', () => {
  let shareMyDataModule: ShareMyDataModule;

  beforeEach(() => {
    shareMyDataModule = new ShareMyDataModule();
  });

  it('should create an instance', () => {
    expect(shareMyDataModule).toBeTruthy();
  });
});
