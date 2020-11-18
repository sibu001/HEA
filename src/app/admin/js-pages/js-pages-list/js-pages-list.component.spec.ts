import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsPagesListComponent } from './js-pages-list.component';

describe('JsPagesListComponent', () => {
  let component: JsPagesListComponent;
  let fixture: ComponentFixture<JsPagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsPagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsPagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
