import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaintingComponent } from './edit-painting.component';

describe('EditPaintingComponent', () => {
  let component: EditPaintingComponent;
  let fixture: ComponentFixture<EditPaintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
