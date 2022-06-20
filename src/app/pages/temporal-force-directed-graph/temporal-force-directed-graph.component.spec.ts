import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalForceDirectedGraphComponent } from './temporal-force-directed-graph.component';

describe('TemporalForceDirectedGraphComponent', () => {
  let component: TemporalForceDirectedGraphComponent;
  let fixture: ComponentFixture<TemporalForceDirectedGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporalForceDirectedGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporalForceDirectedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
