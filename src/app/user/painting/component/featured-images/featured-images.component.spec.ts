import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedImagesComponent } from './featured-images.component';

describe('FeaturedImagesComponent', () => {
  let component: FeaturedImagesComponent;
  let fixture: ComponentFixture<FeaturedImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
