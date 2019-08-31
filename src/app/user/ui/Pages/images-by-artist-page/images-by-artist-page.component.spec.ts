import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesByArtistPageComponent } from './images-by-artist-page.component';

describe('ImagesByArtistPageComponent', () => {
  let component: ImagesByArtistPageComponent;
  let fixture: ComponentFixture<ImagesByArtistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesByArtistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesByArtistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
