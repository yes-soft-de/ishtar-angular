import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDetailsComponent } from './artist-details.component';

describe('ArtistDetailsComponent', () => {
  let component: ArtistDetailsComponent;
  let fixture: ComponentFixture<ArtistDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
