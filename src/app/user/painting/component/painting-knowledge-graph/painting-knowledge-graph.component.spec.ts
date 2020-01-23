import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingKnowledgeGraphComponent } from './painting-knowledge-graph.component';

describe('PaintingKnowledgeGraphComponent', () => {
  let component: PaintingKnowledgeGraphComponent;
  let fixture: ComponentFixture<PaintingKnowledgeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingKnowledgeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingKnowledgeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
