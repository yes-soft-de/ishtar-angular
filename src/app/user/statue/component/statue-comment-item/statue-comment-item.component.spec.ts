import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatueCommentItemComponent } from './statue-comment-item.component';

describe('StatueCommentItemComponent', () => {
  let component: StatueCommentItemComponent;
  let fixture: ComponentFixture<StatueCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatueCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatueCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
