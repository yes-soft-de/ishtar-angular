import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatueDetailsComponent } from './statue-details.component';

describe('StatueDetailsComponent', () => {
  let component: StatueDetailsComponent;
  let fixture: ComponentFixture<StatueDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatueDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
