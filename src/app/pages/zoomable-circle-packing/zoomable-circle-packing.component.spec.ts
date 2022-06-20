import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomableCirclePackingComponent } from './zoomable-circle-packing.component';

describe('ZoomableCirclePackingComponent', () => {
  let component: ZoomableCirclePackingComponent;
  let fixture: ComponentFixture<ZoomableCirclePackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomableCirclePackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoomableCirclePackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
