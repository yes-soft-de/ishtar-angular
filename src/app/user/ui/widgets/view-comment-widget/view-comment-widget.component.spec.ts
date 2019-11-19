import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommentWidgetComponent } from './view-comment-widget.component';

describe('ViewCommentWidgetComponent', () => {
  let component: ViewCommentWidgetComponent;
  let fixture: ComponentFixture<ViewCommentWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommentWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommentWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
