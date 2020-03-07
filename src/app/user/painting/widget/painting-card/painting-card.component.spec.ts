import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingCardComponent } from './painting-card.component';

describe('PaintingCardComponent', () => {
  let component: PaintingCardComponent;
  let fixture: ComponentFixture<PaintingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
