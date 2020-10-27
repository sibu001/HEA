import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodeEditComponent } from './zip-code-edit.component';

describe('ZipCodeEditComponent', () => {
  let component: ZipCodeEditComponent;
  let fixture: ComponentFixture<ZipCodeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipCodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
