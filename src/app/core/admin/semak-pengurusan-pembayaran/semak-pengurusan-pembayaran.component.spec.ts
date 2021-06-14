import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemakPengurusanPembayaranComponent } from './semak-pengurusan-pembayaran.component';

describe('SemakPengurusanPembayaranComponent', () => {
  let component: SemakPengurusanPembayaranComponent;
  let fixture: ComponentFixture<SemakPengurusanPembayaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemakPengurusanPembayaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemakPengurusanPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
