import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsPagesEditComponent } from './js-pages-edit.component';

describe('JsPagesEditComponent', () => {
  let component: JsPagesEditComponent;
  let fixture: ComponentFixture<JsPagesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsPagesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsPagesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
