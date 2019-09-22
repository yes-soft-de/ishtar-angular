import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuctionSectionComponent } from './home-auction-section.component';

describe('HomeAuctionSectionComponent', () => {
  let component: HomeAuctionSectionComponent;
  let fixture: ComponentFixture<HomeAuctionSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAuctionSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAuctionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
