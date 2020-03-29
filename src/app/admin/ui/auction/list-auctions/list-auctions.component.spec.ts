import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuctionsComponent } from './list-auctions.component';

describe('ListAuctionsComponent', () => {
  let component: ListAuctionsComponent;
  let fixture: ComponentFixture<ListAuctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAuctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
