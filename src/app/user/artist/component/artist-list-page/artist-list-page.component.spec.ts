import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListPageComponent } from './artist-list-page.component';

describe('ArtistListPageComponent', () => {
  let component: ArtistListPageComponent;
  let fixture: ComponentFixture<ArtistListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
