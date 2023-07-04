import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFonctionComponent } from './liste-fonction.component';

describe('ListeFonctionComponent', () => {
  let component: ListeFonctionComponent;
  let fixture: ComponentFixture<ListeFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFonctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
