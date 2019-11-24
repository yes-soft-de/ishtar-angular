import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPaintingsComponent } from './artist-paintings.component';

describe('ArtistPaintingsComponent', () => {
  let component: ArtistPaintingsComponent;
  let fixture: ComponentFixture<ArtistPaintingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistPaintingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistPaintingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
