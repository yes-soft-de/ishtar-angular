import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TOSPageComponent } from './tospage.component';

describe('TOSPageComponent', () => {
  let component: TOSPageComponent;
  let fixture: ComponentFixture<TOSPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TOSPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TOSPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
