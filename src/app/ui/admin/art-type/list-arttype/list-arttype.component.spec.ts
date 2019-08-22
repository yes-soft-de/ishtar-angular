import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArttypeComponent } from './list-arttype.component';

describe('ListArttypeComponent', () => {
  let component: ListArttypeComponent;
  let fixture: ComponentFixture<ListArttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
