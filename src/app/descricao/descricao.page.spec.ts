import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoPage } from './descricao.page';

describe('DescricaoPage', () => {
  let component: DescricaoPage;
  let fixture: ComponentFixture<DescricaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescricaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
