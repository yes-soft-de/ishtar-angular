import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistKnowledgeComponent } from './artist-knowledge.component';

describe('ArtistKnowledgeComponent', () => {
  let component: ArtistKnowledgeComponent;
  let fixture: ComponentFixture<ArtistKnowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistKnowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
