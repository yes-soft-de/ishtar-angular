import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDetailsPage } from './artist-details-page.component';

describe('ArtistDetailsPage', () => {
  let component: ArtistDetailsPage;
  let fixture: ComponentFixture<ArtistDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistDetailsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
