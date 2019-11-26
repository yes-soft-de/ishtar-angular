import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingDetailsPageComponent } from './painting-details-page.component';

describe('PaintingDetailsPageComponent', () => {
  let component: PaintingDetailsPageComponent;
  let fixture: ComponentFixture<PaintingDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
