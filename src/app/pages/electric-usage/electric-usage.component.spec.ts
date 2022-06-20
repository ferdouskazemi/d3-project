import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricUsageComponent } from './electric-usage.component';

describe('ElectricUsageComponent', () => {
  let component: ElectricUsageComponent;
  let fixture: ComponentFixture<ElectricUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
