import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartRaceComponent } from './bar-chart-race.component';

describe('BarChartRaceComponent', () => {
  let component: BarChartRaceComponent;
  let fixture: ComponentFixture<BarChartRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartRaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
