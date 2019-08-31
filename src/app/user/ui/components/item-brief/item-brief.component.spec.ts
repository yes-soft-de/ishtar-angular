import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBriefComponent } from './item-brief.component';

describe('ItemBriefComponent', () => {
  let component: ItemBriefComponent;
  let fixture: ComponentFixture<ItemBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
