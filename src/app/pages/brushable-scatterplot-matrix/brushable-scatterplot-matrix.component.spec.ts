import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrushableScatterplotMatrixComponent } from './brushable-scatterplot-matrix.component';

describe('BrushableScatterplotMatrixComponent', () => {
  let component: BrushableScatterplotMatrixComponent;
  let fixture: ComponentFixture<BrushableScatterplotMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrushableScatterplotMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrushableScatterplotMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
