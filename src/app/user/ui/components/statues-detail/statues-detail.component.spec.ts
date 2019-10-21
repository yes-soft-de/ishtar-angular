import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuesDetailComponent } from './statues-detail.component';

describe('StatuesDetailComponent', () => {
  let component: StatuesDetailComponent;
  let fixture: ComponentFixture<StatuesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatuesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatuesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
