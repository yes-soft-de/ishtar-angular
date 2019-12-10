import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtTypeListComponent } from './art-type-list.component';

describe('ArtTypeListComponent', () => {
  let component: ArtTypeListComponent;
  let fixture: ComponentFixture<ArtTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
