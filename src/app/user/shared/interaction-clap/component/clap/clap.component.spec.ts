import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClapComponent } from './clap.component';

describe('ClapComponent', () => {
  let component: ClapComponent;
  let fixture: ComponentFixture<ClapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
