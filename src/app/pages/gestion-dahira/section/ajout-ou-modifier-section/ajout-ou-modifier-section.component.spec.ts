import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutOuModifierSectionComponent } from './ajout-ou-modifier-section.component';

describe('AjoutOuModifierSectionComponent', () => {
  let component: AjoutOuModifierSectionComponent;
  let fixture: ComponentFixture<AjoutOuModifierSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutOuModifierSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutOuModifierSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
