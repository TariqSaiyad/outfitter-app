import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemsPage } from './search-items.page';

describe('SearchItemsPage', () => {
  let component: SearchItemsPage;
  let fixture: ComponentFixture<SearchItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
