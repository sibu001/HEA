import { AlertMessagesModule } from './alert-messages.module';

describe('AlertMessagesModule', () => {
  let alertMessagesModule: AlertMessagesModule;

  beforeEach(() => {
    alertMessagesModule = new AlertMessagesModule();
  });

  it('should create an instance', () => {
    expect(alertMessagesModule).toBeTruthy();
  });
});
