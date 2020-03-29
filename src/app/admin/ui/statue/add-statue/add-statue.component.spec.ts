import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatueComponent } from './add-statue.component';

describe('AddStatueComponent', () => {
  let component: AddStatueComponent;
  let fixture: ComponentFixture<AddStatueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
