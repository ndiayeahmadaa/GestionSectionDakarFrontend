import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMembreComponent } from './import-membre.component';

describe('ImportMembreComponent', () => {
  let component: ImportMembreComponent;
  let fixture: ComponentFixture<ImportMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
