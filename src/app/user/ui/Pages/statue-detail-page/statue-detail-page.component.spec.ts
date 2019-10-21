import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatueDetailPageComponent } from './statue-detail-page.component';

describe('StatueDetailPageComponent', () => {
  let component: StatueDetailPageComponent;
  let fixture: ComponentFixture<StatueDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatueDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatueDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
