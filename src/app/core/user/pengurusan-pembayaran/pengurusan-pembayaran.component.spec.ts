import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengurusanPembayaranComponent } from './pengurusan-pembayaran.component';

describe('PengurusanPembayaranComponent', () => {
  let component: PengurusanPembayaranComponent;
  let fixture: ComponentFixture<PengurusanPembayaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengurusanPembayaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengurusanPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
