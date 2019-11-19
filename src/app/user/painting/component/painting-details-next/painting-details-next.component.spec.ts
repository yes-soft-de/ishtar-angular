import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingDetailsNextComponent } from './painting-details-next.component';

describe('PaintingDetailsNextComponent', () => {
  let component: PaintingDetailsNextComponent;
  let fixture: ComponentFixture<PaintingDetailsNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingDetailsNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingDetailsNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
