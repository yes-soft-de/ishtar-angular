import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingSearchComponent } from './painting-search.component';

describe('PaintingSearchComponent', () => {
  let component: PaintingSearchComponent;
  let fixture: ComponentFixture<PaintingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
