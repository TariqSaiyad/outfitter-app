import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitsPage } from './outfits.page';

describe('OutfitsPage', () => {
  let component: OutfitsPage;
  let fixture: ComponentFixture<OutfitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
