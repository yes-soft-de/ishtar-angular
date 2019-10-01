import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClapWidgetComponent } from './clap-widget.component';

describe('ClapWidgetComponent', () => {
  let component: ClapWidgetComponent;
  let fixture: ComponentFixture<ClapWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClapWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClapWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
