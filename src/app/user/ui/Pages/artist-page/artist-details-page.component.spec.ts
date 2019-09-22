import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDetailsPageComponent } from './artist-details-page.component';

describe('ArtistDetailsPage', () => {
  let component: ArtistDetailsPageComponent;
  let fixture: ComponentFixture<ArtistDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
