import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowWidgetComponent } from './follow-widget.component';

describe('FollowWidgetComponent', () => {
  let component: FollowWidgetComponent;
  let fixture: ComponentFixture<FollowWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
