import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtTypeDetailsPageComponent } from './art-type-details-page.component';

describe('ArtTypeDetailsPageComponent', () => {
  let component: ArtTypeDetailsPageComponent;
  let fixture: ComponentFixture<ArtTypeDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtTypeDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtTypeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
