import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternatingListComponent } from './alternating-list.component';

describe('AlternatingListComponent', () => {
  let component: AlternatingListComponent;
  let fixture: ComponentFixture<AlternatingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternatingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
