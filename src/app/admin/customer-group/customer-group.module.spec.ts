import { CustomerGroupModule } from './customer-group.module';

describe('CustomerGroupModule', () => {
  let customerGroupModule: CustomerGroupModule;

  beforeEach(() => {
    customerGroupModule = new CustomerGroupModule();
  });

  it('should create an instance', () => {
    expect(customerGroupModule).toBeTruthy();
  });
});
