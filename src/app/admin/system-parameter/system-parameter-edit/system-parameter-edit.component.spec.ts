import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemParameterEditComponent } from './system-parameter-edit.component';


describe('SystemParameterEditComponent', () => {
  let component: SystemParameterEditComponent;
  let fixture: ComponentFixture<SystemParameterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemParameterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemParameterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
