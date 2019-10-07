import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProcessingPageComponent } from './data-processing-page.component';

describe('DataProcessingPageComponent', () => {
  let component: DataProcessingPageComponent;
  let fixture: ComponentFixture<DataProcessingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProcessingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProcessingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
