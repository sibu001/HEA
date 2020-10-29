import { CustomerComparisonGroupsModule } from './customer-comparison-groups.module';

describe('CustomerComparisonGroupsModule', () => {
  let customerComparisonGroupsModule: CustomerComparisonGroupsModule;

  beforeEach(() => {
    customerComparisonGroupsModule = new CustomerComparisonGroupsModule();
  });

  it('should create an instance', () => {
    expect(customerComparisonGroupsModule).toBeTruthy();
  });
});
