import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderImageCardComponent } from './order-image-card.component';

describe('OrderImageCardComponent', () => {
  let component: OrderImageCardComponent;
  let fixture: ComponentFixture<OrderImageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderImageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
