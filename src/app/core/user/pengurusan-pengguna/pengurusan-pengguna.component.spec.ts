import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengurusanPenggunaComponent } from './pengurusan-pengguna.component';

describe('PengurusanPenggunaComponent', () => {
  let component: PengurusanPenggunaComponent;
  let fixture: ComponentFixture<PengurusanPenggunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengurusanPenggunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengurusanPenggunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
