import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PemohonBersamaComponent } from './pemohon-bersama.component';

describe('PemohonBersamaComponent', () => {
  let component: PemohonBersamaComponent;
  let fixture: ComponentFixture<PemohonBersamaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PemohonBersamaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PemohonBersamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
