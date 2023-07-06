import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSectionComponent } from './liste-section.component';

describe('ListeSectionComponent', () => {
  let component: ListeSectionComponent;
  let fixture: ComponentFixture<ListeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
