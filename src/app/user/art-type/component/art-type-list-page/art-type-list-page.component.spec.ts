import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtTypeListPageComponent } from './art-type-list-page.component';

describe('ArtTypeListPageComponent', () => {
  let component: ArtTypeListPageComponent;
  let fixture: ComponentFixture<ArtTypeListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtTypeListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtTypeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
