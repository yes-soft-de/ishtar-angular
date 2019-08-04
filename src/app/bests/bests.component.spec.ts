import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsComponent } from './bests.component';

describe('BestsComponent', () => {
  let component: BestsComponent;
  let fixture: ComponentFixture<BestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
