import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldHistoryTimelineComponent } from './world-history-timeline.component';

describe('WorldHistoryTimelineComponent', () => {
  let component: WorldHistoryTimelineComponent;
  let fixture: ComponentFixture<WorldHistoryTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldHistoryTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldHistoryTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
