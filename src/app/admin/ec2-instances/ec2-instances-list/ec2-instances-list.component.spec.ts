import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2InstancesListComponent } from './ec2-instances-list.component';

describe('Ec2InstancesListComponent', () => {
  let component: Ec2InstancesListComponent;
  let fixture: ComponentFixture<Ec2InstancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ec2InstancesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ec2InstancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
