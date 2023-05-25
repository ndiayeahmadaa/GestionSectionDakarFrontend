import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFonctionComponent } from './add-update-fonction.component';

describe('AddUpdateFonctionComponent', () => {
  let component: AddUpdateFonctionComponent;
  let fixture: ComponentFixture<AddUpdateFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateFonctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
