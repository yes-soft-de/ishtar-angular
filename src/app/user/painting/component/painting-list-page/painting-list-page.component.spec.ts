import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingListPageComponent } from './painting-list-page.component';

describe('PaintingListPageComponent', () => {
  let component: PaintingListPageComponent;
  let fixture: ComponentFixture<PaintingListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
