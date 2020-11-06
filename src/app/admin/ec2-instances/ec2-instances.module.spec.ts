import { Ec2InstancesModule } from './ec2-instances.module';

describe('Ec2InstancesModule', () => {
  let ec2InstancesModule: Ec2InstancesModule;

  beforeEach(() => {
    ec2InstancesModule = new Ec2InstancesModule();
  });

  it('should create an instance', () => {
    expect(ec2InstancesModule).toBeTruthy();
  });
});
