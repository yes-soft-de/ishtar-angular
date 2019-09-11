import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtTypePageComponent } from './art-type-page.component';

describe('ArtTypePageComponent', () => {
  let component: ArtTypePageComponent;
  let fixture: ComponentFixture<ArtTypePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtTypePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
