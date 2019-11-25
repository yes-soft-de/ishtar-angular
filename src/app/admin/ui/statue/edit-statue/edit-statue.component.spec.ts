import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatueComponent } from './edit-statue.component';

describe('EditStatueComponent', () => {
  let component: EditStatueComponent;
  let fixture: ComponentFixture<EditStatueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStatueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
