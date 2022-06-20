import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallelSetsComponent } from './parallel-sets.component';

describe('ParallelSetsComponent', () => {
  let component: ParallelSetsComponent;
  let fixture: ComponentFixture<ParallelSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParallelSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallelSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
