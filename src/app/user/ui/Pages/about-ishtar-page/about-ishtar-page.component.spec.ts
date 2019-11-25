import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutIshtarPageComponent } from './about-ishtar-page.component';

describe('AboutIshtarPageComponent', () => {
  let component: AboutIshtarPageComponent;
  let fixture: ComponentFixture<AboutIshtarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutIshtarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutIshtarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
