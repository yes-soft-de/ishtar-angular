import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatueComponent } from './statue.component';

describe('StatueComponent', () => {
  let component: StatueComponent;
  let fixture: ComponentFixture<StatueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
