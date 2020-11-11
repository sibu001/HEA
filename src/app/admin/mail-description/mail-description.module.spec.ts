import { MailDescriptionModule } from './mail-description.module';

describe('MailDescriptionModule', () => {
  let mailDescriptionModule: MailDescriptionModule;

  beforeEach(() => {
    mailDescriptionModule = new MailDescriptionModule();
  });

  it('should create an instance', () => {
    expect(mailDescriptionModule).toBeTruthy();
  });
});
