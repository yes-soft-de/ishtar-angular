import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateStatueComponent } from './translate-statue.component';

describe('TranslateStatueComponent', () => {
  let component: TranslateStatueComponent;
  let fixture: ComponentFixture<TranslateStatueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateStatueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateStatueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
