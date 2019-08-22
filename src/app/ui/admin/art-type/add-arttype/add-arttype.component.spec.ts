import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArttypeComponent } from './add-arttype.component';

describe('AddArttypeComponent', () => {
  let component: AddArttypeComponent;
  let fixture: ComponentFixture<AddArttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
