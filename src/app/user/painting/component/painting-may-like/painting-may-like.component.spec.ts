import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingMayLikeComponent } from './painting-may-like.component';

describe('PaintingMayLikeComponent', () => {
  let component: PaintingMayLikeComponent;
  let fixture: ComponentFixture<PaintingMayLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingMayLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingMayLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
