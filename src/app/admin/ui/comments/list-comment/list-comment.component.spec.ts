import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommentComponent } from './list-comment.component';

describe('ListCommentComponent', () => {
  let component: ListCommentComponent;
  let fixture: ComponentFixture<ListCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
