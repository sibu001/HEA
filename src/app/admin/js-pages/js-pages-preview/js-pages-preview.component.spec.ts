import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsPagesPreviewComponent } from './js-pages-preview.component';

describe('JsPagesPreviewComponent', () => {
  let component: JsPagesPreviewComponent;
  let fixture: ComponentFixture<JsPagesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsPagesPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsPagesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
