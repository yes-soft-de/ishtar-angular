import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatePaintingComponent } from './translate-painting.component';

describe('TranslatePaintingComponent', () => {
  let component: TranslatePaintingComponent;
  let fixture: ComponentFixture<TranslatePaintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatePaintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatePaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
