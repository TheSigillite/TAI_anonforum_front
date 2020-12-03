import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActionComponent } from './movie-action.component';

describe('MovieActionComponent', () => {
  let component: MovieActionComponent;
  let fixture: ComponentFixture<MovieActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
