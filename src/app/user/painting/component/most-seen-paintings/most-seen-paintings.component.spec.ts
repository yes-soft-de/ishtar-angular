import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSeenPaintingsComponent } from './most-seen-paintings.component';

describe('MostSeenPaintingsComponent', () => {
  let component: MostSeenPaintingsComponent;
  let fixture: ComponentFixture<MostSeenPaintingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostSeenPaintingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostSeenPaintingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
