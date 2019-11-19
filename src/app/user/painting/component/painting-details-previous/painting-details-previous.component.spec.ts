import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingDetailsPreviousComponent } from './painting-details-previous.component';

describe('PaintingDetailsPreviousComponent', () => {
  let component: PaintingDetailsPreviousComponent;
  let fixture: ComponentFixture<PaintingDetailsPreviousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingDetailsPreviousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingDetailsPreviousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
