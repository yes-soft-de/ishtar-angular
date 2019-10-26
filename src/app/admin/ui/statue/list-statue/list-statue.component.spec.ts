import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStatueComponent } from './list-statue.component';

describe('ListStatueComponent', () => {
  let component: ListStatueComponent;
  let fixture: ComponentFixture<ListStatueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStatueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStatueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
