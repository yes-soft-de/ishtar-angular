import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtTypeDetailsComponent } from './art-type-details.component';

describe('ArtTypeDetailsComponent', () => {
  let component: ArtTypeDetailsComponent;
  let fixture: ComponentFixture<ArtTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
