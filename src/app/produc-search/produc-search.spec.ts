import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducSearch } from './produc-search';

describe('ProducSearch', () => {
  let component: ProducSearch;
  let fixture: ComponentFixture<ProducSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
