import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeaturedImagesComponent } from './edit-featured-images.component';

describe('EditFeaturedImagesComponent', () => {
  let component: EditFeaturedImagesComponent;
  let fixture: ComponentFixture<EditFeaturedImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFeaturedImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeaturedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
