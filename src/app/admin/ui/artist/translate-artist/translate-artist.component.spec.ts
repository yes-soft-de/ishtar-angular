import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateArtistComponent } from './translate-artist.component';

describe('TranslateArtistComponent', () => {
  let component: TranslateArtistComponent;
  let fixture: ComponentFixture<TranslateArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
