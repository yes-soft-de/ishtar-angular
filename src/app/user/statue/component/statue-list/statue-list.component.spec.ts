import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatueListComponent } from './statue-list.component';

describe('StatueListComponent', () => {
  let component: StatueListComponent;
  let fixture: ComponentFixture<StatueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
