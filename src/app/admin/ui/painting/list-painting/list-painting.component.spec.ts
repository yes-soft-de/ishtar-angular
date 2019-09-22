import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaintingComponent } from './list-painting.component';

describe('ListPaintingComponent', () => {
  let component: ListPaintingComponent;
  let fixture: ComponentFixture<ListPaintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPaintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
