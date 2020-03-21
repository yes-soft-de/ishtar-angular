import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTransactionPageComponent } from './pending-transaction-page.component';

describe('PendingTransactionPageComponent', () => {
  let component: PendingTransactionPageComponent;
  let fixture: ComponentFixture<PendingTransactionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingTransactionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
