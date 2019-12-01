import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatueCommentComponent } from './statue-comment.component';

describe('StatueCommentComponent', () => {
  let component: StatueCommentComponent;
  let fixture: ComponentFixture<StatueCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatueCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatueCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
