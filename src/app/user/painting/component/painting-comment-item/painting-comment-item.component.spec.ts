import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingCommentItemComponent } from './painting-comment-item.component';

describe('PaintingCommentItemComponent', () => {
  let component: PaintingCommentItemComponent;
  let fixture: ComponentFixture<PaintingCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
