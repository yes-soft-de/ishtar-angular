import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveWidgetComponent } from './love-widget.component';

describe('LoveWidgetComponent', () => {
  let component: LoveWidgetComponent;
  let fixture: ComponentFixture<LoveWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoveWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoveWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
