import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatueDetailsPageComponent } from './statue-details-page.component';

describe('StatueDetailsPageComponent', () => {
  let component: StatueDetailsPageComponent;
  let fixture: ComponentFixture<StatueDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatueDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatueDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
