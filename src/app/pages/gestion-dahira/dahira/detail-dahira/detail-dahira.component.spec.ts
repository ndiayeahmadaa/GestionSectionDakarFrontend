import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDahiraComponent } from './detail-dahira.component';

describe('DetailDahiraComponent', () => {
  let component: DetailDahiraComponent;
  let fixture: ComponentFixture<DetailDahiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDahiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDahiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
