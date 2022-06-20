import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalmartsGrowthComponent } from './walmarts-growth.component';

describe('WalmartsGrowthComponent', () => {
  let component: WalmartsGrowthComponent;
  let fixture: ComponentFixture<WalmartsGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalmartsGrowthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalmartsGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
