import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcelandicPopulationComponent } from './icelandic-population.component';

describe('IcelandicPopulationComponent', () => {
  let component: IcelandicPopulationComponent;
  let fixture: ComponentFixture<IcelandicPopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcelandicPopulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcelandicPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
