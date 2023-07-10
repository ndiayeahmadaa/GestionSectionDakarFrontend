import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMembreComponent } from './detail-membre.component';

describe('DetailMembreComponent', () => {
  let component: DetailMembreComponent;
  let fixture: ComponentFixture<DetailMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
