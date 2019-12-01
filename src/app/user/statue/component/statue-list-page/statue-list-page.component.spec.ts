import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatueListPageComponent } from './statue-list-page.component';

describe('StatueListPageComponent', () => {
  let component: StatueListPageComponent;
  let fixture: ComponentFixture<StatueListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatueListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatueListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
