import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheWealthHealthOfNationsComponent } from './the-wealth-health-of-nations.component';

describe('TheWealthHealthOfNationsComponent', () => {
  let component: TheWealthHealthOfNationsComponent;
  let fixture: ComponentFixture<TheWealthHealthOfNationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheWealthHealthOfNationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheWealthHealthOfNationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
