import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DahiraComponent } from './dahira.component';

describe('DahiraComponent', () => {
  let component: DahiraComponent;
  let fixture: ComponentFixture<DahiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DahiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DahiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
