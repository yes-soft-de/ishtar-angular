import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTransactionsPageComponent } from './pending-transactions-page.component';

describe('PendingTransactionsPageComponent', () => {
  let component: PendingTransactionsPageComponent;
  let fixture: ComponentFixture<PendingTransactionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingTransactionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
