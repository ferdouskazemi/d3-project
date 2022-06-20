import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamgraphTransitionsComponent } from './streamgraph-transitions.component';

describe('StreamgraphTransitionsComponent', () => {
  let component: StreamgraphTransitionsComponent;
  let fixture: ComponentFixture<StreamgraphTransitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamgraphTransitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamgraphTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
