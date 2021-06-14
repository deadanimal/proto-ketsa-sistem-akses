import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemakPermohonanComponent } from './semak-permohonan.component';

describe('SemakPermohonanComponent', () => {
  let component: SemakPermohonanComponent;
  let fixture: ComponentFixture<SemakPermohonanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemakPermohonanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemakPermohonanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
