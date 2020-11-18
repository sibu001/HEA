import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareMyDataListComponent } from './share-my-data-list.component';

describe('ShareMyDataListComponent', () => {
  let component: ShareMyDataListComponent;
  let fixture: ComponentFixture<ShareMyDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareMyDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareMyDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
