import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutOuModifierDahiraComponent } from './ajout-ou-modifier-dahira.component';

describe('AjoutOuModifierDahiraComponent', () => {
  let component: AjoutOuModifierDahiraComponent;
  let fixture: ComponentFixture<AjoutOuModifierDahiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutOuModifierDahiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutOuModifierDahiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
