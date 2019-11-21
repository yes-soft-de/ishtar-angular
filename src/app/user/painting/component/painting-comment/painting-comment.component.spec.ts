import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingCommentComponent } from './painting-comment.component';

describe('BaseCommentComponent', () => {
  let component: PaintingCommentComponent;
  let fixture: ComponentFixture<PaintingCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
