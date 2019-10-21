import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingWidgetComponent } from './loading-widget.component';

describe('LoadingWidgetComponent', () => {
  let component: LoadingWidgetComponent;
  let fixture: ComponentFixture<LoadingWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
