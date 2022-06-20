import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterplotTourComponent } from './scatterplot-tour.component';

describe('ScatterplotTourComponent', () => {
  let component: ScatterplotTourComponent;
  let fixture: ComponentFixture<ScatterplotTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterplotTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScatterplotTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
