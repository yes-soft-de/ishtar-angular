import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCommentComponent } from './artist-comment.component';

describe('ArtistCommentComponent', () => {
  let component: ArtistCommentComponent;
  let fixture: ComponentFixture<ArtistCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
