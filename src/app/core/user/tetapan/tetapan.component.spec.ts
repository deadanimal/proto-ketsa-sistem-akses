import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetapanComponent } from './tetapan.component';

describe('TetapanComponent', () => {
  let component: TetapanComponent;
  let fixture: ComponentFixture<TetapanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetapanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetapanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
