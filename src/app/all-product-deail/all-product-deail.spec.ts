import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductDeail } from './all-product-deail';

describe('AllProductDeail', () => {
  let component: AllProductDeail;
  let fixture: ComponentFixture<AllProductDeail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductDeail],
    }).compileComponents();

    fixture = TestBed.createComponent(AllProductDeail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
