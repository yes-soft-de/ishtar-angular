import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtTypeComponent } from './art-type.component';

describe('ArtTypeComponent', () => {
  let component: ArtTypeComponent;
  let fixture: ComponentFixture<ArtTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
