import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesPage } from './vaccines.page';

describe('VaccinesPage', () => {
  let component: VaccinesPage;
  let fixture: ComponentFixture<VaccinesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccinesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
